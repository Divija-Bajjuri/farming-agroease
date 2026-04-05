import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";

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
id:"1",
icon:"M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2",
color:"from-green-500 to-emerald-600",
name:{
en:"PM-KISAN",
hi:"पीएम किसान",
te:"పీఎం కిసాన్"
},
description:{
en:"Provides ₹6000 yearly financial support to farmers.",
hi:"किसानों को ₹6000 वार्षिक आर्थिक सहायता प्रदान करता है।",
te:"రైతులకు సంవత్సరానికి ₹6000 ఆర్థిక సహాయం అందిస్తుంది."
},
eligibility:{
en:"All farmer families with cultivable land.",
hi:"खेती योग्य भूमि वाले सभी किसान परिवार पात्र हैं।",
te:"సాగు భూమి ఉన్న అన్ని రైతు కుటుంబాలు అర్హులు."
},
benefits:{
en:"₹6000 per year in three installments.",
hi:"₹6000 प्रति वर्ष तीन किस्तों में दिया जाता है।",
te:"సంవత్సరానికి ₹6000 మూడు విడతలలో ఇస్తారు."
},
howToApply:{
en:"1.Visit pmkisan.gov.in\n2.Register farmer\n3.Enter Aadhaar\n4.Submit details",
hi:"1.pmkisan.gov.in जाएं\n2.पंजीकरण करें\n3.आधार दर्ज करें\n4.फॉर्म जमा करें",
te:"1.pmkisan.gov.in కి వెళ్లండి\n2.రైతు నమోదు చేయండి\n3.ఆధార్ నమోదు చేయండి\n4.వివరాలు సమర్పించండి"
},
link:"https://pmkisan.gov.in"
},

{
id:"2",
icon:"M9 12l2 2 4-4",
color:"from-blue-500 to-indigo-600",
name:{
en:"PM Fasal Bima Yojana",
hi:"प्रधानमंत्री फसल बीमा योजना",
te:"ప్రధాన మంత్రి పంట బీమా పథకం"
},
description:{
en:"Insurance scheme protecting farmers from crop loss.",
hi:"फसल नुकसान होने पर किसानों को बीमा सुरक्षा देता है।",
te:"పంట నష్టానికి రైతులకు బీమా రక్షణ ఇస్తుంది."
},
eligibility:{
en:"All farmers growing notified crops.",
hi:"सूचित फसल उगाने वाले किसान पात्र हैं।",
te:"నిర్దేశిత పంటలు పండించే రైతులు అర్హులు."
},
benefits:{
en:"Protection from natural disaster crop losses.",
hi:"प्राकृतिक आपदाओं से फसल सुरक्षा।",
te:"సహజ విపత్తుల వల్ల పంట నష్టానికి రక్షణ."
},
howToApply:{
en:"1.Visit pmfby.gov.in\n2.Register crop\n3.Pay premium",
hi:"1.pmfby.gov.in जाएं\n2.फसल पंजीकरण करें\n3.प्रीमियम जमा करें",
te:"1.pmfby.gov.in కి వెళ్లండి\n2.పంట నమోదు చేయండి\n3.ప్రీమియం చెల్లించండి"
},
link:"https://pmfby.gov.in"
},

{
id:"3",
icon:"M3 10h18",
color:"from-amber-500 to-orange-600",
name:{
en:"Kisan Credit Card",
hi:"किसान क्रेडिट कार्ड",
te:"కిసాన్ క్రెడిట్ కార్డ్"
},
description:{
en:"Provides farmers easy credit for agriculture.",
hi:"किसानों को खेती के लिए आसान ऋण सुविधा देता है।",
te:"రైతులకు వ్యవసాయం కోసం సులభమైన రుణం ఇస్తుంది."
},
eligibility:{
en:"Farmers with agricultural land.",
hi:"भूमि वाले किसान पात्र हैं।",
te:"వ్యవసాయ భూమి ఉన్న రైతులు అర్హులు."
},
benefits:{
en:"Loan up to ₹3 lakh at low interest.",
hi:"₹3 लाख तक ऋण सुविधा।",
te:"₹3 లక్షల వరకు రుణం."
},
howToApply:{
en:"1.Visit bank\n2.Fill KCC form\n3.Submit documents",
hi:"1.बैंक जाएं\n2.KCC फॉर्म भरें\n3.दस्तावेज जमा करें",
te:"1.బ్యాంక్ కి వెళ్లండి\n2.KCC ఫారం నింపండి\n3.పత్రాలు సమర్పించండి"
},
link:"https://www.myscheme.gov.in/schemes/kcc"
},

