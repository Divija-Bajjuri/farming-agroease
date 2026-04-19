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
  'nav.machinery': { en: 'Machinery', hi: 'मशीनरी', te: 'ంత్రాలు' },
  'nav.schemes': { en: 'Govt Schemes', hi: 'सरकारी योजनाएं', te: 'ప్రభుత్వ పథకాలు' },
  'nav.login': { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్' },

  // Dashboard
  'dash.welcome': { en: 'Welcome', hi: 'स्वागत है', te: 'స్వాగతం' },
  'dash.quickActions': { en: 'Quick Actions', hi: 'त्वरित कार्य', te: 'త్వరిత చర్యలు' },
  'dash.alerts': { en: 'Alerts', hi: 'सूचनाएँ', te: 'అలర్ట్స్' },

  // Hero Section
  'hero.title': {
    en: 'AI Powered Smart Agriculture',
    hi: 'एआई आधारित स्मार्ट कृषि',
    te: 'AI ఆధారిత స్మార్ట్ వ్యవసాయం'
  },

  'hero.subtitle': {
    en: 'Helping farmers make better crop decisions with technology.',
    hi: 'तकनीक की मदद से किसानों को बेहतर खेती निर्णय लेने में सहायता।',
    te: 'సాంకేతికతతో రైతులకు మెరుగైన వ్యవసాయ నిర్ణయాలు తీసుకోవడంలో सహాయం.'
  },

  'hero.cta': {
    en: 'Get Started',
    hi: 'शुरू करें',
    te: 'ప్రారంభించండి'
  },

  'hero.features': {
    en: 'Explore Features',
    hi: 'फीचर्स देखें',
    te: 'ఫీచర్‌లు చూడండి'
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
    te: ' వ్యవసాయం గురించి అడగండి...'
  },

  'chat.quickQ': {
    en: 'Quick Questions',
    hi: 'त्वरित प्रश्न',
    te: 'త్వరిత ప్రశ్నలు'
  },

  'chat.q1': {
    en: 'How to check weather forecast?',
    hi: 'मौसम पूर्वानुमान कैसे देखें?',
    te: '  వాతావరణ అంచనా ఎలా చూడాలి?'
  },

  'chat.q2': {
    en: 'How to get fertilizer recommendation?',
    hi: 'उर्वरक सिफारिश कैसे प्राप्त करें?',
    te: '  ఎరువు సిఫార్సు ఎలా పొందుకోవాలి?'
  },

  'chat.q3': {
    en: 'How to rent farm machinery?',
    hi: 'कृषि मशीनरी कैसे किराए पर लें?',
    te: '  వ్యవాయ యంత్రాలు ఎలా అద్దెకు తీసుకోవాలి?'
  },

  'chat.q4': {
    en: 'How to view government schemes?',
    hi: 'सरकारी योजनाएं कैसे देखें?',
    te: '  ప్రభుత్వ పథకాలు ఎలా చూడాలి?'
  },

  'chat.q5': {
    en: 'How to treat leaf blight?',
    hi: 'पत्ती झुलसा का इलाज कैसे करें?',
    te: '  ఆకుల మచ్చల వ్యాధిని ఎలా చికిత్స చేయాలి?'
  },

  'chat.q6': {
    en: 'Best fertilizer for rice?',
    hi: 'धान के लिए सबसे अच्छा उर्वरक?',
    te: '  బియ్యం పంటకు ఉత్తమ ఎరువు ఏమిటి?'
  },

  'chat.q7': {
    en: 'Weather advice for sowing crops?',
    hi: 'बुवाई के लिए मौसम सलाह?',
    te: ' పంటలు విత్తడానికి వాతావరణ సూచనలు ఏమిటి?'
  },

  'chat.q8': {
    en: 'Which crop grows well in red soil?',
    hi: 'लाल मिट्टी में कौन सी फसल अच्छी उगती है?',
    te: '  ఎర్ర నేలలో ఏ పంటలు బాగా పెరుగుతాయి?'
  },

  // Weather
  'weather.title': { en: 'Weather Monitoring', hi: 'मौसम निगरानी', te: '  వాతావరణ monitoring' },
  'weather.temp': { en: 'Temperature', hi: 'तापमान', te: '  ఉష్ణోగ్రత' },
  'weather.humidity': { en: 'Humidity', hi: 'नमी', te: ' తే' },
  'weather.wind': { en: 'Wind Speed', hi: 'हवा की गति', te: '  గాలి speed' },
  'weather.rain': { en: 'Rainfall', hi: 'वर्षा', te: '  rain' },
  'weather.forecast': { en: '7-Day Forecast', hi: '7-दिन का पूर्वानुमान', te: '  7-रోజుల forecast' },

  // Fertilizer
  'fert.title': {
    en: 'Fertilizer Recommendation',
    hi: 'उर्वरक सिफारिश',
    te: '  ఎరువు సిఫార్సు'
  },

  'fert.cropType': {
    en: 'Select Crop Type',
    hi: 'फसल प्रकार चुनें',
    te: '  పంట రకం ఎంచుకోండి'
  },

  'fert.soilType': {
    en: 'Select Soil Type',
    hi: 'मिट्टी का प्रकार चुनें',
    te: ' నేల రకం ఎంచుకోండి'
  },

  'fert.recommend': {
    en: 'Get Recommendation',
    hi: 'सिफारिश प्राप्त करें',
    te: '  सిఫార్సు పొందడం'
  },

  'fert.nitrogen': {
    en: 'Nitrogen',
    hi: 'नाइट्रोजन',
    te: '  नैट्राजन'
  },

  'fert.phosphorus': {
    en: 'Phosphorus',
    hi: 'फास्फोरस',
    te: ' ఫాస్ఫరస్'
  },

  'fert.potassium': {
    en: 'Potassium',
    hi: 'पोटैशियम',
    te: '  పోటాషియం'
  },

  'fert.schedule': {
    en: 'Application Schedule',
    hi: 'प्रयोग अनुसूची',
    te: '  application schedule'
  },

  'fert.organic': {
    en: 'Organic Options',
    hi: 'जैविक विकल्प',
    te: '  organic options'
  },

  // Machinery Rental
  'mach.title': {
    en: 'Farm Machinery Rental',
    hi: 'कृषि मशीन किराया',
    te: '  agricultural machinery rental'
  },

  'mach.book': {
    en: 'Book Now',
    hi: 'बुक करें',
    te: '  book now'
  },

  'mach.available': {
    en: 'Available',
    hi: 'उपलब्ध',
    te: '  available'
  },

  'mach.booked': {
    en: 'Booked',
    hi: 'बुक हो चुका',
    te: '  booked'
  },

  'mach.myBookings': {
    en: 'My Bookings',
    hi: 'मेरी बुकिंग',
    te: '  my bookings'
  },

  'mach.addListing': {
    en: 'Add Listing',
    hi: 'मशीन जोड़ें',
    te: '  add listing'
  },

  'mach.machineName': {
    en: 'Machine Name',
    hi: 'मशीन का नाम',
    te: '  machine name'
  },

  'mach.price': {
    en: 'Price',
    hi: 'कीमत',
    te: '  price'
  },

  'mach.perHour': {
    en: 'per hour',
    hi: 'प्रति घंटा',
    te: '  per hour'
  },

  'mach.perDay': {
    en: 'per day',
    hi: 'प्रति दिन',
    te: '  per day'
  },

  'mach.contact': {
    en: 'Contact Number',
    hi: 'संपर्क नंबर',
    te: '  contact number'
  },

  'mach.hours': {
    en: 'hours',
    hi: 'घंटे',
    te: '  hours'
  },

  'mach.days': {
    en: 'days',
    hi: 'दिन',
    te: '  days'
  },

  'mach.pending': {
    en: 'Pending',
    hi: 'लंबित',
    te: '  pending'
  },

  'mach.approved': {
    en: 'Approved',
    hi: 'स्वीकृत',
    te: '  approved'
  },

  'mach.completed': {
    en: 'Completed',
    hi: 'पूर्ण',
    te: '  completed'
  },

  // Common Buttons
  'common.submit': {
    en: 'Submit',
    hi: 'सबमिट',
    te: '  submit'
  },

  'common.cancel': {
    en: 'Cancel',
    hi: 'रद्द करें',
    te: '  cancel'
  },

  // Crop Types
  'crop.rice': {
    en: 'Rice',
    hi: 'धान',
    te: '  rice'
  },

  'crop.wheat': {
    en: 'Wheat',
    hi: 'गेहूं',
    te: '  wheat'
  },

  'crop.cotton': {
    en: 'Cotton',
    hi: 'कपास',
    te: '  cotton'
  },

  'crop.maize': {
    en: 'Maize',
    hi: 'मक्का',
    te: '  maize'
  },

  'crop.tomato': {
    en: 'Tomato',
    hi: 'टमाटर',
    te: '  tomato'
  },

  'crop.sugarcane': {
    en: 'Sugarcane',
    hi: 'गन्ना',
    te: '  sugarcane'
  },

  // Farm Size
  'auth.farmSize': {
    en: 'Farm Size (Acres)',
    hi: 'खेत का आकार (एकड़)',
    te: '  farm size (acres)'
  },

  // Fertilizer Types
  'fert.chemical': {
    en: 'Chemical',
    hi: 'रासायनिक',
    te: 'రసాయన'
  },

  'fert.natural': {
    en: 'Natural',
    hi: 'प्राकृतिक',
    te: 'సహజ'
  },

  // Fertilizer Names
  'fert.urea': {
    en: 'Urea',
    hi: 'यूरिया',
    te: ' యూరియ'
  },
  'fert.dap': {
    en: 'DAP (Di-Ammonium Phosphate)',
    hi: 'DAP (डाइ-अमोनियम फॉस्फेट)',
    te: 'DAP (di-ammonium phosphate)'
  },
  'fert.npk': {
    en: 'NPK Fertilizer',
    hi: 'NPK उर्वरक',
    te: 'NPK ఎరువ'
  },
  'fert.vermicompost': {
    en: 'Vermicompost',
    hi: 'वर्मीकम्पोस्ट',
    te: ' వెర్మికంపాస్ట్'
  },
  'fert.compost': {
    en: 'Compost',
    hi: 'खाद',
    te: ' compost'
  },

  // Soil Types
  'soil.alluvial': {
    en: 'Alluvial',
    hi: 'जलोढ़',
    te: 'అలువియల్'
  },
  'soil.black': {
    en: 'Black (Regur)',
    hi: 'काली (रेगूर)',
    te: ' black (regur)'
  },
  'soil.red': {
    en: 'Red',
    hi: 'लाल',
    te: 'red'
  },
  'soil.laterite': {
    en: 'Laterite',
    hi: 'लैटेराइट',
    te: 'laterite'
  },
  'soil.sandy': {
    en: 'Sandy',
    hi: 'बलुई',
    te: 'sandy'
  },
  'soil.clay': {
    en: 'Clay',
    hi: 'चिकनी',
    te: 'clay'
  },

  // Seasons
  'season.kharif': {
    en: 'Kharif',
    hi: 'खरीफ',
    te: 'ఖరీఫ'
  },
  'season.rabi': {
    en: 'Rabi',
    hi: 'रबी',
    te: 'రబ'
  },
  'season.zaid': {
    en: 'Zaid',
    hi: 'ज़ैद',
    te: 'జ़ైద'
  },

  // Additional Crops
  'crop.groundnut': {
    en: 'Groundnut',
    hi: 'मूंगफली',
    te: 'groundnut'
  },
  'crop.soybean': {
    en: 'Soybean',
    hi: 'सोयाबीन',
    te: 'soybean'
  },
  'crop.mustard': {
    en: 'Mustard',
    hi: 'सरसों',
    te: 'mustard'
  },

  // Previous Crops
  'prev.wheat': {
    en: 'Wheat',
    hi: 'गेहूं',
    te: 'wheat'
  },
  'prev.rice': {
    en: 'Rice',
    hi: 'धान',
    te: 'rice'
  },
  'prev.cotton': {
    en: 'Cotton',
    hi: 'कपास',
    te: 'cotton'
  }

};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
}