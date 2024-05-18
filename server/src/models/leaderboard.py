from user import User
from typing import Dict, Tuple, Optional
from src.models.guesses import Guess

UserId = int

def calculate_scores() -> Dict[UserId, int]:
    scores = dict()
    for u in User.users:
        score = 0
        g = Guess.guesses[u]
        for guess in g:
            for other_user in User.users:
                if other_user.nickname == guess[0] and other_user.name == guess[1]:
                    score += 1
        scores[u.id] = score
    return scores
        
class Leaderboard:
    def __init__(self):
        self.scores = calculate_scores()

    def get_score(self, user_id) -> int:
        return self.scores.get(user_id, 0)

    def get_leader(self) -> Optional[Tuple[UserId, int]]:
        return max(self.scores, key=self.scores.get) 
