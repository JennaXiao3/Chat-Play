import uuid

class ChatRoom:
    def __init__(self, name, host):
        self.id = str(uuid.uuid4())
        self.name = name
        self.host = host
        self.users = []
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}

    def add_user(self, user):
        self.users.append(user)

    def start_game(self):
        self.game_started = True
        # Add logic to generate prompts and start timer

    def end_game(self):
        self.game_started = False
        # Add logic to calculate points and update leaderboard

class User:
    def __init__(self, username, is_host=False):
        self.id = str(uuid.uuid4())
        self.username = username
        self.is_host = is_host
        self.points = 0

    def add_points(self, points):
        self.points += points