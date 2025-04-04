import torch
from .model import build_generator
from skimage.color import rgb2lab, lab2rgb
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from torchvision import transforms

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model
G_net = build_generator(n_input=1, n_output=2, size=256)
G_net.load_state_dict(torch.load("../models/generator.pt", map_location=device))
G_net.eval()

def preprocess_image(img_path):
    img = Image.open(img_path).convert("RGB")
    img = transforms.Resize((256, 256), Image.BICUBIC)(img)
    img = np.array(img)
    img_lab = rgb2lab(img).astype("float32")
    img_lab = transforms.ToTensor()(img_lab)
    L = img_lab[[0], ...] / 50. - 1.
    return L.unsqueeze(0).to(device)

def colorize_image(img_path):
    L = preprocess_image(img_path)
    with torch.no_grad():
        ab = G_net(L)
    L = (L + 1.) * 50.
    ab = ab * 110.
    Lab = torch.cat([L, ab], dim=1).permute(0, 2, 3, 1).cpu().numpy()
    rgb_imgs = [lab2rgb(img) for img in Lab]
    return np.stack(rgb_imgs, axis=0)

if __name__ == "__main__":
    img_path = "../data/img.jpg"
    colorized_images = colorize_image(img_path)

    plt.imshow(colorized_images[0])
    plt.axis("off")
    plt.show()
