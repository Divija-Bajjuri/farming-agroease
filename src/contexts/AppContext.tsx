import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

export type AppPage = 'home' | 'dashboard' | 'chatbot' | 'weather' | 'fertilizer' | 'machinery' | 'schemes' | 'profile';

interface Notification {
  id: string;
  title: Record<string,string>;
  message: Record<string,string>
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}
/*interface Notification {
  id: string;
  title: Record<string,string>;
  message: Record<string,string>;*/ 

export interface WeatherCurrent {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  visibility: number;
  clouds: number;
  rain_mm: number;
  condition: string;
  condition_id: number;
  condition_icon: string;
  sunrise: number | null;
  sunset: number | null;
}

export interface WeatherForecastDay {
  date: string;
  day_name: string;
  temp_high: number;
  temp_low: number;
  rain_mm: number;
  rain_chance: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  condition_icon: string;
}

export interface FarmingAdviceItem {
  en: string;
  hi: string;
  te: string;
  type: 'warning' | 'success' | 'info';
  severity: 'low' | 'medium' | 'high';
}

export interface WeatherAlertItem {
  title: Record<string, string>;
  message: Record<string, string>;
  severity: string;
}

export interface WeatherData {
  location: string;
  lat: number | null;
  lon: number | null;
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
  farming_advice: FarmingAdviceItem[];
  weather_alerts: WeatherAlertItem[];
  fetched_at: string;
  is_live: boolean;
}

interface AppContextType {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  weatherData: WeatherData | null;
  weatherLoading: boolean;
  weatherError: string | null;
  fetchWeather: (opts?: { lat?: number; lon?: number; city?: string; language?: string }) => Promise<void>;
  gpsCoords: { lat: number; lon: number } | null;
  gpsLoading: boolean;
  gpsError: string | null;
  requestGPS: () => void;
}