{
id:"4",
icon:"M9 5H7",
color:"from-teal-500 to-green-600",
name:{
en:"Soil Health Card",
hi:"सॉइल हेल्थ कार्ड",
te:"మట్టి ఆరోగ్య కార్డు"
},
description:{
en:"Provides soil testing and fertilizer recommendations.",
hi:"मिट्टी परीक्षण और उर्वरक सुझाव देता है।",
te:"మట్టి పరీక్ష మరియు ఎరువు సూచనలు ఇస్తుంది."
},
eligibility:{
en:"All farmers across India.",
hi:"भारत के सभी किसान पात्र हैं।",
te:"భారతదేశంలోని అన్ని రైతులు అర్హులు."
},
benefits:{
en:"Free soil testing every two years.",
hi:"हर दो साल में मुफ्त मिट्टी जांच।",
te:"ప్రతి రెండు సంవత్సరాలకు ఉచిత మట్టి పరీక్ష."
},
howToApply:{
en:"1.Visit soilhealth.dac.gov.in\n2.Register\n3.Submit soil sample",
hi:"1.soilhealth.dac.gov.in जाएं\n2.पंजीकरण करें\n3.मिट्टी नमूना जमा करें",
te:"1.soilhealth.dac.gov.in కు వెళ్లండి\n2.నమోదు చేయండి\n3.మట్టి నమూనా ఇవ్వండి"
},
link:"https://soilhealth.dac.gov.in"
},
{
id:"9",
icon:"M12 8c-1.657 0-3 .895-3 2",
color:"from-green-600 to-lime-600",
name:{
en:"e-NAM (National Agriculture Market)",
hi:"ई-नाम कृषि बाजार",
te:"ఈ-నామ్ జాతీయ వ్యవసాయ మార్కెట్"
},
description:{
en:"Online trading platform connecting farmers to national agricultural markets.",
hi:"किसानों को राष्ट्रीय कृषि बाजार से जोड़ने वाला ऑनलाइन प्लेटफॉर्म।",
te:"రైతులను జాతీయ వ్యవసాయ మార్కెట్‌తో కలిపే ఆన్‌లైన్ వేదిక."
},
eligibility:{
en:"Farmers registered with local APMC markets.",
hi:"APMC बाजार में पंजीकृत किसान।",
te:"APMC మార్కెట్‌లో నమోదు చేసిన రైతులు."
},
benefits:{
en:"Better crop price discovery and nationwide trading.",
hi:"बेहतर फसल मूल्य और देशभर में व्यापार की सुविधा।",
te:"పంటలకు మంచి ధర మరియు దేశవ్యాప్తంగా వ్యాపారం."
},
howToApply:{
en:"1.Visit enam.gov.in\n2.Register farmer\n3.Link bank account\n4.Start trading",
hi:"1.enam.gov.in जाएं\n2.पंजीकरण करें\n3.बैंक लिंक करें\n4.व्यापार शुरू करें",
te:"1.enam.gov.in కు వెళ్లండి\n2.నమోదు చేయండి\n3.బ్యాంక్ లింక్ చేయండి\n4.వ్యాపారం ప్రారంభించండి"
},
link:"https://www.enam.gov.in"
},

{
id:"10",
icon:"M5 3v4M3 5h4",
color:"from-blue-600 to-cyan-600",
name:{
en:"Paramparagat Krishi Vikas Yojana",
hi:"परंपरागत कृषि विकास योजना",
te:"పారంపరిక వ్యవసాయ అభివృద్ధి పథకం"
},
description:{
en:"Promotes organic farming among farmers.",
hi:"किसानों में जैविक खेती को बढ़ावा देती है।",
te:"రైతుల్లో సేంద్రీయ వ్యవసాయాన్ని ప్రోత్సహిస్తుంది."
},
eligibility:{
en:"Farmers willing to practice organic farming.",
hi:"जैविक खेती करने वाले किसान।",
te:"సేంద్రీయ వ్యవసాయం చేసే రైతులు."
},
benefits:{
en:"Financial support for organic farming practices.",
hi:"जैविक खेती के लिए आर्थिक सहायता।",
te:"సేంద్రీయ వ్యవసాయానికి ఆర్థిక సహాయం."
},
howToApply:{
en:"1.Visit agriculture department\n2.Register farmer group\n3.Apply for subsidy",
hi:"1.कृषि विभाग जाएं\n2.समूह पंजीकरण करें\n3.सब्सिडी के लिए आवेदन करें",
te:"1.వ్యవసాయ శాఖకు వెళ్లండి\n2.సమూహ నమోదు చేయండి\n3.సబ్సిడీ కోసం దరఖాస్తు చేయండి"
},
link:"https://pgsindia-ncof.gov.in"
},

