from build_dataset import build_dataset
from preprocess import preprocess
from train import train

def execute_pipeline():
    build_dataset()
    preprocess()
    train()
