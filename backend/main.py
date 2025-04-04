from scripts.inference import colorize_image
import matplotlib.pyplot as plt

if __name__ == "__main__":
    img_path = "data/img.jpg"  # Replace with your image path
    colorized_images = colorize_image(img_path)

    plt.imshow(colorized_images[0])
    plt.axis("off")
    plt.show()
