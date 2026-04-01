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
  const { darkMode, setCurrentPage } = useApp();
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickQuestions = [
    { key: 'chat.q1', icon: '🌿' },
    { key: 'chat.q2', icon: '🌾' },
    { key: 'chat.q3', icon: '🏛️' },
    { key: 'chat.q4', icon: '🌤️' },
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), text, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chatbot', {
        body: { message: text, language, userId: user?.id },
      });
      if (error) throw error;
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      
      // Text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
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
        {/* Quick Questions */}
        {messages.length <= 1 && (
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
        )}

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
