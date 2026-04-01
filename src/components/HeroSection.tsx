import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import AuthModal from './AuthModal';

const features = [
  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', titleKey: 'nav.chatbot', color: 'from-blue-500 to-indigo-500' },
  { icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', titleKey: 'nav.weather', color: 'from-cyan-500 to-blue-500' },
  { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', titleKey: 'nav.fertilizer', color: 'from-amber-500 to-yellow-500' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', titleKey: 'nav.machinery', color: 'from-purple-500 to-pink-500' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', titleKey: 'nav.schemes', color: 'from-green-500 to-teal-500' },
];

const stats = [
  { value: '10L+', labelEn: 'Farmers Helped', labelHi: 'किसानों की मदद', labelTe: 'రైతులకు సహాయం' },
  { value: '28', labelEn: 'States Covered', labelHi: 'राज्य कवर', labelTe: 'రాష్ట్రాలు' },
  { value: '95%', labelEn: 'Accuracy', labelHi: 'सटीकता', labelTe: 'ఖచ్చితత్వం' },
];

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { darkMode } = useApp();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800" />
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-green-100 text-sm mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                AI-Powered Agriculture Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setAuthOpen(true)}
                  className="px-8 py-4 bg-white text-green-700 font-bold text-lg rounded-2xl hover:bg-green-50 transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  {t('hero.cta')}
                </button>
                <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition border border-white/20 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  {t('hero.features')}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-green-200 text-sm mt-1">
                    {language === 'hi' ? stat.labelHi : language === 'te' ? stat.labelTe : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className={`py-16 sm:py-24 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                {language === 'hi' ? 'हमारी सुविधाएं' : language === 'te' ? 'మా ఫీచర్లు' : 'Our Features'}
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                {language === 'hi' ? 'एक ही प्लेटफॉर्म पर सभी कृषि सेवाएं' : language === 'te' ? 'ఒకే ప్లాట్‌ఫారమ్‌లో అన్ని వ్యవసాయ సేవలు' : 'All agriculture services on one platform'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div key={i} className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onClick={() => setAuthOpen(true)}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{t(feature.titleKey)}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    {language === 'hi' ? 'अपनी खेती को बेहतर बनाने के लिए इस सुविधा का उपयोग करें' : language === 'te' ? 'మీ వ్యవసాయాన్ని మెరుగుపరచడానికి ఈ ఫీచర్ ఉపయోగించండి' : 'Use this feature to improve your farming practices'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={`py-16 sm:py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-12`}>
              {language === 'hi' ? 'कैसे काम करता है?' : language === 'te' ? 'ఎలా పని చేస్తుంది?' : 'How It Works?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', titleEn: 'Register & Setup', titleHi: 'रजिस्टर करें', titleTe: 'నమోదు చేయండి', descEn: 'Create your account with mobile number and set up your farm profile', descHi: 'मोबाइल नंबर से अकाउंट बनाएं और फार्म प्रोफाइल सेट करें', descTe: 'మొబైల్ నంబర్‌తో ఖాతా సృష్టించండి మరియు ఫార్మ్ ప్రొఫైల్ సెట్ చేయండి' },
                { step: '2', titleEn: 'Scan & Ask', titleHi: 'स्कैन करें और पूछें', titleTe: 'స్కాన్ చేయండి & అడగండి', descEn: 'Upload crop photos for disease detection or ask our AI chatbot any farming question', descHi: 'रोग पहचान के लिए फसल फोटो अपलोड करें या AI चैटबॉट से कोई भी सवाल पूछें', descTe: 'రోగ గుర్తింపు కోసం పంట ఫోటోలు అప్‌లోడ్ చేయండి లేదా AI చాట్‌బాట్‌ను అడగండి' },
                { step: '3', titleEn: 'Get Smart Advice', titleHi: 'स्मार्ट सलाह पाएं', titleTe: 'స్మార్ట్ సలహా పొందండి', descEn: 'Receive AI-powered recommendations for treatment, fertilizers, and farming practices', descHi: 'उपचार, उर्वरक और खेती के लिए AI-संचालित सिफारिशें प्राप्त करें', descTe: 'చికిత్స, ఎరువులు మరియు వ్యవసాయ పద్ధతుల కోసం AI సిఫారసులు పొందండి' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {language === 'hi' ? item.titleHi : language === 'te' ? item.titleTe : item.titleEn}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'hi' ? item.descHi : language === 'te' ? item.descTe : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {language === 'hi' ? 'आज ही शुरू करें!' : language === 'te' ? 'ఈరోజే ప్రారంభించండి!' : 'Start Today!'}
            </h2>
            <p className="text-green-100 text-lg mb-8">
              {language === 'hi' ? 'लाखों किसानों के साथ जुड़ें और अपनी खेती को स्मार्ट बनाएं' : language === 'te' ? 'లక్షలాది రైతులతో చేరండి మరియు మీ వ్యవసాయాన్ని స్మార్ట్ చేయండి' : 'Join millions of farmers and make your farming smarter'}
            </p>
            <button onClick={() => setAuthOpen(true)}
              className="px-10 py-4 bg-white text-green-700 font-bold text-lg rounded-2xl hover:bg-green-50 transition shadow-xl">
              {t('hero.cta')}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-900'} text-gray-400 py-12 border-t`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <span className="text-white font-bold text-xl">{t('app.title')}</span>
                </div>
                <p className="text-sm leading-relaxed max-w-md">{t('footer.aboutText')}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">
                  {language === 'hi' ? 'सुविधाएं' : language === 'te' ? 'ఫీచర్లు' : 'Features'}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-green-400 cursor-pointer" onClick={() => setAuthOpen(true)}>{t('nav.chatbot')}</li>
                  <li className="hover:text-green-400 cursor-pointer" onClick={() => setAuthOpen(true)}>{t('nav.weather')}</li>
                  <li className="hover:text-green-400 cursor-pointer" onClick={() => setAuthOpen(true)}>{t('nav.fertilizer')}</li>
                  <li className="hover:text-green-400 cursor-pointer" onClick={() => setAuthOpen(true)}>{t('nav.machinery')}</li>
                  <li className="hover:text-green-400 cursor-pointer" onClick={() => setAuthOpen(true)}>{t('nav.schemes')}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    support@krishimitra.in
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    1800-XXX-XXXX (Toll Free)
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; 2026 KrishiMitra. {t('footer.rights')}</p>
            </div>
          </div>
        </footer>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default HeroSection;
