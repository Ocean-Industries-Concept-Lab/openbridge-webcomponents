export interface WeatherData {
    temperature: number;
    humidity: number;
    pressure: number;
    pressureTrend: 'rising' | 'falling' | 'steady';
    symbolCode: string;
    windSpeed: number;
    windSpeedBeaufort: number;
    windDirection: number;
    timestamp: Date;
  }
  
  export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    const cacheKey = `weather_${lat}_${lon}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Check if cached data is less than 10 minutes old
        if (parsed && parsed.timestamp) {
          const age = Date.now() - new Date(parsed.timestamp).getTime();
          if (age < 30 * 60 * 1000) {
            // Convert timestamp back to Date object
            parsed.timestamp = new Date(parsed.timestamp);
            return parsed;
          }
        }
      } catch {
        // Ignore parse errors and continue to fetch
      }
    }
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
    const timeseries = data.properties.timeseries;
  
    if (timeseries.length < 2) {
      throw new Error('Too little data in weather response');
    }
  
    const now = timeseries[0];
    const next = timeseries[1];
  
    const detailsNow = now.data.instant.details;
    const symbolCode = now.data.next_1_hours?.summary?.symbol_code ?? 'unknown';
  
    const pressureNow = detailsNow.air_pressure_at_sea_level;
    const pressureNext = next.data.instant.details.air_pressure_at_sea_level;
  
    let pressureTrend: 'rising' | 'falling' | 'steady' = 'steady';
    const diff = pressureNext - pressureNow;
  
    if (diff > 0.5) pressureTrend = 'rising';
    else if (diff < -0.5) pressureTrend = 'falling';
  
    const weatherData: WeatherData = {
      temperature: detailsNow.air_temperature,
      humidity: detailsNow.relative_humidity,
      pressure: pressureNow,
      pressureTrend,
      symbolCode: weatherSymbolToIcon(symbolCode),
      windSpeed: detailsNow.wind_speed,
      windSpeedBeaufort: windSpeedMpsToBeaufort(detailsNow.wind_speed),
      windDirection: detailsNow.wind_from_direction,
      timestamp: new Date(now.time),
    };
    // Store in localStorage (stringify with ISO timestamp)
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ ...weatherData, timestamp: weatherData.timestamp.toISOString() })
    );
    return weatherData;
  }

  export function windSpeedMpsToBeaufort(speed: number): number {
    if (speed < 0.3) return 0;
    if (speed < 1.5) return 1;
    if (speed < 3.3) return 2;
    if (speed < 5.5) return 3;
    if (speed < 7.9) return 4;
    if (speed < 10.7) return 5;
    if (speed < 13.8) return 6;
    if (speed < 17.1) return 7;
    if (speed < 20.7) return 8;
    if (speed < 24.4) return 9;
    if (speed < 28.4) return 10;
    if (speed < 32.6) return 11;
    return 12;
  }
  
  export function weatherSymbolToIcon(symbolCode: string): string {
    return symbolCode.replace('sky', '').replace(/_/g, '-')+'-colour';
  }