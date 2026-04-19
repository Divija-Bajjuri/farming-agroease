import sys
import json
import joblib
import numpy as np
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
models_path = os.path.join(script_dir, 'models')

nitrogen_model = joblib.load(os.path.join(models_path, 'nitrogen_model.joblib'))
phosphorus_model = joblib.load(os.path.join(models_path, 'phosphorus_model.joblib'))
potassium_model = joblib.load(os.path.join(models_path, 'potassium_model.joblib'))

with open(os.path.join(models_path, 'metadata.json'), 'r') as f:
    metadata = json.load(f)

label_encoders = {}
for col in metadata['categorical_cols']:
    le = joblib.load(os.path.join(models_path, f'{col}_encoder.joblib'))
    label_encoders[col] = le

def predict_npk(crop_type, soil_type, farm_size, season='Kharif', previous_crop='Wheat'):
    try:
        crop_encoded = label_encoders['crop_type'].transform([crop_type])[0]
    except:
        crop_encoded = 0
    
    try:
        soil_encoded = label_encoders['soil_type'].transform([soil_type])[0]
    except:
        soil_encoded = 0
    
    try:
        season_encoded = label_encoders['season'].transform([season])[0]
    except:
        season_encoded = 0
    
    try:
        prev_crop_encoded = label_encoders['previous_crop'].transform([previous_crop])[0]
    except:
        prev_crop_encoded = 0
    
    features = np.array([[crop_encoded, soil_encoded, farm_size, season_encoded, prev_crop_encoded]])
    
    nitrogen = max(0, int(nitrogen_model.predict(features)[0]))
    phosphorus = max(0, int(phosphorus_model.predict(features)[0]))
    potassium = max(0, int(potassium_model.predict(features)[0]))
    
    return {
        'nitrogen': nitrogen,
        'phosphorus': phosphorus,
        'potassium': potassium
    }

if __name__ == '__main__':
    if len(sys.argv) > 1:
        input_data = json.loads(sys.argv[1])
        result = predict_npk(
            input_data.get('crop_type', 'Rice'),
            input_data.get('soil_type', 'Alluvial'),
            float(input_data.get('farm_size', 1)),
            input_data.get('season', 'Kharif'),
            input_data.get('previous_crop', 'Wheat')
        )
        print(json.dumps(result))
    else:
        result = predict_npk('Rice', 'Alluvial', 1.0)
        print(json.dumps(result))