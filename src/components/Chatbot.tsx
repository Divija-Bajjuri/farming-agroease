import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { featureSteps } from "@/lib/feature-steps";
import faqData from "@/lib/faq-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition;

const recognition = SpeechRecognition ? new SpeechRecognition() : null;

export default function Chatbot() {

  const navigate = useNavigate();
  const { language } = useLanguage();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const features = featureSteps[language];
  const quickQuestions = Object.keys(features);

  // 🔊 Voice output
  const speak = (text: string) => {

    const speech = new SpeechSynthesisUtterance(text);

    if (language === "te") speech.lang = "te-IN";
    else if (language === "hi") speech.lang = "hi-IN";
    else speech.lang = "en-IN";

    window.speechSynthesis.speak(speech);
  };

  // 📄 Format feature answer
  const buildFeatureAnswer = (feature: any) => {

    return `
${feature.title}

${feature.description}

Steps:
${feature.steps.join("\n")}
`;
  };

  // 🔎 Search FAQ dataset
  const searchFAQ = (question: string) => {

    const q = question.toLowerCase();

    for (const item of faqData) {

      if (
        item.english_question.toLowerCase().includes(q) ||
        item.telugu_question.includes(question) ||
        item.hindi_question.includes(question)
      ) {

        if (language === "te") return item.telugu_answer;
        if (language === "hi") return item.hindi_answer;
        return item.english_answer;
      }
    }

    return null;
  };

  // 🤖 Process user question
  const processQuestion = (question: string) => {

    for (const key in features) {

      const feature = (features as any)[key];

      if (question.toLowerCase().includes(key)) {

        const answer = buildFeatureAnswer(feature);

        setMessages((prev) => [
          ...prev,
          { type: "user", text: question },
          { type: "bot", text: answer, link: feature.link }
        ]);

        speak(answer);
        return;
      }
    }

    const faqAnswer = searchFAQ(question);

    if (faqAnswer) {

      setMessages((prev) => [
        ...prev,
        { type: "user", text: question },
        { type: "bot", text: faqAnswer }
      ]);

      speak(faqAnswer);
      return;
    }

    const fallback =
      language === "te"
        ? "క్షమించండి, నాకు ఆ ప్రశ్న అర్థం కాలేదు."
        : language === "hi"
        ? "माफ़ करें, मुझे यह प्रश्न समझ नहीं आया।"
        : "Sorry, I couldn't understand that question.";

    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
      { type: "bot", text: fallback }
    ]);

    speak(fallback);
  };

  // 🎤 Voice input
  const startVoice = () => {

    if (!recognition) return;

    recognition.lang =
      language === "te"
        ? "te-IN"
        : language === "hi"
        ? "hi-IN"
        : "en-IN";

    recognition.start();

    recognition.onresult = (event: any) => {

      const transcript = event.results[0][0].transcript;

      setInput(transcript);
      processQuestion(transcript);

    };
  };

  return (
<div
  style={{
    padding: "30px",
    maxWidth: "950px",
    margin: "auto",
    fontFamily: "Segoe UI, sans-serif"
  }}
>

  {/* Header */}
  <div
    style={{
      background: "linear-gradient(135deg,#4ade80,#22c55e)",
      padding: "18px",
      borderRadius: "12px",
      color: "white",
      marginBottom: "25px"
    }}
  >
    <h2 style={{ margin: 0 }}>
      🌾 {t("chat.title", language)}
    </h2>

    <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
      {t("chat.placeholder", language)}
    </p>
  </div>

  {/* Quick Questions */}
  <h3 style={{ marginBottom: "12px", color: "#444" }}>
    ⚡ {t("chat.quickQ", language)}
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "25px"
    }}
  >
    {quickQuestions.map((q, index) => (

      <button
        key={index}
        onClick={() => processQuestion(q)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "14px",
          fontWeight: 500,
          transition: "0.2s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "#ecfdf5")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "#ffffff")
        }
      >
        🌱 {(features as any)[q].title}
      </button>

    ))}
  </div>

  {/* Chat Container */}
  <div
    style={{
      background: "#f8fafc",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "20px",
      minHeight: "260px",
      marginBottom: "20px"
    }}
  >

    {messages.length === 0 && (
      <div
        style={{
          background: "#ffffff",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          width: "fit-content",
          marginBottom: "15px"
        }}
      >
        {language === "hi"
          ? "नमस्ते! मैं कृषिमित्र हूँ। खेती के बारे में पूछें!"
          : language === "te"
          ? "హలో! నేను కృషిమిత్ర. వ్యవసాయం గురించి అడగండి!"
          : "Hello! I am KrishiMittra. Ask me anything about farming!"}
      </div>
    )}

    {messages.map((msg, index) => (

      <div key={index} style={{ marginBottom: "15px" }}>

        <div
          style={{
            background: "#ffffff",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            maxWidth: "70%"
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              fontFamily: "inherit"
            }}
          >
            {msg.text}
          </pre>

          {msg.link && (
            <button
              onClick={() => navigate(msg.link)}
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#22c55e",
                color: "white",
                cursor: "pointer",
                fontSize: "13px"
              }}
            >
              {language === "hi"
                ? "फीचर खोलें"
                : language === "te"
                ? "ఫీచర్ తెరవండి"
                : "Open Feature"}
            </button>
          )}

        </div>

      </div>

    ))}
  </div>

  {/* Input Section */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      border: "1px solid #e5e7eb",
      borderRadius: "30px",
      padding: "10px 14px",
      background: "#ffffff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
    }}
  >

    <button
      onClick={startVoice}
      style={{
        border: "none",
        background: "#ecfdf5",
        padding: "6px 10px",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "18px"
      }}
    >
      🎤
    </button>

    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={t("chat.placeholder", language)}
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: "14px"
      }}
    />

    <button
      onClick={() => processQuestion(input)}
      style={{
        padding: "8px 18px",
        borderRadius: "20px",
        border: "none",
        background: "#22c55e",
        color: "white",
        cursor: "pointer",
        fontWeight: 500
      }}
    >
      {language === "hi"
        ? "भेजें"
        : language === "te"
        ? "పంపండి"
        : "Send"}
    </button>

  </div>

</div>
);
}