import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY');
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Map OWM condition codes to our icon types
function getConditionIcon(id: number): string {
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 400) return 'drizzle';
  if (id >= 500 && id < 600) return 'rain';
  if (id >= 600 && id < 700) return 'snow';
  if (id >= 700 && id < 800) return 'mist';
  if (id === 800) return 'sun';
  if (id === 801 || id === 802) return 'partly-cloudy';
  if (id === 803 || id === 804) return 'cloud';
  return 'sun';
}

function getDayName(dateStr: string, language: string): string {
  const date = new Date(dateStr);
  const locale = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
  return date.toLocaleDateString(locale, { weekday: 'short' });
}

function generateFarmingAdvice(current: any, forecast: any[], language: string) {
  const advice = [];
  const temp = current.temp;
  const humidity = current.humidity;
  const rain = current.rain_mm;
  const wind = current.wind_speed;
  const conditionId = current.condition_id;

  // Heavy rain warning
  if (rain > 10 || (conditionId >= 500 && conditionId < 600)) {
    advice.push({
      en: '🌧️ Heavy rain expected. Avoid irrigation today and ensure proper field drainage to prevent waterlogging.',
      hi: '🌧️ भारी बारिश की संभावना है। आज सिंचाई न करें और खेत में जल निकासी सुनिश्चित करें।',
      te: '🌧️ భారీ వర్షం అంచనా. నేడు నీటిపారుదల మానుకోండి మరియు పొలంలో నీరు నిల్వ కాకుండా జాగ్రత్త వహించండి.',
      type: 'warning',
      severity: 'high',
    });
  }

  // Thunderstorm warning
  if (conditionId >= 200 && conditionId < 300) {
    advice.push({
      en: '⛈️ Thunderstorm alert! Stay indoors, keep livestock sheltered, and avoid working in open fields.',
      hi: '⛈️ तूफान की चेतावनी! घर के अंदर रहें, पशुओं को सुरक्षित रखें और खुले खेतों में काम न करें।',
      te: '⛈️ ఉరుములతో కూడిన వర్షం హెచ్చరిక! ఇంట్లో ఉండండి, పశువులను సురక్షితంగా ఉంచండి మరియు బహిరంగ పొలాల్లో పని చేయకండి.',
      type: 'warning',
      severity: 'high',
    });
  }

  // High wind warning
  if (wind > 30) {
    advice.push({
      en: '💨 Strong winds detected. Secure greenhouse covers, delay spraying pesticides or fertilizers.',
      hi: '💨 तेज हवाएं चल रही हैं। ग्रीनहाउस को सुरक्षित करें, कीटनाशक या उर्वरक का छिड़काव न करें।',
      te: '💨 బలమైన గాలులు వస్తున్నాయి. గ్రీన్‌హౌస్ కవర్లు సురక్షితంగా చేయండి, పురుగుమందులు లేదా ఎరువులు పిచికారీ చేయడం ఆపండి.',
      type: 'warning',
      severity: 'medium',
    });
  }

  // High temperature warning
  if (temp > 38) {
    advice.push({
      en: '🌡️ Very high temperature! Water crops early morning or evening. Provide shade for young plants.',
      hi: '🌡️ बहुत अधिक तापमान! सुबह जल्दी या शाम को फसलों में पानी दें। छोटे पौधों को छाया प्रदान करें।',
      te: '🌡️ చాలా అధిక ఉష్ణోగ్రత! తెల్లవారు జామున లేదా సాయంత్రం పంటలకు నీరు పెట్టండి. చిన్న మొక్కలకు నీడ ఇవ్వండి.',
      type: 'warning',
      severity: 'high',
    });
  }

  // Good conditions for spraying
  if (wind < 15 && rain === 0 && temp < 35 && humidity < 80) {
    advice.push({
      en: '✅ Good conditions for pesticide/fertilizer spraying today. Low wind and no rain expected.',
      hi: '✅ आज कीटनाशक/उर्वरक छिड़काव के लिए अच्छी स्थिति है। हवा कम है और बारिश की संभावना नहीं।',
      te: '✅ నేడు పురుగుమందులు/ఎరువులు పిచికారీ చేయడానికి మంచి పరిస్థితులు. తక్కువ గాలి మరియు వర్షం అంచనా లేదు.',
      type: 'success',
      severity: 'low',
    });
  }

  // High humidity - fungal risk
  if (humidity > 85) {
    advice.push({
      en: '🍄 High humidity increases fungal disease risk. Monitor crops closely and consider preventive fungicide application.',
      hi: '🍄 अधिक नमी से फंगल रोग का खतरा बढ़ता है। फसलों की निगरानी करें और निवारक फफूंदनाशक लगाने पर विचार करें।',
      te: '🍄 అధిక తేమ శిలీంధ్ర వ్యాధి ప్రమాదాన్ని పెంచుతుంది. పంటలను జాగ్రత్తగా పరిశీలించండి మరియు నివారణ శిలీంధ్రనాశకం వేయడాన్ని పరిగణించండి.',
      type: 'warning',
      severity: 'medium',
    });
  }

  // Ideal farming weather
  if (temp >= 20 && temp <= 32 && humidity >= 40 && humidity <= 70 && rain === 0) {
    advice.push({
      en: '🌱 Ideal weather for field work! Good time for planting, weeding, or harvesting.',
      hi: '🌱 खेती के काम के लिए आदर्श मौसम! रोपाई, निराई या कटाई के लिए अच्छा समय।',
      te: '🌱 పొలం పనికి అనువైన వాతావరణం! నాటడం, కలుపు తీయడం లేదా పంట కోయడానికి మంచి సమయం.',
      type: 'success',
      severity: 'low',
    });
  }

  // Check upcoming rain in forecast
  const rainDays = forecast.filter(d => d.rain_chance > 60);
  if (rainDays.length > 0 && rain === 0) {
    advice.push({
      en: `🌦️ Rain expected in ${rainDays.length} day(s) this week. Plan irrigation and harvesting accordingly.`,
      hi: `🌦️ इस सप्ताह ${rainDays.length} दिन बारिश की संभावना है। सिंचाई और कटाई की योजना उसी अनुसार बनाएं।`,
      te: `🌦️ ఈ వారం ${rainDays.length} రోజు(లు) వర్షం అంచనా. తదనుగుణంగా నీటిపారుదల మరియు పంట కోత ప్రణాళిక వేసుకోండి.`,
      type: 'info',
      severity: 'low',
    });
  }

  return advice;
}

