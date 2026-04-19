export const featureSteps = {

  labels: {
    en: { steps: "Steps" },
    te: { steps: "దశలు" },
    hi: { steps: "कदम" }
  },

  en: {

    weather: {
      question: [
        "weather",
        "weather forecast",
        "check weather",
        "how to check weather forecast"
      ],
      title: "Weather Forecast",
      description: "Check temperature, humidity, and rainfall to plan irrigation and farming activities.",
      steps: [
        "1. Go to the Dashboard",
        "2. Click Weather",
        "3. Allow location access",
        "4. View temperature, rainfall, and humidity"
      ],
      link: "/weather"
    },

    machinery: {
      question: [
        "machinery",
        "rent machine",
        "tractor rent",
        "how to rent farm machinery"
      ],
      title: "Farm Machinery Rental",
      description: "Farmers can rent tractors, harvesters, and farming equipment from nearby farmers.",
      steps: [
        "1. Go to the Dashboard",
        "2. Click Machinery",
        "3. Select machine type",
        "4. Choose location",
        "5. Click Book Now"
      ],
      link: "/machinery"
    },

    fertilizer: {
      question: [
        "fertilizer",
        "fertilizer recommendation",
        "fertilizer advice"
      ],
      title: "Fertilizer Recommendation",
      description: "Get fertilizer advice based on crop type, soil type, and farm size.",
      steps: [
        "1. Select crop type",
        "2. Select soil type",
        "3. Enter farm size",
        "4. Click Get Recommendation"
      ],
      link: "/fertilizer"
    },

    schemes: {
      question: [
        "government schemes",
        "farmer schemes",
        "pm kisan",
        "how to view government schemes"
      ],
      title: "Government Schemes",
      description: "Check government schemes available for farmers and apply online.",
      steps: [
        "1. Click Government Schemes",
        "2. Select a scheme",
        "3. Read eligibility details",
        "4. Click Apply Now"
      ],
      link: "/schemes"
    }
  },

  te: {

    weather: {
      question: ["వాతావరణం", "వాతావరణ సమాచారం"],
      title: "వాతావరణ అంచనా",
      description: "ఉష్ణోగ్రత, వర్షపాతం మరియు తేమ వివరాలను చూసి పంటల పనులను ప్రణాళిక చేయండి.",
      steps: [
        "1. డాష్‌బోర్డ్‌కు వెళ్లండి",
        "2. వాతావరణం ఎంపికపై క్లిక్ చేయండి",
        "3. స్థానం అనుమతిని ఇవ్వండి",
        "4. ఉష్ణోగ్రత, వర్షపాతం మరియు తేమ వివరాలను చూడండి"
      ],
      link: "/weather"
    },

    machinery: {
      question: ["వ్యవసాయ యంత్రాలు", "ట్రాక్టర్ అద్దె"],
      title: "వ్యవసాయ యంత్రాల అద్దె",
      description: "రైతులు సమీపంలోని ట్రాక్టర్లు మరియు ఇతర వ్యవసాయ యంత్రాలను అద్దెకు తీసుకోవచ్చు.",
      steps: [ 
        "1. డాష్‌బోర్డ్‌కు వెళ్లండి",
        "2. వ్యవసాయ యంత్రాలు ఎంపికపై క్లిక్ చేయండి",
        "3. అవసరమైన యంత్రాన్ని ఎంచుకోండి",
        "4. ప్రదేశాన్ని ఎంచుకోండి",
        "5. బుక్ చేయండి ఎంపికపై క్లిక్ చేయండి"
      ],
      link: "/machinery"
    },

    fertilizer: {
      question: ["ఎరువులు", "ఎరువు సిఫార్సు"],
      title: "ఎరువు సిఫార్సు",
      description: "పంట రకం, నేల రకం మరియు పొలం పరిమాణం ఆధారంగా సరైన ఎరువు సలహాను పొందండి.",
      steps: [
        "1. పంట రకాన్ని ఎంచుకోండి",
        "2. నేల రకాన్ని ఎంచుకోండి",
        "3. పొలం పరిమాణాన్ని నమోదు చేయండి",
        "4. సిఫార్సు పొందండి ఎంపికపై క్లిక్ చేయండి"
      ],
      link: "/fertilizer"
    },

    schemes: {
      question: ["ప్రభుత్వ పథకాలు"],
      title: "ప్రభుత్వ పథకాలు",
      description: "రైతుల కోసం ఉన్న ప్రభుత్వ పథకాల వివరాలను తెలుసుకొని ఆన్‌లైన్‌లో దరఖాస్తు చేయండి.",
      steps: [
        "1. ప్రభుత్వ పథకాలు ఎంపికపై క్లిక్ చేయండి",
        "2. ఒక పథకాన్ని ఎంచుకోండి",
        "3. అర్హత వివరాలను చదవండి",
        "4. దరఖాస్తు చేయండి ఎంపికపై క్లిక్ చేయండి"
      ],
      link: "/schemes"
    }
  },

  hi: {

    weather: {
      question: ["मौसम", "मौसम जानकारी"],
      title: "मौसम पूर्वानुमान",
      description: "तापमान, वर्षा और आर्द्रता देखकर सिंचाई और खेती की योजना बनाएं।",
      steps: [
        "1. डैशबोर्ड खोलें",
        "2. मौसम विकल्प पर क्लिक करें",
        "3. स्थान की अनुमति दें",
        "4. तापमान, वर्षा और आर्द्रता देखें"
      ],
      link: "/weather"
    },

    machinery: {
      question: ["कृषि मशीन", "ट्रैक्टर किराया"],
      title: "कृषि मशीन किराया",
      description: "किसान ट्रैक्टर और अन्य कृषि मशीनें किराए पर ले सकते हैं।",
      steps: [
        "1. डैशबोर्ड खोलें",
        "2. कृषि मशीन विकल्प पर क्लिक करें",
        "3. मशीन का चयन करें",
        "4. स्थान चुनें",
        "5. बुक करें विकल्प पर क्लिक करें"
      ],
      link: "/machinery"
    },

    fertilizer: {
      question: ["उर्वरक", "उर्वरक सलाह"],
      title: "उर्वरक सलाह",
      description: "फसल और मिट्टी के प्रकार के आधार पर उर्वरक सुझाव प्राप्त करें।",
      steps: [
        "1. फसल का प्रकार चुनें",
        "2. मिट्टी का प्रकार चुनें",
        "3. खेत का आकार दर्ज करें",
        "4. सुझाव प्राप्त करें पर क्लिक करें"
      ],
      link: "/fertilizer"
    },

    schemes: {
      question: ["सरकारी योजनाएँ"],
      title: "सरकारी योजनाएँ",
      description: "किसानों के लिए उपलब्ध सरकारी योजनाओं की जानकारी प्राप्त करें और आवेदन करें।",
      steps: [
        "1. सरकारी योजनाएँ विकल्प खोलें",
        "2. योजना का चयन करें",
        "3. पात्रता विवरण पढ़ें",
        "4. आवेदन करें विकल्प पर क्लिक करें"
      ],
      link: "/schemes"
    }
  }

};