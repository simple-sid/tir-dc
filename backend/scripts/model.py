import torch
from fastai.vision.learner import create_body
from torchvision.models import resnet34
from fastai.vision.models.unet import DynamicUnet

def build_generator(n_input=1, n_output=2, size=256):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    backbone = create_body(resnet34(), pretrained=True, n_in=n_input, cut=-2)
    G_net = DynamicUnet(backbone, n_output, (size, size)).to(device)
    return G_net
