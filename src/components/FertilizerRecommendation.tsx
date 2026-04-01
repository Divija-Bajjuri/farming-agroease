import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';

interface FertResult {
  nitrogen: number; phosphorus: number; potassium: number;
  recommendation: string; organic: string; schedule: string;
}

const SOIL_TYPES = [
  { en: 'Alluvial', hi: 'जलोढ़', te: 'ఒండ్రు' },
  { en: 'Black (Regur)', hi: 'काली (रेगुर)', te: 'నల్ల (రేగూర్)' },
  { en: 'Red', hi: 'लाल', te: 'ఎరుపు' },
  { en: 'Laterite', hi: 'लैटेराइट', te: 'లాటరైట్' },
  { en: 'Sandy', hi: 'रेतीली', te: 'ఇసుక' },
  { en: 'Clay', hi: 'चिकनी मिट्टी', te: 'బంకమట్టి' },
];

const CROP_DATA: Record<string, { n: number; p: number; k: number; organic: Record<string, string>; schedule: Record<string, string> }> = {
  Rice: { n: 120, p: 60, k: 40, organic: { en: 'Vermicompost 5t/ha + Neem cake 250kg/ha + Azolla as green manure', hi: 'वर्मीकम्पोस्ट 5t/ha + नीम खली 250kg/ha + एज़ोला हरी खाद', te: 'వర్మీకంపోస్ట్ 5t/ha + వేపపిండి 250kg/ha + అజోల్లా పచ్చిరొట్ట' }, schedule: { en: 'Basal: 50% N + full P + full K at transplanting. Top dress: 25% N at tillering, 25% N at panicle initiation', hi: 'रोपाई पर: 50% N + पूरा P + पूरा K। टॉप ड्रेस: 25% N कल्ले निकलने पर, 25% N बाली निकलने पर', te: 'నాట్ల సమయంలో: 50% N + పూర్తి P + పూర్తి K. టాప్ డ్రెస్: 25% N పిలకలు వేసేటప్పుడు, 25% N కంకి వచ్చేటప్పుడు' } },
  Wheat: { n: 150, p: 60, k: 40, organic: { en: 'FYM 10t/ha + Vermicompost 3t/ha + Azotobacter seed treatment', hi: 'FYM 10t/ha + वर्मीकम्पोस्ट 3t/ha + एज़ोटोबैक्टर बीज उपचार', te: 'FYM 10t/ha + వర్మీకంపోస్ట్ 3t/ha + అజోటోబాక్టర్ విత్తన శుద్ధి' }, schedule: { en: 'Basal: 50% N + full P + full K at sowing. Top dress: 25% N at CRI stage, 25% N at boot stage', hi: 'बुवाई पर: 50% N + पूरा P + पूरा K। 25% N CRI अवस्था पर, 25% N बूट अवस्था पर', te: 'విత్తనం వేసేటప్పుడు: 50% N + పూర్తి P + పూర్తి K. 25% N CRI దశలో, 25% N బూట్ దశలో' } },
  Cotton: { n: 120, p: 60, k: 60, organic: { en: 'FYM 12t/ha + Neem cake 500kg/ha + Phosphobacteria', hi: 'FYM 12t/ha + नीम खली 500kg/ha + फॉस्फोबैक्टीरिया', te: 'FYM 12t/ha + వేపపిండి 500kg/ha + ఫాస్ఫోబాక్టీరియా' }, schedule: { en: 'Basal: 50% N + full P + 50% K. Top dress: 25% N at squaring, 25% N + 50% K at flowering', hi: 'बेसल: 50% N + पूरा P + 50% K। 25% N स्क्वेयरिंग पर, 25% N + 50% K फूल आने पर', te: 'బేసల్: 50% N + పూర్తి P + 50% K. 25% N స్క్వేరింగ్ సమయంలో, 25% N + 50% K పూత సమయంలో' } },
  Maize: { n: 150, p: 75, k: 40, organic: { en: 'FYM 10t/ha + Vermicompost 5t/ha + Azospirillum', hi: 'FYM 10t/ha + वर्मीकम्पोस्ट 5t/ha + एज़ोस्पिरिलम', te: 'FYM 10t/ha + వర్మీకంపోస్ట్ 5t/ha + అజోస్పిరిల్లం' }, schedule: { en: 'Basal: 33% N + full P + full K. Top dress: 33% N at knee-high, 33% N at tasseling', hi: 'बेसल: 33% N + पूरा P + पूरा K। 33% N घुटने तक ऊंचाई पर, 33% N टैसलिंग पर', te: 'బేసల్: 33% N + పూర్తి P + పూర్తి K. 33% N మోకాలి ఎత్తులో, 33% N టాసెలింగ్ సమయంలో' } },
  Tomato: { n: 120, p: 80, k: 80, organic: { en: 'Vermicompost 8t/ha + Neem cake 500kg/ha + Trichoderma', hi: 'वर्मीकम्पोस्ट 8t/ha + नीम खली 500kg/ha + ट्राइकोडर्मा', te: 'వర్మీకంపోస్ట్ 8t/ha + వేపపిండి 500kg/ha + ట్రైకోడెర్మా' }, schedule: { en: 'Basal: 50% N + full P + 50% K at transplanting. Top dress: 25% N at flowering, 25% N + 50% K at fruiting', hi: 'रोपाई पर: 50% N + पूरा P + 50% K। 25% N फूल आने पर, 25% N + 50% K फल लगने पर', te: 'నాట్ల సమయంలో: 50% N + పూర్తి P + 50% K. 25% N పూత సమయంలో, 25% N + 50% K కాయ కాసేటప్పుడు' } },
  Sugarcane: { n: 250, p: 100, k: 120, organic: { en: 'FYM 25t/ha + Press mud 10t/ha + Azotobacter + PSB', hi: 'FYM 25t/ha + प्रेस मड 10t/ha + एज़ोटोबैक्टर + PSB', te: 'FYM 25t/ha + ప్రెస్ మడ్ 10t/ha + అజోటోబాక్టర్ + PSB' }, schedule: { en: 'Basal: 33% N + full P + 33% K. Top dress: 33% N at 45 days, 33% N + 33% K at 90 days, 33% K at 120 days', hi: 'बेसल: 33% N + पूरा P + 33% K। 33% N 45 दिन पर, 33% N + 33% K 90 दिन पर, 33% K 120 दिन पर', te: 'బేసల్: 33% N + పూర్తి P + 33% K. 33% N 45 రోజులకు, 33% N + 33% K 90 రోజులకు, 33% K 120 రోజులకు' } },
};

const FertilizerRecommendation: React.FC = () => {
  const { t, language } = useLanguage();
  const { darkMode, setCurrentPage } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('');
  const [farmSize, setFarmSize] = useState('1');
  const [result, setResult] = useState<FertResult | null>(null);

  const calculate = () => {
    if (!selectedCrop || !selectedSoil) return;
    const data = CROP_DATA[selectedCrop];
    if (!data) return;
    const size = parseFloat(farmSize) || 1;
    setResult({
      nitrogen: Math.round(data.n * size),
      phosphorus: Math.round(data.p * size),
      potassium: Math.round(data.k * size),
      recommendation: language === 'hi' ? `${selectedCrop} के लिए ${selectedSoil} मिट्टी में ${size} एकड़ के लिए सिफारिश` : language === 'te' ? `${selectedCrop} కోసం ${selectedSoil} నేలలో ${size} ఎకరాలకు సిఫారసు` : `Recommendation for ${selectedCrop} in ${selectedSoil} soil for ${size} acres`,
      organic: data.organic[language] || data.organic.en,
      schedule: data.schedule[language] || data.schedule.en,
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
            <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('fert.title')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
            <div className="mb-5">
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>{t('fert.cropType')}</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(CROP_DATA).map(crop => (
                  <button key={crop} onClick={() => setSelectedCrop(crop)}
                    className={`py-3 rounded-xl text-sm font-semibold transition ${
                      selectedCrop === crop ? 'bg-green-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-green-50 dark:hover:bg-green-900/20`
                    }`}>
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>{t('fert.soilType')}</label>
              <div className="grid grid-cols-2 gap-2">
                {SOIL_TYPES.map(soil => (
                  <button key={soil.en} onClick={() => setSelectedSoil(soil.en)}
                    className={`py-3 rounded-xl text-sm font-semibold transition ${
                      selectedSoil === soil.en ? 'bg-amber-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-amber-50 dark:hover:bg-amber-900/20`
                    }`}>
                    {language === 'hi' ? soil.hi : language === 'te' ? soil.te : soil.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>{t('auth.farmSize')}</label>
              <input type="number" value={farmSize} onChange={e => setFarmSize(e.target.value)} min="0.5" step="0.5"
                className={`w-full px-4 py-3 border-2 rounded-xl text-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-green-500 focus:ring-0`} />
            </div>

            <button onClick={calculate} disabled={!selectedCrop || !selectedSoil}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50">
              {t('fert.recommend')}
            </button>
          </div>

          {/* Result */}
          <div>
            {result ? (
              <div className="space-y-4">
                {/* NPK Values */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>NPK {language === 'hi' ? 'सिफारिश' : language === 'te' ? 'సిఫారసు' : 'Recommendation'}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{result.recommendation}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: t('fert.nitrogen'), value: result.nitrogen, color: 'from-blue-500 to-blue-600', unit: 'kg' },
                      { label: t('fert.phosphorus'), value: result.phosphorus, color: 'from-red-500 to-red-600', unit: 'kg' },
                      { label: t('fert.potassium'), value: result.potassium, color: 'from-purple-500 to-purple-600', unit: 'kg' },
                    ].map((item, i) => (
                      <div key={i} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-center text-white`}>
                        <div className="text-3xl font-extrabold">{item.value}</div>
                        <div className="text-xs opacity-80">{item.unit}</div>
                        <div className="text-sm font-medium mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 flex items-center gap-2`}>
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {t('fert.schedule')}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{result.schedule}</p>
                </div>

                {/* Organic */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6`}>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 flex items-center gap-2`}>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    {t('fert.organic')}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{result.organic}</p>
                </div>
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 text-center`}>
                <svg className={`w-20 h-20 mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'hi' ? 'फसल और मिट्टी चुनकर सिफारिश प्राप्त करें' : language === 'te' ? 'పంట మరియు నేల ఎంచుకుని సిఫారసు పొందండి' : 'Select crop and soil type to get recommendation'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
