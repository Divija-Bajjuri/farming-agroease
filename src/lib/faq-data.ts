// Agricultural FAQ Dataset for Chatbot
// Supports English, Telugu, Hindi

export interface FAQ {
  topic: string;
  english_question: string;
  english_answer: string;
  telugu_question: string;
  telugu_answer: string;
  hindi_question: string;
  hindi_answer: string;
}

export const faqData: FAQ[] = [

/* -------------------------------- */
/* Navigation Questions */
/* -------------------------------- */

{
topic: "Navigation",
english_question: "How to check weather in KrishiMitra?",
english_answer: "Open the Dashboard and click the Weather section. Allow location access to see temperature, rainfall and humidity.",

telugu_question: "కృషిమిత్రలో వాతావరణం ఎలా చూడాలి?",
telugu_answer: "డాష్‌బోర్డ్‌కి వెళ్లి Weather పై క్లిక్ చేయండి. Location అనుమతిస్తే ఉష్ణోగ్రత, వర్షపాతం వివరాలు కనిపిస్తాయి.",

hindi_question: "कृषिमित्र में मौसम कैसे देखें?",
hindi_answer: "डैशबोर्ड खोलें और मौसम पर क्लिक करें। लोकेशन अनुमति दें।"
},

{
topic: "Navigation",
english_question: "How to rent farm machinery?",
english_answer: "Go to Dashboard → Machinery → Select a machine → Click Book Now to contact the owner.",

telugu_question: "వ్యవసాయ యంత్రాలను ఎలా అద్దెకు తీసుకోవాలి?",
telugu_answer: "డాష్‌బోర్డ్ → Machinery → యంత్రాన్ని ఎంచుకుని Book Now పై క్లిక్ చేయండి.",

hindi_question: "कृषि मशीन किराए पर कैसे लें?",
hindi_answer: "डैशबोर्ड → मशीनरी → मशीन चुनें → Book Now क्लिक करें।"
},

{
topic: "Navigation",
english_question: "How to get fertilizer recommendation?",
english_answer: "Open Fertilizer Advice → Select crop type → Select soil type → Enter farm size → Click Get Recommendation.",

telugu_question: "ఎరువుల సిఫార్సు ఎలా పొందాలి?",
telugu_answer: "Fertilizer Advice లో పంట రకం, నేల రకం మరియు పొలం పరిమాణం నమోదు చేసి Get Recommendation క్లిక్ చేయండి.",

hindi_question: "उर्वरक सलाह कैसे प्राप्त करें?",
hindi_answer: "फसल और मिट्टी का प्रकार चुनें, खेत का आकार दर्ज करें और Get Recommendation क्लिक करें।"
},

{
topic: "Navigation",
english_question: "How to see government schemes?",
english_answer: "Open Government Schemes page to see details about farmer support schemes like PM-KISAN and crop insurance.",

telugu_question: "ప్రభుత్వ పథకాలు ఎలా చూడాలి?",
telugu_answer: "Govt Schemes పేజీని తెరిచి రైతుల కోసం ఉన్న పథకాల వివరాలు చూడండి.",

hindi_question: "सरकारी योजनाएं कैसे देखें?",
hindi_answer: "सरकारी योजनाएं सेक्शन खोलें और किसानों के लिए उपलब्ध योजनाएं देखें।"
},

/* -------------------------------- */
/* Crop Disease */
/* -------------------------------- */

{
topic: "Crop Disease",
english_question: "Why are my tomato leaves turning yellow?",
english_answer: "Yellow leaves may occur due to nitrogen deficiency, overwatering, fungal infection, or root damage. Apply nitrogen fertilizer and check drainage.",

telugu_question: "నా టమాటా మొక్కల ఆకులు ఎందుకు పసుపు రంగులోకి మారుతున్నాయి?",
telugu_answer: "ఇది నైట్రోజన్ లోపం, ఎక్కువ నీరు, లేదా ఫంగస్ వ్యాధి వల్ల కావచ్చు. సరైన ఎరువులు వేయాలి.",

hindi_question: "मेरे टमाटर के पत्ते पीले क्यों हो रहे हैं?",
hindi_answer: "यह नाइट्रोजन की कमी, अधिक पानी या फंगल रोग के कारण हो सकता है।"
},

{
topic: "Crop Disease",
english_question: "How to control stem borer in rice?",
english_answer: "Use resistant varieties, install light traps, apply Carbofuran granules and remove infected plants.",

telugu_question: "వరిలో స్టెమ్ బోరర్ ను ఎలా నియంత్రించాలి?",
telugu_answer: "ప్రతిరోధక విత్తనాలు ఉపయోగించండి, లైట్ ట్రాప్స్ పెట్టండి మరియు అవసరమైతే మందులు వాడండి.",

hindi_question: "धान में तना छेदक को कैसे नियंत्रित करें?",
hindi_answer: "प्रतिरोधी किस्में उपयोग करें, प्रकाश जाल लगाएं और कीटनाशक का उपयोग करें।"
},

/* -------------------------------- */
/* Fertilizer */
/* -------------------------------- */

{
topic: "Fertilizers",
english_question: "How much urea should be used for wheat?",
english_answer: "For wheat crop, apply around 120–150 kg urea per acre in split doses during sowing and growth stages.",

telugu_question: "గోధుమ పంటకు ఎంత యూరియా వేయాలి?",
telugu_answer: "ఎకరాకు సుమారు 120–150 కిలోల యూరియా రెండు లేదా మూడు విడతలుగా వేయాలి.",

hindi_question: "गेहूं के लिए यूरिया की मात्रा कितनी होनी चाहिए?",
hindi_answer: "प्रति एकड़ लगभग 120–150 किलो यूरिया विभाजित मात्रा में दें।"
},

/* -------------------------------- */
/* Irrigation */
/* -------------------------------- */

{
topic: "Irrigation",
english_question: "How often should cotton be irrigated?",
english_answer: "Cotton usually requires irrigation every 10–15 days depending on soil moisture and rainfall.",

telugu_question: "పత్తి పంటకు ఎంత తరచుగా నీరు పెట్టాలి?",
telugu_answer: "సాధారణంగా ప్రతి 10–15 రోజులకు ఒకసారి నీరు పెట్టాలి.",

hindi_question: "कपास में सिंचाई कितनी बार करनी चाहिए?",
hindi_answer: "लगभग हर 10–15 दिन में सिंचाई करें।"
},

/* -------------------------------- */
/* Soil Health */
/* -------------------------------- */

{
topic: "Soil Health",
english_question: "How to improve soil fertility naturally?",
english_answer: "Use compost, green manure crops, crop rotation, biofertilizers and vermicompost.",

telugu_question: "సహజంగా నేల సారాన్ని ఎలా పెంచాలి?",
telugu_answer: "కంపోస్ట్, గ్రీన్ మాన్యూర్, పంట మార్పిడి మరియు బయోఫర్టిలైజర్లు వాడాలి.",

hindi_question: "मिट्टी की उर्वरता कैसे बढ़ाएं?",
hindi_answer: "कम्पोस्ट, हरी खाद, फसल चक्र और जैव उर्वरक का उपयोग करें।"
},

/* -------------------------------- */
/* Organic Farming */
/* -------------------------------- */

{
topic: "Organic Farming",
english_question: "How to make organic pesticide at home?",
english_answer: "Mix neem leaves in water, soak for 24 hours and spray on crops to control pests.",

telugu_question: "ఇంట్లో ఆర్గానిక్ కీటకనాశిని ఎలా తయారు చేయాలి?",
telugu_answer: "నీమ్ ఆకులను నీటిలో నానబెట్టి 24 గంటల తరువాత పంటలపై స్ప్రే చేయండి.",

hindi_question: "घर पर जैविक कीटनाशक कैसे बनाएं?",
hindi_answer: "नीम के पत्तों को पानी में भिगोकर 24 घंटे बाद स्प्रे करें।"
},

/* -------------------------------- */
/* Government Schemes */
/* -------------------------------- */

{
topic: "Government Schemes",
english_question: "How to apply for PM-KISAN scheme?",
english_answer: "Visit pmkisan.gov.in, click New Farmer Registration and submit Aadhaar and land details.",

telugu_question: "PM-KISAN పథకానికి ఎలా దరఖాస్తు చేయాలి?",
telugu_answer: "pmkisan.gov.in వెబ్‌సైట్‌లో New Farmer Registration క్లిక్ చేసి ఆధార్ మరియు భూమి వివరాలు నమోదు చేయాలి.",

hindi_question: "PM-KISAN योजना के लिए आवेदन कैसे करें?",
hindi_answer: "pmkisan.gov.in वेबसाइट पर जाकर New Farmer Registration करें।"
}

];

export default faqData;