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