export interface AisData {
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
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0QjdCRENCNDcwMkJBQjAxMDExNjRCRTZGNDM1RkU3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkLmJhcmVudHN3YXRjaC5ubyIsIm5iZiI6MTc0NzkxODU0NiwiaWF0IjoxNzQ3OTE4NTQ2LCJleHAiOjE3NDc5MjIxNDYsImF1ZCI6ImFpcyIsInNjb3BlIjpbImFpcyJdLCJjbGllbnRfaWQiOiJ0b3JzdGVpbmlib0BnbWFpbC5jb206b3BlbmJyaWRnZS1kZW1vIn0.hIdqBShq_fRV9ylUxEFHlBBxadmNHr2edd6NjBJ4RAlwiLavSmk6nCULxNe-ISzA0Q6O4R-9R7tAsAq_oZzZKtIbTeIsAiok0hRGol1QWEBoSd_NbKux7_dcuHPlWs6omLXZLy0Itpft-Hqz4bVC5PtoYqI3lGzXRYdarYxNpRyT8U2zKd_7EeyriT5CtjMqxN7N7_IY1PBgQgsRJ5Rzbtn0-7fJKLtKG9S5f4GktTzEFIBZ_CbjfvfAWbq-vqW0I3OQl_tIZrUdv_vSd05ReXBfKZEnJtOgWV6XjLgb4IgIoRyHF66YcsmchA7t5568o3qdgSpQXCz2spTXKtv_0w';
    const url = 'https://live.ais.barentswatch.no/live/v1/sse/combined';
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
        modelFormat: "Json"
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
                if (buffer.length > 0) {
                    controller.enqueue(buffer);
                }
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