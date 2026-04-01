import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

const Weather: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const {
    darkMode, setCurrentPage,
    weatherData, weatherLoading, weatherError, fetchWeather,
    gpsCoords, gpsLoading, gpsError, requestGPS,
  } = useApp();

  const [cityInput, setCityInput] = useState('');
  const [hasInitialFetch, setHasInitialFetch] = useState(false);

  // Initial fetch: GPS → farmer location → default
  useEffect(() => {
    if (hasInitialFetch) return;
    if (gpsLoading) return; // Wait for GPS to resolve

    if (gpsCoords) {
      fetchWeather({ lat: gpsCoords.lat, lon: gpsCoords.lon, language });
      setHasInitialFetch(true);
    } else if (gpsError || !navigator.geolocation) {
      // Fallback to farmer's registered location
      const city = user?.village || user?.district || 'Hyderabad';
      setCityInput(city);
      fetchWeather({ city, language });
      setHasInitialFetch(true);
    }
  }, [gpsCoords, gpsLoading, gpsError, hasInitialFetch, user, language, fetchWeather]);

  const handleCitySearch = useCallback(() => {
    if (!cityInput.trim()) return;
    fetchWeather({ city: cityInput.trim(), language });
  }, [cityInput, language, fetchWeather]);

  const handleGPSRefresh = useCallback(() => {
    requestGPS();
    setHasInitialFetch(false);
  }, [requestGPS]);

  const handleRefresh = useCallback(() => {
    if (gpsCoords) {
      fetchWeather({ lat: gpsCoords.lat, lon: gpsCoords.lon, language });
    } else if (weatherData?.location) {
      fetchWeather({ city: weatherData.location, language });
    }
  }, [gpsCoords, weatherData, language, fetchWeather]);

  const getWeatherIcon = (type: string, size: string = 'w-8 h-8') => {
    switch (type) {
      case 'sun':
        return (
          <svg className={`${size} text-yellow-400`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'partly-cloudy':
        return (
          <svg className={`${size} text-amber-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'cloud':
        return (
          <svg className={`${size} text-gray-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'cloud-rain':
      case 'drizzle':
        return (
          <svg className={`${size} text-blue-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19v2m4-2v2m4-2v2" />
          </svg>
        );
      case 'rain':
        return (
          <svg className={`${size} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19v3m4-3v3m4-3v3m-8-6v3m4-3v3" />
          </svg>
        );
      case 'thunderstorm':
        return (
          <svg className={`${size} text-yellow-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 11l-2 4h3l-2 4" />
          </svg>
        );
      case 'mist':
      case 'snow':
        return (
          <svg className={`${size} text-gray-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      default:
        return (
          <svg className={`${size} text-yellow-400`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
    }
  };

  const getWindDirection = (deg: number) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
  };

  const current = weatherData?.current;
  const forecast = weatherData?.forecast || [];
  const advice = weatherData?.farming_advice || [];
  const alerts = weatherData?.weather_alerts || [];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentPage('dashboard')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('weather.title')}</h1>
              {weatherData?.is_live && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live Data
                </span>
              )}
            </div>
          </div>
          <button onClick={handleRefresh} disabled={weatherLoading}
            className={`p-2.5 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-600'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition ${weatherLoading ? 'animate-spin' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>

        {/* Location Bar */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-4 mb-6`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            <input type="text"
              value={cityInput || weatherData?.location || ''}
              onChange={e => setCityInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCitySearch()}
              className={`flex-1 bg-transparent ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} font-medium focus:outline-none text-base`}
              placeholder={language === 'hi' ? 'शहर या गांव का नाम...' : language === 'te' ? 'నగరం లేదా గ్రామం పేరు...' : 'City or village name...'} />
            <button onClick={handleCitySearch} disabled={weatherLoading}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition text-sm disabled:opacity-50">
              {t('common.search')}
            </button>
            <button onClick={handleGPSRefresh} disabled={gpsLoading}
              className={`p-2 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition ${gpsLoading ? 'animate-pulse' : ''}`}
              title={language === 'hi' ? 'GPS स्थान' : language === 'te' ? 'GPS స్థానం' : 'GPS Location'}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
          {gpsCoords && (
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'} flex items-center gap-1`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              GPS: {gpsCoords.lat.toFixed(4)}, {gpsCoords.lon.toFixed(4)}
            </p>
          )}
          {gpsError && (
            <p className="text-xs mt-2 text-amber-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" /></svg>
              {language === 'hi' ? 'GPS उपलब्ध नहीं - शहर का नाम उपयोग करें' : language === 'te' ? 'GPS అందుబాటులో లేదు - నగరం పేరు వాడండి' : 'GPS unavailable - using city name'}
            </p>
          )}
        </div>

        {/* Error State */}
        {weatherError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm text-red-700 dark:text-red-400">{weatherError}</p>
          </div>
        )}

        {/* Loading State */}
        {weatherLoading && !current && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin w-10 h-10 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
              {language === 'hi' ? 'मौसम डेटा लोड हो रहा है...' : language === 'te' ? 'వాతావరణ డేటా లోడ్ అవుతోంది...' : 'Loading weather data...'}
            </p>
          </div>
        )}

        {/* Weather Alerts Banner */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className={`rounded-2xl p-4 border flex items-start gap-3 ${
                alert.severity === 'high'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-800'
              }`}>
                <svg className={`w-6 h-6 flex-shrink-0 mt-0.5 ${alert.severity === 'high' ? 'text-red-500' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className={`font-bold text-sm ${alert.severity === 'high' ? 'text-red-800 dark:text-red-300' : 'text-orange-800 dark:text-orange-300'}`}>
                    {alert.title[language] || alert.title.en}
                  </p>
                  <p className={`text-sm mt-0.5 ${alert.severity === 'high' ? 'text-red-700 dark:text-red-400' : 'text-orange-700 dark:text-orange-400'}`}>
                    {alert.message[language] || alert.message.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current Weather Card */}
        {current && (
          <div className={`rounded-2xl p-6 mb-6 text-white relative overflow-hidden ${
            current.condition_icon === 'rain' || current.condition_icon === 'thunderstorm'
              ? 'bg-gradient-to-br from-slate-600 to-slate-800'
              : current.condition_icon === 'cloud' || current.condition_icon === 'cloud-rain' || current.condition_icon === 'drizzle'
              ? 'bg-gradient-to-br from-blue-500 to-indigo-700'
              : 'bg-gradient-to-br from-sky-400 to-blue-600'
          }`}>
            {weatherLoading && (
              <div className="absolute top-4 right-4">
                <svg className="animate-spin w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-white/70 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                  {weatherData?.location || 'Unknown'}
                </p>
                <div className="text-6xl sm:text-7xl font-extrabold mt-2 tracking-tight">{current.temp}°C</div>
                <p className="text-white/80 mt-1 capitalize text-lg">{current.condition}</p>
                <p className="text-white/60 text-sm">
                  {language === 'hi' ? `महसूस होता है ${current.feels_like}°C` : language === 'te' ? `అనిపిస్తుంది ${current.feels_like}°C` : `Feels like ${current.feels_like}°C`}
                  &nbsp;&middot;&nbsp;
                  {language === 'hi' ? `↑${current.temp_max}° ↓${current.temp_min}°` : `H:${current.temp_max}° L:${current.temp_min}°`}
                </p>
              </div>
              <div className="flex-shrink-0">
                {getWeatherIcon(current.condition_icon, 'w-24 h-24')}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { label: t('weather.humidity'), value: `${current.humidity}%`, iconPath: 'M12 3c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z' },
                { label: t('weather.wind'), value: `${current.wind_speed} km/h ${getWindDirection(current.wind_deg)}`, iconPath: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
                { label: t('weather.rain'), value: current.rain_mm > 0 ? `${current.rain_mm} mm` : (language === 'hi' ? 'कोई बारिश नहीं' : language === 'te' ? 'వర్షం లేదు' : 'No rain'), iconPath: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
                { label: language === 'hi' ? 'दृश्यता' : language === 'te' ? 'దృశ్యమానత' : 'Visibility', value: `${current.visibility} km`, iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <svg className="w-5 h-5 mx-auto mb-1 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} /></svg>
                  <div className="text-base sm:text-lg font-bold">{item.value}</div>
                  <div className="text-xs text-white/60">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Pressure & Clouds row */}
            <div className="flex gap-3 mt-3">
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-sm font-bold">{current.pressure} hPa</div>
                <div className="text-xs text-white/60">{language === 'hi' ? 'दबाव' : language === 'te' ? 'ఒత్తిడి' : 'Pressure'}</div>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-sm font-bold">{current.clouds}%</div>
                <div className="text-xs text-white/60">{language === 'hi' ? 'बादल' : language === 'te' ? 'మేఘాలు' : 'Cloud Cover'}</div>
              </div>
            </div>
          </div>
        )}

        {/* 7-Day Forecast */}
        {forecast.length > 0 && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 mb-6`}>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {t('weather.forecast')}
            </h3>

            {/* Mobile: horizontal scroll / Desktop: grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {forecast.map((day, i) => (
                <div key={i} className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-3 text-center transition hover:shadow-md`}>
                  <p className={`text-xs font-bold ${i === 0 ? 'text-green-600 dark:text-green-400' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {day.day_name}
                  </p>
                  <div className="my-2 flex justify-center">
                    {getWeatherIcon(day.condition_icon, 'w-8 h-8')}
                  </div>
                  <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{day.temp_high}°</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day.temp_low}°</p>
                  <div className="mt-1.5 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" /></svg>
                    <span className={`text-xs font-medium ${day.rain_chance >= 60 ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {day.rain_chance}%
                    </span>
                  </div>
                  {day.rain_mm > 0 && (
                    <p className={`text-[10px] mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{day.rain_mm}mm</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smart Farming Advice */}
        {advice.length > 0 && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              {t('weather.advice')}
              <span className={`text-xs font-normal ${darkMode ? 'text-gray-500' : 'text-gray-400'} ml-1`}>
                ({language === 'hi' ? 'मौसम आधारित' : language === 'te' ? 'వాతావరణ ఆధారిత' : 'Weather-based'})
              </span>
            </h3>
            <div className="space-y-3">
              {advice.map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border ${
                  item.type === 'warning'
                    ? item.severity === 'high'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                    : item.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      item.type === 'warning'
                        ? item.severity === 'high' ? 'text-red-500' : 'text-orange-500'
                        : item.type === 'success' ? 'text-green-500' : 'text-blue-500'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        item.type === 'warning' ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z' :
                        item.type === 'success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' :
                        'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      } />
                    </svg>
                    <div>
                      {item.severity === 'high' && (
                        <span className="inline-block px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-[10px] font-bold rounded-full mb-1 uppercase">
                          {language === 'hi' ? 'उच्च प्राथमिकता' : language === 'te' ? 'అధిక ప్రాధాన్యత' : 'High Priority'}
                        </span>
                      )}
                      <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {(item as any)[language] || item.en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last updated */}
        {weatherData?.fetched_at && (
          <p className={`text-center text-xs mt-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {language === 'hi' ? 'अंतिम अपडेट:' : language === 'te' ? 'చివరి అప్‌డేట్:' : 'Last updated:'}{' '}
            {new Date(weatherData.fetched_at).toLocaleTimeString(language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN')}
          </p>
        )}
      </div>
    </div>
  );
};

export default Weather;
