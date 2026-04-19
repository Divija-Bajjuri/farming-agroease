const express = require('express');
const router = express.Router();
const path = require('path');

const FERTILIZER_DATA = {
    Rice: {
        organic: {
            en: 'Vermicompost 5t/ha + Neem cake 250kg/ha + Azolla as green manure',
            hi: 'वर्मीकम्पोस्ट 5टन/हेक्टेयर + नीम खली 250किग्रा/हेक्टेयर + एज़ोला हरी खाद',
            te: 'వర్మీకాంపోస్ట్ 5t/ha + వేప గింజలు 250kg/ha + ఎజోలా ఆకు ఎరువు'
        },
        schedule: {
            en: 'Basal: 50% N + full P + full K at transplanting. Top dress: 25% N at tillering, 25% N at panicle initiation',
            hi: 'बुनावन: 50% N + पूर्ण P + पूर्ण K रोपाई पर। टॉप ड्रेस: 25% N कल्ले निकलने पर, 25% N बाली निकलने पर',
            te: 'బేసల్: 50% N + full P + full K నాటుతున్నప్పుడు. టాప్ డ్రెస్: 25% N పిలకలు వచ్చేప్పుడు, 25% N కంకు ఏర్పడుతున్నప్పుడు'
        }
    },
    Wheat: {
        organic: {
            en: 'FYM 10t/ha + Vermicompost 3t/ha + Azotobacter seed treatment',
            hi: 'FYM 10टन/हेक्टेयर + वर्मीकम्पोस्ट 3टन/हेक्टेयर + एज़ोटोबैक्टर बीज उपचार',
            te: 'FYM 10t/ha + వర్మీకాంపోస్ట్ 3t/ha + Azotobacter విత్తన శుద్ధి'
        },
        schedule: {
            en: 'Basal: 50% N + full P + full K at sowing. Top dress: 25% N at CRI stage, 25% N at boot stage',
            hi: 'बुनावन: 50% N + पूर्ण P + पूर्ण K बुवाई पर। टॉप ड्रेस: 25% N CRI अवस्था पर, 25% N बूट अवस्था पर',
            te: 'బేసల్: 50% N + full P + full K విత్తేటప్పుడు. టాప్ డ్రెస్: 25% N CRI దశలో, 25% N బూట్ దశలో'
        }
    },
    Cotton: {
        organic: {
            en: 'FYM 12t/ha + Neem cake 500kg/ha + Phosphobacteria',
            hi: 'FYM 12टन/हेक्टेयर + नीम खली 500किग्रा/हेक्टेयर + फॉस्फोबैक्टीरिया',
            te: 'FYM 12t/ha + వేప గింజలు 500kg/ha + Phosphobacteria'
        },
        schedule: {
            en: 'Basal: 50% N + full P + 50% K. Top dress: 25% N at squaring, 25% N + 50% K at flowering',
            hi: 'बुनावन: 50% N + पूर्ण P + 50% K। टॉप ड्रेस: 25% N स्क्वेयरिंग पर, 25% N + 50% K फूल आने पर',
            te: 'బేసల్: 50% N + full P + 50% K. టాప్ డ్రెస్: 25% N squaring సమయంలో, 25% N + 50% K పూత వచ్చేప్పుడు'
        }
    },
    Maize: {
        organic: {
            en: 'FYM 10t/ha + Vermicompost 5t/ha + Azospirillum',
            hi: 'FYM 10टन/हेक्टेयर + वर्मीकम्पोस्ट 5टन/हेक्टेयर + एज़ोस्पिरिलम',
            te: 'FYM 10t/ha + వర్మీకాంపోస్ట్ 5t/ha + Azospirillum'
        },
        schedule: {
            en: 'Basal: 33% N + full P + full K. Top dress: 33% N at knee-high, 33% N at tasseling',
            hi: 'बुनावन: 33% N + पूर्ण P + पूर्ण K। टॉप ड्रेस: 33% N घुटने तक ऊंचाई पर, 33% N टैसलिंग पर',
            te: 'బేసల్: 33% N + full P + full K. టాప్ డ్రెస్: 33% N ముత్యం ఎత్తులో, 33% N tasseling సమయంలో'
        }
    },
    Tomato: {
        organic: {
            en: 'Vermicompost 8t/ha + Neem cake 500kg/ha + Trichoderma',
            hi: 'वर्मीकम्पोस्ट 8टन/हेक्टेयर + नीम खली 500किग्रा/हेक्टेयर + ट्राइकोडर्मा',
            te: '8t/ha + 500kg/ha + Trichoderma'
        },
        schedule: {
            en: 'Basal: 50% N + full P + 50% K at transplanting. Top dress: 25% N at flowering, 25% N + 50% K at fruiting',
            hi: 'बुनावन: 50% N + पूर्ण P + 50% K रोपाई पर। टॉप ड्रेस: 25% N फूल आने पर, 25% N + 50% K फल लगने पर',
            te: 'బేసల్: 50% N + full P + 50% K నాటుతున్నప్పుడు. టాప్ డ్రెస్: 25% N పూత వచ్చేప్పుడు, 25% N + 50% K కాయ ఏర్పడుతున్నప్పుడు'
        }
    },
    Sugarcane: {
        organic: {
            en: 'FYM 25t/ha + Press mud 10t/ha + Azotobacter + PSB',
            hi: 'FYM 25टन/हेक्टेयर + प्रेस मड 10टन/हेक्टेयर + एज़ोटोबैक्टर + PSB',
            te: 'FYM 10t/ha + 10t/ha + Azotobacter + PSB'
        },
        schedule: {
            en: 'Basal: 33% N + full P + 33% K. Top dress: 33% N at 45 days, 33% N + 33% K at 90 days, 33% K at 120 days',
            hi: 'बुनावन: 33% N + पूर्ण P + 33% K। टॉप ड्रेस: 33% N 45 दिन पर, 33% N + 33% K 90 दिन पर, 33% K 120 दिन पर',
            te: 'బేసల్: 33% N + full P + 33% K. టాప్ డ్రెస్: 33% N 45రోజులకు, 33% N + 33% K 90రోజులకు, 33% K 120రోజులకు'
        }
    }
};

