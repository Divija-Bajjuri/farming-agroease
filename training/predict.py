import joblib
import json
import numpy as np
import os

models_dir = os.path.dirname(__file__)

nitrogen_model = joblib.load(os.path.join(models_dir, 'models/nitrogen_model.joblib'))
phosphorus_model = joblib.load(os.path.join(models_dir, 'models/phosphorus_model.joblib'))
potassium_model = joblib.load(os.path.join(models_dir, 'models/potassium_model.joblib'))

fert_type_model = joblib.load(os.path.join(models_dir, 'models/fertilizer_type_model.joblib'))
fert_name_model = joblib.load(os.path.join(models_dir, 'models/fertilizer_name_model.joblib'))

with open(os.path.join(models_dir, 'models/metadata.json'), 'r') as f:
    metadata = json.load(f)

label_encoders = joblib.load(os.path.join(models_dir, 'models/label_encoders.joblib'))

FERTILIZER_TRANSLATIONS = {
    "Chemical": {
        "en": "Chemical",
        "hi": "रासायनिक",
        "te": "రసాయన"
    },
    "Natural": {
        "en": "Natural",
        "hi": "प्राकृतिक",
        "te": "సహజ"
    },
    "Urea": {
        "en": "Urea",
        "hi": "यूरिया",
        "te": " యూరియా"
    },
    "DAP": {
        "en": "DAP (Di-Ammonium Phosphate)",
        "hi": "DAP (डाइ-अमोनियम फॉस्फेट)",
        "te": "DAP (di-ammonium phosphate)"
    },
    "NPK": {
        "en": "NPK Fertilizer",
        "hi": "NPK उर्वरक",
        "te": "NPK ఎరువు"
    },
    "Vermicompost": {
        "en": "Vermicompost",
        "hi": "वर्मीकम्पोस्ट",
        "te": "vermicompost"
    },
    "Compost": {
        "en": "Compost",
        "hi": "खाद",
        "te": " compost"
    }
}

SEASON_TRANSLATIONS = {
    "Kharif": {"en": "Kharif", "hi": "खरीफ", "te": "ఖరీఫ్"},
    "Rabi": {"en": "Rabi", "hi": "रबी", "te": "రబీ"},
    "Zaid": {"en": "Zaid", "hi": "ज़ैद", "te": "జ़ైద్"}
}

SOIL_TRANSLATIONS = {
    "Alluvial": {"en": "Alluvial", "hi": "जलोढ़", "te": "అలువియల్"},
    "Black (Regur)": {"en": "Black (Regur)", "hi": "काली (रेगूर)", "te": "black (regur)"},
    "Red": {"en": "Red", "hi": "लाल", "te": "red"},
    "Laterite": {"en": "Laterite", "hi": "लैटेराइट", "te": "laterite"},
    "Sandy": {"en": "Sandy", "hi": "बलुई", "te": "sandy"},
    "Clay": {"en": "Clay", "hi": "चिकनी", "te": "clay"}
}

CROP_TRANSLATIONS = {
    "Rice": {"en": "Rice", "hi": "धान", "te": "rice"},
    "Wheat": {"en": "Wheat", "hi": "गेहूं", "te": "wheat"},
    "Cotton": {"en": "Cotton", "hi": "कपास", "te": "cotton"},
    "Maize": {"en": "Maize", "hi": "मक्का", "te": "maize"},
    "Tomato": {"en": "Tomato", "hi": "टम��टर", "te": "tomato"},
    "Sugarcane": {"en": "Sugarcane", "hi": "गन्ना", "te": "sugarcane"},
    "Groundnut": {"en": "Groundnut", "hi": "मूंगफली", "te": "groundnut"},
    "Soybean": {"en": "Soybean", "hi": "सोयाबीन", "te": "soybean"},
    "Mustard": {"en": "Mustard", "hi": "सरसों", "te": "mustard"}
}

