#============= IMPORT THE NECESSARY LIBRARIES ========

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
#=====================================================


#=============== LOAD THE DATASET ===============
df = pd.read_csv("data/pa_county_features.csv")
#================================================



#================= TRAIN & TEST THE DATASET =============

X = df.drop("resilience_score", axis=1)
y = df["resilience_score"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=200, max_depth=10, random_state=42)
model.fit(X_train, y_train)

#================================================================


#========= DISPLAY THE SCORE =============
score = model.score(X_test, y_test)
print(f"Model Score: {score}")

joblib.dump(model, "model/model.pkl")
#======================================
