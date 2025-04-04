# scripts/download_model.py
from huggingface_hub import hf_hub_download

repo_id = "Hammad712/GAN-Colorization-Model"
model_filename = "generator.pt"
model_path = hf_hub_download(repo_id=repo_id, filename=model_filename, local_dir="../models/")

print(f"Model downloaded to: {model_path}")