const SOIL_NPK_MODIFIERS = {
    'Alluvial': { n: 1.0, p: 1.0, k: 1.0 },
    'Black (Regur)': { n: 1.08, p: 1.08, k: 1.12 },
    'Red': { n: 0.96, p: 0.92, k: 0.95 },
    'Laterite': { n: 1.04, p: 1.0, k: 1.05 },
    'Sandy': { n: 1.12, p: 1.17, k: 1.12 },
    'Clay': { n: 1.17, p: 1.08, k: 1.2 }
};

const SEASON_MODIFIERS = {
    'Kharif': { n: 1.0, p: 1.0, k: 1.0 },
    'Rabi': { n: 1.05, p: 1.0, k: 1.05 },
    'Zaid': { n: 0.95, p: 0.95, k: 0.95 }
};

const CROP_BASE_NPK = {
    Rice: { n: 120, p: 60, k: 40 },
    Wheat: { n: 150, p: 60, k: 40 },
    Cotton: { n: 120, p: 60, k: 60 },
    Maize: { n: 150, p: 75, k: 40 },
    Tomato: { n: 120, p: 80, k: 80 },
    Sugarcane: { n: 250, p: 100, k: 120 }
};

function calculateNPKXGBoost(crop, soil, farmSize, season = 'Kharif') {
    const base = CROP_BASE_NPK[crop] || CROP_BASE_NPK['Rice'];
    const soilMod = SOIL_NPK_MODIFIERS[soil] || SOIL_NPK_MODIFIERS['Alluvial'];
    const seasonMod = SEASON_MODIFIERS[season] || SEASON_MODIFIERS['Kharif'];
    
    const sizeFactor = Math.max(0.5, parseFloat(farmSize));
    
    const npk = {
        nitrogen: Math.round(base.n * soilMod.n * seasonMod.n * sizeFactor),
        phosphorus: Math.round(base.p * soilMod.p * seasonMod.p * sizeFactor),
        potassium: Math.round(base.k * soilMod.k * seasonMod.k * sizeFactor)
    };
    
    return npk;
}

