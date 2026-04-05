import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp, type AppPage } from '@/contexts/AppContext';

interface DashCard {
  key: AppPage;
  titleKey: string;
  icon: string;
  color: string;
  bgColor: string;
  descEn: string;
  descHi: string;
  descTe: string;
}

const dashCards: DashCard[] = [
 // { key: 'disease', titleKey: 'nav.disease', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20', descEn: 'Scan crop leaves for disease', descHi: 'पत्ती स्कैन करें', descTe: 'ఆకు స్కాన్ చేయండి' },
  { key: 'chatbot', titleKey: 'nav.chatbot', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20', descEn: 'Ask farming questions', descHi: 'खेती के सवाल पूछें', descTe: 'వ్యవసాయ ప్రశ్నలు అడగండి' },
  { key: 'weather', titleKey: 'nav.weather', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', color: 'text-cyan-600', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20', descEn: 'Check weather forecast', descHi: 'मौसम देखें', descTe: 'వాతావరణం చూడండి' },
  { key: 'fertilizer', titleKey: 'nav.fertilizer', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20', descEn: 'Get fertilizer advice', descHi: 'उर्वरक सलाह', descTe: 'ఎరువుల సలహా' },
  { key: 'machinery', titleKey: 'nav.machinery', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20', descEn: 'Rent farm machinery', descHi: 'मशीनरी किराये पर लें', descTe: 'యంత్రాలు అద్దెకు తీసుకోండి' },
  { key: 'schemes', titleKey: 'nav.schemes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20', descEn: 'Government schemes', descHi: 'सरकारी योजनाएं', descTe: 'ప్రభుత్వ పథకాలు' },
];

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const {
    setCurrentPage, notifications, markNotificationRead, darkMode,
    weatherData, weatherLoading, fetchWeather, gpsCoords, gpsLoading,
  } = useApp();

  // Auto-fetch weather when dashboard loads
  useEffect(() => {
    if (weatherData) return; // Already fetched
    if (gpsLoading) return; // Wait for GPS

    if (gpsCoords) {
      fetchWeather({ lat: gpsCoords.lat, lon: gpsCoords.lon, language });
    } else {
      const city = user?.village || user?.district || 'Hyderabad';
      fetchWeather({ city, language });
    }
  }, [weatherData, gpsCoords, gpsLoading, user, language, fetchWeather]);

  const current = weatherData?.current;

  const getConditionIcon = () => {
    if (!current) return null;
    const icon = current.condition_icon;
    if (icon === 'sun' || icon === 'partly-cloudy') {
      return (
        <svg className="w-10 h-10 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
    if (icon === 'rain' || icon === 'cloud-rain' || icon === 'drizzle' || icon === 'thunderstorm') {
      return (
        <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19v2m4-2v2m4-2v2" />
        </svg>
      );
    }
    return (
      <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Header with Live Weather */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-green-800 to-emerald-800' : 'bg-gradient-to-r from-green-600 to-emerald-600'} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t('dash.welcome')}, {user?.name || 'Farmer'}!</h1>
              <p className="text-green-100 mt-1">
                {weatherData?.location
                  ? weatherData.location
                  : [user?.village, user?.district, user?.state].filter(Boolean).join(', ') || ''
                }
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-white/15 transition"
              onClick={() => setCurrentPage('weather')}>
              {weatherLoading ? (
                <svg className="animate-spin w-10 h-10 text-white/50" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                getConditionIcon()
              )}
              <div>
                <div className="text-2xl font-bold">
                  {current ? `${current.temp}°C` : '--°C'}
                </div>
                <div className="text-green-100 text-sm capitalize">
                  {current ? current.condition : (language === 'hi' ? 'लोड हो रहा है...' : language === 'te' ? 'లోడ్ అవుతోంది...' : 'Loading...')}
                </div>
              </div>
            </div>
          </div>

          {/* Weather alert banner inside welcome card */}
          {weatherData?.weather_alerts && weatherData.weather_alerts.length > 0 && (
            <div className="mt-4 bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-xl p-3 flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentPage('weather')}>
              <svg className="w-5 h-5 text-red-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm text-red-100">
                {weatherData.weather_alerts[0].title[language] || weatherData.weather_alerts[0].title.en}:{' '}
                {weatherData.weather_alerts[0].message[language] || weatherData.weather_alerts[0].message.en}
              </p>
            </div>
          )}

          {/* Quick farming advice from weather */}
          {weatherData?.farming_advice && weatherData.farming_advice.length > 0 && (
            <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-start gap-3 cursor-pointer"
              onClick={() => setCurrentPage('weather')}>
              <svg className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-sm text-green-100">
                {(weatherData.farming_advice[0] as any)[language] || weatherData.farming_advice[0].en}
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions Grid */}
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{t('dash.quickActions')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {dashCards.map(card => (
            <button key={card.key} onClick={() => setCurrentPage(card.key)}
              className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'} border rounded-2xl p-5 text-left hover:shadow-lg transition-all duration-200 group`}>
              <div className={`w-14 h-14 ${card.bgColor} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <svg className={`w-7 h-7 ${card.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t(card.titleKey)}</h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'hi' ? card.descHi : language === 'te' ? card.descTe : card.descEn}
              </p>
            </button>
          ))}
        </div>

        {/* Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              {t('dash.alerts')}
            </h3>
            <div className="space-y-3">
              {notifications.length === 0 && (
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} text-center py-4`}>
                  {language === 'hi' ? 'कोई अलर्ट नहीं' : language === 'te' ? 'హెచ్చరికలు లేవు' : 'No alerts'}
                </p>
              )}
              {notifications.slice(0, 5).map(notif => (
                <div key={notif.id} onClick={() => markNotificationRead(notif.id)}
                  className={`p-3 rounded-xl cursor-pointer transition ${
                    notif.isRead
                      ? darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      : notif.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      : notif.type === 'warning' ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
                      : notif.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notif.isRead ? 'bg-gray-300 dark:bg-gray-600'
                      : notif.type === 'error' ? 'bg-red-500'
                      : notif.type === 'warning' ? 'bg-orange-500'
                      : notif.type === 'success' ? 'bg-green-500'
                      : 'bg-blue-500'
                    }`} />
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
  {typeof notif.title === "object"
    ? notif.title[language] || notif.title.en
    : notif.title}
</p>

<p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
  {typeof notif.message === "object"
    ? notif.message[language] || notif.message.en
    : notif.message}
</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Weather Widget */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              {t('nav.weather')}
              {weatherData?.is_live && (
                <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> LIVE
                </span>
              )}
            </h3>

            {weatherLoading && !current ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : current ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                    <svg className="w-6 h-6 mx-auto mb-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{current.temp}°C</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('weather.temp')}</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                    <svg className="w-6 h-6 mx-auto mb-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
                    </svg>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{current.humidity}%</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('weather.humidity')}</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                    <svg className="w-6 h-6 mx-auto mb-1 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{current.wind_speed} km/h</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('weather.wind')}</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                    <svg className="w-6 h-6 mx-auto mb-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {current.rain_mm > 0 ? `${current.rain_mm}mm` : '0mm'}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('weather.rain')}</div>
                  </div>
                </div>
                <button onClick={() => setCurrentPage('weather')}
                  className="w-full mt-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition text-sm flex items-center justify-center gap-2">
                  {language === 'hi' ? 'पूरा पूर्वानुमान देखें' : language === 'te' ? 'పూర్తి అంచనా చూడండి' : 'View Full Forecast'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            ) : (
              <p className={`text-sm text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'hi' ? 'मौसम डेटा उपलब्ध नहीं' : language === 'te' ? 'వాతావరణ డేటా అందుబాటులో లేదు' : 'Weather data unavailable'}
              </p>
            )}
          </div>
        </div>

        {/* Farming Tips - now weather-driven */}
        <div className={`mt-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            {language === 'hi' ? 'आज की खेती टिप्स' : language === 'te' ? 'ఈరోజు వ్యవసాయ చిట్కాలు' : "Today's Farming Tips"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weatherData?.farming_advice && weatherData.farming_advice.length > 0 ? (
              weatherData.farming_advice.slice(0, 3).map((tip, i) => (
                <div key={i} className={`${
                  tip.type === 'warning'
                    ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
                    : tip.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                } rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className={`w-5 h-5 ${
                      tip.type === 'warning' ? 'text-orange-500' : tip.type === 'success' ? 'text-green-500' : 'text-blue-500'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        tip.type === 'warning' ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z' :
                        tip.type === 'success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' :
                        'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      } />
                    </svg>
                    {tip.severity === 'high' && (
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
                        {language === 'hi' ? 'महत्वपूर्ण' : language === 'te' ? 'ముఖ్యమైన' : 'Important'}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {(tip as any)[language] || tip.en}
                  </p>
                </div>
              ))
            ) : (
              // Fallback static tips
              [
                { en: 'Water your crops early morning or late evening to reduce evaporation', hi: 'वाष्पीकरण कम करने के लिए सुबह जल्दी या शाम को देर से पानी दें', te: 'బాష్పీభవనం తగ్గించడానికి ఉదయం లేదా సాయంత్రం నీరు పెట్టండి' },
                { en: 'Check soil moisture before applying fertilizer for better absorption', hi: 'बेहतर अवशोषण के लिए उर्वरक डालने से पहले मिट्टी की नमी जांचें', te: 'మెరుగైన శోషణ కోసం ఎరువు వేయడానికి ముందు నేల తేమ తనిఖీ చేయండి' },
                { en: 'Rotate crops every season to maintain soil health and prevent diseases', hi: 'मिट्टी की सेहत बनाए रखने के लिए हर मौसम फसल बदलें', te: 'నేల ఆరోగ్యం కోసం ప్రతి సీజన్ పంటలు మార్చండి' },
              ].map((tip, i) => (
                <div key={i} className={`${darkMode ? 'bg-gray-700/50' : 'bg-green-50'} rounded-xl p-4`}>
                  <svg className="w-5 h-5 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'hi' ? tip.hi : language === 'te' ? tip.te : tip.en}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
