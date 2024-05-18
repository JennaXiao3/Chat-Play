import uuid

class Room:
    def __init__(self, hostid):
        self.id = str(uuid.uuid4())
        self.hostid = hostid
        self.users = []
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}

    def add_user(self, user_id):
        self.users.append(user_id)

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