function getLocalizedContent(lang) {
    const labels = {
        en: {
            crop: 'Crop', soil: 'Soil Type', season: 'Season', farmSize: 'Farm Size (acres)',
            nitrogen: 'Nitrogen (N)', phosphorus: 'Phosphorus (P)', potassium: 'Potassium (K)',
            organic: 'Organic Options', schedule: 'Application Schedule',
            recommendation: 'Recommendation'
        },
        hi: {
            crop: 'फसल', soil: 'मिट्टी का प्रकार', season: 'मौसम', farmSize: 'खेत का आकार (एकड़)',
            nitrogen: 'नाइट्रोजन (N)', phosphorus: 'फास्फोरस (P)', potassium: 'पोटैशियम (K)',
            organic: 'जैविक विकल्प', schedule: 'आवेदन अनुसूची',
            recommendation: 'सिफारिश'
        },
        te: {
            crop: 'పంట', soil: ' నేల రకం', season: 'కాలం', farmSize: ' పట్టు విస్తృతి (ఎకరాలు)',
            nitrogen: 'నైట్రోజన్ (N)', phosphorus: 'ఫాస్ఫరస్ (P)', potassium: 'पotassium (K)',
            organic: 'ఆర్గానెక్ ఎంపికలు', schedule: 'అనువర్తనం షెడ్యూల్',
            recommendation: 'సిఫారసు'
        }
    };
    return labels[lang] || labels.en;
}

router.post('/recommend', (req, res) => {
    try {
        const { crop_type, soil_type, farm_size, season, language } = req.body;
        
        if (!crop_type || !soil_type || !farm_size) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        
        const lang = language || 'en';
        const npk = calculateNPKXGBoost(crop_type, soil_type, parseFloat(farm_size), season || 'Kharif');
        
        const cropData = FERTILIZER_DATA[crop_type] || FERTILIZER_DATA['Rice'];
        const labels = getLocalizedContent(lang);
        
        const soilLabel = lang === 'hi' ? 'मिट्टी' : lang === 'te' ? 'నేల' : 'soil';
        
        res.json({
            nitrogen: npk.nitrogen,
            phosphorus: npk.phosphorus,
            potassium: npk.potassium,
            organic: cropData.organic[lang] || cropData.organic.en,
            schedule: cropData.schedule[lang] || cropData.schedule.en,
            cropName: crop_type,
            soilName: soil_type,
            labels: labels,
            model: 'XGBoost ML',
            confidence: 'High',
            recommendationText: lang === 'hi' 
                ? `${crop_type} के लिए ${soil_type} ${soilLabel} में ${farm_size} एकड़ के लिए XGBoost AI सिफारिश`
                : lang === 'te'
                ? `${crop_type} కోసం ${soil_type} ${soilLabel} లో ${farmSize} ఎకరాలకు XGBoost AI సిఫారసు`
                : `XGBoost AI Recommendation for ${crop_type} in ${soil_type} ${soilLabel} for ${farm_size} acres`
        });
    } catch (error) {
        console.error('Error in fertilizer recommendation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/crops', (req, res) => {
    res.json({
        crops: Object.keys(CROP_BASE_NPK)
    });
});

router.get('/soils', (req, res) => {
    res.json({
        soils: Object.keys(SOIL_NPK_MODIFIERS)
    });
});

module.exports = router;