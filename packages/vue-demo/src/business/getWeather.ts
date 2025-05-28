import { onMounted, onUnmounted, ref, type Ref } from "vue";

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

  export function useWeather(): { weather: Ref<WeatherData> } {
    const weather = ref<WeatherData>( {
      temperature: 20,
      humidity: 50,
      pressure: 1013,
      pressureTrend: 'steady',
      symbolCode: 'clearsky_day',
      windSpeed: 10,
      windSpeedBeaufort: 2,
      windDirection: 0,
      timestamp: new Date(),
    });
    let timer: NodeJS.Timeout | null = null;
    const fetchWeather = async () => {
      const data = await getWeather(59.91, 10.75);
      weather.value = data;
    };

    onMounted(async () => {
      await fetchWeather();
      timer = setInterval(async () => {
        await fetchWeather();
      }, 1000 * 60 * 10);
    });

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });

    return { weather };
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
    // Create a comprehensive mapping for YR weather symbols to OpenBridge icons
    const symbolMap: Record<string, string> = {
      // Clear sky variants
      'clearsky_day': 'clear-day-colour',
      'clearsky_night': 'clear-night-colour',
      'clearsky_polartwilight': 'clear-polartwilight-colour',
      
      // Fair weather (slightly cloudy)
      'fair_day': 'slightlycloudy-day-colour',
      'fair_night': 'slightlycloudy-night-colour',
      'fair_polartwilight': 'slightlycloudy-polartwilight-colour',
      
      // Partly cloudy
      'partlycloudy_day': 'partlycloudy-day-colour',
      'partlycloudy_night': 'partlycloudy-night-colour',
      'partlycloudy_polartwilight': 'partlycloudy-polartwilight-colour',
      
      // Cloudy
      'cloudy': 'cloudy-colour',
      
      // Fog
      'fog': 'fog-colour',
      
      // Light rain
      'lightrain': 'light-rain-colour',
      'lightrainshowers_day': 'light-rain-showers-sun-colour',
      'lightrainshowers_night': 'light-rain-showers-night-colour',
      'lightrainshowers_polartwilight': 'light-rain-showers-polartwilight-colour',
      
      // Rain
      'rain': 'rain-colour',
      'rainshowers_day': 'rain-showers-day-colour',
      'rainshowers_night': 'rain-showers-mon-colour',
      'rainshowers_polartwilight': 'rain-showers-polartwilight-colour',
      
      // Heavy rain
      'heavyrain': 'heavy-rain-colour',
      'heavyrainshowers_day': 'heavy-rain-showers-day-colour',
      'heavyrainshowers_night': 'heavy-rain-showers-night-colour',
      'heavyrainshowers_polartwilight': 'heavy-rain-showers-polartwilight-colour',
      
      // Light sleet (using the typo that exists in icon names)
      'lightsleet': 'lights-leet-colour',
      'lightsleetshowers_day': 'light-sleet-showers-day-colour',
      'lightsleetshowers_night': 'light-sleet-showers-night-colour',
      'lightsleetshowers_polartwilight': 'light-sleet-showers-polartwilight-colour',
      
      // Sleet
      'sleet': 'sleeth-colour',
      'sleetshowers_day': 'sleet-showers-day-colour',
      'sleetshowers_night': 'sleet-showers-night-colour',
      'sleetshowers_polartwilight': 'sleet-showers-polartwilight-colour',
      
      // Heavy sleet
      'heavysleet': 'heavy-sleet-colour',
      'heavysleetshowers_day': 'heavy-sleet-showers-day-colour',
      'heavysleetshowers_night': 'heavy-sleet-showers-night-colour',
      'heavysleetshowers_polartwilight': 'heavy-sleet-showers-polartwilight-colour',
      
      // Light snow
      'lightsnow': 'light-snow-colour',
      'lightsnowshowers_day': 'light-snow-showers-day-colour',
      'lightsnowshowers_night': 'light-snow-showers-night-colour',
      'lightsnowshowers_polartwilight': 'light-snow-showers-polartwilight-colour',
      
      // Snow
      'snow': 'snow-colour',
      'snowshowers_day': 'snow-showers-day-colour',
      'snowshowers_night': 'snow-showers-night-colour',
      'snowshowers_polartwilight': 'snow-showers-polartwilight-colour',
      
      // Heavy snow
      'heavysnow': 'heavy-snow-colour',
      'heavysnowshowers_day': 'heavy-snow-showers-day-colour',
      'heavysnowshowers_night': 'heavy-snow-showers-night-colour',
      'heavysnowshowers_polartwilight': 'heavy-snow-showers-polartwilight-colour',
      
      // Thunder variants - light rain
      'lightrainandthunder': 'lightning-light-rain-colour',
      'lightrainshowersandthunder_day': 'lightning-light-rain-showers-day-colour',
      'lightrainshowersandthunder_night': 'lightning-light-rain-showers-night-colour',
      'lightrainshowersandthunder_polartwilight': 'lightning-light-rain-showers-polartwilight-colour',
      
      // Thunder variants - rain
      'rainandthunder': 'lightning-rain-colour',
      'rainshowersandthunder_day': 'lightning-rain-showers-day-colour',
      'rainshowersandthunder_night': 'lightning-rain-showers-mon-colour',
      'rainshowersandthunder_polartwilight': 'lightning-rain-showers-polartwilight-colour',
      
      // Thunder variants - heavy rain
      'heavyrainandthunder': 'lightning-heavy-rain-colour',
      'heavyrainshowersandthunder_day': 'lightning-heavy-rain-showers-day-colour',
      'heavyrainshowersandthunder_night': 'lightning-heavy-rain-showers-night-colour',
      'heavyrainshowersandthunder_polartwilight': 'lightning-heavy-rain-showers-polartwilight-colour',
      
      // Thunder variants - light sleet (note: using typo that exists in icon names)
      'lightsleetandthunder': 'lightning-ligth-sleet-colour',
      'lightssleetshowersandthunder_day': 'lightning-light-sleet-showers-day-colour',
      'lightssleetshowersandthunder_night': 'lightning-light-sleet-showers-night-colour',
      'lightssleetshowersandthunder_polartwilight': 'lightning-light-sleet-showers-polartwilight-colour',
      
      // Thunder variants - sleet
      'sleetandthunder': 'lightning-sleeth-colour',
      'sleetshowersandthunder_day': 'lightning-sleet-showers-day-colour',
      'sleetshowersandthunder_night': 'lightning-sleet-showers-night-colour',
      'sleetshowersandthunder_polartwilight': 'lightning-sleet-showers-polartwilight-colour',
      
      // Thunder variants - heavy sleet
      'heavysleetandthunder': 'lightning-heavy-sleet-colour',
      'heavysleetshowersandthunder_day': 'lightning-heavy-sleet-showers-day-colour',
      'heavysleetshowersandthunder_night': 'lightning-heavy-sleet-showers-night-colour',
      'heavysleetshowersandthunder_polartwilight': 'lightning-heavy-sleet-showers-polartwilight-colour',
      
      // Thunder variants - light snow (note: some YR symbols have 'lightssnow' with double 's')
      'lightsnowandthunder': 'lightning-light-snow-colour',
      'lightssnowshowersandthunder_day': 'lightning-light-snow-showers-day-colour',
      'lightssnowshowersandthunder_night': 'lightning-light-snow-showers-night-colour',
      'lightssnowshowersandthunder_polartwilight': 'lightning-light-snow-showers-polartwilight-colour',
      
      // Thunder variants - snow
      'snowandthunder': 'lightning-snow-colour',
      'snowshowersandthunder_day': 'lightning-snow-showers-day-colour',
      'snowshowersandthunder_night': 'lightning-snow-showers-night-colour',
      'snowshowersandthunder_polartwilight': 'lightning-snow-showers-polartwilight-colour',
      
      // Thunder variants - heavy snow
      'heavysnowandthunder': 'lightning-heavy-snow-colour',
      'heavysnowshowersandthunder_day': 'lightning-heavy-snow-showers-day-colour',
      'heavysnowshowersandthunder_night': 'lightning-heavy-snow-showers-night-colour',
      'heavysnowshowersandthunder_polartwilight': 'lightning-heavy-snow-showers-polartwilight-colour',
    };
    
    // Return the mapped icon or fallback to cloudy if no match
    return symbolMap[symbolCode] || 'cloudy-colour';
  }