def predict(crop_type, soil_type, farm_size, season='Kharif', previous_crop='Wheat'):
    crop_encoded = label_encoders['crop_type'].transform([crop_type])[0]
    soil_encoded = label_encoders['soil_type'].transform([soil_type])[0]
    season_encoded = label_encoders['season'].transform([season])[0]
    prev_crop_encoded = label_encoders['previous_crop'].transform([previous_crop])[0]
    
    features = np.array([[crop_encoded, soil_encoded, farm_size, season_encoded, prev_crop_encoded]])
    
    nitrogen = int(nitrogen_model.predict(features)[0])
    phosphorus = int(phosphorus_model.predict(features)[0])
    potassium = int(potassium_model.predict(features)[0])
    
    fert_type_idx = fert_type_model.predict(features)[0]
    fert_name_idx = fert_name_model.predict(features)[0]
    
    fert_type = label_encoders['fertilizer_type'].inverse_transform([fert_type_idx])[0]
    fert_name = label_encoders['fertilizer_name'].inverse_transform([fert_name_idx])[0]
    
    return {
        'nitrogen': nitrogen,
        'phosphorus': phosphorus,
        'potassium': potassium,
        'fertilizer_type': fert_type,
        'fertilizer_name': fert_name
    }

def predict_multilingual(crop_type, soil_type, farm_size, season='Kharif', previous_crop='Wheat', language='en'):
    result = predict(crop_type, soil_type, farm_size, season, previous_crop)
    
    return {
        'nitrogen': result['nitrogen'],
        'phosphorus': result['phosphorus'],
        'potassium': result['potassium'],
        'fertilizer_type': FERTILIZER_TRANSLATIONS.get(result['fertilizer_type'], {}).get(language, result['fertilizer_type']),
        'fertilizer_name': FERTILIZER_TRANSLATIONS.get(result['fertilizer_name'], {}).get(language, result['fertilizer_name']),
        'language': language
    }

def get_crop_translation(crop, language='en'):
    return CROP_TRANSLATIONS.get(crop, {}).get(language, crop)

def get_soil_translation(soil, language='en'):
    return SOIL_TRANSLATIONS.get(soil, {}).get(language, soil)

def get_season_translation(season, language='en'):
    return SEASON_TRANSLATIONS.get(season, {}).get(language, season)

def get_available_crops(language='en'):
    return {crop: get_crop_translation(crop, language) for crop in metadata['crop_types']}

def get_available_soils(language='en'):
    return {soil: get_soil_translation(soil, language) for soil in metadata['soil_types']}

def get_available_seasons(language='en'):
    return {season: get_season_translation(season, language) for season in metadata['seasons']}

def get_available_fertilizer_types(language='en'):
    return {ft: FERTILIZER_TRANSLATIONS.get(ft, {}).get(language, ft) for ft in metadata['fertilizer_types']}

def get_available_fertilizer_names(language='en'):
    return {fn: FERTILIZER_TRANSLATIONS.get(fn, {}).get(language, fn) for fn in metadata['fertilizer_names']}

if __name__ == '__main__':
    print("=" * 60)
    print("SAMPLE PREDICTIONS")
    print("=" * 60)
    
    test_cases = [
        {'crop': 'Rice', 'soil': 'Alluvial', 'size': 1.0, 'season': 'Kharif', 'prev': 'Wheat'},
        {'crop': 'Wheat', 'soil': 'Black (Regur)', 'size': 2.0, 'season': 'Rabi', 'prev': 'Rice'},
        {'crop': 'Cotton', 'soil': 'Red', 'size': 1.5, 'season': 'Kharif', 'prev': 'Wheat'},
        {'crop': 'Groundnut', 'soil': 'Sandy', 'size': 3.0, 'season': 'Kharif', 'prev': 'Wheat'},
        {'crop': 'Tomato', 'soil': 'Clay', 'size': 2.0, 'season': 'Rabi', 'prev': 'Rice'},
    ]
    
    for i, tc in enumerate(test_cases, 1):
        result = predict(tc['crop'], tc['soil'], tc['size'], tc['season'], tc['prev'])
        print(f"\n--- Test Case {i}: {tc['crop']} on {tc['soil']} soil ({tc['size']} acres) ---")
        print(f"  N: {result['nitrogen']} kg/acre  |  P: {result['phosphorus']} kg/acre  |  K: {result['potassium']} kg/acre")
        print(f"  Recommended: {result['fertilizer_type']} - {result['fertilizer_name']}")