from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
import io

app = Flask(__name__)

# Load pre-trained CycleGAN model for TIR to RGB conversion
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = torch.hub.load("pytorch/vision", "cycle_gan", "thermal2rgb.pth")
model.to(device).eval()

# Preprocessing function
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])
    return transform(image).unsqueeze(0).to(device)

# Function to convert TIR to RGB
def convert_tir_to_rgb(image_bytes):
    input_tensor = preprocess_image(image_bytes)
    with torch.no_grad():
        output_tensor = model(input_tensor)
    output_image = transforms.ToPILImage()(output_tensor.squeeze(0).cpu())
    return output_image

# Flask route for image processing
@app.route("/convert", methods=["POST"])
def convert_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    image_bytes = file.read()

    # Convert image
    output_image = convert_tir_to_rgb(image_bytes)

    # Save output image
    output_image.save("output_rgb.jpg")
    
    return jsonify({"message": "Image processed successfully", "output": "output_rgb.jpg"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
