export interface WeatherData {
  temp: number;
  code: number;
  link: string;
}

const WEATHER_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Yiwu: { lat: 29.3003, lng: 120.0768 },
  Hangzhou: { lat: 30.2741, lng: 120.1551 }
};

export const getWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const coords = WEATHER_COORDINATES[city];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,weather_code&timezone=auto`;
    const weatherChannelUrl = `https://weather.com/weather/today/l/${coords.lat.toFixed(2)},${coords.lng.toFixed(2)}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.current) {
      return {
        temp: Math.round(data.current.temperature_2m),
        code: data.current.weather_code,
        link: weatherChannelUrl
      };
    }
    return null;
  } catch (e) {
    console.error("Weather fetch failed", e);
    return null;
  }
};

export const getWeatherIconInfo = (code: number) => {
  if (code === 0) return { label: 'Sunny', icon: '☀️' };
  if (code <= 3) return { label: 'Cloudy', icon: '☁️' };
  if (code <= 48) return { label: 'Foggy', icon: '🌫️' };
  if (code <= 67) return { label: 'Rain', icon: '🌧️' };
  if (code <= 77) return { label: 'Snow', icon: '❄️' };
  if (code <= 82) return { label: 'Showers', icon: '🌦️' };
  return { label: 'Storm', icon: '⛈️' };
};