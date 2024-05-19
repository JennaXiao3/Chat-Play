import random
import copy

colours = [ "F5F91B", "1BF9C4", "FFF555", "86FF73", "F18F01", "048BA8", "99C24D", "EC058E", "42F2F7", "498C8A", "F4CAE0", "FFC145" ]

curr_colours = copy.deepcopy(colours)

def generate_colour() -> str:
    random.shuffle(curr_colours)
    return curr_colours.pop(0)


def reset_colours():
    curr_colours.clear()
    curr_colours.extend(colours)

