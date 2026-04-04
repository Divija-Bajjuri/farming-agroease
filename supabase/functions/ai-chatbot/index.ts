import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Crop name mapping for local names
const cropMap: Record<string, string> = {
  // English
  'chilli': 'chilli',
  'chillis': 'chilli',
  'rice': 'rice',
  'maize': 'maize',
  'cotton': 'cotton',
  'tomato': 'tomato',
  'wheat': 'wheat',
  'sugarcane': 'sugarcane',
  'potato': 'potato',
  'onion': 'onion',
  'garlic': 'garlic',
  'soybean': 'soybean',
  'groundnut': 'groundnut',
  'mustard': 'mustard',
  'pigeonpea': 'pigeonpea',
  'chickpea': 'chickpea',
  'lentil': 'lentil',
  'mung': 'mung',
  'urad': 'urad',

  // Hindi
  'mirchi': 'chilli',
  'lal mirch': 'chilli',
  'hari mirch': 'chilli',
  'dhaan': 'rice',
  'vari': 'rice',
  'makki': 'maize',
  'kapas': 'cotton',
  'tamatar': 'tomato',
  'gehu': 'wheat',
  'ganna': 'sugarcane',
  'aalu': 'potato',
  'pyaz': 'onion',
  'lehsun': 'garlic',
  'soyabean': 'soybean',
  'moong': 'mung',
  'urad': 'urad',
  'masoor': 'lentil',
  'chana': 'chickpea',
  'arhar': 'pigeonpea',
  'sarson': 'mustard',
  'moongfali': 'groundnut',

  // Telugu
  'mirapa': 'chilli',
  'kodi': 'chilli',
  'vrihi': 'rice',
  'variga': 'rice',
  'mokka jonna': 'maize',
  'patti jonna': 'maize',
  'pavila': 'cotton',
  'tamaatar': 'tomato',
  'gothum': 'wheat',
  'cheruku': 'sugarcane',
  'bangala dumpa': 'potato',
  'ulli': 'onion',
  'vellulli': 'garlic',
  'soya': 'soybean',
  'pesalu': 'mung',
  'minumulu': 'urad',
  'kandulu': 'lentil',
  'senagalu': 'chickpea',
  'kandulu': 'pigeonpea',
  'avalu': 'mustard',
  'verusenaga': 'groundnut',
};

// Soil type mapping
const soilMap: Record<string, string> = {
  'red': 'red',
  'black': 'black',
  'alluvial': 'alluvial',
  'laterite': 'laterite',
  'sandy': 'sandy',
  'clay': 'clay',
  'loamy': 'loamy',

  // Hindi
  'laal': 'red',
  'kali': 'black',
  'dhoosal': 'alluvial',
  'balu': 'sandy',
  'mitti': 'clay',
  'loam': 'loamy',

  // Telugu
  'yerra': 'red',
  'nalla': 'black',
  'donga': 'alluvial',
  'isuka': 'sandy',
  'gaddelu': 'clay',
  'loamy': 'loamy',
};

function detectLanguage(message: string): string {
  // Simple language detection based on Devanagari script for Hindi, Telugu script for Telugu
  const hasDevanagari = /[\u0900-\u097F]/.test(message);
  const hasTelugu = /[\u0C00-\u0C7F]/.test(message);

  if (hasTelugu) return 'te';
  if (hasDevanagari) return 'hi';
  return 'en';
}

function normalizeCropName(crop: string): string {
  const lowerCrop = crop.toLowerCase().trim();
  return cropMap[lowerCrop] || lowerCrop;
}

function normalizeSoilType(soil: string): string {
  const lowerSoil = soil.toLowerCase().trim();
  return soilMap[lowerSoil] || lowerSoil;
}

