// Agricultural FAQ Dataset for Chatbot
// Includes questions and answers in English, Telugu, and Hindi

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
  {
    topic: "Crop Disease",
    english_question: "Why are my tomato leaves turning yellow?",
    english_answer: "Yellow leaves on tomato plants can be caused by several factors: 1) Nitrogen deficiency - apply urea or compost, 2) Overwatering - reduce watering frequency, 3) Fungal infection - apply copper fungicide, 4) Root rot - improve drainage.",
    telugu_question: "నా టమాటా మొక్కల ఆకులు ఎందుకు పసుపు रंगलో మారుతున్నాయి?",
    telugu_answer: "ఇది పోషక లోపం లేదా ఫంగస్ వ్యాధి కారణంగా కావచ్చు. నేలలో నైట్రోజన్ स्तरने परीक्षण करें.",
    hindi_question: "मेरे टमाटर के पत्ते पीले क्यों हो रहे हैं?",
    hindi_answer: "यह पोषक तत्वों की कमी या फंगल रोग के कारण हो सकता है। मिट्टी में नाइट्रोजन की जांच करें।"
  },
  {
    topic: "Crop Disease",
    english_question: "How to control bacterial blight in cotton?",
    english_answer: "Bacterial blight in cotton is caused by Xanthomonas. Control measures: 1) Use certified disease-free seeds, 2) Apply copper-based bactericides, 3) Remove and destroy infected plant parts, 4) Avoid working in wet fields, 5) Use resistant varieties.",
    telugu_question: "পত্তিলో bacterial blight ఎలా नियंत्रित करें?",
    telugu_answer: "Disease-free seeds ఉपयोग করें, copper bactericides apply करें, infected parts remove करें.",
    hindi_question: "कपास में बैक्टीरियल ब्लाइट कैसे रोकें?",
    hindi_answer: "प्रमाणित रोग मुक्त बीज का उपयोग करें, तांबा आधारित जीवाणुनाशक लगाएं।"
  },
  {
    topic: "Pest Control",
    english_question: "How to get rid of whitefly in cotton?",
    english_answer: "Whiteflies cause Cotton Leaf Curl Disease. Control: 1) Install yellow sticky traps, 2) Spray neem oil solution, 3) Use Imidacloprid, 4) Remove weed hosts, 5) Release Encarsia parasitoids.",
    telugu_question: "cotton whitefly नियंत्रण?",
    telugu_answer: "yellow sticky traps, neem oil spray, Imidacloprid उपयोग करें.",
    hindi_question: "कपास में सफेद मक्खी कैसे दूर करें?",
    hindi_answer: "पीले चिपचिपे जाल लगाएं, नीम तेल का घोल छिड़कें।"
  },
  {
    topic: "Fertilizers",
    english_question: "How much urea should I apply per acre for wheat?",
    english_answer: "For wheat: Apply 120-150 kg urea per acre. Split application: 1) First dose at sowing: 60 kg/acre, 2) Second dose at tillering: 40 kg/acre, 3) Third dose at jointing: 40 kg/acre.",
    telugu_question: "wheatకు urea doses?",
    telugu_answer: "120-150 kg per acre. Split doses: sowing, tillering, jointing.",
    hindi_question: "गेहूं के लिए यूरिया की मात्रा?",
    hindi_answer: "120-150 किलो प्रति एकड़। विभाजित खुराक: बुवाई, तीसरी, जोड़िंग।"
  },
  {
    topic: "Irrigation",
    english_question: "How often should I irrigate cotton crops?",
    english_answer: "Cotton needs 5-7 irrigations. Schedule: 1) First at 35-40 days, 2) Second at 55-60 days, 3) Third at 75-80 days. Continue at 10-15 day intervals. Avoid waterlogging.",
    telugu_question: "cotton irrigation schedule?",
    telugu_answer: "5-7 times. 35-40, 55-60, 75-80 days पर।",
    hindi_question: "कपास में सिंचाई अंतराल?",
    hindi_answer: "5-7 बार। 35-40, 55-60, 75-80 दिन पर।"
  },
  {
    topic: "Soil Health",
    english_question: "How to improve soil fertility naturally?",
    english_answer: "Natural methods: 1) Add organic matter - compost, 2) Grow green manure crops, 3) Practice crop rotation, 4) Add biofertilizers, 5) Use vermicompost, 6) Avoid excessive tillage.",
    telugu_question: "soil fertility naturally?",
    telugu_answer: "compost, green manure, crop rotation, biofertilizers.",
    hindi_question: "मिट्टी उर्वरता कैसे बढ़ाएं?",
    hindi_answer: "खाद, हरी खाद, फसल चक्र, जैविक उर्वरक।"
  },
  {
    topic: "Weather Impact",
    english_question: "How does unusual rainfall affect crops?",
    english_answer: "Excessive rainfall causes: 1) Waterlogging, 2) Nutrient leaching, 3) Fungal diseases spread, 4) Pollination failure. Solutions: 1) Ensure drainage, 2) Apply fungicides, 3) Use raised beds.",
    telugu_question: "rainfall effects on crops?",
    telugu_answer: "waterlogging, nutrient loss, fungal diseases. Drainage ensure करें.",
    hindi_question: "असामान्य बारिश प्रभाव?",
    hindi_answer: "जलभराव, पोषक तत्व बहना, फफूंदी। जल निकासी सुनिश्चित करें।"
  },
  {
    topic: "Seed Selection",
    english_question: "Which cotton variety is best for my region?",
    english_answer: "Best varieties: 1) North India: RCH 650, RCH 661, 2) Central India: Vikram, Suraj, 3) South India: Kanchana, G.Cot 21. Buy from certified dealers.",
    telugu_question: "best cotton variety?",
    telugu_answer: "region based। certified dealers से buy करें।",
    hindi_question: "सबसे अच्छी कपास किस्म?",
    hindi_answer: "क्षेत्र के अनुसार। प्रमाणित डीलर से खरीदें।"
  },
  {
    topic: "Government Schemes",
    english_question: "How to apply for PM-KISAN scheme?",
    english_answer: "PM-KISAN: 1) Visit pmkisan.gov.in, 2) Click New Farmer Registration, 3) Enter Aadhaar and land details, 4) Submit. Receive Rs 6000/year in 3 installments.",
    telugu_question: "PM-KISAN apply?",
    telugu_answer: "pmkisan.gov.in visit, Aadhaar, land details submit।",
    hindi_question: "PM-KISAN आवेदन?",
    hindi_answer: "pmkisan.gov.in जाएं, आधार और भूमि विवरण दें।"
  },
  {
    topic: "Organic Farming",
    english_question: "How to make organic pesticide at home?",
    english_answer: "Organic pesticide: 1) Neem solution: 100g neem leaves in 1 liter water, steep 24 hours, add 5ml soap. 2) Garlic spray: Blend garlic in water, add soap. Apply every 7 days.",
    telugu_question: "organic pesticide?",
    telugu_answer: "neem leaves solution, garlic spray। 7 days repeat.",
    hindi_question: "जैविक कीटनाशक?",
    hindi_answer: "नीम का घोल, लहसुन स्प्रे। हर 7 दिन दोहराएं।"
  },
  {
    topic: "Market Prices",
    english_question: "Where can I check current market prices?",
    english_answer: "Check prices: 1) AGRISNET portal, 2) State marketing board, 3) eNAM platform, 4) Local APMC market, 5) Kisan Call Center 1800-XXX-XXXX.",
    telugu_question: "market prices check?",
    telugu_answer: "agmarknet.gov.in, eNAM platform, APMC market।",
    hindi_question: "बाजार भाव कहां देखें?",
    hindi_answer: "एग्रीस्नेट, ई-एनएएम, स्थानीय मंडी।"
  },
  {
    topic: "Storage",
    english_question: "How to store grains properly?",
    english_answer: "Storage tips: 1) Dry to 12-14% moisture, 2) Clean bags, 3) Use airtight containers, 4) Add neem leaves, 5) Check every 15 days for pests.",
    telugu_question: "grains store?",
    telugu_answer: "dry, clean containers, neem leaves, regular check.",
    hindi_question: "अनाज भंडारण?",
    hindi_answer: "सूखा, साफ बैग, एयरटाइट, नीम के पत्ते।"
  },
  {
    topic: "Livestock",
    english_question: "How to take care of dairy cows?",
    english_answer: "Dairy cow care: 1) 25-30 kg green fodder daily, 2) 4-5 kg concentrate, 3) Clean water always, 4) Brush daily, 5) Vaccinate regularly, 6) Maintain shed hygiene.",
    telugu_question: "dairy cow care?",
    telugu_answer: "green fodder, concentrate, clean water, vaccination.",
    hindi_question: "डेयरी गाय देखभाल?",
    hindi_answer: "हरा चारा, दाना, साफ पानी, टीकाकरण।"
  },
  {
    topic: "Crop Disease",
    english_question: "What causes wilting in potato plants?",
    english_answer: "Potato wilting causes: 1) Bacterial wilt, 2) Fusarium wilt, 3) Lack of water, 4) Root damage. Check soil moisture and consult for disease identification.",
    telugu_question: "potato wilting?",
    telugu_answer: "bacterial wilt, water deficiency, root damage।",
    hindi_question: "आलू मरना?",
    hindi_answer: "बैक्टीरियल विल्ट, पानी की कमी, जड़ क्षति।"
  },
  {
    topic: "Pest Control",
    english_question: "How to control stem borer in rice?",
    english_answer: "Stem borer control: 1) Resistant varieties, 2) Remove crop residues, 3) Light traps, 4) Apply Carbofuran granules, 5) Release Trichogramma wasps.",
    telugu_question: "rice stem borer?",
    telugu_answer: "resistant varieties, light traps, Trichogramma.",
    hindi_question: "चावल तना छेदक?",
    hindi_answer: "प्रतिरोधी किस्में, प्रकाश जाल, ट्राइकोग्रामा।"
  },
  {
    topic: "Soil Health",
    english_question: "What is ideal soil pH?",
    english_answer: "Ideal pH: Most crops 6.0-7.0, Rice 5.5-7.0, Cotton 6.0-8.0. Test soil annually. Add lime for acidic, gypsum for alkaline soil.",
    telugu_question: "ideal pH?",
    telugu_answer: "6.0-7.0 most crops। lime acidic, gypsum alkaline।",
    hindi_question: "आदर्श pH?",
    hindi_answer: "6.0-7.0। चूना अम्लीय, जिप्सम क्षारीय।"
  },
  {
    topic: "Crop Yield",
    english_question: "How to increase rice yield?",
    english_answer: "Increase yield: 1) High-yielding varieties, 2) NPK 100:60:40 kg/acre, 3) 2-3 seedlings per hill, 4) Proper spacing, 5) Weed control in first 30 days, 6) Fungicide at flowering.",
    telugu_question: "rice yield increase?",
    telugu_answer: "high-yielding varieties, proper NPK, spacing, weed control.",
    hindi_question: "चावल उपज बढ़ाएं?",
    hindi_answer: "उच्च उपज किस्में, उचित NPK, निराई, फूल में फफूंदनाशक।"
  },
  {
    topic: "Irrigation",
    english_question: "What is drip irrigation benefits?",
    english_answer: "Drip irrigation: 1) 40-60% water savings, 2) Reduces weed growth, 3) Prevents leaf diseases, 4) Suitable for vegetables, 5) Government subsidies available.",
    telugu_question: "drip irrigation?",
    telugu_answer: "40-60% water save, weed control, subsidies।",
    hindi_question: "ड्रिप सिंचाई?",
    hindi_answer: "40-60% पानी बचत, खरपतवार नियंत्रण, सब्सिडी।"
  },
  {
    topic: "Organic Farming",
    english_question: "How to control weeds without chemicals?",
    english_answer: "Weed control: 1) Mulching, 2) Hand weeding early, 3) Crop rotation, 4) Close plant spacing, 5) Flame weeding, 6) Solarization.",
    telugu_question: "weed control natural?",
    telugu_answer: "mulching, hand weeding, crop rotation, spacing.",
    hindi_question: "रसायन बिना निराई?",
    hindi_answer: "मल्चिंग, हाथ निराई, फसल चक्र।"
  },
  {
    topic: "Farm Equipment",
    english_question: "Is hiring farm equipment cost-effective?",
    english_answer: "Equipment hiring: 1) Cost-effective for small farmers, 2) Avoids large investment, 3) Latest technology, 4) Custom Hiring Centers available, 5) Government subsidies.",
    telugu_question: "equipment hire?",
    telugu_answer: "small farmers cost-effective, CHC available, subsidies.",
    hindi_question: "उपकरण किराया?",
    hindi_answer: "छोटे किसानों के लिए लागत-प्रभावी, CHC, सब्सिडी।"
  }
];

export default faqData;
