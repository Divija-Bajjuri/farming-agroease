export type Language = 'en' | 'hi' | 'te';

export const translations: Record<string, Record<Language, string>> = {
  // App
  'app.title': { en: 'KrishiMitra', hi: 'कृषिमित्र', te: 'కృషిమిత్ర' },
  'app.subtitle': { en: 'Smart Agriculture', hi: 'स्मार्ट कृषि', te: 'స్మార్ట్ వ్యవసాయం' },
  'app.tagline': { en: 'AI-Powered Smart Agriculture for Every Farmer', hi: 'हर किसान के लिए AI-संचालित स्मार्ट कृषि', te: 'ప్రతి రైతు కోసం AI-ఆధారిత స్మార్ట్ వ్యవసాయం' },
  
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम', te: 'హోమ్' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్' },
  // 'nav.disease': { en: 'Disease Detection', hi: 'रोग पहचान', te: 'రోగ గుర్తింపు' },
  'nav.chatbot': { en: 'AI Chatbot', hi: 'AI चैटबॉट', te: 'AI చాట్‌బాట్' },
  'nav.weather': { en: 'Weather', hi: 'मौसम', te: 'వాతావరణం' },
  'nav.fertilizer': { en: 'Fertilizer', hi: 'उर्वरक', te: 'ఎరువులు' },
  'nav.machinery': { en: 'Machinery', hi: 'मशीनरी', te: 'యంత్రాలు' },
  'nav.schemes': { en: 'Govt Schemes', hi: 'सरकारी योजनाएं', te: 'ప్రభుత్వ పథకాలు' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल', te: 'ప్రొఫైల్' },
  'nav.logout': { en: 'Logout', hi: 'लॉगआउट', te: 'లాగ్ అవుట్' },
  'nav.login': { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్' },
  'nav.register': { en: 'Register', hi: 'रजिस्टर', te: 'నమోదు' },

  // Auth
  'auth.login': { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్' },
  'auth.register': { en: 'Register', hi: 'रजिस्टर करें', te: 'నమోదు చేయండి' },
  'auth.name': { en: 'Full Name', hi: 'पूरा नाम', te: 'పూర్తి పేరు' },
  'auth.mobile': { en: 'Mobile Number', hi: 'मोबाइल नंबर', te: 'మొబైల్ నంబర్' },
  'auth.password': { en: 'Password', hi: 'पासवर्ड', te: 'పాస్‌వర్డ్' },
  'auth.village': { en: 'Village', hi: 'गांव', te: 'గ్రామం' },
  'auth.district': { en: 'District', hi: 'जिला', te: 'జిల్లా' },
  'auth.state': { en: 'State', hi: 'राज्य', te: 'రాష్ట్రం' },
  'auth.farmSize': { en: 'Farm Size (acres)', hi: 'खेत का आकार (एकड़)', te: 'పొలం పరిమాణం (ఎకరాలు)' },
  'auth.cropTypes': { en: 'Crop Types', hi: 'फसल प्रकार', te: 'పంట రకాలు' },
  'auth.loginSuccess': { en: 'Login successful!', hi: 'लॉगिन सफल!', te: 'లాగిన్ విజయవంతం!' },
  'auth.registerSuccess': { en: 'Registration successful!', hi: 'रजिस्ट्रेशन सफल!', te: 'నమోదు విజయవంతం!' },
  'auth.noAccount': { en: "Don't have an account?", hi: 'खाता नहीं है?', te: 'ఖాతా లేదా?' },
  'auth.hasAccount': { en: 'Already have an account?', hi: 'पहले से खाता है?', te: 'ఇప్పటికే ఖాతా ఉందా?' },
  'auth.welcome': { en: 'Welcome, Farmer!', hi: 'स्वागत है, किसान!', te: 'స్వాగతం, రైతు!' },

  // Dashboard
  'dash.welcome': { en: 'Welcome back', hi: 'वापसी पर स्वागत', te: 'తిరిగి స్వాగతం' },
  'dash.quickActions': { en: 'Quick Actions', hi: 'त्वरित कार्य', te: 'త్వరిత చర్యలు' },
  'dash.recentScans': { en: 'Recent Disease Scans', hi: 'हाल की रोग जांच', te: 'ఇటీవలి రోగ స్కాన్‌లు' },
  'dash.alerts': { en: 'Alerts & Notifications', hi: 'अलर्ट और सूचनाएं', te: 'హెచ్చరికలు & నోటిఫికేషన్‌లు' },
  'dash.noScans': { en: 'No recent scans', hi: 'कोई हाल की जांच नहीं', te: 'ఇటీవలి స్కాన్‌లు లేవు' },

  // Disease Detection
  'disease.title': { en: 'Crop Disease Detection', hi: 'फसल रोग पहचान', te: 'పంట రోగ గుర్తింపు' },
  'disease.upload': { en: 'Upload Leaf Image', hi: 'पत्ती की फोटो अपलोड करें', te: 'ఆకు ఫోటో అప్‌లోడ్ చేయండి' },
  'disease.camera': { en: 'Take Photo', hi: 'फोटो लें', te: 'ఫోటో తీయండి' },
  'disease.gallery': { en: 'Choose from Gallery', hi: 'गैलरी से चुनें', te: 'గ్యాలరీ నుండి ఎంచుకోండి' },
  'disease.analyze': { en: 'Analyze Image', hi: 'फोटो का विश्लेषण करें', te: 'చిత్రాన్ని విశ్లేషించండి' },
  'disease.result': { en: 'Detection Result', hi: 'पहचान परिणाम', te: 'గుర్తింపు ఫలితం' },
  'disease.name': { en: 'Disease Name', hi: 'रोग का नाम', te: 'రోగం పేరు' },
  'disease.confidence': { en: 'Confidence', hi: 'विश्वास स्तर', te: 'విశ్వాస స్థాయి' },
  'disease.treatment': { en: 'Treatment', hi: 'उपचार', te: 'చికిత్స' },
  'disease.prevention': { en: 'Prevention', hi: 'रोकथाम', te: 'నివారణ' },
  'disease.cropType': { en: 'Crop Type', hi: 'फसल प्रकार', te: 'పంట రకం' },
  'disease.selectCrop': { en: 'Select Crop', hi: 'फसल चुनें', te: 'పంట ఎంచుకోండి' },
  'disease.analyzing': { en: 'Analyzing...', hi: 'विश्लेषण हो रहा है...', te: 'విశ్లేషిస్తోంది...' },
  'disease.healthy': { en: 'Healthy Crop', hi: 'स्वस्थ फसल', te: 'ఆరోగ్యకరమైన పంట' },
  'disease.history': { en: 'Scan History', hi: 'जांच इतिहास', te: 'స్కాన్ చరిత్ర' },

  // Chatbot
  'chat.title': { en: 'KrishiMitra AI Chatbot', hi: 'कृषिमित्र AI चैटबॉट', te: 'కృషిమిత్ర AI చాట్‌బాట్' },
  'chat.placeholder': { en: 'Ask about farming...', hi: 'खेती के बारे में पूछें...', te: 'వ్యవసాయం గురించి అడగండి...' },
  'chat.send': { en: 'Send', hi: 'भेजें', te: 'పంపండి' },
  'chat.voice': { en: 'Voice Input', hi: 'आवाज़ इनपुट', te: 'వాయిస్ ఇన్‌పుట్' },
  'chat.listening': { en: 'Listening...', hi: 'सुन रहा हूं...', te: 'వింటోంది...' },
  'chat.thinking': { en: 'Thinking...', hi: 'सोच रहा हूं...', te: 'ఆలోచిస్తోంది...' },
  'chat.quickQ': { en: 'Quick Questions', hi: 'त्वरित प्रश्न', te: 'త్వరిత ప్రశ్నలు' },
  'chat.q1': { en: 'Will it rain tomorrow?', hi: 'कल बारिश होगी?', te: 'రేపు వర్షం పడుతుందా?' },
  'chat.q2': { en: 'Best fertilizer for chilli crop?', hi: 'मिर्च फसल के लिए सबसे अच्छा उर्वरक?', te: 'మిరప కోసం ఉత్తమ ఎరువు?' },
  'chat.q3': { en: 'What is PM-KISAN scheme?', hi: 'PM-KISAN योजना क्या है?', te: 'PM-కిసాన్ పథకం ఏమిటి?' },
  'chat.q4': { en: 'How can I rent a tractor?', hi: 'ट्रैक्टर कैसे किराए पर लें?', te: 'ట్రాక్టర్ ఎలా అద్దెకు తీసుకోవాలి?' },

  // Weather
  'weather.title': { en: 'Weather Monitoring', hi: 'मौसम निगरानी', te: 'వాతావరణ పర్యవేక్షణ' },
  'weather.temp': { en: 'Temperature', hi: 'तापमान', te: 'ఉష్ణోగ్రత' },
  'weather.humidity': { en: 'Humidity', hi: 'नमी', te: 'తేమ' },
  'weather.wind': { en: 'Wind Speed', hi: 'हवा की गति', te: 'గాలి వేగం' },
  'weather.rain': { en: 'Rainfall', hi: 'वर्षा', te: 'వర్షపాతం' },
  'weather.forecast': { en: '7-Day Forecast', hi: '7-दिन का पूर्वानुमान', te: '7-రోజుల అంచనా' },
  'weather.advice': { en: 'Farming Advice', hi: 'खेती सलाह', te: 'వ్యవసాయ సలహా' },
  'weather.location': { en: 'Your Location', hi: 'आपका स्थान', te: 'మీ స్థానం' },

  // Fertilizer
  'fert.title': { en: 'Fertilizer Recommendation', hi: 'उर्वरक सिफारिश', te: 'ఎరువుల సిఫారసు' },
  'fert.soilType': { en: 'Soil Type', hi: 'मिट्टी का प्रकार', te: 'నేల రకం' },
  'fert.cropType': { en: 'Crop Type', hi: 'फसल प्रकार', te: 'పంట రకం' },
  'fert.nitrogen': { en: 'Nitrogen (N)', hi: 'नाइट्रोजन (N)', te: 'నత్రజని (N)' },
  'fert.phosphorus': { en: 'Phosphorus (P)', hi: 'फॉस्फोरस (P)', te: 'భాస్వరం (P)' },
  'fert.potassium': { en: 'Potassium (K)', hi: 'पोटैशियम (K)', te: 'పొటాషియం (K)' },
  'fert.recommend': { en: 'Get Recommendation', hi: 'सिफारिश प्राप्त करें', te: 'సిఫారసు పొందండి' },
  'fert.organic': { en: 'Organic Alternatives', hi: 'जैविक विकल्प', te: 'సేంద్రియ ప్రత్యామ్నాయాలు' },
  'fert.schedule': { en: 'Application Schedule', hi: 'उपयोग अनुसूची', te: 'వాడకం షెడ్యూల్' },

  // Machinery
  'mach.title': { en: 'Farm Machinery Rental', hi: 'कृषि मशीनरी किराया', te: 'వ్యవసాయ యంత్రాల అద్దె' },
  'mach.search': { en: 'Search Machinery', hi: 'मशीनरी खोजें', te: 'యంత్రాలు వెతకండి' },
  'mach.addListing': { en: 'Add Your Machine', hi: 'अपनी मशीन जोड़ें', te: 'మీ యంత్రం జోడించండి' },
  'mach.book': { en: 'Book Now', hi: 'अभी बुक करें', te: 'ఇప్పుడు బుక్ చేయండి' },
  'mach.perHour': { en: '/hour', hi: '/घंटा', te: '/గంట' },
  'mach.perDay': { en: '/day', hi: '/दिन', te: '/రోజు' },
  'mach.available': { en: 'Available', hi: 'उपलब्ध', te: 'అందుబాటులో' },
  'mach.booked': { en: 'Booked', hi: 'बुक किया गया', te: 'బుక్ చేయబడింది' },
  'mach.pending': { en: 'Pending', hi: 'लंबित', te: 'పెండింగ్' },
  'mach.approved': { en: 'Approved', hi: 'स्वीकृत', te: 'ఆమోదించబడింది' },
  'mach.myBookings': { en: 'My Bookings', hi: 'मेरी बुकिंग', te: 'నా బుకింగ్‌లు' },
  'mach.bookingSuccessTitle': { en: 'Booking Successful!', hi: 'बुकिंग सफल!', te: 'బుకింగ్ విజయవంతం!' },
  'mach.hours': { en: 'hours', hi: 'घंटे', te: 'గంటలు' },
  'mach.days': { en: 'days', hi: 'दिन', te: 'రోజులు' },
  'mach.machineName': { en: 'Machine Name', hi: 'मशीन का नाम', te: 'యంత్రం పేరు' },
  'mach.machineType': { en: 'Machine Type', hi: 'मशीन प्रकार', te: 'యంత్రం రకం' },
  'mach.price': { en: 'Price', hi: 'कीमत', te: 'ధర' },
  'mach.contact': { en: 'Contact', hi: 'संपर्क', te: 'సంప్రదించండి' },

  // Schemes
  'scheme.title': { en: 'Government Schemes', hi: 'सरकारी योजनाएं', te: 'ప్రభుత్వ పథకాలు' },
  'scheme.eligibility': { en: 'Eligibility', hi: 'पात्रता', te: 'అర్హత' },
  'scheme.benefits': { en: 'Benefits', hi: 'लाभ', te: 'ప్రయోజనాలు' },
  'scheme.howToApply': { en: 'How to Apply', hi: 'आवेदन कैसे करें', te: 'దరఖాస్తు ఎలా చేయాలి' },
  'scheme.description': { en: 'Description', hi: 'विवरण', te: 'వివరణ' },
  'scheme.learnMore': { en: 'Learn More', hi: 'और जानें', te: 'మరింత తెలుసుకోండి' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...', te: 'లోడ్ అవుతోంది...' },
  'common.error': { en: 'Something went wrong', hi: 'कुछ गलत हो गया', te: 'ఏదో తప్పు జరిగింది' },
  'common.success': { en: 'Success!', hi: 'सफल!', te: 'విజయవంతం!' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें', te: 'రద్దు చేయండి' },
  'common.save': { en: 'Save', hi: 'सहेजें', te: 'సేవ్ చేయండి' },
  'common.submit': { en: 'Submit', hi: 'जमा करें', te: 'సమర్పించండి' },
  'common.back': { en: 'Back', hi: 'वापस', te: 'వెనుకకు' },
  'common.close': { en: 'Close', hi: 'बंद करें', te: 'మూసివేయండి' },
  'common.search': { en: 'Search', hi: 'खोजें', te: 'వెతకండి' },
  'common.noData': { en: 'No data available', hi: 'कोई डेटा उपलब्ध नहीं', te: 'డేటా అందుబాటులో లేదు' },

  // Hero
  'hero.title': { en: 'Smart Farming Starts Here', hi: 'स्मार्ट खेती यहां शुरू होती है', te: 'స్మార్ట్ వ్యవసాయం ఇక్కడ మొదలవుతుంది' },
  'hero.subtitle': { en: 'AI-powered tools to help Indian farmers grow better crops, detect diseases early, and access government benefits', hi: 'भारतीय किसानों को बेहतर फसल उगाने, रोगों का जल्दी पता लगाने और सरकारी लाभ प्राप्त करने में मदद करने वाले AI उपकरण', te: 'భారతీయ రైతులకు మెరుగైన పంటలు పండించడానికి, రోగాలను ముందుగానే గుర్తించడానికి మరియు ప్రభుత్వ ప్రయోజనాలను పొందడానికి AI సాధనాలు' },
  'hero.cta': { en: 'Get Started Free', hi: 'मुफ्त शुरू करें', te: 'ఉచితంగా ప్రారంభించండి' },
  'hero.features': { en: 'Explore Features', hi: 'सुविधाएं देखें', te: 'ఫీచర్లు చూడండి' },

  // Footer
  'footer.about': { en: 'About KrishiMitra', hi: 'कृषिमित्र के बारे में', te: 'కృషిమిత్ర గురించి' },
  'footer.aboutText': { en: 'Empowering Indian farmers with AI technology for smarter, more productive agriculture.', hi: 'स्मार्ट और अधिक उत्पादक कृषि के लिए AI तकनीक से भारतीय किसानों को सशक्त बनाना।', te: 'స్మార్ట్ మరియు మరింత ఉత్పాదక వ్యవసాయం కోసం AI సాంకేతికతో భారతీయ రైతులను శక్తివంతం చేయడం.' },
  'footer.contact': { en: 'Contact Us', hi: 'संपर्क करें', te: 'మమ్మల్ని సంప్రదించండి' },
  'footer.rights': { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।', te: 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.' },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
}
