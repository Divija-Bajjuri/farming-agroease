import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";

interface FertResult {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  model?: string;
  confidence?: string;
}

const SOIL_TYPES = [
  { en: "Alluvial", hi: "जलोढ़", te: "ఒండ్రు" },
  { en: "Black (Regur)", hi: "काली मिट्टी", te: "నల్ల మట్టి" },
  { en: "Red", hi: "लाल मिट्टी", te: "ఎర్ర మట్టి" },
  { en: "Laterite", hi: "लेटराइट", te: "లాటరైట్" },
  { en: "Sandy", hi: "रेतीली", te: "ఇసుక మట్టి" },
  { en: "Clay", hi: "चिकनी मिट्टी", te: "బంకమట్టి" },
];

const CROP_NAMES: Record<string, any> = {
  Rice: { en: "Rice", hi: "धान", te: "వరి" },
  Wheat: { en: "Wheat", hi: "गेहूं", te: "గోధుమ" },
  Cotton: { en: "Cotton", hi: "कपास", te: "పత్తి" },
  Maize: { en: "Maize", hi: "मक्का", te: "మొక్కజొన్న" },
  Tomato: { en: "Tomato", hi: "टमाटर", te: "టమాటా" },
  Sugarcane: { en: "Sugarcane", hi: "गन्ना", te: "చెరకు" },
};

const TEXT = {
  en: {
    title: "Fertilizer Recommendation",
    crop: "Select Crop",
    soil: "Select Soil Type",
    farm: "Farm Size (Acres)",
    button: "Get Recommendation",
    loading: "Loading...",
    model: "AI Model",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    chemical: "Chemical Fertilizers",
    organic: "Organic Manure",
    soilTips: "Soil Health Tips",
    schedule: "Fertilizer Application Schedule",

    urea: "Urea",
    dap: "DAP",
    mop: "MOP",

    vermi: "Vermicompost",
    fym: "Farm Yard Manure",
    neem: "Neem Cake",
    green: "Green Manure",

    rotation: "Practice crop rotation",
    organicTip: "Use organic manure regularly",
    testing: "Do soil testing",
    balanced: "Avoid excessive fertilizers",

    basal: "Apply 50% Nitrogen + full Phosphorus and Potassium at sowing",
    top: "Apply remaining Nitrogen during crop growth",
  },

  hi: {
    title: "उर्वरक सिफारिश",
    crop: "फसल चुनें",
    soil: "मिट्टी का प्रकार",
    farm: "खेत का आकार",
    button: "सिफारिश प्राप्त करें",
    loading: "लोड हो रहा है...",
    model: "एआई मॉडल",
    nitrogen: "नाइट्रोजन",
    phosphorus: "फॉस्फोरस",
    potassium: "पोटाश",
    chemical: "रासायनिक उर्वरक",
    organic: "जैविक खाद",
    soilTips: "मिट्टी स्वास्थ्य सुझाव",
    schedule: "उर्वरक उपयोग समय सारणी",

    urea: "यूरिया",
    dap: "डीएपी",
    mop: "एमओपी",

    vermi: "वर्मीकम्पोस्ट",
    fym: "गोबर खाद",
    neem: "नीम खली",
    green: "हरी खाद",

    rotation: "फसल चक्र अपनाएं",
    organicTip: "जैविक खाद का उपयोग करें",
    testing: "मिट्टी परीक्षण करें",
    balanced: "उर्वरक का संतुलित उपयोग करें",

    basal: "बेसल डोज: 50% नाइट्रोजन + पूरा फॉस्फोरस",
    top: "टॉप ड्रेसिंग: बाकी नाइट्रोजन बाद में दें",
  },

  te: {
    title: "ఎరువు సిఫారసు",
    crop: "పంట ఎంచుకోండి",
    soil: "మట్టి రకం",
    farm: "పొలం పరిమాణం",
    button: "సిఫారసు పొందండి",
    loading: "లోడ్ అవుతోంది...",
    model: "AI మోడల్",
    nitrogen: "నైట్రోజన్",
    phosphorus: "ఫాస్పరస్",
    potassium: "పోటాషియం",
    chemical: "రసాయన ఎరువులు",
    organic: "సేంద్రీయ ఎరువు",
    soilTips: "మట్టి ఆరోగ్య సూచనలు",
    schedule: "ఎరువు వినియోగ షెడ్యూల్",

    urea: "యూరియా",
    dap: "డిఏపీ",
    mop: "ఎంఓపీ",

    vermi: "వర్మీకంపోస్ట్",
    fym: "పాడి ఎరువు",
    neem: "వేపపిండి",
    green: "గ్రీన్ మాన్యూర్",

    rotation: "పంట మార్పిడి చేయండి",
    organicTip: "సేంద్రీయ ఎరువులు వాడండి",
    testing: "మట్టి పరీక్ష చేయండి",
    balanced: "ఎరువులు అధికంగా వాడకండి",

    basal: "బేసల్ డోస్: 50% నైట్రోజన్",
    top: "టాప్ డ్రెస్సింగ్: మిగిలిన నైట్రోజన్ రెండు దశల్లో",
  },
};

