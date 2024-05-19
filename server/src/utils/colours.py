import random

colours = [ "F5F91B", "1BF9C4", "FF555", "86FF73", "F18F01", "048BA8", "99C24D", "EC058E" ]

def generate_colour() -> str:
    random.shuffle(colours)
    return colours.pop(0)

