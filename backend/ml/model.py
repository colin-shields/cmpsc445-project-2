import numpy as np

class ResilienceModel:
    def predict(self, X):
        return np.clip(1 - X.mean(axis=1), 0, 1)