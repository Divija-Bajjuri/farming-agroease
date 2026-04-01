const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Machine = require('./models/Machine');
const Scheme = require('./models/Scheme');
const FAQ = require('./models/FAQ');
const Fertilizer = require('./models/Fertilizer');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Machine.deleteMany({});
    await Scheme.deleteMany({});
    await FAQ.deleteMany({});
    await Fertilizer.deleteMany({});

    console.log('Cleared existing data');

    // Seed Users (Machine Owners)
    const users = await User.insertMany([
      {
        name: 'Ramesh Kumar',
        email: 'ramesh@agroEase.com',
        mobile: '9876543210',
        password: 'password123',
        village: 'Warangal',
        district: 'Warangal',
        state: 'Telangana'
      },
      {
        name: 'Suresh Patel',
        email: 'suresh@agroEase.com',
        mobile: '9876543211',
        password: 'password123',
        village: 'Karimnagar',
        district: 'Karimnagar',
        state: 'Telangana'
      },
      {
        name: 'Lakshman Rao',
        email: 'lakshman@agroEase.com',
        mobile: '9876543212',
        password: 'password123',
        village: 'Nizamabad',
        district: 'Nizamabad',
        state: 'Telangana'
      }
    ]);

    console.log('Seeded users');

    // Seed Machines
    await Machine.insertMany([
      {
        name: 'Mahindra 575 DI',
        type: 'Tractor',
        brand: 'Mahindra',
        model: '575 DI',
        description: 'Powerful 45HP tractor suitable for all agricultural operations',
        pricePerHour: 800,
        pricePerDay: 5000,
        location: 'Warangal',
        district: 'Warangal',
        state: 'Telangana',
        contact: users[0].mobile,
        owner: users[0]._id,
        imageUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8137?w=400&h=300&fit=crop',
        available: true,
        isVerified: true
      },
      {
        name: 'John Deere 5310',
        type: 'Tractor',
        brand: 'John Deere',
        model: '5310',
        description: 'Premium 55HP tractor with advanced features',
        pricePerHour: 1200,
        pricePerDay: 7500,
        location: 'Karimnagar',
        district: 'Karimnagar',
        state: 'Telangana',
        contact: users[1].mobile,
        owner: users[1]._id,
        imageUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop',
        available: true,
        isVerified: true
      },
      {
        name: 'Kubota DC-68G',
        type: 'Harvester',
        brand: 'Kubota',
        model: 'DC-68G',
        description: 'High-performance combine harvester for paddy and wheat',
        pricePerHour: 2500,
        pricePerDay: 15000,
        location: 'Nizamabad',
        district: 'Nizamabad',
        state: 'Telangana',
        contact: users[2].mobile,
        owner: users[2]._id,
        imageUrl: 'https://images.unsplash.com/photo-1530267981375-27fde9836315?w=400&h=300&fit=crop',
        available: true,
        isVerified: true
      },
      {
        name: 'Mahindra Arjun 555',
        type: 'Tractor',
        brand: 'Mahindra',
        model: 'Arjun 555',
        description: '50HP tractor with power steering',
        pricePerHour: 900,
        pricePerDay: 5500,
        location: 'Warangal',
        district: 'Warangal',
        state: 'Telangana',
        contact: users[0].mobile,
        owner: users[0]._id,
        imageUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8137?w=400&h=300&fit=crop',
        available: true,
        isVerified: true
      },
      {
        name: 'Swaraj 744 FE',
        type: 'Tractor',
        brand: 'Swaraj',
        model: '744 FE',
        description: '45HP tractor ideal for small to medium farms',
        pricePerHour: 700,
        pricePerDay: 4500,
        location: 'Karimnagar',
        district: 'Karimnagar',
        state: 'Telangana',
        contact: users[1].mobile,
        owner: users[1]._id,
        imageUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8137?w=400&h=300&fit=crop',
        available: true,
        isVerified: true
      }
    ]);

    console.log('Seeded machines');

    // Seed Government Schemes
    await Scheme.insertMany([
      {
        nameEn: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        nameHi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
        nameTe: 'ప్రధానమంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
        descriptionEn: 'Income support of ₹6000 per year to farmer families',
        descriptionHi: 'కిసాన్ కుటుంబాలకు సంవత్సరానికి ₹6000 ఆదాయ మద్దతు',
        descriptionTe: 'కిసాన్ కుటుంబాలకు సంవత్సరానికి ₹6000 ఆదాయ మద్దతు',
        eligibilityEn: 'All landholding farmer families',
        eligibilityHi: 'భూమి కలిగిన రైతు కుటుంబాలు',
        eligibilityTe: 'భూమి కలిగిన రైతు కుటుంబాలు',
        benefitsEn: '₹6000 per year in 3 equal installments',
        benefitsHi: 'సంవత్సరానికి ₹6000, 3 సమాన వాయిదాలలో',
        benefitsTe: 'సంవత్సరానికి ₹6000, 3 సమాన వాయిదాలలో',
        category: 'Financial Support',
        provider: 'Government of India',
        website: 'https://pmkisan.gov.in',
        states: ['All India'],
        isActive: true
      },
      {
        nameEn: 'Kisan Credit Card Scheme',
        nameHi: 'కిసాన్ క్రెడిట్ కార్డ్ పథకం',
        nameTe: 'కిసాన్ క్రెడిట్ కార్డ్ పథకం',
        descriptionEn: 'Easy credit for agricultural needs at low interest rates',
        descriptionHi: 'వ్యవసాయ అవసరాలకు తక్కువ వడ్డీ రేట్లతో సులభ రుణం',
        descriptionTe: 'వ్యవసాయ అవసరాలకు తక్కువ వడ్డీ రేట్లతో సులభ రుణం',
        eligibilityEn: 'All farmers including sharecroppers and tenant farmers',
        eligibilityHi: 'పంటదారులు మరియు కౌలు రైతులతో సహా అన్ని రైతులు',
        eligibilityTe: 'పంటదారులు మరియు కౌలు రైతులతో సహా అన్ని రైతులు',
        benefitsEn: 'Credit up to ₹3 lakh at 4% interest',
        benefitsHi: '4% వడ్డీతో ₹3 లక్షల వరకు రుణం',
        benefitsTe: '4% వడ్డీతో ₹3 లక్షల వరకు రుణం',
        category: 'Credit',
        provider: 'Government of India',
        website: 'https://bankofbaroda.com',
        states: ['All India'],
        isActive: true
      },
      {
        nameEn: 'Agricultural Equipment Subsidy',
        nameHi: 'వ్యవసాయ పరికరాల సబ్సిడీ',
        nameTe: 'వ్యవసాయ పరికరాల సబ్సిడీ',
        descriptionEn: 'Subsidy on purchase of modern agricultural machinery',
        descriptionHi: 'ఆధునిక వ్యవసాయ యంత్రాల కొనుగోలుపై సబ్సిడీ',
        descriptionTe: 'ఆధునిక వ్యవసాయ యంత్రాల కొనుగోలుపై సబ్సిడీ',
        eligibilityEn: 'Small and marginal farmers',
        eligibilityHi: 'చిన్న మరియు అంచు రైతులు',
        eligibilityTe: 'చిన్న మరియు అంచు రైతులు',
        benefitsEn: '25-50% subsidy on farm equipment',
        benefitsHi: 'వ్యవసాయ పరికరాలపై 25-50% సబ్సిడీ',
        benefitsTe: 'వ్యవసాయ పరికరాలపై 25-50% సబ్సిడీ',
        category: 'Equipment',
        provider: 'Government of Telangana',
        website: 'https://farmer.gov.in',
        states: ['Telangana'],
        isActive: true
      },
      {
        nameEn: 'Rythu Bandhu Scheme',
        nameHi: 'రైతు బంధు పథకం',
        nameTe: 'రైతు బంధు పథకం',
        descriptionEn: 'Investment support to farmers',
        descriptionHi: 'రైతులకు పెట్టుబడి మద్దతు',
        descriptionTe: 'రైతులకు పెట్టుబడి మద్దతు',
        eligibilityEn: 'Farmers owning land',
        eligibilityHi: 'భూమి కలిగిన రైతులు',
        eligibilityTe: 'భూమి కలిగిన రైతులు',
        benefitsEn: '₹5000 per acre per season',
        benefitsHi: 'ఎకరాకు సీజన్‌కు ₹5000',
        benefitsTe: 'ఎకరాకు సీజన్‌కు ₹5000',
        category: 'Financial Support',
        provider: 'Government of Telangana',
        website: 'https://rythubandhu.telangana.gov.in',
        states: ['Telangana'],
        isActive: true
      }
    ]);

    console.log('Seeded schemes');

    // Seed FAQs
    await FAQ.insertMany([
      {
        questionEn: 'How do I book a machine on AgroEase?',
        questionHi: 'AgroEase లో యంత్రాన్ని ఎలా బుక్ చేయాలి?',
        questionTe: 'AgroEase లో యంత్రాన్ని ఎలా బుక్ చేయాలి?',
        answerEn: 'Browse the available machines, select the one you need, choose your date and time slot, and click Book Now. You will receive a confirmation once the owner approves.',
        answerHi: 'అందుబాటులో ఉన్న యంత్రాలను బ్రౌజ్ చేయండి, మీకు అవసరమైనది ఎంచుకోండి, మీ తేదీ మరియు సమయ స్లాట్ ఎంచుకోండి, మరియు బుక్ నౌ క్లిక్ చేయండి. యజమాని ఆమోదించిన తర్వాత మీకు నిర్ధారణ అందుతుంది.',
        answerTe: 'అందుబాటులో ఉన్న యంత్రాలను బ్రౌజ్ చేయండి, మీకు అవసరమైనది ఎంచుకోండి, మీ తేదీ మరియు సమయ స్లాట్ ఎంచుకోండి, మరియు బుక్ నౌ క్లిక్ చేయండి. యజమాని ఆమోదించిన తర్వాత మీకు నిర్ధారణ అందుతుంది.',
        category: 'Booking',
        isActive: true
      },
      {
        questionEn: 'What documents do I need to book a machine?',
        questionHi: 'యంత్రాన్ని బుక్ చేయడానికి నాకు ఏ పత్రాలు అవసరం?',
        questionTe: 'యంత్రాన్ని బుక్ చేయడానికి నాకు ఏ పత్రాలు అవసరం?',
        answerEn: 'You need to provide your Aadhaar card number and valid contact information. Some owners may require a land ownership proof.',
        answerHi: 'మీ ఆధార్ కార్డ్ నంబర్ మరియు చెల్లుబాటు అయ్యే సంప్రదింపు సమాచారం అందించాలి. కొంతమంది యజమానులు భూమి యాజమాన్య ప్రూఫ్ అవసరం కావచ్చు.',
        answerTe: 'మీ ఆధార్ కార్డ్ నంబర్ మరియు చెల్లుబాటు అయ్యే సంప్రదింపు సమాచారం అందించాలి. కొంతమంది యజమానులు భూమి యాజమాన్య ప్రూఫ్ అవసరం కావచ్చు.',
        category: 'Documents',
        isActive: true
      },
      {
        questionEn: 'Can I cancel my booking?',
        questionHi: 'నా బుకింగ్ రద్దు చేయవచ్చా?',
        questionTe: 'నా బుకింగ్ రద్దు చేయవచ్చా?',
        answerEn: 'Yes, you can cancel your booking up to 24 hours before the scheduled time. Refunds are processed according to our cancellation policy.',
        answerHi: 'అవును, షెడ్యూల్ చేసిన సమయానికి 24 గంటల ముందు వరకు మీ బుకింగ్ రద్దు చేయవచ్చు. రీఫండ్‌లు మా రద్దు విధానం ప్రకారం ప్రాసెస్ చేయబడతాయి.',
        answerTe: 'అవును, షెడ్యూల్ చేసిన సమయానికి 24 గంటల ముందు వరకు మీ బుకింగ్ రద్దు చేయవచ్చు. రీఫండ్‌లు మా రద్దు విధానం ప్రకారం ప్రాసెస్ చేయబడతాయి.',
        category: 'Booking',
        isActive: true
      },
      {
        questionEn: 'How does the pricing work?',
        questionHi: 'ధర ఎలా పనిచేస్తుంది?',
        questionTe: 'ధర ఎలా పనిచేస్తుంది?',
        answerEn: 'Machines can be rented per hour or per day. The price varies based on the machine type and owner. You can see the price on each machine card.',
        answerHi: 'యంత్రాలను గంటకు లేదా రోజుకు అద్దెకు తీసుకోవచ్చు. ధర యంత్ర రకం మరియు యజమాని ఆధారంగా మారుతుంది. ప్రతి యంత్ర కార్డులో ధర చూడవచ్చు.',
        answerTe: 'యంత్రాలను గంటకు లేదా రోజుకు అద్దెకు తీసుకోవచ్చు. ధర యంత్ర రకం మరియు యజమాని ఆధారంగా మారుతుంది. ప్రతి యంత్ర కార్డులో ధర చూడవచ్చు.',
        category: 'Pricing',
        isActive: true
      },
      {
        questionEn: 'What if the machine breaks down during use?',
        questionHi: 'ఉపయోగంలో యంత్రం విచ్ఛిన్నమైతే ఏమి చేయాలి?',
        questionTe: 'ఉపయోగంలో యంత్రం విచ్ఛిన్నమైతే ఏమి చేయాలి?',
        answerEn: 'Contact the machine owner immediately. Most machines come with operator support. Emergency contact numbers are provided in your booking confirmation.',
        answerHi: 'యంత్ర యజమానిని వెంటనే సంప్రదించండి. చాలా యంత్రాలు ఆపరేటర్ మద్దతుతో వస్తాయి. మీ బుకింగ్ నిర్ధారణలో అత్యవసర సంప్రదింపు నంబర్లు అందించబడ్డాయి.',
        answerTe: 'యంత్ర యజమానిని వెంటనే సంప్రదించండి. చాలా యంత్రాలు ఆపరేటర్ మద్దతుతో వస్తాయి. మీ బుకింగ్ నిర్ధారణలో అత్యవసర సంప్రదింపు నంబర్లు అందించబడ్డాయి.',
        category: 'Support',
        isActive: true
      }
    ]);

    console.log('Seeded FAQs');

    // Seed Fertilizers
    await Fertilizer.insertMany([
      {
        nameEn: 'Urea',
        nameHi: 'యూరియా',
        nameTe: 'యూరియా',
        type: 'Nitrogen',
        descriptionEn: 'Primary source of nitrogen for plants',
        descriptionHi: 'మొక్కలకు నైట్రోజన్ ప్రాథమిక మూలం',
        descriptionTe: 'మొక్కలకు నైట్రోజన్ ప్రాథమిక మూలం',
        usageEn: 'Broadcast or side dressing',
        usageHi: 'బ్రాడ్‌కాస్ట్ లేదా సైడ్ డ్రెస్సింగ్',
        usageTe: 'బ్రాడ్‌కాస్ట్ లేదా సైడ్ డ్రెస్సింగ్',
        dosagePerAcre: 'As per crop requirement',
        npkRatio: '46-0-0',
        isActive: true
      },
      {
        nameEn: 'DAP (Diammonium Phosphate)',
        nameHi: 'DAP (డయామోనియం ఫాస్ఫేట్)',
        nameTe: 'DAP (డయామోనియం ఫాస్ఫేట్)',
        type: 'Phosphorus',
        descriptionEn: 'Excellent source of phosphorus and nitrogen',
        descriptionHi: 'ఫాస్ఫరస్ మరియు నైట్రోజన్ యొక్క అద్భుత మూలం',
        descriptionTe: 'ఫాస్ఫరస్ మరియు నైట్రోజన్ యొక్క అద్భుత మూలం',
        usageEn: 'Basal application at sowing',
        usageHi: 'విత్తన సమయంలో బేసల్ అప్లికేషన్',
        usageTe: 'విత్తన సమయంలో బేసల్ అప్లికేషన్',
        dosagePerAcre: '100-125 kg per acre',
        npkRatio: '18-46-0',
        isActive: true
      },
      {
        nameEn: 'MOP (Muriate of Potash)',
        nameHi: 'MOP (మ్యూరియేట్ ఆఫ్ పొటాష్)',
        nameTe: 'MOP (మ్యూరియేట్ ఆఫ్ పొటాష్)',
        type: 'Potassium',
        descriptionEn: 'Source of potassium for crop nutrition',
        descriptionHi: 'పంట పోషణ కోసం పొటాషియం మూలం',
        descriptionTe: 'పంట పోషణ కోసం పొటాషియం మూలం',
        usageEn: 'Basal application',
        usageHi: 'బేసల్ అప్లికేషన్',
        usageTe: 'బేసల్ అప్లికేషన్',
        dosagePerAcre: '50-60 kg per acre',
        npkRatio: '0-0-60',
        isActive: true
      },
      {
        nameEn: 'NPK 10-26-26',
        nameHi: 'NPK 10-26-26',
        nameTe: 'NPK 10-26-26',
        type: 'Complex',
        descriptionEn: 'Balanced fertilizer for flowering and fruiting',
        descriptionHi: 'పుష్పించడం మరియు ఫలాలు కాయడం కోసం సమతుల్య ఎరువు',
        descriptionTe: 'పుష్పించడం మరియు ఫలాలు కాయడం కోసం సమతుల్య ఎరువు',
        usageEn: 'Basal or top dressing',
        usageHi: 'బేసల్ లేదా టాప్ డ్రెస్సింగ్',
        usageTe: 'బేసల్ లేదా టాప్ డ్రెస్సింగ్',
        dosagePerAcre: '100 kg per acre',
        npkRatio: '10-26-26',
        isActive: true
      }
    ]);

    console.log('Seeded fertilizers');

    // Seed Diseases
    await Disease.insertMany([
      {
        nameEn: 'Rice Blast',
        nameHi: 'రైస్ బ్లాస్ట్',
        nameTe: 'రైస్ బ్లాస్ట్',
        crop: 'Rice',
        symptomsEn: 'Diamond-shaped lesions with gray centers on leaves',
        symptomsHi: 'ఆకులపై బూడిద రంగు కేంద్రాలతో వజ్రాకార గాయాలు',
        symptomsTe: 'ఆకులపై బూడిద రంగు కేంద్రాలతో వజ్రాకార గాయాలు',
        causesEn: 'Fungus (Magnaporthe oryzae)',
        causesHi: 'శిలీంధ్రం (Magnaporthe oryzae)',
        causesTe: 'శిలీంధ్రం (Magnaporthe oryzae)',
        treatmentEn: 'Use Tricyclazole or Isoprothiolane fungicides',
        treatmentHi: 'ట్రైసైక్లజోల్ లేదా ఐసోప్రోథియోలేన్ శిలీంధ్రనాశకాలు ఉపయోగించండి',
        treatmentTe: 'ట్రైసైక్లజోల్ లేదా ఐసోప్రోథియోలేన్ శిలీంధ్రనాశకాలు ఉపయోగించండి',
        preventionEn: 'Use resistant varieties, avoid excess nitrogen',
        preventionHi: 'నిరోధక రకాలు ఉపయోగించండి, అధిక నైట్రోజన్ నివారించండి',
        preventionTe: 'నిరోధక రకాలు ఉపయోగించండి, అధిక నైట్రోజన్ నివారించండి',
        isActive: true
      },
      {
        nameEn: 'Cotton Leaf Curl Virus',
        nameHi: 'కాటన్ లీఫ్ కర్ల్ వైరస్',
        nameTe: 'కాటన్ లీఫ్ కర్ల్ వైరస్',
        crop: 'Cotton',
        symptomsEn: 'Curling and thickening of leaves, vein swelling',
        symptomsHi: 'ఆకులు ముడుచుకోవడం మరియు మందపడటం, నరాలు ఉబ్బరం',
        symptomsTe: 'ఆకులు ముడుచుకోవడం మరియు మందపడటం, నరాలు ఉబ్బరం',
        causesEn: 'Whitefly transmitted virus',
        causesHi: 'వైట్‌ఫ్లై సంక్రమించే వైరస్',
        causesTe: 'వైట్‌ఫ్లై సంక్రమించే వైరస్',
        treatmentEn: 'Use Imidacloprid for vector control',
        treatmentHi: 'వెక్టర్ నియంత్రణ కోసం ఇమిడాక్లోప్రిడ్ ఉపయోగించండి',
        treatmentTe: 'వెక్టర్ నియంత్రణ కోసం ఇమిడాక్లోప్రిడ్ ఉపయోగించండి',
        preventionEn: 'Use resistant varieties, early sowing',
        preventionHi: 'నిరోధక రకాలు ఉపయోగించండి, ముందస్తు విత్తనం',
        preventionTe: 'నిరోధక రకాలు ఉపయోగించండి, ముందస్తు విత్తనం',
        isActive: true
      },
      {
        nameEn: 'Wheat Rust',
        nameHi: 'వీట్ రస్ట్',
        nameTe: 'వీట్ రస్ట్',
        crop: 'Wheat',
        symptomsEn: 'Orange-brown pustules on leaves and stems',
        symptomsHi: 'ఆకులు మరియు కాండాలపై నారింజ-గోధుమ రంగు పుళ్ళు',
        symptomsTe: 'ఆకులు మరియు కాండాలపై నారింజ-గోధుమ రంగు పుళ్ళు',
        causesEn: 'Fungus (Puccinia species)',
        causesHi: 'శిలీంధ్రం (Puccinia species)',
        causesTe: 'శిలీంధ్రం (Puccinia species)',
        treatmentEn: 'Use Propiconazole or Tebuconazole',
        treatmentHi: 'ప్రోపికోనజోల్ లేదా టెబుకోనజోల్ ఉపయోగించండి',
        treatmentTe: 'ప్రోపికోనజోల్ లేదా టెబుకోనజోల్ ఉపయోగించండి',
        preventionEn: 'Use resistant varieties, timely sowing',
        preventionHi: 'నిరోధక రకాలు ఉపయోగించండి, సమయానికి విత్తనం',
        preventionTe: 'నిరోధక రకాలు ఉపయోగించండి, సమయానికి విత్తనం',
        isActive: true
      },
      {
        nameEn: 'Groundnut Leaf Spot',
        nameHi: 'గ్రౌండ్‌నట్ లీఫ్ స్పాట్',
        nameTe: 'గ్రౌండ్‌నట్ లీఫ్ స్పాట్',
        crop: 'Groundnut',
        symptomsEn: 'Brown spots on leaves with yellow halos',
        symptomsHi: 'పసుపు రంగు హాలోలతో ఆకులపై గోధుమ రంగు మచ్చలు',
        symptomsTe: 'పసుపు రంగు హాలోలతో ఆకులపై గోధుమ రంగు మచ్చలు',
        causesEn: 'Fungus (Cercospora arachidicola)',
        causesHi: 'శిలీంధ్రం (Cercospora arachidicola)',
        causesTe: 'శిలీంధ్రం (Cercospora arachidicola)',
        treatmentEn: 'Use Mancozeb or Carbendazim',
        treatmentHi: 'మాన్‌కోజెబ్ లేదా కార్బెండాజిమ్ ఉపయోగించండి',
        treatmentTe: 'మాన్‌కోజెబ్ లేదా కార్బెండాజిమ్ ఉపయోగించండి',
        preventionEn: 'Crop rotation, proper spacing',
        preventionHi: 'పంట మార్పిడి, సరైన అంతరం',
        preventionTe: 'పంట మార్పిడి, సరైన అంతరం',
        isActive: true
      }
    ]);

    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
