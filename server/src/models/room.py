import uuid
from typing import Union


class Room:
    rooms = []
    
    @classmethod
    def find_by_code(cls, code: int) -> Union["Room", None]:
        for room in cls.rooms:
            if room.code == code:
                return room
        return None
    
    def __init__(self, host_id):
        self.id = str(uuid.uuid4())
        self.host_id = host_id
        self.code = 12312
        self.user_ids = []
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}
        Room.rooms.append(self)

    def add_user_id(self, user_id):
        self.user_ids.append(user_id)

    def get_users(self):
        return [users.name for user in self.users]

    def start_game(self):
        self.game_started = True
        # Add logic to generate prompts and start timer
        # Do this later

    def end_game(self):
        self.game_started = False
        # Add logic to calculate points and update leaderboard
        # Do this later

    def remove_player(self, user_id):
        self.users = [user for user in self.users if user.id != user_id]

    def add_message(self, user_id, message):
        self.messages.append({'user_id': user_id, 'message': message})