function getFertilizerRecommendation(crop: string, soil: string, language: string): string {
  const normalizedCrop = normalizeCropName(crop);
  const normalizedSoil = normalizeSoilType(soil);

  const recommendations: Record<string, Record<string, any>> = {
    'chilli': {
      'red': {
        en: 'For chilli crops in red soil, use NPK 10-10-10 fertilizer. Apply 50-60 kg per acre. Add organic compost for better results.',
        hi: 'लाल मिट्टी में मिर्च की फसल के लिए NPK 10-10-10 उर्वरक का उपयोग करें। प्रति एकड़ 50-60 किलोग्राम लगाएं। बेहतर परिणाम के लिए जैविक खाद डालें।',
        te: 'ఎర్ర మట్టిలో మిరప కోసం NPK 10-10-10 ఎరువు వాడండి. ఒక్క ఎకరాకు 50-60 కిలోలు వాడండి. మెరుగైన ఫలితాల కోసం సేంద్రియ ఎరువు చేర్చండి.',
      },
      'black': {
        en: 'For chilli in black soil, use NPK 12-12-17 fertilizer. Apply 45-55 kg per acre. Ensure proper drainage.',
        hi: 'काली मिट्टी में मिर्च के लिए NPK 12-12-17 उर्वरक का उपयोग करें। प्रति एकड़ 45-55 किलोग्राम लगाएं। उचित जल निकासी सुनिश्चित करें।',
        te: 'నల్ల మట్టిలో మిరప కోసం NPK 12-12-17 ఎరువు వాడండి. ఒక్క ఎకరాకు 45-55 కిలోలు వాడండి. సరైన నీటి నిర్గమనం నిర్ధారించండి.',
      },
    },
    'rice': {
      'alluvial': {
        en: 'For rice in alluvial soil, use NPK 20-10-10 fertilizer. Apply 80-100 kg per acre. Maintain proper water level.',
        hi: 'दोआब मिट्टी में धान के लिए NPK 20-10-10 उर्वरक का उपयोग करें। प्रति एकड़ 80-100 किलोग्राम लगाएं। उचित जल स्तर बनाए रखें।',
        te: 'దోసల మట్టిలో వరిగా NPK 20-10-10 ఎరువు వాడండि. ఒక్క ఎకరాకు 80-100 కిలోలు వాడండి. సరైన నీటి స్థాయి నిర్వహించండి.',
      },
    },
    'maize': {
      'sandy': {
        en: 'For maize in sandy soil, use NPK 18-18-18 fertilizer. Apply 60-70 kg per acre. Add organic matter regularly.',
        hi: 'रेतीली मिट्टी में मक्का के लिए NPK 18-18-18 उर्वरक का उपयोग करें। प्रति एकड़ 60-70 किलोग्राम लगाएं। नियमित रूप से जैविक पदार्थ डालें।',
        te: 'ఇసుక మట్టిలో మొక్కజొన్న కోసం NPK 18-18-18 ఎరువు వాడండి. ఒక్క ఎకరాకు 60-70 కిలోలు వాడండి. నియమితంగా సేంద్రియ పదార్థాలు చేర్చండి.',
      },
    },
  };

  const cropRecs = recommendations[normalizedCrop];
  if (cropRecs && cropRecs[normalizedSoil]) {
    return cropRecs[normalizedSoil][language] || cropRecs[normalizedSoil]['en'];
  }

  // Default recommendation
  const defaults = {
    en: `For ${normalizedCrop} in ${normalizedSoil} soil, consult local agricultural extension services for specific fertilizer recommendations. Generally, balanced NPK fertilizers work well.`,
    hi: `${normalizedSoil} मिट्टी में ${normalizedCrop} के लिए विशिष्ट उर्वरक सिफारिशों के लिए स्थानीय कृषि विस्तार सेवाओं से परामर्श करें। आमतौर पर संतुलित NPK उर्वरक अच्छा काम करते हैं।`,
    te: `${normalizedSoil} మట్టిలో ${normalizedCrop} కోసం నిర్దిష్ట ఎరువు సిఫార్సుల కోసం స్థానిక వ్యవసాయ విస్తరణ సేవలను సంప్రదించండి. సాధారణంగా సమతుల్య NPK ఎరువులు బాగా పనిచేస్తాయి.`,
  };

  return defaults[language] || defaults['en'];
}

