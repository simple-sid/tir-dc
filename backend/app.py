from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
from scripts.inference import colorize_image

app = Flask(__name__)
CORS(app)  # Enable CORS for the frontend to access the API

# Ensure data directory exists
os.makedirs("data", exist_ok=True)
os.makedirs("output", exist_ok=True)  # Create output directory for processed images

@app.route("/", methods=["GET"])
def home():
    """Test route to check if the server is running"""
    return jsonify({"message": "PearlGAN API is running"}), 200

@app.route("/convert", methods=["POST"])
def convert_image():
    """Process uploaded thermal image and return colorized version"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    # Save the uploaded file temporarily
    temp_path = os.path.join("data", "temp_input.jpg")
    file.save(temp_path)
    
    try:
        # Process the image using your existing colorize_image function
        colorized_images = colorize_image(temp_path)
        
        # Convert the first colorized image to PIL Image and save
        colorized_img = colorized_images[0]
        
        # If the image has values between 0-1, scale to 0-255
        if np.max(colorized_img) <= 1.0:
            colorized_img = (colorized_img * 255).astype(np.uint8)
        
        img = Image.fromarray(colorized_img)
        output_path = os.path.join("output", "output_rgb.jpg")
        img.save(output_path)
        
        return jsonify({
            "message": "Image processed successfully", 
            "output": "/get_image/output_rgb.jpg"
        }), 200
        
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/get_image/<filename>", methods=["GET"])
def get_image(filename):
    """Serve the processed image"""
    try:
        return send_file(os.path.join("output", filename), mimetype='image/jpeg')
    except Exception as e:
        print(f"Error serving image: {str(e)}")
        return jsonify({"error": f"Image not found: {str(e)}"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)