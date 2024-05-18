from user import User
from typing import List, Tuple
from src.models.guesses import Guess

UserId = int

def calculate_scores() -> List[Tuple[UserId, int]]:
    scores = []
    for u in User.users:
        score = 0
        g = Guess.guesses[u]
        for guess in g:
            for other_user in User.users:
                if other_user.nickname == guess[0] and other_user.name == guess[1]:
                    score += 1
        scores.append((u.id, score))
    return scores
        

class Leaderboard:
    def __init__(self):
        self.scores = {}

    def add_score(self, user_id, score):
        self.scores[user_id] = self.scores.get(user_id, 0) + score

    def get_score(self, user_id):
        return self.scores.get(user_id, 0)

    def get_leader(self):
        return max(self.scores, key=self.scores.get)
