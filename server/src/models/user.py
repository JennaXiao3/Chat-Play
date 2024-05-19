from src.utils.colours import generate_colour
import random
from typing import List

class User:
    users: List['User'] = []
    
    @classmethod
    def find_by_id(cls, id):
        for user in cls.users:
            if user.id == id:
                return user

    def __init__(self, name: str):
        self.name: str = name
        self.nickname: str = self.generate_nickname()
        self.id: int = self.generate_id()
        self.colour = generate_colour()
        User.users.append(self)

    def generate_nickname(self) -> str:
        random1 = ['happy', 'goose', 'honque', 'honk', 'crazy']
        random2 = ['squirrel', 'brandon', 'rainbow', 'cupcake', 'apple']
        return random.choice(random1) + random.choice(random2) + str(random.randint(1, 99))

    def generate_id(self) -> int:
        return random.randint(1000, 9999)

    @classmethod
    def get_all_users(cls) -> List['User']:
        return cls.users