function getSchemeInfo(scheme: string, language: string): string {
  const schemes: Record<string, any> = {
    'pm-kisan': {
      en: 'PM-KISAN provides ₹6000 per year to eligible farmers in 3 installments. Benefits: Direct bank transfer, no middlemen. Eligibility: Small and marginal farmers with landholding up to 2 hectares.',
      hi: 'पीएम-किसान पात्र किसानों को सालाना ₹6000 तीन किस्तों में देता है। लाभ: सीधा बैंक ट्रांसफर, कोई दलाल नहीं। पात्रता: 2 हेक्टेयर तक भूमि रखने वाले छोटे और सीमांत किसान।',
      te: 'PM-కిసాన్ అర్హులైన రైతులకు సంవత్సరానికి ₹6000 మూడు విడతలలో ఇస్తుంది. ప్రయోజనాలు: నేరుగా బ్యాంకు బదిలీ, మధ్యవర్తులు లేరు. అర్హత: 2 హెక్టార్ల వరకు భూమి కలిగిన చిన్న మరియు అంచు రైతులు.',
    },
    'fasal bima': {
      en: 'Pradhan Mantri Fasal Bima Yojana provides crop insurance against natural calamities. Premium: 1.5-5% of sum insured. Covers: Drought, flood, hailstorm, etc.',
      hi: 'प्रधान मंत्री फसल बीमा योजना प्राकृतिक आपदाओं के खिलाफ फसल बीमा देती है। प्रीमियम: बीमित राशि का 1.5-5%। कवर: सूखा, बाढ़, ओलावृष्टि आदि।',
      te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన సహజ విపత్తులకు వ్యతిరేకంగా పంట బీమా అందిస్తుంది. ప్రీమియం: బీమా మొత్తం యొక్క 1.5-5%. కవర్: దుష్కాలం, వరిగా, వడగళ్ళు మొదలైనవి.',
    },
  };

  const normalizedScheme = scheme.toLowerCase().replace(/[^a-z]/g, '');
  const schemeInfo = schemes[normalizedScheme];

  if (schemeInfo) {
    return schemeInfo[language] || schemeInfo['en'];
  }

  return {
    en: 'Please specify the government scheme you are interested in. Common schemes include PM-KISAN, Fasal Bima Yojana, and others.',
    hi: 'कृपया वह सरकारी योजना बताएं जिसमें आप रुचि रखते हैं। सामान्य योजनाएं में पीएम-किसान, फसल बीमा योजना आदि शामिल हैं।',
    te: 'దయచేసి మీకు ఆసక్తి ఉన్న ప్రభుత్వ పథకం పేర్కొనండి. సాధారణ పథకాలలో PM-కిసాన్, ఫసల్ బీమా యోజన మొదలైనవి ఉన్నాయి.',
  }[language];
}

function getMachineRecommendation(machineType: string, language: string): string {
  const machines: Record<string, any> = {
    'tractor': {
      en: 'For plowing, we recommend Mahindra 575 DI tractor (45 HP). Features: Fuel efficient, easy maintenance. Rental: ₹800-1200 per hour.',
      hi: 'जुताई के लिए हम महिंद्रा 575 DI ट्रैक्टर (45 HP) की सिफारिश करते हैं। विशेषताएं: ईंधन कुशल, आसान रखरखाव। किराया: प्रति घंटा ₹800-1200।',
      te: 'పొలం పడక కోసం మేము మహింద్రా 575 DI ట్రాక్టర్ (45 HP) సిఫార్సు చేస్తాము. లక్షణాలు: ఇంధన సామర్థ్యం, సులభ నిర్వహణ. అద్దె: గంటకు ₹800-1200.',
    },
    'harvester': {
      en: 'For harvesting, we recommend John Deere W50 harvester. Features: High capacity, GPS guidance. Rental: ₹1500-2000 per hour.',
      hi: 'कटाई के लिए हम जॉन डियर W50 हार्वेस्टर की सिफारिश करते हैं। विशेषताएं: उच्च क्षमता, GPS मार्गदर्शन। किराया: प्रति घंटा ₹1500-2000।',
      te: 'కోత కోసం మేము జాన్ డియర్ W50 హార్వెస్టర్ సిఫార్సు చేస్తాము. లక్షణాలు: అధిక సామర్థ్యం, GPS మార్గదర్శనం. అద్దె: గంటకు ₹1500-2000.',
    },
    'sprayer': {
      en: 'For spraying, we recommend battery-powered sprayer. Features: Eco-friendly, long battery life. Rental: ₹300-500 per hour.',
      hi: 'स्प्रेयर के लिए हम बैटरी पावर स्प्रेयर की सिफारिश करते हैं। विशेषताएं: पर्यावरण अनुकूल, लंबी बैटरी लाइफ। किराया: प्रति घंटा ₹300-500।',
      te: 'స్ప్రే చేయడానికి మేము బ్యాటరీ పవర్ స్ప్రేయర్ సిఫార్సు చేస్తాము. లక్షణాలు: పర్యావరణ అనుకూల, పొడవైన బ్యాటరీ జీవితం. అద్దె: గంటకు ₹300-500.',
    },
  };

  const normalizedType = machineType.toLowerCase();
  const machine = machines[normalizedType];

  if (machine) {
    return machine[language] || machine['en'];
  }

  return {
    en: 'Please specify the type of farming machine you need (tractor, harvester, sprayer, etc.).',
    hi: 'कृपया वह कृषि मशीन का प्रकार बताएं जिसकी आपको आवश्यकता है (ट्रैक्टर, हार्वेस्टर, स्प्रेयर आदि)।',
    te: 'దయచేసి మీకు అవసరమైన వ్యవసాయ యంత్రం రకం పేర్కొనండి (ట్రాక్టర్, హార్వెస్టర్, స్ప్రేయర్ మొదలైనవి).',
  }[language];
}

