import random

colours = [ "F5F91B", "1BF9C4", "FF555", "86FF73", "F18F01", "048BA8", "99C24D", "EC058E" ]

curr_colours = colours.copy()

def generate_colour() -> str:
    random.shuffle(curr_colours)
    return curr_colours.pop(0)


def reset_colours():
    curr_colours = colours.copy()

