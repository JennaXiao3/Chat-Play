import uuid

class Room:
    def __init__(self, host_id):
        self.id = str(uuid.uuid4())
        self.host_id = host_id
        self.user_ids = []
        self.code = 1231
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}

    def add_player(self, player_id):
        self.player_ids.append(player_id)

    def get_players(self):
        return [player.name for player in self.players]

    def start_game(self):
        self.game_started = True
        # Add logic to generate prompts and start timer
        # Do this later

    def end_game(self):
        self.game_started = False
        # Add logic to calculate points and update leaderboard
        # Do this later

    def remove_player(self, player_id):
        self.players = [player for player in self.players if player.id != player_id]

    def add_message(self, player_id, message):
        self.messages.append({'player_id': player_id, 'message': message})