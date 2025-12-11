
export interface WeatherData {
  temp: number;
  code: number;
  link: string;
}

const COORDINATES = {
  Yiwu: { lat: 29.3003, lng: 120.0768 },
  Hangzhou: { lat: 30.2741, lng: 120.1551 }
};

export const getWeather = async (city: 'Yiwu' | 'Hangzhou'): Promise<WeatherData | null> => {
  try {
    const coords = COORDINATES[city];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,weather_code&timezone=auto`;
    
    // Construct The Weather Channel deep link using coordinates
    // Using .2f precision for cleaner URLs which TWC supports
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
  // WMO Weather interpretation codes (http://www.wmo.int/pages/prog/www/IMOP/publications/CIMO-Guide/Updates/2008/PartI/Chapter12.pdf)
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog
  // 51, 53, 55: Drizzle
  // 61, 63, 65: Rain
  // 71, 73, 75: Snow
  // 80, 81, 82: Rain showers
  // 95, 96, 99: Thunderstorm
  
  if (code === 0) return { label: 'Sunny', icon: '☀️' };
  if (code <= 3) return { label: 'Cloudy', icon: '☁️' };
  if (code <= 48) return { label: 'Foggy', icon: '🌫️' };
  if (code <= 67) return { label: 'Rain', icon: '🌧️' };
  if (code <= 77) return { label: 'Snow', icon: '❄️' };
  if (code <= 82) return { label: 'Showers', icon: '🌦️' };
  return { label: 'Storm', icon: '⛈️' };
};
