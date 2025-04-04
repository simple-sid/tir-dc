import urllib.request

url = "https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix/releases/download/v0.1/cycle_gan_checkpoints.tar"
model_path = "thermal2rgb.pth"

urllib.request.urlretrieve(url, model_path)
print("Download complete!")
