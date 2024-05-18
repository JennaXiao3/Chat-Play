class Leaderboard:
    def __init__(self):
        self.scores = {}

    def add_score(self, user_id, score):
        self.scores[user_id] = self.scores.get(user_id, 0) + score

    def get_score(self, user_id):
        return self.scores.get(user_id, 0)

    def get_leader(self):
        return max(self.scores, key=self.scores.get)