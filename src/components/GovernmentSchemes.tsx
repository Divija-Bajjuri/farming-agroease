import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';

interface Scheme {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  eligibility: Record<string, string>;
  benefits: Record<string, string>;
  howToApply: Record<string, string>;
  icon: string;
  color: string;
  link: string;
}

const schemes: Scheme[] = [
  {
    id: '1', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', color: 'from-green-500 to-emerald-600',
    name: { en: 'PM-KISAN', hi: 'पीएम-किसान', te: 'పీఎం-కిసాన్' },
    description: {
      en: 'Pradhan Mantri Kisan Samman Nidhi provides income support of ₹6,000 per year to all farmer families across India.',
      hi: 'प्रधानमंत्री किसान सम्मान निधि भारत के सभी किसान परिवारों को ₹6,000 प्रति वर्ष की आय सहायता प्रदान करती है।',
      te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి భారతదేశంలోని అన్ని రైతు కుటుంబాలకు సంవత్సరానికి ₹6,000 ఆదాయ మద్దతు అందిస్తుంది.',
    },
    eligibility: {
      en: 'All farmer families with cultivable land. Small and marginal farmers are prioritized.',
      hi: 'खेती योग्य भूमि वाले सभी किसान परिवार। छोटे और सीमांत किसानों को प्राथमिकता।',
      te: 'సాగు భూమి ఉన్న అన్ని రైతు కుటుంబాలు. చిన్న మరియు సన్నకారు రైతులకు ప్రాధాన్యత.',
    },
    benefits: {
      en: '₹6,000 per year in 3 installments of ₹2,000 each, directly to bank account.',
      hi: '₹2,000 की 3 किस्तों में ₹6,000 प्रति वर्ष, सीधे बैंक खाते में।',
      te: 'సంవత్సరానికి ₹6,000, ₹2,000 చొప్పున 3 వాయిదాలలో, నేరుగా బ్యాంకు ఖాతాకు.',
    },
    howToApply: {
      en: '1. Visit pmkisan.gov.in\n2. Click "New Farmer Registration"\n3. Enter Aadhaar number\n4. Fill in land and bank details\n5. Submit and track status',
      hi: '1. pmkisan.gov.in पर जाएं\n2. "नया किसान पंजीकरण" पर क्लिक करें\n3. आधार नंबर दर्ज करें\n4. भूमि और बैंक विवरण भरें\n5. जमा करें और स्थिति ट्रैक करें',
      te: '1. pmkisan.gov.in కి వెళ్ళండి\n2. "కొత్త రైతు నమోదు" క్లిక్ చేయండి\n3. ఆధార్ నంబర్ నమోదు చేయండి\n4. భూమి మరియు బ్యాంకు వివరాలు నింపండి\n5. సమర్పించి స్థితిని ట్రాక్ చేయండి',
    },
    link: 'https://pmkisan.gov.in',
  },
  {
    id: '2', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'from-blue-500 to-indigo-600',
    name: { en: 'PM Fasal Bima Yojana', hi: 'पीएम फसल बीमा योजना', te: 'పీఎం పంట బీమా యోజన' },
    description: {
      en: 'Crop insurance scheme providing financial support to farmers in case of crop failure due to natural calamities, pests, or diseases.',
      hi: 'प्राकृतिक आपदाओं, कीटों या रोगों के कारण फसल नुकसान होने पर किसानों को वित्तीय सहायता प्रदान करने वाली फसल बीमा योजना।',
      te: 'ప్రకృతి వైపరీత్యాలు, చీడపీడలు లేదా వ్యాధుల వల్ల పంట నష్టం జరిగినప్పుడు రైతులకు ఆర్థిక సహాయం అందించే పంట బీమా పథకం.',
    },
    eligibility: {
      en: 'All farmers including sharecroppers and tenant farmers growing notified crops.',
      hi: 'अधिसूचित फसलें उगाने वाले सभी किसान, बटाईदार और किरायेदार किसान सहित।',
      te: 'నోటిఫై చేయబడిన పంటలు పండించే అన్ని రైతులు, వాటాదారులు మరియు కౌలు రైతులు సహా.',
    },
    benefits: {
      en: 'Premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops. Government pays remaining premium.',
      hi: 'प्रीमियम: खरीफ 2%, रबी 1.5%, वाणिज्यिक फसलें 5%। शेष प्रीमियम सरकार देती है।',
      te: 'ప్రీమియం: ఖరీఫ్ 2%, రబీ 1.5%, వాణిజ్య పంటలు 5%. మిగిలిన ప్రీమియం ప్రభుత్వం చెల్లిస్తుంది.',
    },
    howToApply: {
      en: '1. Visit nearest bank or CSC center\n2. Fill crop insurance form\n3. Provide land records and Aadhaar\n4. Pay premium amount\n5. Get insurance policy',
      hi: '1. नजदीकी बैंक या CSC केंद्र जाएं\n2. फसल बीमा फॉर्म भरें\n3. भूमि रिकॉर्ड और आधार दें\n4. प्रीमियम राशि जमा करें\n5. बीमा पॉलिसी प्राप्त करें',
      te: '1. సమీప బ్యాంకు లేదా CSC కేంద్రానికి వెళ్ళండి\n2. పంట బీమా ఫారం నింపండి\n3. భూమి రికార్డులు మరియు ఆధార్ ఇవ్వండి\n4. ప్రీమియం మొత్తం చెల్లించండి\n5. బీమా పాలసీ పొందండి',
    },
    link: 'https://pmfby.gov.in',
  },
  {
    id: '3', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', color: 'from-amber-500 to-orange-600',
    name: { en: 'Kisan Credit Card', hi: 'किसान क्रेडिट कार्ड', te: 'కిసాన్ క్రెడిట్ కార్డ్' },
    description: {
      en: 'Provides farmers with affordable credit for agricultural needs including crop production, post-harvest, and consumption.',
      hi: 'किसानों को फसल उत्पादन, कटाई के बाद और उपभोग सहित कृषि जरूरतों के लिए सस्ता ऋण प्रदान करता है।',
      te: 'పంట ఉత్పత్తి, పంట తర్వాత అవసరాలు మరియు వినియోగం సహా వ్యవసాయ అవసరాల కోసం రైతులకు చవకైన రుణం అందిస్తుంది.',
    },
    eligibility: {
      en: 'All farmers, including individual/joint borrowers who are owner cultivators.',
      hi: 'सभी किसान, जिसमें व्यक्तिगत/संयुक्त उधारकर्ता शामिल हैं जो मालिक-कृषक हैं।',
      te: 'యజమాని-కౌలుదారులైన వ్యక్తిగత/సంయుక్త రుణగ్రహీతలతో సహా అన్ని రైతులు.',
    },
    benefits: {
      en: 'Credit up to ₹3 lakh at 4% interest (with subsidy). Flexible repayment. Insurance coverage included.',
      hi: '4% ब्याज पर ₹3 लाख तक ऋण (सब्सिडी सहित)। लचीला पुनर्भुगतान। बीमा कवरेज शामिल।',
      te: '4% వడ్డీకి ₹3 లక్షల వరకు రుణం (సబ్సిడీతో). సౌలభ్యమైన తిరిగి చెల్లింపు. బీమా కవరేజీ చేర్చబడింది.',
    },
    howToApply: {
      en: '1. Visit any bank branch\n2. Fill KCC application form\n3. Submit land documents\n4. Provide Aadhaar and photos\n5. Bank processes within 14 days',
      hi: '1. किसी भी बैंक शाखा में जाएं\n2. KCC आवेदन पत्र भरें\n3. भूमि दस्तावेज जमा करें\n4. आधार और फोटो दें\n5. बैंक 14 दिनों में प्रक्रिया करता है',
      te: '1. ఏదైనా బ్యాంకు శాఖకు వెళ్ళండి\n2. KCC దరఖాస్తు ఫారం నింపండి\n3. భూమి పత్రాలు సమర్పించండి\n4. ఆధార్ మరియు ఫోటోలు ఇవ్వండి\n5. బ్యాంకు 14 రోజులలో ప్రాసెస్ చేస్తుంది',
    },
    link: 'https://bankofbaroda.in/kisan-credit-card',
  },
  {
    id: '4', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', color: 'from-teal-500 to-green-600',
    name: { en: 'Soil Health Card', hi: 'सॉइल हेल्थ कार्ड', te: 'నేల ఆరోగ్య కార్డు' },
    description: {
      en: 'Free soil testing and health card for every farmer with nutrient status and fertilizer recommendations.',
      hi: 'हर किसान के लिए मुफ्त मिट्टी परीक्षण और स्वास्थ्य कार्ड, पोषक तत्वों की स्थिति और उर्वरक सिफारिशों के साथ।',
      te: 'ప్రతి రైతుకు పోషక స్థితి మరియు ఎరువుల సిఫారసులతో ఉచిత నేల పరీక్ష మరియు ఆరోగ్య కార్డు.',
    },
    eligibility: {
      en: 'All farmers across India. Free of cost.',
      hi: 'भारत भर के सभी किसान। मुफ्त।',
      te: 'భారతదేశంలోని అన్ని రైతులు. ఉచితం.',
    },
    benefits: {
      en: 'Free soil testing every 2 years. Crop-wise fertilizer recommendations. Improved soil health awareness.',
      hi: 'हर 2 साल में मुफ्त मिट्टी परीक्षण। फसल-वार उर्वरक सिफारिशें। मिट्टी स्वास्थ्य जागरूकता।',
      te: 'ప్రతి 2 సంవత్సరాలకు ఉచిత నేల పరీక్ష. పంట వారీగా ఎరువుల సిఫారసులు. నేల ఆరోగ్య అవగాహన.',
    },
    howToApply: {
      en: '1. Visit soilhealth.dac.gov.in\n2. Register with Aadhaar\n3. Collect soil sample as guided\n4. Submit to nearest testing center\n5. Receive card with recommendations',
      hi: '1. soilhealth.dac.gov.in पर जाएं\n2. आधार से रजिस्टर करें\n3. निर्देशानुसार मिट्टी का नमूना लें\n4. नजदीकी परीक्षण केंद्र में जमा करें\n5. सिफारिशों के साथ कार्ड प्राप्त करें',
      te: '1. soilhealth.dac.gov.in కి వెళ్ళండి\n2. ఆధార్‌తో నమోదు చేయండి\n3. మార్గదర్శకత్వం ప్రకారం నేల నమూనా సేకరించండి\n4. సమీప పరీక్షా కేంద్రానికి సమర్పించండి\n5. సిఫారసులతో కార్డు పొందండి',
    },
    link: 'https://soilhealth.dac.gov.in',
  },
  {
    id: '5', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-purple-500 to-pink-600',
    name: { en: 'PM Kisan Maan Dhan Yojana', hi: 'पीएम किसान मानधन योजना', te: 'పీఎం కిసాన్ మాన్‌ధన్ యోజన' },
    description: {
      en: 'Pension scheme for small and marginal farmers providing ₹3,000 monthly pension after age 60.',
      hi: 'छोटे और सीमांत किसानों के लिए पेंशन योजना, 60 वर्ष की आयु के बाद ₹3,000 मासिक पेंशन।',
      te: 'చిన్న మరియు సన్నకారు రైతులకు పెన్షన్ పథకం, 60 సంవత్సరాల తర్వాత నెలకు ₹3,000 పెన్షన్.',
    },
    eligibility: {
      en: 'Small and marginal farmers aged 18-40 with less than 2 hectares of land.',
      hi: '18-40 वर्ष के छोटे और सीमांत किसान, 2 हेक्टेयर से कम भूमि वाले।',
      te: '18-40 సంవత్సరాల చిన్న మరియు సన్నకారు రైతులు, 2 హెక్టార్లకు తక్కువ భూమి ఉన్నవారు.',
    },
    benefits: {
      en: '₹3,000 monthly pension after 60. Government matches farmer contribution.',
      hi: '60 के बाद ₹3,000 मासिक पेंशन। सरकार किसान के योगदान के बराबर देती है।',
      te: '60 తర్వాత నెలకు ₹3,000 పెన్షన్. ప్రభుత్వం రైతు సహకారానికి సమానంగా చెల్లిస్తుంది.',
    },
    howToApply: {
      en: '1. Visit nearest CSC center\n2. Carry Aadhaar and bank passbook\n3. Fill enrollment form\n4. Choose monthly contribution\n5. Auto-debit from bank account',
      hi: '1. नजदीकी CSC केंद्र जाएं\n2. आधार और बैंक पासबुक ले जाएं\n3. नामांकन फॉर्म भरें\n4. मासिक योगदान चुनें\n5. बैंक खाते से ऑटो-डेबिट',
      te: '1. సమీప CSC కేంద్రానికి వెళ్ళండి\n2. ఆధార్ మరియు బ్యాంకు పాస్‌బుక్ తీసుకెళ్ళండి\n3. నమోదు ఫారం నింపండి\n4. నెలవారీ సహకారం ఎంచుకోండి\n5. బ్యాంకు ఖాతా నుండి ఆటో-డెబిట్',
    },
    link: 'https://maandhan.in',
  },
  {
    id: '6', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'from-red-500 to-pink-600',
    name: { en: 'KUSUM Yojana', hi: 'कुसुम योजना', te: 'కుసుమ్ యోజన' },
    description: {
      en: 'Solar pump scheme for farmers to install solar pumps for irrigation and sell excess power to grid.',
      hi: 'सिंचाई के लिए सोलर पंप लगाने और अतिरिक्त बिजली बेचने के लिए किसानों के लिए सोलर पंप योजना।',
      te: 'నీటిపారుదల కోసం సోలార్ పంపులు ఏర్పాటు చేసుకొని మిగులు విద్యుత్తును గ్రిడ్‌కు అమ్మడానికి రైతులకు సోలార్ పంప్ పథకం.',
    },
    eligibility: {
      en: 'All farmers with agricultural land. Priority to farmers with borewells.',
      hi: 'कृषि भूमि वाले सभी किसान। बोरवेल वाले किसानों को प्राथमिकता।',
      te: 'వ్యవసాయ భూమి ఉన్న అన్ని రైతులు. బోర్‌వెల్లు ఉన్న రైతులకు ప్రాధాన్యత.',
    },
    benefits: {
      en: 'Subsidy up to 60% on solar pumps. Earn by selling excess electricity.',
      hi: 'सोलर पंप पर 60% तक सब्सिडी। अतिरिक्त बिजली बेचकर कमाएं।',
      te: 'సోలార్ పంపులపై 60% వరకు సబ్సిడీ. అదనపు విద్యుత్తు అమ్మి సంపాదించండి.',
    },
    howToApply: {
      en: '1. Visit mnre.gov.in\n2. Apply online for solar pump\n3. Get feasibility approval\n4. Install solar pump\n5. Connect to grid and start earning',
      hi: '1. mnre.gov.in पर जाएं\n2. सोलर पंप के लिए ऑनलाइन आवेदन करें\n3. व्यवहार्यता अनुमोदन प्राप्त करें\n4. सोलर पंप स्थापित करें\n5. ग्रिड से कनेक्ट करें और कमाएं',
      te: '1. mnre.gov.in కి వెళ్ళండి\n2. సోలార్ పంప్ కోసం ఆన్‌లైన్‌లో దరఖాస్తు చేయండి\n3. సాధ్యాసాధ్యాల అనుమతి పొందండి\n4. సోలార్ పంప్ ఏర్పాటు చేయండి\n5. గ్రిడ్‌కు అనుసంధానించి సంపాదించడం ప్రారంభించండి',
    },
    link: 'https://mnre.gov.in/kusum',
  },
  {
    id: '7', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', color: 'from-cyan-500 to-blue-600',
    name: { en: 'ATMA Scheme', hi: 'कृषि प्रौद्योगिकी प्रबंधन अभिकरण', te: 'ఆత్మా పథకం' },
    description: {
      en: 'Provides farmers with latest agricultural technologies, training, and extension services.',
      hi: 'किसानों को नवीनतम कृषि प्रौद्योगिकियां, प्रशिक्षण और विस्तार सेवाएं प्रदान करता है।',
      te: 'రైతులకు తాజా వ్యవసాయ సాంకేతికతలు, శిక్షణ మరియు విస్తరణ సేవలు అందిస్తుంది.',
    },
    eligibility: {
      en: 'All farmers in rural areas.',
      hi: 'ग्रामीण क्षेत्रों के सभी किसान।',
      te: 'గ్రామీణ ప్రాంతాలలోని అన్ని రైతులు.',
    },
    benefits: {
      en: 'Free training on modern farming. Access to latest seeds and techniques.',
      hi: 'आधुनिक खेती पर मुफ्त प्रशिक्षण। नवीनतम बीज और तकनीकों तक पहुंच।',
      te: 'ఆధునిక వ్యవసాయంపై ఉచిత శిక్షణ. తాజా విత్తనాలు మరియు పద్ధతులకు యాక్సెస్.',
    },
    howToApply: {
      en: '1. Visit your nearest ATMA office\n2. Register as a farmer\n3. Get training schedule\n4. Attend training programs\n5. Apply for subsidies',
      hi: '1. अपने नजदीकी ATMA कार्यालय जाएं\n2. किसान के रूप में पंजीकरण करें\n3. प्रशिक्षण कार्यक्रम प्राप्त करें\n4. प्रशिक्षण कार्यक्रमों में भाग लें\n5. सब्सिडी के लिए आवेदन करें',
      te: '1. సమీప ATMA కార్యాలయానికి వెళ్ళండి\n2. రైతుగా నమోదు చేయండి\n3. శిక్షణ కార్యక్రమం పొందండి\n4. శిక్షణ కార్యక్రమాలకు హాజరవ్వండి\n5. సబ్సిడీలకు దరఖాస్తు చేయండి',
    },
    link: 'https://atmaa.nic.in',
  },
  {
    id: '8', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'from-indigo-500 to-purple-600',
    name: { en: 'Fasal Calculator', hi: 'फसल कैलकुलेटर', te: 'పంట లెక్కింపు' },
    description: {
      en: 'Calculate profit/loss for crops based on investment, yield, and market prices.',
      hi: 'निवेश, उपज और बाजार मूल्य के आधार पर फसल के लिए लाभ/हानि की गणना करें।',
      te: 'పెట్టుబడి, దిగుబడి మరియు మార్కెట్ ధరల ఆధారంగా పంటకు లాభం/నష్టం లెక్కించండి.',
    },
    eligibility: {
      en: 'All farmers can use for free.',
      hi: 'सभी किसान मुफ्त में उपयोग कर सकते हैं।',
      te: 'అన్ని రైతులు ఉచితంగా ఉపయోగించవచ్చు.',
    },
    benefits: {
      en: 'Free tool. Make informed decisions about crops. Plan your farming.',
      hi: 'मुफ्त उपकरण। फसलों के बारे में सूचित निर्णय लें। अपनी खेती की योजना बनाएं।',
      te: 'ఉచిత సాధనం. పంటల గురించి సమాచారంతో నిర్ణయాలు తీసుకోండి. మీ వ్యవసాయాన్ని ప్లాన్ చేయండి.',
    },
    howToApply: {
      en: '1. Visit fasalcalculator.gov.in\n2. Select your state\n3. Enter crop details\n4. Add investment costs\n5. See profit/loss estimate',
      hi: '1. fasalcalculator.gov.in पर जाएं\n2. अपना राज्य चुनें\n3. फसल विवरण दर्ज करें\n4. निवेश लागत जोड़ें\n5. लाभ/हानि अनुमान देखें',
      te: '1. fasalcalculator.gov.in కి వెళ్ళండి\n2. మీ రాష్ట్రం ఎంచుకోండి\n3. పంట వివరాలు నమోదు చేయండి\n4. పెట్టుబడి ఖర్చులు జోడించండి\n5. లాభం/నష్టం అంచనా చూడండి',
    },
    link: 'https://fasalcalculator.gov.in',
  },
];

