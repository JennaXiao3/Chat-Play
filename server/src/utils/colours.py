import random

colours = [ "F5F91B", "1BF9C4", "FF555", "86FF73" ]

def generate_colour() -> str:
    return random.choice(colours) 
