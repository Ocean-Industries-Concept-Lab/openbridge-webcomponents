// Get the Navtor token from the Navtor API
// Store the token in local storage
// Return the token
export function getAisToken(): Promise<string> {
    return fetch('https://us-central1-openbridge-demo.cloudfunctions.net/getAisToken')
        .then(response => response.json())
        .then(data => {
            return data.access_token;
        });
}

export interface AisData {
    mmsi: number;
    courseOverGround: number | null;
    latitude: number;
    longitude: number;
    name: string;
    msgtime: string;
    shipType: number;
    speedOverGround: number;
    trueHeading: number;
    rateOfTurn: number | null;
    navigationStatus: number;
}
export async function getAisStream(): Promise<ReadableStream<AisData>> {
    const token = await getAisToken();
    const url = 'https://live.ais.barentswatch.no/live/v1/sse/combined';
    const tenMinutesAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const body = {
        modelType: "Simple",
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [5.734863, 62.270024],
                    [5.734863, 62.693862],
                    [6.869202, 62.693862],
                    [6.869202, 62.270024],
                    [5.734863, 62.270024]
                ]
            ]
        },
        modelFormat: "Json",
        since: tenMinutesAgo,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
        },
        body: JSON.stringify(body),
    });

    if (!response.body) {
        throw new Error('No response body');
    }

    if (!response.ok) {
        throw new Error('Failed to fetch AIS data');
    }

    // Return a readable stream of SSE events (as text lines)
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';


    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await reader.read();
            if (done) {
                controller.close();
                return;
            }
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const data = JSON.parse(line.slice(6));
                    controller.enqueue(data);
                }
            }
        },
        cancel() {
            reader.cancel();
        }
    });
}

export function getVesselImage(shipType: number): string {
    let type: string;

    if (shipType === 30) type = 'Fishing vessel';
    else if (shipType === 31 || shipType === 32 || shipType === 52) type = 'Tug';
    else if ([33, 34, 53, 54, 55].includes(shipType)) type = 'Small craft';
    else if (shipType === 35) type = 'Military';
    else if (shipType === 36) type = 'Sail';
    else if (shipType === 37) type = 'Small craft'; // No 'Pleasure Craft' SVG, use 'Small craft'
    else if (shipType >= 40 && shipType <= 49) type = 'Speed craft';
    else if (shipType === 50) type = 'Pilot';
    else if (shipType === 51) type = 'SAR';
    else if (shipType === 58) type = 'Lifeboat';
    else if (shipType >= 60 && shipType <= 69) type = 'Passenger';
    else if (shipType >= 70 && shipType <= 79) type = 'Cargo';
    else if (shipType >= 80 && shipType <= 89) type = 'Tanker';
    else if (shipType >= 90 && shipType <= 99) type = 'Unknown';
    else type = 'generic';

    return `/Type=${type}.svg`;
}

/**
 * Calculate the CPA (Closest Point of Approach) between two ships.
 * @param aisData - The AIS data of the other ship.
 * @param ownShipData - The AIS data of the own ship.
 * @returns The CPA, time to CPA, bearing, and distance between the two ships. If the ships are not moving, or not moving towards each other, the bearing and distance are returned.
 */
export function getCpa(aisData: AisData, ownShipData: AisData): { cpa: number, timeToCpa: number, bearingDeg: number, distance: number } | { bearingDeg: number, distance: number } {
    // Convert degrees to radians
    const toRadians = (degrees: number) => degrees * Math.PI / 180;
    const toDegrees = (radians: number) => radians * 180 / Math.PI;

    // Earth radius in nautical miles
    const EARTH_RADIUS_NM = 3440.065;

    // Calculate initial distance and bearing
    const lat1 = toRadians(ownShipData.latitude);
    const lon1 = toRadians(ownShipData.longitude);
    const lat2 = toRadians(aisData.latitude);
    const lon2 = toRadians(aisData.longitude);

    // Calculate initial distance between ships (in nautical miles)
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS_NM * c;

    // Calculate bearing from own ship to other ship
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearingDeg = toDegrees(Math.atan2(y, x));
    bearingDeg = (bearingDeg + 360) % 360; // Normalize to 0-360 degrees

    // If we don't have course or speed for both ships, return undefined CPA
    if (ownShipData.courseOverGround === null || aisData.courseOverGround === null ||
        ownShipData.speedOverGround === 0 || aisData.speedOverGround === 0) {
        return {
            bearingDeg,
            distance
        };
    }

    // Convert course and speed to velocity components
    const ownCourse = toRadians(ownShipData.courseOverGround);
    const otherCourse = toRadians(aisData.courseOverGround);

    // Velocity components for own ship (knots)
    const ownVx = ownShipData.speedOverGround * Math.sin(ownCourse);
    const ownVy = ownShipData.speedOverGround * Math.cos(ownCourse);

    // Velocity components for other ship (knots)
    const otherVx = aisData.speedOverGround * Math.sin(otherCourse);
    const otherVy = aisData.speedOverGround * Math.cos(otherCourse);

    // Relative velocity
    const relVx = otherVx - ownVx;
    const relVy = otherVy - ownVy;
    const relSpeed = Math.sqrt(relVx * relVx + relVy * relVy);

    // If relative speed is zero, ships are moving in parallel
    if (relSpeed === 0) {
        return {
            bearingDeg,
            distance
        };
    }

    // Calculate position difference in Cartesian coordinates (approximation for short distances)
    const deltaX = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2) * EARTH_RADIUS_NM;
    const deltaY = (lat2 - lat1) * EARTH_RADIUS_NM;

    // Time to CPA (in hours)
    const timeToCpa = -(deltaX * relVx + deltaY * relVy) / (relVx * relVx + relVy * relVy);

    // If time is negative, ships are moving away from each other - no collision course
    if (timeToCpa < 0) {
        return {
            bearingDeg,
            distance
        };
    }

    // Calculate CPA distance
    const cpaX = deltaX + relVx * timeToCpa;
    const cpaY = deltaY + relVy * timeToCpa;
    const cpa = Math.sqrt(cpaX * cpaX + cpaY * cpaY);

    return {
        cpa,
        timeToCpa,
        bearingDeg,
        distance
    };
}