from typing import Union
from src.models.user import User
from src.utils.gen_id import gen_id
import time

class Room:
    rooms = []
    
    @classmethod
    def find_by_code(cls, code: int):
        for room in cls.rooms:
            if room.code == code:
                return room
        return None
    
    def __init__(self, hostid):
        self.id = str(uuid.uuid4())
        self.hostid = hostid
        self.users = []
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}
        self.messages = []  # Define messages attribute
        Room.rooms.append(self)

    def add_user(self, user):
        self.users.append(user)  

    def get_users(self):
        return [user.nickname for user in self.users]  

    def start_game(self):
        self.game_started = True
        self.current_prompt_index = 0

    def end_game(self):
        self.game_started = False
        # Add logic to calculate points and update leaderboard
        # Do this later

    def remove_player(self, user_id):
        self.users = [user for user in self.users if user.user_id != user_id] 

    def add_message(self, user_id, message):
        self.messages.append({'user_id': user_id, 'message': message})

    def current_prompt(self):
        if 0 <= self.current_prompt_index<len(self.prompts):
            return self.prompts[self.current_prompt_index]
        return None
    
    def next_prompt(self):
        self.current_prompt_index += 1
        if self.current_prompt_index >= len(self.prompts):
            self.end_game()
            return None
        return self.prompts[self.current_prompt_index]
    
    def submit_answer(self, user_id, answer):
        prompt = self.current_prompt()
        if prompt:
            if user_id not in self.user_answers:
                self.user_answers[user_id] = []
            self.user_answers[user_id].append(answer)
            
            if len(self.user_answers) == len(self.users):
                time.sleep(120) 
                self.next_prompt()
                
                for user in self.users:
                    if user.user_id not in self.user_answers:
                        self.user_answers[user.user_id] = [None]
                
                self.next_prompt()