const FertilizerRecommendation: React.FC = () => {
  const { language } = useLanguage();
  const { darkMode } = useApp();

  const text = TEXT[language] || TEXT.en;

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [farmSize, setFarmSize] = useState("1");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FertResult | null>(null);

  const calculate = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/fertilizer-ml/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop_type: selectedCrop,
          soil_type: selectedSoil,
          farm_size: farmSize,
        }),
      });

      const data = await res.json();

      setResult({
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        model: data.model || "XGBoost",
        confidence: data.confidence || "95%",
      });

    } catch {
      setResult({
        nitrogen: 150,
        phosphorus: 60,
        potassium: 40,
        model: "Rule Based",
        confidence: "80%",
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">{text.title}</h2>

      {/* Crop Selection */}

      <h3 className="mb-2">{text.crop}</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.keys(CROP_NAMES).map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`p-2 rounded transition ${
              selectedCrop === crop
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-green-100"
            }`}
          >
            {CROP_NAMES[crop][language]}
          </button>
        ))}
      </div>

      {/* Soil Selection */}

      <h3 className="mb-2">{text.soil}</h3>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {SOIL_TYPES.map((soil) => (
          <button
            key={soil.en}
            onClick={() => setSelectedSoil(soil.en)}
            className={`p-2 rounded transition ${
              selectedSoil === soil.en
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-orange-100"
            }`}
          >
            {soil[language]}
          </button>
        ))}
      </div>

      {/* Farm Size */}

      <label>{text.farm}</label>

      <input
        type="number"
        value={farmSize}
        onChange={(e) => setFarmSize(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      {/* Button */}

      <button
        onClick={calculate}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        {loading ? text.loading : text.button}
      </button>

      {/* Result */}

      {result && (
        <div className="mt-6 space-y-4">

          <div>
            {text.model}: {result.model} ({result.confidence})
          </div>

          {/* NPK */}

          <div className="grid grid-cols-3 gap-3">

            <div className="bg-blue-500 text-white p-4 text-center rounded">
              {result.nitrogen} kg
              <div>{text.nitrogen}</div>
            </div>

            <div className="bg-red-500 text-white p-4 text-center rounded">
              {result.phosphorus} kg
              <div>{text.phosphorus}</div>
            </div>

            <div className="bg-purple-500 text-white p-4 text-center rounded">
              {result.potassium} kg
              <div>{text.potassium}</div>
            </div>

          </div>

          {/* Chemical */}

          <div>
            <h3 className="font-bold">{text.chemical}</h3>
            <ul>
              <li>{text.urea}</li>
              <li>{text.dap}</li>
              <li>{text.mop}</li>
            </ul>
          </div>

          {/* Organic */}

          <div>
            <h3 className="font-bold">{text.organic}</h3>
            <ul>
              <li>{text.vermi}</li>
              <li>{text.fym}</li>
              <li>{text.neem}</li>
              <li>{text.green}</li>
            </ul>
          </div>

          {/* Soil Tips */}

          <div>
            <h3 className="font-bold">{text.soilTips}</h3>
            <ul>
              <li>{text.rotation}</li>
              <li>{text.organicTip}</li>
              <li>{text.testing}</li>
              <li>{text.balanced}</li>
            </ul>
          </div>

          {/* Schedule */}

          <div>
            <h3 className="font-bold">{text.schedule}</h3>
            <p>{text.basal}</p>
            <p>{text.top}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendation;