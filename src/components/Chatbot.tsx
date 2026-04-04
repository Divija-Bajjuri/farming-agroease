import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { darkMode, setCurrentPage, setMachineFilter } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      text: language === 'hi' ? 'नमस्ते! मैं कृषिमित्र हूं। खेती के बारे में कुछ भी पूछें!' 
        : language === 'te' ? 'నమస్కారం! నేను కృషిమిత్ర. వ్యవసాయం గురించి ఏదైనా అడగండి!' 
        : 'Hello! I am KrishiMitra. Ask me anything about farming!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lastTopic, setLastTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
useEffect(() => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}, [language]);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, language]);
// LOCAL CHATBOT LOGIC
const processQueryLocally = (
  
  message: string,
  lang: string
): { response: string; navigation?: string; machineType?: string } => {

  const lowerMessage = message.toLowerCase();
  const machineNames = {
  Tractor: {
    en: "Tractor",
    hi: "ट्रैक्टर",
    te: "ట్రాక్టర్"
  },
  Harvester: {
    en: "Harvester",
    hi: "हार्वेस्टर",
    te: "హార్వెస్టర్"
  }
};
   if (
    lowerMessage.includes("open it") ||
    lowerMessage.includes("take me there") ||
    lowerMessage.includes("open page") ||
    lowerMessage.includes("ओपन") ||
    lowerMessage.includes("पेज खोलो") ||
    lowerMessage.includes("वहां ले जाओ") ||
    lowerMessage.includes("ఓపెన్") ||
    lowerMessage.includes("పేజీ తెరవండి") ||
    lowerMessage.includes("తీసుకెళ్ళు") ||
    lowerMessage.includes("చూపించు") ||
    lowerMessage.includes("पेज दिखाओ") ||
    lowerMessage.includes("పేజీ చూపించు")

  ) // Direct navigation commands

{

  if (lastTopic) {
    return {
      response:
        lang === "hi"
          ? "मैं संबंधित पेज खोल रहा हूँ।"
          : lang === "te"
          ? "సంబంధిత పేజీని తెరవుతున్నాను."
          : "Opening the relevant page for you.",
      navigation: lastTopic
    };
  }

  return {
    response:
      lang === "hi"
        ? "कृपया पहले बताएं कि आप किस बारे में जानना चाहते हैं।"
        : lang === "te"
        ? "ముందుగా మీరు ఏ విషయం గురించి తెలుసుకోవాలనుకుంటున్నారో చెప్పండి."
        : "Please ask about something first."
  };
}
if (
    lowerMessage.includes("pm-kisan") ||
    lowerMessage.includes("kisan") ||
    lowerMessage.includes("scheme") ||
    lowerMessage.includes("योजना") ||
    lowerMessage.includes("सरकारी") ||
    lowerMessage.includes("పథకం") ||
    lowerMessage.includes("కిసాన్") ||
    lowerMessage.includes("పీఎం") ||
    lowerMessage.includes("ప్రభుత్వ")
  ) 
 {

  setLastTopic("SCHEMES");

   return {
  response:
    lang === "hi"
      ? "प्रधानमंत्री किसान सम्मान निधि योजना के तहत किसानों को हर साल ₹6000 की आर्थिक सहायता मिलती है। यह राशि तीन किस्तों में दी जाती है। सरकारी योजनाओं का पेज देखने के लिए 'पेज दिखाओ' कहें।"
      : lang === "te"
      ? "ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి పథకం కింద రైతులకు సంవత్సరానికి ₹6000 ఆర్థిక సహాయం అందుతుంది. మూడు విడతలుగా ఇస్తారు. పథకాల పేజీ చూడాలంటే 'పేజీ చూపించు' అని చెప్పండి."
      : "PM-KISAN scheme provides ₹6000 per year to farmers in three installments. If you'd like, I can open the page for you. Just say 'open it'."
};
    //navigation: "SCHEMES"

}
if (
    lowerMessage.includes("tractor") ||
    lowerMessage.includes("harvester") ||
    lowerMessage.includes("rent") ||
    lowerMessage.includes("machine") ||
    lowerMessage.includes("ट्रैक्टर") ||
    lowerMessage.includes("किराए") ||
    lowerMessage.includes("किराया") ||
    lowerMessage.includes("मशीन") ||
    lowerMessage.includes("ట్రాక్టర్") ||
    lowerMessage.includes("అద్దె") ||
    lowerMessage.includes("యంత్రం") ||
    lowerMessage.includes("అద్దెకు")
  ) 
  {

  setLastTopic("RENT_MACHINES"); 

    const type = lowerMessage.includes("harvester") ? "Harvester" : "Tractor";
    const typeLabel = machineNames[type][lang] || type;

const responses = {

  en: `To rent a ${typeLabel}, follow these steps:

1. Open KrishiMitra
2. Click Rent Machines
3. Select ${typeLabel}
4. Choose your location
5. Book the available machine

If you'd like, I can open the page for you. Just say "open it".`,

  hi: `${typeLabel} किराए पर लेने के लिए इन चरणों का पालन करें:

1. कृषिमित्र ऐप खोलें
2. "मशीन किराया" अनुभाग पर जाएँ
3. आवश्यक मशीन चुनें
4. अपना स्थान चुनें
5. उपलब्ध मशीन बुक करें

यदि आप चाहें तो मैं आपके लिए यह पेज खोल सकता हूँ। बस कहें "ओपन करो" या "पेज खोलो".`,

  te: `${typeLabel} అద్దెకు తీసుకోవడానికి ఈ దశలను అనుసరించండి:

మొదటిది: కృషిమిత్ర యాప్‌ను తెరవండి
రెండవది: "యంత్రాల అద్దె" విభాగాన్ని ఎంచుకోండి
మూడవది: కావలసిన యంత్రాన్ని ఎంపిక చేయండి
నాలుగవది: మీ ప్రాంతాన్ని ఎంపిక చేయండి
ఐదవది: అందుబాటులో ఉన్న యంత్రాన్ని బుక్ చేసుకోండి

మీకు కావాలంటే నేను ఈ పేజీని నేరుగా తెరవగలను. "ఓపెన్ చేయండి" లేదా "పేజీ తెరవండి" అని చెప్పండి.`
};

    return {
      response: responses[lang] || responses.en,
     //  navigation: "RENT_MACHINES",
      machineType: type
    };
  }
 if (
    lowerMessage.includes("fertilizer") ||
    lowerMessage.includes("chilli") ||
    lowerMessage.includes("crop") ||
    lowerMessage.includes("उर्वरक") ||
    lowerMessage.includes("खाद") ||
    lowerMessage.includes("मिर्च") ||
    lowerMessage.includes("ఎరువు") ||
    lowerMessage.includes("మిరప") ||
    lowerMessage.includes("పంట") ||
    lowerMessage.includes("ఉత్తమ")
  ){

  setLastTopic("FERTILIZER");

  return {
   response:
    lang === "hi"
      ? "मिर्ची फसल के लिए NPK 19:19:19 और जैविक खाद का उपयोग करना अच्छा होता है। वित्तने से पहले खेत में जैविक खाद मिलाएं। उर्वरक सिफारिश पेज देखने के लिए 'पेज दिखाओ' कहें।"
      : lang === "te"
      ? "మిరప పంటకు NPK 19:19:19 ఎరువు మరియు సేంద్రీయ ఎరువు ఉపయోగించడం మంచిది. విత్తే ముందు పొలంలో సేంద్రీయ ఎరువు కలపండి. ఎరువుల పేజీ చూడాలంటే 'పేజీ చూపించు' అని చెప్పండి."
      : "For chilli crop, NPK 19:19:19 fertilizer with organic compost is recommended. Mix organic compost before sowing. If you'd like, I can open the page for you. Just say 'open it'." 
      //navigation: "FERTILIZER"
  };
} 
if (
    lowerMessage.includes("rain") ||
    lowerMessage.includes("weather") ||
    lowerMessage.includes("forecast") ||
    lowerMessage.includes("बारिश") ||
    lowerMessage.includes("मौसम") ||
    lowerMessage.includes("वर्षा") ||
    lowerMessage.includes("వర్షం") ||
    lowerMessage.includes("వాతావరణం") ||
    lowerMessage.includes("రేపు") ||
    lowerMessage.includes("పడుతుందా") ||
    lowerMessage.includes("వాతావరణ")
  )  {

  setLastTopic("WEATHER");

  return {
    response:
    lang === "hi"
      ? "मैं आपके लिए मौसम की जानकारी दिखा सकता हूँ। तापमान, बारिश और हवा की जानकारी मिलेगी। मौसम पेज देखने के लिए 'पेज दिखाओ' कहें।"
      : lang === "te"
      ? "మీకోసం వాతావరణ సమాచారం చూపగలను. ఉష్ణోగ్రత, వర్షపాతం మరియు గాలి వేగం తెలుసుకోవచ్చు. వాతావరణ పేజీ చూడాలంటే 'పేజీ చూపించు' అని చెప్పండి."
      : "I can show you the weather forecast with temperature, rainfall and wind details. If you'd like, I can open the page for you. Just say 'open it'."
   // navigation: "WEATHER"
  };
}

  return {
    response: "I can help with weather, fertilizer advice, government schemes, and renting machines."
  };
};
const handleNavigation = (nav: string) => {
  if (nav === "RENT_MACHINES") {
    setCurrentPage("machinery");
  }
   if (nav === "FERTILIZER") {
    setCurrentPage("fertilizer");
  }

  if (nav === "WEATHER") {
    setCurrentPage("weather");
  }

  if (nav === "SCHEMES") {
    setCurrentPage("schemes");
  }
};
  const quickQuestions = [    
    { key: 'chat.q1', icon: '🌿', action: 'fertilizer' },
    { key: 'chat.q2', icon: '🌾', action: 'weather' },
    { key: 'chat.q3', icon: '🏛️', action: 'schemes' },
    { key: 'chat.q4', icon: '🌤️', action: 'weather' },
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), text, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Local implementation for development
      const result = processQueryLocally(text, language);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: result.response || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);

      if (result.machineType !== undefined) {
        setMachineFilter(result.machineType || '');
      } else if (result.navigation !== 'RENT_MACHINES') {
        setMachineFilter('');
      }
      
      // Handle navigation
      if (result.navigation) {
        handleNavigation(result.navigation);
      }
      
      // Text-to-speech
// Text-to-speech
 // Text-to-speech using Google TTS for Telugu/Hindi, browser TTS for English
const speakResponse = async (text: string, lang: string) => {
  const cleanText = text.replace(/\n/g, ' ').replace(/[0-9]+\./g, '').trim();

  if (lang === 'te' || lang === 'hi') {
    // Use Google Translate TTS — works on all systems without any voice install
    const langCode = lang === 'te' ? 'te' : 'hi';
    const encoded = encodeURIComponent(cleanText.slice(0, 200)); // max 200 chars
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${langCode}&client=tw-ob`;
    const audio = new Audio(url);
    audio.play().catch(() => {
      // If Google TTS blocked, fallback to browser TTS
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = lang === 'te' ? 'te-IN' : 'hi-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    });
  } else {
    // English — use browser TTS (works fine)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }
};

speakResponse(result.response, language); 
}catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: t('common.error'),
        isUser: false,
        timestamp: new Date(),
      }]);
    }
    setLoading(false);
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceInput = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button onClick={() => setCurrentPage('dashboard')} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
          <div>
            <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('chat.title')}</h2>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {loading ? t('chat.thinking') : language === 'hi' ? 'ऑनलाइन' : language === 'te' ? 'ఆన్‌లైన్' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-4xl mx-auto w-full">


        {/* Chat Messages */}
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.isUser
                  ? 'bg-green-600 text-white rounded-br-md'
                  : `${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-bl-md shadow-sm`
              }`}>
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isUser ? 'text-green-200' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl rounded-bl-md px-4 py-3 shadow-sm`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
                {/* Quick Questions - Always visible */}
      <div className="mb-4">
        <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>{t('chat.quickQ')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickQuestions.map((q, i) => (
            <button key={i} onClick={() => sendMessage(t(q.key))}
              className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-green-600 text-gray-200' : 'bg-white border-gray-200 hover:border-green-500 text-gray-700'} border rounded-xl p-3 text-left text-sm flex items-center gap-2 transition`}>
              <span className="text-lg">{q.icon}</span>
              {t(q.key)}
            </button>
          ))}
        </div>
      </div>
        </div>
      </div>
      
      {/* Input */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-3`}>
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          {/* Voice Button */}
          <button onClick={isListening ? stopVoiceInput : startVoiceInput}
            className={`p-3 rounded-full flex-shrink-0 transition ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
            }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder={isListening ? t('chat.listening') : t('chat.placeholder')}
            className={`flex-1 px-4 py-3 ${darkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : 'bg-gray-100 text-gray-900 border-gray-200 placeholder-gray-400'} border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-base`}
          />

          <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition disabled:opacity-50 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        {isListening && (
          <p className="text-center text-sm text-red-500 mt-2 animate-pulse">{t('chat.listening')}</p>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
