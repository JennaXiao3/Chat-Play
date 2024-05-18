import uuid

class Room:
    def __init__(self, host):
        self.id = str(uuid.uuid4())
        self.host = host
        self.players = []
        self.game_started = False
        self.prompts = []
        self.leaderboard = {}

    def add_player(self, player):
        self.players.append(player)
        
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