{
id:"11",
icon:"M12 6.253v13",
color:"from-purple-600 to-indigo-600",
name:{
en:"National Food Security Mission",
hi:"राष्ट्रीय खाद्य सुरक्षा मिशन",
te:"జాతీయ ఆహార భద్రత మిషన్"
},
description:{
en:"Improves production of rice, wheat and pulses.",
hi:"चावल, गेहूं और दालों का उत्पादन बढ़ाने की योजना।",
te:"బియ్యం, గోధుమలు మరియు పప్పు ఉత్పత్తి పెంచే పథకం."
},
eligibility:{
en:"Farmers cultivating rice, wheat or pulses.",
hi:"चावल, गेहूं और दाल उगाने वाले किसान।",
te:"బియ్యం, గోధుమలు, పప్పు పండించే రైతులు."
},
benefits:{
en:"Subsidy on seeds, machinery and farming tools.",
hi:"बीज और कृषि उपकरणों पर सब्सिडी।",
te:"విత్తనాలు మరియు వ్యవసాయ పరికరాలపై సబ్సిడీ."
},
howToApply:{
en:"1.Visit agriculture office\n2.Register crop details\n3.Apply for support",
hi:"1.कृषि कार्यालय जाएं\n2.फसल विवरण दर्ज करें\n3.आवेदन करें",
te:"1.వ్యవసాయ కార్యాలయానికి వెళ్లండి\n2.పంట వివరాలు నమోదు చేయండి\n3.దరఖాస్తు చేయండి"
},
link:"https://nfsm.gov.in"
},

{
id:"12",
icon:"M13 10V3L4 14",
color:"from-yellow-600 to-orange-600",
name:{
en:"Rashtriya Krishi Vikas Yojana",
hi:"राष्ट्रीय कृषि विकास योजना",
te:"జాతీయ వ్యవసాయ అభివృద్ధి పథకం"
},
description:{
en:"Supports states to increase agricultural productivity.",
hi:"कृषि उत्पादकता बढ़ाने के लिए राज्यों को सहायता।",
te:"వ్యవసాయ ఉత్పత్తి పెంచేందుకు రాష్ట్రాలకు సహాయం."
},
eligibility:{
en:"Farmers through state agriculture departments.",
hi:"राज्य कृषि विभाग के माध्यम से किसान।",
te:"రాష్ట్ర వ్యవసాయ శాఖ ద్వారా రైతులు."
},
benefits:{
en:"Funding for irrigation, seeds, and farm infrastructure.",
hi:"सिंचाई और कृषि अवसंरचना के लिए सहायता।",
te:"పారుదల మరియు వ్యవసాయ మౌలిక సదుపాయాలకు సహాయం."
},
howToApply:{
en:"1.Visit agriculture office\n2.Submit proposal\n3.Apply subsidy",
hi:"1.कृषि कार्यालय जाएं\n2.प्रस्ताव जमा करें\n3.सब्सिडी लें",
te:"1.వ్యవసాయ కార్యాలయానికి వెళ్లండి\n2.ప్రతిపాదన ఇవ్వండి\n3.సబ్సిడీ పొందండి"
},
link:"https://rkvy.nic.in"
},

