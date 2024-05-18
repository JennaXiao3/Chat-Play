from typing import Union
from user import User
from src.utils.gen_id import gen_id

class Room:
    def __init__(self, hostid):
        self.id = str(uuid.uuid4())
        self.hostid = hostid
        self.users = []
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}
        self.messages = []  # Define messages attribute

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
        prompt = self.get_current_prompt()
        if prompt:
            if user_id not in self.user_answers:
                self.user_answers[user_id] = []
            self.user_answers[user_id].append(answer)