from build_dataset import build_dataset
from preprocess import preprocess
from train import train


def execute_pipeline():
    """Execute the full training pipeline, which includes building the dataset, preprocessing, and model training."""
    build_dataset()
    preprocess()
    train()