{
id:"13",
icon:"M3 10h18",
color:"from-red-500 to-pink-600",
name:{
en:"Pradhan Mantri Krishi Sinchayee Yojana",
hi:"प्रधानमंत्री कृषि सिंचाई योजना",
te:"ప్రధాన మంత్రి వ్యవసాయ సించాయీ పథకం"
},
description:{
en:"Improves irrigation facilities for farmers.",
hi:"किसानों के लिए सिंचाई सुविधा बढ़ाने की योजना।",
te:"రైతులకు పారుదల సౌకర్యం మెరుగుపరచే పథకం."
},
eligibility:{
en:"Farmers needing irrigation support.",
hi:"सिंचाई सहायता चाहने वाले किसान।",
te:"పారుదల అవసరం ఉన్న రైతులు."
},
benefits:{
en:"Subsidy on drip irrigation and sprinklers.",
hi:"ड्रिप सिंचाई पर सब्सिडी।",
te:"డ్రిప్ మరియు స్ప్రింక్లర్ పై సబ్సిడీ."
},
howToApply:{
en:"1.Visit agriculture office\n2.Apply irrigation scheme\n3.Receive subsidy",
hi:"1.कृषि कार्यालय जाएं\n2.योजना आवेदन करें\n3.सब्सिडी प्राप्त करें",
te:"1.వ్యవసాయ కార్యాలయానికి వెళ్లండి\n2.పథకం కోసం దరఖాస్తు చేయండి\n3.సబ్సిడీ పొందండి"
},
link:"https://pmksy.gov.in"
},

{
id:"14",
icon:"M5 3v4M3 5h4",
color:"from-green-600 to-teal-600",
name:{
en:"National Mission for Sustainable Agriculture",
hi:"राष्ट्रीय सतत कृषि मिशन",
te:"జాతీయ స్థిర వ్యవసాయ మిషన్"
},
description:{
en:"Promotes sustainable farming practices and climate-resilient agriculture.",
hi:"टिकाऊ खेती और जलवायु अनुकूल कृषि को बढ़ावा देता है।",
te:"స్థిరమైన వ్యవసాయం మరియు వాతావరణ అనుకూల వ్యవసాయాన్ని ప్రోత్సహిస్తుంది."
},
eligibility:{
en:"Farmers practicing sustainable agriculture.",
hi:"सतत खेती करने वाले किसान।",
te:"స్థిరమైన వ్యవసాయం చేసే రైతులు."
},
benefits:{
en:"Support for water conservation, soil health, and climate adaptation.",
hi:"जल संरक्षण और मिट्टी स्वास्थ्य के लिए सहायता।",
te:"నీటి సంరక్షణ మరియు మట్టి ఆరోగ్యానికి సహాయం."
},
howToApply:{
en:"1.Visit agriculture department\n2.Apply for scheme\n3.Submit documents",
hi:"1.कृषि विभाग जाएं\n2.योजना के लिए आवेदन करें\n3.दस्तावेज जमा करें",
te:"1.వ్యవసాయ శాఖకు వెళ్లండి\n2.పథకం కోసం దరఖాస్తు చేయండి\n3.పత్రాలు సమర్పించండి"
},
link:"https://nmsa.dac.gov.in"
},

{
id:"15",
icon:"M12 6v6l4 2",
color:"from-yellow-500 to-orange-600",
name:{
en:"Gramin Bhandaran Yojana",
hi:"ग्रामीण भंडारण योजना",
te:"గ్రామీణ నిల్వ పథకం"
},
description:{
en:"Supports farmers to build warehouses and storage facilities.",
hi:"किसानों को गोदाम और भंडारण सुविधा बनाने में मदद करता है।",
te:"రైతులకు గిడ్డంగులు నిర్మించేందుకు సహాయం చేస్తుంది."
},
eligibility:{
en:"Farmers, farmer groups, and cooperatives.",
hi:"किसान, किसान समूह और सहकारी समितियाँ।",
te:"రైతులు మరియు రైతు సమూహాలు."
},
benefits:{
en:"Subsidy for warehouse construction.",
hi:"गोदाम निर्माण पर सब्सिडी।",
te:"గిడ్డంగి నిర్మాణానికి సబ్సిడీ."
},
howToApply:{
en:"1.Visit NABARD office\n2.Apply for warehouse subsidy\n3.Submit land documents",
hi:"1.NABARD कार्यालय जाएं\n2.सब्सिडी के लिए आवेदन करें\n3.दस्तावेज जमा करें",
te:"1.NABARD కార్యాలయానికి వెళ్లండి\n2.సబ్సిడీ కోసం దరఖాస్తు చేయండి\n3.పత్రాలు సమర్పించండి"
},
link:"https://nabard.org"
},

