import requests
import os

# Use a path to an image that exists in your system
image_path = os.path.join("data", "img.jpg")

# Make sure the file exists
if not os.path.exists(image_path):
    print(f"Error: Image not found at {image_path}")
    exit()

# Send the request
url = "http://localhost:5000/convert"
files = {"file": open(image_path, "rb")}

try:
    response = requests.post(url, files=files)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    
    if response.status_code == 200:
        output_url = f"http://localhost:5000{response.json()['output']}"
        print(f"Image URL: {output_url}")
except Exception as e:
    print(f"Error: {str(e)}")