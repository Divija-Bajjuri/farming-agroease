const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const FAQ = require('../models/FAQ');
const Scheme = require('../models/Scheme');
const Fertilizer = require('../models/Fertilizer');
const Disease = require('../models/Disease');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
let openai = null;
if (OPENAI_API_KEY) {
  const OpenAI = require('openai');
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
}

function loadFixedQuestions() {
  const basePath = path.join(__dirname, '../data');
  const result = { en: [], hi: [], te: [] };
  
  const files = ['fixed_questions_en.json', 'fixed_questions_hi.json', 'fixed_questions_te.json'];
  const langs = ['en', 'hi', 'te'];
  
  files.forEach((file, idx) => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(basePath, file), 'utf8'));
      result[langs[idx]] = data;
    } catch (err) {
      console.warn(`Could not load ${file}:`, err.message);
    }
  });
  
  return result;
}

const fixedQuestions = loadFixedQuestions();

function findFixedAnswer(question, language) {
  const q = question.toLowerCase().trim();
  const questions = fixedQuestions[language] || fixedQuestions.en;
  
  for (const item of questions) {
    const itemQ = item.question.toLowerCase().trim();
    if (q === itemQ || q.includes(itemQ) || itemQ.includes(q)) {
      return item.answer;
    }
  }
  return null;
}

function buildDocText(doc, language, type) {
  if (type === 'faq') {
    const q = language === 'hi' ? doc.questionHi || doc.questionEn : language === 'te' ? doc.questionTe || doc.questionEn : doc.questionEn;
    const a = language === 'hi' ? doc.answerHi || doc.answerEn : language === 'te' ? doc.answerTe || doc.answerEn : doc.answerEn;
    return `Answer: ${a}`;
  }
  if (type === 'scheme') {
    const name = language === 'hi' ? doc.nameHi || doc.nameEn : language === 'te' ? doc.nameTe || doc.nameEn : doc.nameEn;
    const desc = language === 'hi' ? doc.descriptionHi || doc.descriptionEn : language === 'te' ? doc.descriptionTe || doc.descriptionEn : doc.descriptionEn;
    return `Scheme: ${name}\nDetails: ${desc}`;
  }
  if (type === 'fertilizer') {
    const name = language === 'hi' ? doc.nameHi || doc.nameEn : language === 'te' ? doc.nameTe || doc.nameEn : doc.nameEn;
    const desc = language === 'hi' ? doc.descriptionHi || doc.descriptionEn : language === 'te' ? doc.descriptionTe || doc.descriptionEn : doc.descriptionEn;
    return `Fertilizer: ${name}\nDetails: ${desc}`;
  }
  if (type === 'disease') {
    const name = language === 'hi' ? doc.nameHi || doc.nameEn : language === 'te' ? doc.nameTe || doc.nameEn : doc.nameEn;
    const treatment = language === 'hi' ? doc.treatmentHi || doc.treatmentEn : language === 'te' ? doc.treatmentTe || doc.treatmentEn : doc.treatmentEn;
    return `Disease: ${name}\nTreatment: ${treatment}`;
  }
  return '';
}

