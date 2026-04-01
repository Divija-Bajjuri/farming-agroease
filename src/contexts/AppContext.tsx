import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export type AppPage = 'home' | 'dashboard' | 'chatbot' | 'weather' | 'fertilizer' | 'machinery' | 'schemes' | 'profile';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}

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
  const [notifications, setNotifications] = useState<Notification[]>([
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
      if (opts?.lat && opts?.lon) {
        body.lat = opts.lat;
        body.lon = opts.lon;
      } else if (opts?.city) {
        body.city = opts.city;
      } else if (gpsCoords) {
        body.lat = gpsCoords.lat;
        body.lon = gpsCoords.lon;
      } else {
        body.city = 'Hyderabad';
      }

      const { data, error } = await supabase.functions.invoke('weather', { body });

      if (error) throw new Error(error.message || 'Failed to fetch weather');
      if (data?.error) throw new Error(data.error);

      setWeatherData(data);

      // Auto-add weather alerts as notifications (only once per fetch)
      if (data.weather_alerts && data.weather_alerts.length > 0 && !weatherAlertsAdded.current) {
        weatherAlertsAdded.current = true;
        const lang = opts?.language || 'en';
        for (const alert of data.weather_alerts) {
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
      if (data.farming_advice && !weatherAlertsAdded.current) {
        const lang = opts?.language || 'en';
        const highSeverity = data.farming_advice.filter((a: FarmingAdviceItem) => a.severity === 'high');
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