const AppContext = createContext<AppContextType>({
  currentPage: 'home',
  setCurrentPage: () => {},
  notifications: [],
  addNotification: () => {},
  markNotificationRead: () => {},
  clearAllNotifications: () => {},
  unreadCount: 0,
  darkMode: false,
  toggleDarkMode: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
  weatherData: null,
  weatherLoading: false,
  weatherError: null,
  fetchWeather: async () => {},
  gpsCoords: null,
  gpsLoading: false,
  gpsError: null,
  requestGPS: () => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('krishi-dark') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();
  /*const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'welcome-1',
      title: 'Welcome to KrishiMitra!',
      message: 'Start by scanning your crop leaves for disease detection.',
      type: 'info',
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'pm-kisan-1',
      title: 'PM Kisan Update',
      message: 'New installment of ₹2,000 released. Check your bank account.',
      type: 'success',
      isRead: false,
      createdAt: new Date().toISOString(),
    },
  ]);*/
 const [notifications, setNotifications] = useState<Notification[]>([
  {
    id: 'welcome-1',
    title: {
      en: 'Welcome to KrishiMitra!',
      hi: 'कृषिमित्र में आपका स्वागत है!',
      te: 'కృషిమిత్రకు స్వాగతం!'
    },
    message: {
      en: 'Start by scanning your crop leaves for disease detection.',
      hi: 'फसल की पत्तियों को स्कैन करके रोग पहचान शुरू करें।',
      te: 'పంట ఆకులను స్కాన్ చేసి వ్యాధి గుర్తింపును ప్రారంభించండి.'
    },
    type: 'info',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pm-kisan-1',
    title: {
      en: 'PM Kisan Update',
      hi: 'पीएम किसान अपडेट',
      te: 'పీఎం కిసాన్ అప్‌డేట్'
    },
    message: {
      en: 'New installment of ₹2,000 released. Check your bank account.',
      hi: '₹2000 की नई किस्त जारी हुई। अपना बैंक खाता देखें।',
      te: '₹2000 కొత్త విడత విడుదలైంది. మీ బ్యాంక్ ఖాతా చూడండి.'
    },
    type: 'success',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
]);
  // Weather state
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const weatherAlertsAdded = useRef(false);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    setNotifications(prev => [{
      ...n,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      isRead: false,
      createdAt: new Date().toISOString(),
    }, ...prev]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('krishi-dark', String(next));
      return next;
    });
  }, []);

  // GPS
  const requestGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation not supported');
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setGpsLoading(false);
      },
      (err) => {
        setGpsError(err.message);
        setGpsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  // Fetch weather
  const fetchWeather = useCallback(async (opts?: { lat?: number; lon?: number; city?: string; language?: string }) => {
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const body: any = { language: opts?.language || 'en' };
        if (opts?.city) {
  body.city = opts.city;
}

// PRIORITY 2 → coordinates passed directly
else if (opts?.lat && opts?.lon) {
  body.lat = opts.lat;
  body.lon = opts.lon;
}

// PRIORITY 3 → stored GPS location
else if (gpsCoords) {
  body.lat = gpsCoords.lat;
  body.lon = gpsCoords.lon;
}
      else {
        body.city = 'Hyderabad';
      }

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

let lat = body.lat;
let lon = body.lon;

// If user typed a city/village, convert it to coordinates
if (!lat && body.city) {
  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(body.city)},India&format=json&limit=1`,
   {
    headers: {
      "User-Agent": "KrishiMitraWeatherApp"
    }
  }
  );

  const geoData = await geoResponse.json();

  if (!geoData || geoData.length === 0) {
    throw new Error("Location not found");
  }

  lat = parseFloat(geoData[0].lat);
  lon = parseFloat(geoData[0].lon);
}

// Now fetch weather using coordinates
const weatherResponse = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
);

const result = await weatherResponse.json();

if (!result || result.cod !== 200) {
  throw new Error(result?.message || "Weather API failed");
}


const formattedData = {
  location: result.name,
  lat: result.coord?.lat || null,
  lon: result.coord?.lon || null,
  current: {
    temp: Math.round(result.main.temp),
    feels_like: Math.round(result.main.feels_like),
    temp_min: Math.round(result.main.temp_min),
    temp_max: Math.round(result.main.temp_max),
    humidity: result.main.humidity,
    pressure: result.main.pressure,
    wind_speed: Math.round(result.wind.speed * 3.6),
    wind_deg: result.wind.deg,
    visibility: result.visibility / 1000,
    clouds: result.clouds.all,
    rain_mm: result.rain?.['1h'] || 0,
    condition: result.weather[0].description,
    condition_id: result.weather[0].id,
    condition_icon: result.weather[0].main.toLowerCase(),
    sunrise: result.sys.sunrise,
    sunset: result.sys.sunset
  },
  forecast: [],
  farming_advice: [],
  weather_alerts: [],
  fetched_at: new Date().toISOString(),
  is_live: true
};

setWeatherData(formattedData);

      // Auto-add weather alerts as notifications (only once per fetch)
      if (formattedData.weather_alerts && formattedData.weather_alerts.length > 0 && !weatherAlertsAdded.current) {
        weatherAlertsAdded.current = true;
        const lang = opts?.language || 'en';
        for (const alert of formattedData.weather_alerts) {
          const title = alert.title[lang] || alert.title.en;
          const message = alert.message[lang] || alert.message.en;
          setNotifications(prev => {
            // Don't duplicate alerts
            if (prev.some(n => n.title === title)) return prev;
            return [{
              id: 'weather-alert-' + Date.now() + Math.random().toString(36).slice(2),
              title,
              message,
              type: alert.severity === 'high' ? 'error' : 'warning',
              isRead: false,
              createdAt: new Date().toISOString(),
            }, ...prev];
          });
        }
      }

      // Add farming advice alerts for high severity items
      if (formattedData.farming_advice && !weatherAlertsAdded.current) {
        const lang = opts?.language || 'en';
        const highSeverity = formattedData.farming_advice.filter((a: FarmingAdviceItem) => a.severity === 'high');
        for (const advice of highSeverity.slice(0, 2)) {
          const msg = advice[lang] || advice.en;
          setNotifications(prev => {
            if (prev.some(n => n.message === msg)) return prev;
            return [{
              id: 'farm-advice-' + Date.now() + Math.random().toString(36).slice(2),
              title: lang === 'hi' ? 'खेती चेतावनी' : lang === 'te' ? 'వ్యవసాయ హెచ్చరిక' : 'Farming Alert',
              message: msg,
              type: advice.type === 'warning' ? 'warning' : 'info',
              isRead: false,
              createdAt: new Date().toISOString(),
            }, ...prev];
          });
        }
      }
    } catch (err: any) {
      setWeatherError(err.message || 'Failed to fetch weather');
    }
    setWeatherLoading(false);
  }, [gpsCoords]);

  // Auto-request GPS on mount
  useEffect(() => {
    requestGPS();
  }, [requestGPS]);

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      notifications, addNotification, markNotificationRead, clearAllNotifications, unreadCount,
      darkMode, toggleDarkMode,
      sidebarOpen, setSidebarOpen,
      weatherData, weatherLoading, weatherError, fetchWeather,
      gpsCoords, gpsLoading, gpsError, requestGPS,
    }}>
      {children}
    </AppContext.Provider>
  );
};
