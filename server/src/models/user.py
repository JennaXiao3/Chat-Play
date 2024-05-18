import random

class User:
    users = []
    def __init__(self, name):
        self.name = name
        self.nickname = self.generate_nickname()
        self.id = 123

    def generate_nickname(self):
        random1 = ['happy', 'goose', 'honque', 'honk', 'crazy']
        random2 = ['squirrel', 'brandon', 'rainbow', 'cupcake', 'apple']
        return random.choice(random1) + random.choice(random2) + str(random.randint(1, 99))