const GovernmentSchemes: React.FC = () => {
  const { t, language } = useLanguage();
  const { darkMode, setCurrentPage } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const openSchemeLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('scheme.title')}</h1>
        </div>

        <div className="space-y-4">
          {schemes.map(scheme => (
            <div key={scheme.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl overflow-hidden transition-all`}>
              <button onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
                className="w-full p-5 flex items-center gap-4 text-left">
                <div className={`w-14 h-14 bg-gradient-to-br ${scheme.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={scheme.icon} /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{scheme.name[language] || scheme.name.en}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-clamp-2`}>{scheme.description[language] || scheme.description.en}</p>
                </div>
                <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${expandedId === scheme.id ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              {expandedId === scheme.id && (
                <div className={`px-5 pb-5 space-y-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="pt-4">
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-green-400' : 'text-green-700'} mb-1 flex items-center gap-1`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      {t('scheme.eligibility')}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.eligibility[language] || scheme.eligibility.en}</p>
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-1 flex items-center gap-1`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {t('scheme.benefits')}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{scheme.benefits[language] || scheme.benefits.en}</p>
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-amber-400' : 'text-amber-700'} mb-1 flex items-center gap-1`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      {t('scheme.howToApply')}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line`}>{scheme.howToApply[language] || scheme.howToApply.en}</p>
                  </div>
                  
                  {/* Apply Now Button */}
                  <button
                    onClick={() => openSchemeLink(scheme.link)}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Apply Now / Official Website
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