function processQuery(message: string, language: string): { response: string; navigation?: string; machineType?: string } {
  const lowerMessage = message.toLowerCase();
  const navigationKeywords = ['open it','take me there','open page','navigate','show machines'];

if (navigationKeywords.some(k => lowerMessage.includes(k))) {
  return {
    response: {
      en: "Opening the Rent Machines page for you.",
      hi: "आपके लिए Rent Machines पेज खोल रहा हूं।",
      te: "మీ కోసం Rent Machines పేజీని తెరిస్తున్నాను."
    }[language],
    navigation: 'RENT_MACHINES'
  };
}

  const machineTypes: Record<string, string[]> = {
    harvester: ['harvester', 'హార్వెస్టర్', 'హార్వెస్టర్లు', 'కోత'],
    tractor: ['tractor', 'ట్రాక్టర్'],
    sprayer: ['sprayer', 'స్ప్రేయర్', 'spray'],
    rotavator: ['rotavator', 'రొటావేటర్'],
    'seed drill': ['seed drill', 'సీడ్ డ్రిల్', 'drill'],
    cultivator: ['cultivator', 'cultivator'],
    plough: ['plough', 'plow', 'ప్లౌ'],
  };

  const detectMachineType = () => {
    for (const type in machineTypes) {
      if (machineTypes[type].some(keyword => lowerMessage.includes(keyword))) {
        return type.charAt(0).toUpperCase() + type.slice(1);
      }
    }
    return undefined;
  };

  // Weather queries
  if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('forecast') ||
      lowerMessage.includes('baarish') || lowerMessage.includes('varsham') || lowerMessage.includes(' Mausam')) {
    return {
      response: {
        en: 'I can help you check the weather forecast. Let me guide you to the Weather section.',
        hi: 'मैं आपको मौसम पूर्वानुमान जांचने में मदद कर सकता हूं। चलिए मैं आपको Weather सेक्शन में ले चलता हूं।',
        te: 'నేను మీకు వాతావరణ సూచనను తనిఖీ చేయడంలో సహాయపడగలను. నన్ను వాతావరణ విభాగానికి తీసుకెళ్ళండి.',
      }[language],
      navigation: 'WEATHER'
    };
  }

  // Fertilizer queries
  if (lowerMessage.includes('fertilizer') || lowerMessage.includes('fertiliser') || lowerMessage.includes('manure') ||
      lowerMessage.includes('urvarak') || lowerMessage.includes('eruvu') || lowerMessage.includes('khada')) {
    return {
      response: {
        en: 'For fertilizer recommendations, let me take you to the Fertilizer Guide section.',
        hi: 'उर्वरक सिफारिशों के लिए, चलिए मैं आपको Fertilizer Guide सेक्शन में ले चलता हूं।',
        te: 'ఎరువు సిఫార్సుల కోసం, నన్ను ఎరువు గైడ్ విభాగానికి తీసుకెళ్ళండి.',
      }[language],
      navigation: 'FERTILIZER_GUIDE'
    };
  }

  // Government schemes queries
  if (lowerMessage.includes('scheme') || lowerMessage.includes('yojana') || lowerMessage.includes('subsidy') ||
      lowerMessage.includes('subsid') || lowerMessage.includes('government') || lowerMessage.includes('pm-kisan') ||
      lowerMessage.includes('fasal bima') || lowerMessage.includes('सरकारी') || lowerMessage.includes('ప్రభుత్వ')) {
    return {
      response: {
        en: 'For government schemes and subsidies, let me guide you to the Government Schemes section.',
        hi: 'सरकारी योजनाओं और सब्सिडी के लिए, चलिए मैं आपको Government Schemes सेक्शन में ले चलता हूं।',
        te: 'ప్రభుత్వ పథకాలు మరియు సబ్సిడీల కోసం, నన్ను ప్రభుత్వ పథకాల విభాగానికి మార్గనిర్దేశం చేయండి.',
      }[language],
      navigation: 'GOVT_SCHEMES'
    };
  }

  // Machine rental queries with step-by-step instructions
  const rentKeywords = ['rent', 'hire', 'kiraya', 'kiraye', 'adugu', 'అద్దె'];
  const machineKeywords = ['tractor', 'harvester', 'sprayer', 'machine', 'machinery', 'యంత్రం', 'ట్రాక్టర్', 'హార్వెస్టర్', 'స్ప్రేయర్'];
  const isMachineRental = rentKeywords.some(k => lowerMessage.includes(k)) && machineKeywords.some(k => lowerMessage.includes(k));

  if (isMachineRental) {
    const selectedType = detectMachineType();
    const typeLabel = selectedType || (language === 'hi' ? 'मशीन' : language === 'te' ? 'యంత్రం' : 'machine');
    const selectLine = selectedType ? selectedType : (language === 'hi' ? 'उपयुक्त मशीन प्रकार' : language === 'te' ? 'సరైన యంత్రం రకం' : 'the right machine type');
    const stepResponse = {
      en: `To rent a ${typeLabel}, follow these steps:\n1. Open KrishiMitra\n2. Click Rent Machines\n3. Select ${selectLine}\n4. Choose your location\n5. Book the available machine`,
      hi: `एक ${typeLabel} किराए पर लेने के लिए इन चरणों का पालन करें:\n1. KrishiMitra खोलें\n2. Rent Machines पर क्लिक करें\n3. ${selectLine} चुनें\n4. स्थान चुनें\n5. उपलब्ध मशीन बुक करें`,
      te: `${typeLabel} అద్దెకు తీసుకోవడానికి ఈ దశలను అనుసరించండి:\n1. కృషిమిత్రను తెరవండి\n2. రెంట్ మెషీన్స్‌పై క్లిక్ చేయండి\n3. ${selectLine} ఎంచుకోండి\n4. మీ స్థలాన్ని ఎంచుకోండి\n5. అందుబాటులో ఉన్న యంత్రాన్ని బుక్ చేసుకోండి`,
    };
return {
 response: stepResponse[language] + 
 "\n\nIf you'd like, I can open the Rent Machines page for you. Just say 'Open it'.",
 machineType: selectedType || ''
};   

  // Specific crop fertilizer queries
  const cropMatch = message.match(/(?:fertilizer|urvarak|eruvu|khada).*?(?:for|ke|ki|కోసం)\s*([a-zA-Z\u0900-\u097F\u0C00-\u0C7F]+)/i);
  if (cropMatch) {
    const crop = cropMatch[1];
    const soilMatch = message.match(/(?:soil|mitti|matta|మట్టి).*?([a-zA-Z\u0900-\u097F\u0C00-\u0C7F]+)/i);
    const soil = soilMatch ? soilMatch[1] : 'general';
    const recommendation = getFertilizerRecommendation(crop, soil, language);
    return { response: recommendation };
  }

  // Specific scheme queries
  const schemeMatch = message.match(/(?:about|ke|ki|గురించి)\s*(pm-kisan|fasal bima|pm kisan|pradhan mantri|ప్రధాన మంత్రి)/i);
  if (schemeMatch) {
    const scheme = schemeMatch[1];
    const info = getSchemeInfo(scheme, language);
    return { response: info };
  }

  // Specific machine queries
  const machineMatch = message.match(/(?:rent|kiraya|adugu).*?(tractor|harvester|sprayer|ట్రాక్టర్|హార్వెస్టర్|స్ప్రేయర్)/i);
  if (machineMatch) {
    const machine = machineMatch[1];
    const recommendation = getMachineRecommendation(machine, language);
    return { response: recommendation };
  }

  // Fallback responses
  const fallbacks = {
    en: 'I can help you with weather forecasts, fertilizer recommendations, government schemes, and machine rentals. What would you like to know about?',
    hi: 'मैं आपको मौसम पूर्वानुमान, उर्वरक सिफारिशें, सरकारी योजनाएं और मशीन किराए से संबंधित मदद कर सकता हूं। आप क्या जानना चाहेंगे?',
    te: 'నేను మీకు వాతావరణ సూచనలు, ఎరువు సిఫార్సులు, ప్రభుత్వ పథకాలు మరియు యంత్రాల అద్దెలకు సంబంధించిన సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
  };

  return { response: fallbacks[language] || fallbacks['en'] };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language, userId } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ response: 'Please provide a message.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const detectedLanguage = language || detectLanguage(message);
    const result = processQuery(message, detectedLanguage);

    return new Response(
      JSON.stringify({
        response: result.response,
        navigation: result.navigation,
        language: detectedLanguage
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing chatbot request:', error);
    return new Response(
      JSON.stringify({
        response: 'Sorry, I encountered an error. Please try again.',
        error: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});</content>
<parameter name="filePath">c:\Users\LIKHITHA\farming-agroease\supabase\functions\ai-chatbot\index.ts