{
id:"16",
icon:"M3 10h18",
color:"from-blue-500 to-indigo-600",
name:{
en:"Sub Mission on Agricultural Mechanization",
hi:"कृषि मशीनीकरण उप मिशन",
te:"వ్యవసాయ యంత్రీకరణ ఉప మిషన్"
},
description:{
en:"Encourages farmers to adopt modern agricultural machinery.",
hi:"किसानों को आधुनिक कृषि मशीनों का उपयोग करने के लिए प्रोत्साहित करता है।",
te:"రైతులు ఆధునిక వ్యవసాయ యంత్రాలు ఉపయోగించేందుకు ప్రోత్సహిస్తుంది."
},
eligibility:{
en:"All farmers and farmer groups.",
hi:"सभी किसान और किसान समूह।",
te:"అన్ని రైతులు మరియు రైతు సమూహాలు."
},
benefits:{
en:"Subsidy for tractors, harvesters, and farm machines.",
hi:"ट्रैक्टर और कृषि मशीनों पर सब्सिडी।",
te:"ట్రాక్టర్ మరియు యంత్రాలపై సబ్సిడీ."
},
howToApply:{
en:"1.Visit agriculture office\n2.Apply for machinery subsidy\n3.Submit documents",
hi:"1.कृषि कार्यालय जाएं\n2.मशीनरी सब्सिडी के लिए आवेदन करें\n3.दस्तावेज जमा करें",
te:"1.వ్యవసాయ కార్యాలయానికి వెళ్లండి\n2.యంత్రాల సబ్సిడీ కోసం దరఖాస్తు చేయండి\n3.పత్రాలు సమర్పించండి"
},
link:"https://agrimachinery.nic.in"
},

{
id:"17",
icon:"M12 6.253v13",
color:"from-purple-500 to-pink-600",
name:{
en:"Pradhan Mantri Annadata Aay Sanrakshan Abhiyan",
hi:"प्रधानमंत्री अन्नदाता आय संरक्षण अभियान",
te:"ప్రధాన మంత్రి అన్నదాత ఆదాయ సంరక్షణ పథకం"
},
description:{
en:"Ensures farmers receive fair price for their crops.",
hi:"किसानों को उनकी फसल के लिए उचित मूल्य सुनिश्चित करता है।",
te:"రైతులకు పంటలకు సరైన ధర అందేలా చేస్తుంది."
},
eligibility:{
en:"Farmers selling crops in government markets.",
hi:"सरकारी मंडियों में फसल बेचने वाले किसान।",
te:"ప్రభుత్వ మార్కెట్లలో పంట అమ్మే రైతులు."
},
benefits:{
en:"Price support and MSP benefits.",
hi:"न्यूनतम समर्थन मूल्य का लाभ।",
te:"MSP ధర మద్దతు."
},
howToApply:{
en:"1.Register in mandi\n2.Sell crops at MSP centers",
hi:"1.मंडी में पंजीकरण करें\n2.MSP केंद्र पर बेचें",
te:"1.మార్కెట్‌లో నమోదు చేయండి\n2.MSP కేంద్రంలో అమ్మండి"
},
link:"https://pmkisan.gov.in"
},

{
id:"18",
icon:"M13 10V3L4 14",
color:"from-red-500 to-orange-600",
name:{
en:"Integrated Scheme on Agriculture Marketing",
hi:"एकीकृत कृषि विपणन योजना",
te:"సమగ్ర వ్యవసాయ మార్కెటింగ్ పథకం"
},
description:{
en:"Improves agricultural marketing infrastructure.",
hi:"कृषि विपणन संरचना को बेहतर बनाता है।",
te:"వ్యవసాయ మార్కెటింగ్ మౌలిక సదుపాయాలను మెరుగుపరుస్తుంది."
},
eligibility:{
en:"Farmers and agri entrepreneurs.",
hi:"किसान और कृषि उद्यमी।",
te:"రైతులు మరియు వ్యవసాయ వ్యాపారులు."
},
benefits:{
en:"Funding for markets, cold storage, and logistics.",
hi:"बाजार और कोल्ड स्टोरेज के लिए सहायता।",
te:"మార్కెట్లు మరియు కోల్డ్ స్టోరేజ్‌కు సహాయం."
},
howToApply:{
en:"1.Visit agriculture office\n2.Apply scheme\n3.Submit proposal",
hi:"1.कृषि कार्यालय जाएं\n2.योजना आवेदन करें\n3.प्रस्ताव जमा करें",
te:"1.వ్యవసాయ కార్యాలయానికి వెళ్లండి\n2.పథకం కోసం దరఖాస్తు చేయండి\n3.ప్రతిపాదన ఇవ్వండి"
},
link:"https://agmarknet.gov.in"
},

