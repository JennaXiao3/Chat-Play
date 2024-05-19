from src.utils.gen_id import gen_id
from src.utils.gen_room_code import gen_room_code
from src.models.guesses import UserGuesses, Guesses
from src.models.leaderboard import Leaderboard

class Room:
    TOTAL_NUM_PROMPTS = 5
    rooms = []
    
    @classmethod
    def find_by_code(cls, code: int):
        for room in cls.rooms:
            if room.code == code:
                return room
            
    @classmethod
    def find_by_id(cls, id: int):
        for room in cls.rooms:
            if room.id == id:
                return room
    
    def __init__(self, host_id):
        self.id = gen_id("room")
        self.host_id = host_id
        self.user_ids = [host_id]
        self.code = gen_room_code()
        self.game_started = False
        self.prompt_ids = []
        self.leaderboard = {}
        self.user_guesses: UserGuesses = {} 
        Room.rooms.append(self)

    def add_user_id(self, user_id):
        self.user_ids.append(user_id)

    def start_game(self):
        self.game_started = True
        self.current_prompt_index = 0

    def end_game(self):
        self.game_started = False
        # Add logic to calculate points and update leaderboard
        # Do this later
        if len(self.user_guesses) == 0:
            print("There are no guesses. This may be a mistake")

        self.leaderboard = Leaderboard(self.user_guesses)

    def add_guesses(self, user_id: int, guesses: Guesses):
        self.user_guesses[user_id] = guesses
        
    def add_prompt_id(self, prompt_id):
        self.prompt_ids.append(prompt_id)

    def remove_user_id(self, user_id):
        self.users = [user for user in self.users if user.user_id != user_id]