function generateWeatherAlerts(current: any) {
  const alerts = [];
  const conditionId = current.condition_id;
  const temp = current.temp;
  const wind = current.wind_speed;

  if (conditionId >= 200 && conditionId < 300) {
    alerts.push({
      title: { en: '⛈️ Thunderstorm Warning', hi: '⛈️ तूफान चेतावनी', te: '⛈️ ఉరుముల హెచ్చరిక' },
      message: {
        en: 'Thunderstorm conditions detected in your area. Take necessary precautions.',
        hi: 'आपके क्षेत्र में तूफान की स्थिति है। आवश्यक सावधानियां बरतें।',
        te: 'మీ ప్రాంతంలో ఉరుముల పరిస్థితులు గుర్తించబడ్డాయి. అవసరమైన జాగ్రత్తలు తీసుకోండి.',
      },
      severity: 'high',
    });
  }

  if (temp > 42) {
    alerts.push({
      title: { en: '🌡️ Extreme Heat Alert', hi: '🌡️ अत्यधिक गर्मी चेतावनी', te: '🌡️ తీవ్రమైన వేడి హెచ్చరిక' },
      message: {
        en: 'Extreme heat conditions. Avoid working outdoors between 11am-4pm.',
        hi: 'अत्यधिक गर्मी की स्थिति। सुबह 11 बजे से शाम 4 बजे के बीच बाहर काम करने से बचें।',
        te: 'తీవ్రమైన వేడి పరిస్థితులు. ఉదయం 11 నుండి సాయంత్రం 4 గంటల మధ్య బయట పని చేయడం మానుకోండి.',
      },
      severity: 'high',
    });
  }

  if (wind > 50) {
    alerts.push({
      title: { en: '💨 High Wind Warning', hi: '💨 तेज हवा चेतावनी', te: '💨 బలమైన గాలి హెచ్చరిక' },
      message: {
        en: 'Very strong winds detected. Secure all farm equipment and structures.',
        hi: 'बहुत तेज हवाएं चल रही हैं। सभी कृषि उपकरण और संरचनाओं को सुरक्षित करें।',
        te: 'చాలా బలమైన గాలులు గుర్తించబడ్డాయి. అన్ని వ్యవసాయ పరికరాలు మరియు నిర్మాణాలను సురక్షితంగా చేయండి.',
      },
      severity: 'medium',
    });
  }

  return alerts;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeather API key not configured');
    }

    const body = await req.json();
    const { lat, lon, city, language = 'en' } = body;

    // Build URL for current weather
    let currentUrl: string;
    let forecastUrl: string;

    if (lat && lon) {
      currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=40`;
    } else {
      const q = encodeURIComponent(city || 'Hyderabad');
      currentUrl = `${BASE_URL}/weather?q=${q}&appid=${apiKey}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?q=${q}&appid=${apiKey}&units=metric&cnt=40`;
    }

    // Fetch current weather and forecast in parallel
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentRes.ok) {
      const err = await currentRes.json();
      throw new Error(err.message || 'Failed to fetch weather data');
    }

    const currentData = await currentRes.json();
    const forecastData = forecastRes.ok ? await forecastRes.json() : null;

    // Parse current weather
    const current = {
      temp: Math.round(currentData.main.temp),
      feels_like: Math.round(currentData.main.feels_like),
      temp_min: Math.round(currentData.main.temp_min),
      temp_max: Math.round(currentData.main.temp_max),
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      wind_speed: Math.round((currentData.wind?.speed || 0) * 3.6), // m/s to km/h
      wind_deg: currentData.wind?.deg || 0,
      visibility: Math.round((currentData.visibility || 10000) / 1000),
      clouds: currentData.clouds?.all || 0,
      rain_mm: currentData.rain?.['1h'] || currentData.rain?.['3h'] || 0,
      condition: currentData.weather[0].description,
      condition_id: currentData.weather[0].id,
      condition_icon: getConditionIcon(currentData.weather[0].id),
      sunrise: currentData.sys?.sunrise || null,
      sunset: currentData.sys?.sunset || null,
    };

    // Parse 7-day forecast (one entry per day from 3-hourly data)
    const forecast: any[] = [];
    if (forecastData?.list) {
      const dailyMap = new Map<string, any[]>();
      for (const entry of forecastData.list) {
        const date = entry.dt_txt.split(' ')[0];
        if (!dailyMap.has(date)) dailyMap.set(date, []);
        dailyMap.get(date)!.push(entry);
      }

      for (const [date, entries] of dailyMap) {
        if (forecast.length >= 7) break;
        const temps = entries.map((e: any) => e.main.temp);
        const rains = entries.map((e: any) => e.rain?.['3h'] || 0);
        const rainChances = entries.map((e: any) => Math.round((e.pop || 0) * 100));
        const midday = entries.find((e: any) => e.dt_txt.includes('12:00')) || entries[0];

        forecast.push({
          date,
          day_name: getDayName(date, language),
          temp_high: Math.round(Math.max(...temps)),
          temp_low: Math.round(Math.min(...temps)),
          rain_mm: Math.round(rains.reduce((a: number, b: number) => a + b, 0) * 10) / 10,
          rain_chance: Math.max(...rainChances),
          humidity: Math.round(entries.reduce((a: number, e: any) => a + e.main.humidity, 0) / entries.length),
          wind_speed: Math.round((midday.wind?.speed || 0) * 3.6),
          condition: midday.weather[0].description,
          condition_icon: getConditionIcon(midday.weather[0].id),
        });
      }
    }

    const farming_advice = generateFarmingAdvice(current, forecast, language);
    const weather_alerts = generateWeatherAlerts(current);

    const response: any = {
      location: currentData.name + (currentData.sys?.country ? `, ${currentData.sys.country}` : ''),
      lat: currentData.coord?.lat || lat || null,
      lon: currentData.coord?.lon || lon || null,
      current,
      forecast,
      farming_advice,
      weather_alerts,
      fetched_at: new Date().toISOString(),
      is_live: true,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});