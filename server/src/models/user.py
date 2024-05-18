import random
from typing import List

class User:
    users: List['User'] = []

    def __init__(self, user_id: int, name: str):
        self.name: str = name
        self.id = user_id
        self.nickname: str = self.generate_nickname()
        self.id: int = self.generate_id()
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
