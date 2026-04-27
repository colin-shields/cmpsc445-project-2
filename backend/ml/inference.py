import joblib
import numpy as np

class Predictor:
    def __init__(self):
        self.model = None

    def load(self):
        # later you replace with real model
        self.model = None

    def predict(self, features: np.ndarray):
        return 1 - features.mean()