{
id:"19",
icon:"M12 8c-1.657 0-3 .895-3 2",
color:"from-cyan-500 to-blue-600",
name:{
en:"Pradhan Mantri Formalisation of Micro Food Processing Enterprises",
hi:"प्रधानमंत्री सूक्ष्म खाद्य प्रसंस्करण योजना",
te:"సూక్ష్మ ఆహార ప్రాసెసింగ్ పథకం"
},
description:{
en:"Supports small food processing businesses by farmers.",
hi:"किसानों के छोटे खाद्य प्रसंस्करण उद्योगों को सहायता।",
te:"రైతుల చిన్న ఆహార ప్రాసెసింగ్ వ్యాపారాలకు సహాయం."
},
eligibility:{
en:"Small food processing entrepreneurs.",
hi:"छोटे खाद्य प्रसंस्करण व्यवसायी।",
te:"చిన్న ఆహార ప్రాసెసింగ్ వ్యాపారులు."
},
benefits:{
en:"Financial assistance up to 35% subsidy.",
hi:"35% तक वित्तीय सहायता।",
te:"35% వరకు ఆర్థిక సహాయం."
},
howToApply:{
en:"1.Visit mofpi.gov.in\n2.Register business\n3.Apply subsidy",
hi:"1.mofpi.gov.in जाएं\n2.पंजीकरण करें\n3.सब्सिडी आवेदन करें",
te:"1.mofpi.gov.in కు వెళ్లండి\n2.నమోదు చేయండి\n3.సబ్సిడీ కోసం దరఖాస్తు చేయండి"
},
link:"https://mofpi.gov.in"
}
];

const GovernmentSchemes:React.FC=()=>{
const {t,language}=useLanguage();
const {darkMode,setCurrentPage}=useApp();
const [expandedId,setExpandedId]=useState<string|null>(null);

const openSchemeLink=(link:string)=>{
window.open(link,"_blank");
};

return(
<div className={`min-h-screen ${darkMode?"bg-gray-900":"bg-gray-50"}`}>
<div className="max-w-4xl mx-auto px-4 py-6">

<div className="flex items-center gap-3 mb-6">
<button onClick={()=>setCurrentPage("dashboard")} className="p-2 rounded-xl hover:bg-gray-200">
←
</button>
<h1 className={`text-2xl font-bold ${darkMode?"text-white":"text-gray-900"}`}>
{t("scheme.title")}
</h1>
</div>

<div className="space-y-4">
{schemes.map((scheme)=>(
<div key={scheme.id} className={`${darkMode?"bg-gray-800":"bg-white"} border rounded-2xl`}>

<button
onClick={()=>setExpandedId(expandedId===scheme.id?null:scheme.id)}
className="w-full p-5 flex items-center gap-4 text-left"
>

<div className={`w-14 h-14 bg-gradient-to-br ${scheme.color} rounded-2xl flex items-center justify-center`}>
🌾
</div>

<div className="flex-1">
<h3 className={`font-bold text-lg ${darkMode?"text-white":"text-gray-900"}`}>
{scheme.name[language] || scheme.name.en}
</h3>

<p className={`${darkMode?"text-gray-400":"text-gray-500"} text-sm`}>
{scheme.description[language] || scheme.description.en}
</p>
</div>

</button>

{expandedId===scheme.id &&(
<div className="px-5 pb-5 space-y-3">

<p><b>{t("scheme.eligibility")}:</b> {scheme.eligibility[language] || scheme.eligibility.en}</p>

<p><b>{t("scheme.benefits")}:</b> {scheme.benefits[language] || scheme.benefits.en}</p>

<p><b>{t("scheme.howToApply")}:</b></p>

<p className="whitespace-pre-line">
{scheme.howToApply[language] || scheme.howToApply.en}
</p>

<button
onClick={()=>openSchemeLink(scheme.link)}
className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl"
>
Apply Now
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