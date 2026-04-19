import pandas as pd
import numpy as np
import os
import json
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error, accuracy_score, classification_report

from xgboost import XGBRegressor, XGBClassifier

os.makedirs("models", exist_ok=True)

print("Loading dataset...")

df = pd.read_csv("fertilizer_data.csv")

df = df.dropna()

categorical_cols = [
    "crop_type",
    "soil_type",
    "season",
    "previous_crop"
]

fertilizer_categorical_cols = ["fertilizer_type", "fertilizer_name"]

label_encoders = {}

for col in categorical_cols:

    le = LabelEncoder()
    df[col + "_encoded"] = le.fit_transform(df[col])
    label_encoders[col] = le
    joblib.dump(le, f"models/{col}_encoder.joblib")

fert_type_encoder = LabelEncoder()
df["fertilizer_type_encoded"] = fert_type_encoder.fit_transform(df["fertilizer_type"])
label_encoders["fertilizer_type"] = fert_type_encoder
joblib.dump(fert_type_encoder, f"models/fertilizer_type_encoder.joblib")

fert_name_encoder = LabelEncoder()
df["fertilizer_name_encoded"] = fert_name_encoder.fit_transform(df["fertilizer_name"])
label_encoders["fertilizer_name"] = fert_name_encoder
joblib.dump(fert_name_encoder, f"models/fertilizer_name_encoder.joblib")

joblib.dump(label_encoders, f"models/label_encoders.joblib")

print("Encoders saved")

feature_cols = [
    "crop_type_encoded",
    "soil_type_encoded",
    "farm_size",
    "season_encoded",
    "previous_crop_encoded"
]

target_cols = [
    "nitrogen",
    "phosphorus",
    "potassium"
]

X = df[feature_cols]
y = df[target_cols]
y_fert_type = df["fertilizer_type_encoded"]
y_fert_name = df["fertilizer_name_encoded"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

X_train_type, X_test_type, y_train_type, y_test_type = train_test_split(
    X,
    y_fert_type,
    test_size=0.2,
    random_state=42
)

X_train_name, X_test_name, y_train_name, y_test_name = train_test_split(
    X,
    y_fert_name,
    test_size=0.2,
    random_state=42
)

print("Training models...")

models = {}
metrics = {}

for target in target_cols:

    print(f"Training {target} model...")

    model = XGBRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42
    )

    model.fit(X_train, y_train[target])

    y_pred = model.predict(X_test)

    r2 = r2_score(y_test[target], y_pred)
    rmse = np.sqrt(mean_squared_error(y_test[target], y_pred))

    metrics[target] = {
        "r2_score": float(r2),
        "rmse": float(rmse)
    }

    print(f"{target.upper()} -> R2: {r2:.3f} | RMSE: {rmse:.2f}")

    joblib.dump(model, f"models/{target}_model.joblib")

    models[target] = model

print("Training fertilizer type classifier...")

fert_type_model = XGBClassifier(
    n_estimators=500,
    max_depth=8,
    learning_rate=0.05,
    subsample=0.85,
    colsample_bytree=0.85,
    min_child_weight=1,
    gamma=0.1,
    reg_alpha=0.1,
    reg_lambda=1,
    random_state=42,
    use_label_encoder=False,
    eval_metric='mlogloss'
)

fert_type_model.fit(X_train_type, y_train_type)

y_pred_type = fert_type_model.predict(X_test_type)
type_accuracy = accuracy_score(y_test_type, y_pred_type)

print(f" Fertilizer Type -> Accuracy: {type_accuracy:.3f}")
print(classification_report(y_test_type, y_pred_type, target_names=fert_type_encoder.classes_))

joblib.dump(fert_type_model, "models/fertilizer_type_model.joblib")
metrics["fertilizer_type"] = {"accuracy": float(type_accuracy)}

print("Training fertilizer name classifier...")

fert_name_model = XGBClassifier(
    n_estimators=500,
    max_depth=8,
    learning_rate=0.05,
    subsample=0.85,
    colsample_bytree=0.85,
    min_child_weight=1,
    gamma=0.1,
    reg_alpha=0.1,
    reg_lambda=1,
    random_state=42,
    use_label_encoder=False,
    eval_metric='mlogloss'
)

fert_name_model.fit(X_train_name, y_train_name)

y_pred_name = fert_name_model.predict(X_test_name)
name_accuracy = accuracy_score(y_test_name, y_pred_name)

print(f" Fertilizer Name -> Accuracy: {name_accuracy:.3f}")
print(classification_report(y_test_name, y_pred_name, target_names=fert_name_encoder.classes_))

joblib.dump(fert_name_model, "models/fertilizer_name_model.joblib")
metrics["fertilizer_name"] = {"accuracy": float(name_accuracy)}

metadata = {
    "feature_columns": feature_cols,
    "target_columns": target_cols,
    "categorical_columns": categorical_cols,
    "fertilizer_categorical_columns": fertilizer_categorical_cols,
    "crop_types": list(label_encoders["crop_type"].classes_),
    "soil_types": list(label_encoders["soil_type"].classes_),
    "seasons": list(label_encoders["season"].classes_),
    "previous_crops": list(label_encoders["previous_crop"].classes_),
    "fertilizer_types": list(label_encoders["fertilizer_type"].classes_),
    "fertilizer_names": list(label_encoders["fertilizer_name"].classes_),
    "metrics": metrics
}

with open("models/metadata.json", "w") as f:
    json.dump(metadata, f, indent=4)

print("\nTraining completed successfully!")

print("\nModel Performance:")
for k, v in metrics.items():
    if "r2_score" in v:
        print(f"  {k.upper()} -> R2: {v['r2_score']:.3f} | RMSE: {v['rmse']:.2f}")
    else:
        print(f"  {k.upper()} -> Accuracy: {v['accuracy']:.3f}")

print("\nAvailable Crops:", metadata["crop_types"])
print("Available Soils:", metadata["soil_types"])
print("Available Seasons:", metadata["seasons"])
print("Available Fertilizer Types:", metadata["fertilizer_types"])
print("Available Fertilizer Names:", metadata["fertilizer_names"])