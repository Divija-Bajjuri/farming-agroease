export type Language = 'en' | 'hi' | 'te';

export const translations: Record<string, Record<Language, string>> = {

  // App
  'app.title': { en: 'KrishiMitra', hi: 'कृषिमित्र', te: 'కృషిమిత్ర' },
  'app.subtitle': { en: 'Smart Agriculture', hi: 'स्मार्ट कृषि', te: 'స్మార్ట్ వ్యవసాయం' },

  // Navigation
  'nav.home': { en: 'Home', hi: 'होम', te: 'హోమ్' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్' },
  'nav.chatbot': { en: 'AI Chatbot', hi: 'AI चैटबॉट', te: 'AI చాట్‌బాట్' },
  'nav.weather': { en: 'Weather', hi: 'मौसम', te: 'వాతావరణం' },
  'nav.fertilizer': { en: 'Fertilizer', hi: 'उर्वरक', te: 'ఎరువులు' },
  'nav.machinery': { en: 'Machinery', hi: 'मशीनरी', te: 'యంత్రాలు' },
  'nav.schemes': { en: 'Govt Schemes', hi: 'सरकारी योजनाएं', te: 'ప్రభుత్వ పథకాలు' },
  'nav.login': { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్' },

  // Dashboard ⭐ (ADDED)

  'dash.welcome': {
    en: 'Welcome',
    hi: 'स्वागत है',
    te: 'స్వాగతం'
  },

  'dash.quickActions': {
    en: 'Quick Actions',
    hi: 'त्वरित कार्य',
    te: 'త్వరిత చర్యలు'
  },

  'dash.alerts': {
    en: 'Alerts',
    hi: 'सूचनाएँ',
    te: 'అలర్ట్స్'
  },

  // HERO SECTION

  'hero.title': {
    en: 'AI Powered Smart Agriculture',
    hi: 'एआई आधारित स्मार्ट कृषि',
    te: 'AI ఆధారిత స్మార్ట్ వ్యవసాయం'
  },

  'hero.subtitle': {
    en: 'Helping farmers make better crop decisions with technology.',
    hi: 'तकनीक की मदद से किसानों को बेहतर खेती निर्णय लेने में सहायता।',
    te: 'సాంకేతికతతో రైతులకు మెరుగైన వ్యవసాయ నిర్ణయాలు తీసుకోవడంలో సహాయం.'
  },

  'hero.cta': {
    en: 'Get Started',
    hi: 'शुरू करें',
    te: 'ప్రారంభించండి'
  },

  'hero.features': {
    en: 'Explore Features',
    hi: 'फीचर्स देखें',
    te: 'ఫీచర్లు చూడండి'
  },

  // Chatbot

  'chat.title': {
    en: 'KrishiMitra AI Chatbot',
    hi: 'कृषिमित्र AI चैटबॉट',
    te: 'కృషిమిత్ర AI చాట్‌బాట్'
  },

  'chat.placeholder': {
    en: 'Ask about farming...',
    hi: 'खेती के बारे में पूछें...',
    te: 'వ్యవసాయం గురించి అడగండి...'
  },

  'chat.quickQ': {
    en: 'Quick Questions',
    hi: 'त्वरित प्रश्न',
    te: 'త్వరిత ప్రశ్నలు'
  },

  'chat.q1': {
    en: 'How to check weather forecast?',
    hi: 'मौसम पूर्वानुमान कैसे देखें?',
    te: 'వాతావరణ అంచనాను ఎలా చూడాలి?'
  },

  'chat.q2': {
    en: 'How to get fertilizer recommendation?',
    hi: 'उर्वरक सिफारिश कैसे प्राप्त करें?',
    te: 'ఎరువు సిఫార్సు ఎలా పొందాలి?'
  },

  'chat.q3': {
    en: 'How to rent farm machinery?',
    hi: 'कृषि मशीनरी कैसे किराए पर लें?',
    te: 'వ్యవసాయ యంత్రాలను ఎలా అద్దెకు తీసుకోవాలి?'
  },

  'chat.q4': {
    en: 'How to view government schemes?',
    hi: 'सरकारी योजनाएं कैसे देखें?',
    te: 'ప్రభుత్వ పథకాలను ఎలా చూడాలి?'
  },

  'chat.q5': {
    en: 'How to treat leaf blight?',
    hi: 'पत्ती झुलसा का इलाज कैसे करें?',
    te: 'ఆకు మచ్చ వ్యాధిని ఎలా నియంత్రించాలి?'
  },

  'chat.q6': {
    en: 'Best fertilizer for rice?',
    hi: 'धान के लिए सबसे अच्छा उर्वरक?',
    te: 'వరికి ఉత్తమ ఎరువు ఏది?'
  },

  'chat.q7': {
    en: 'Weather advice for sowing crops?',
    hi: 'बुवाई के लिए मौसम सलाह?',
    te: 'విత్తనాల విత్తడానికి వాతావరణ సూచనలు?'
  },

  'chat.q8': {
    en: 'Which crop grows well in red soil?',
    hi: 'लाल मिट्टी में कौन सी फसल अच्छी उगती है?',
    te: 'ఎర్ర నేలలో ఏ పంట బాగా పెరుగుతుంది?'
  },

  // Weather

  'weather.title': {
    en: 'Weather Monitoring',
    hi: 'मौसम निगरानी',
    te: 'వాతావరణ పర్యవేక్షణ'
  },

  'weather.temp': {
    en: 'Temperature',
    hi: 'तापमान',
    te: 'ఉష్ణోగ్రత'
  },

  'weather.humidity': {
    en: 'Humidity',
    hi: 'नमी',
    te: 'తేమ'
  },

  'weather.wind': {
    en: 'Wind Speed',
    hi: 'हवा की गति',
    te: 'గాలి వేగం'
  },

  'weather.rain': {
    en: 'Rainfall',
    hi: 'वर्षा',
    te: 'వర్షపాతం'
  },

  'weather.forecast': {
    en: '7-Day Forecast',
    hi: '7-दिन का पूर्वानुमान',
    te: '7-రోజుల అంచనా'
  },

};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
}