router.post('/', async (req, res) => {
  try {
    const { question, language = 'en' } = req.body;
    if (!question || typeof question !== 'string' || question.trim().length < 2) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const fixedAnswer = findFixedAnswer(question, language);
    if (fixedAnswer) {
      return res.json({
        answer: fixedAnswer,
        sources: [{ source: 'fixed_questions' }],
        openai: { ok: false, from: 'fixed_knowledge' },
      });
    }

    let docs = [];
    try {
      const [faqs, schemes, fertilizers, diseases] = await Promise.all([
        FAQ.find({ isActive: true }).lean(),
        Scheme.find({ isActive: true }).lean(),
        Fertilizer.find({ isActive: true }).lean(),
        Disease.find({ isActive: true }).lean(),
      ]);

      faqs.forEach(f => docs.push({ type: 'faq', text: buildDocText(f, language, 'faq') }));
      schemes.forEach(s => docs.push({ type: 'scheme', text: buildDocText(s, language, 'scheme') }));
      fertilizers.forEach(f => docs.push({ type: 'fertilizer', text: buildDocText(f, language, 'fertilizer') }));
      diseases.forEach(d => docs.push({ type: 'disease', text: buildDocText(d, language, 'disease') }));
    } catch (dbError) {
      console.error('Database query error:', dbError);
    }

    if (!openai) {
      if (docs.length > 0) {
        const bestMatch = docs.slice(0, 1)[0];
        const answer = bestMatch.text.replace(/^[^:]+:\s*/, '');
        return res.json({
          answer: answer || bestMatch.text,
          sources: [{ source: bestMatch.type }],
          openai: { ok: false, from: 'local_db' },
        });
      }
      return res.json({
        answer: language === 'hi' ? 'मुझे इस प्रश्न का उत्तर नहीं मिला। कृपया अन्य प्रश्न पूछें।' 
          : language === 'te' ? 'నాకు ఈ ప్రశ्नకు జవాబు కనబ లేదు. దయచేసి ఇతర ప్రశ्न అడుగు.'
          : 'I could not find an answer to your question. Please ask another question.',
        sources: [],
        openai: { ok: false, from: 'no_data' },
      });
    }

    const normalizedQuery = question.trim().toLowerCase();
    const matchingDocs = docs
      .map(d => ({
        ...d,
        score: (d.text.toLowerCase().includes(normalizedQuery) ? 5 : 0)
          + d.text.toLowerCase().split(' ').filter(w => w.length > 3 && normalizedQuery.includes(w)).length * 2,
      }))
      .sort((a, b) => b.score - a.score)
      .filter(d => d.score > 0)
      .slice(0, 3);

    const contextDocs = matchingDocs.map(d => d.text).join('\n\n');
    
    const systemPrompt = language === 'hi' 
      ? `आप "कृषिमित्र" हैं, एक स्मार्ट कृषि सहायक। हिंदी में सरल भाषा में उत्तर दें।`
      : language === 'te'
      ? `కృషిమిత్ర - smart agriculture assistant. Telugu lo simple ga answer ivvu.`
      : `You are "KrishiMitra", a smart agriculture assistant. Answer in simple English.`;

    const userPrompt = contextDocs
      ? `Based on this info, answer simply:\n${contextDocs}\n\nQuestion: ${question}`
      : `You are KrishiMitra. Help with farming question:\n${question}`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 350,
      });

      const generated = completion.choices?.[0]?.message?.content || '';
      if (generated) {
        return res.json({
          answer: generated,
          sources: matchingDocs.map(d => ({ source: d.type })),
          openai: { ok: true, model: 'gpt-4.1-mini' },
        });
      }
    } catch (openaiError) {
      console.error('OpenAI error:', openaiError.message);
    }

    if (matchingDocs.length > 0) {
      const bestDoc = matchingDocs[0];
      const answer = bestDoc.text.replace(/^[^:]+:\s*/, '');
      return res.json({
        answer: answer || 'Sorry, could not find a clear answer.',
        sources: [{ source: bestDoc.type }],
        openai: { ok: false, from: 'local_fallback' },
      });
    }

    return res.json({
      answer: language === 'hi' ? 'मैं आपकी सहायता करने में असमर्थ हूं। कृपया कोई अन्य प्रश्न पूछें।'
        : language === 'te' ? 'నేను మద్దతు ఇవ్వలేకపోతున్నాను. దయచేసి ఇతర ప్రశ्न అడుగు.'
        : 'I am unable to help with this. Please ask another question.',
      sources: [],
      openai: { ok: false, from: 'no_match' },
    });

  } catch (error) {
    console.error('Chat route error:', error.message);
    return res.status(200).json({
      answer: 'Sorry, something went wrong. Please try again.',
      openai: { ok: false, error: error.message },
    });
  }
});

module.exports = router;