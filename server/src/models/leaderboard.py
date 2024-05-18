from user import User
from typing import Dict, Tuple, Optional
from src.models.guesses import UserGuesses

UserId = int

def calculate_scores(ug: UserGuesses) -> Dict[UserId, int]:
    scores = dict()
    for u in User.users:
        score = 0
        g = ug[u] 
        for guess in g:
            for other_user in User.users:
                if other_user.nickname == guess[0] and other_user.name == guess[1]:
                    score += 1
        scores[u.id] = score
    return scores
        
class Leaderboard:
    def __init__(self, ug: UserGuesses):
        self.scores = calculate_scores(ug)

    def get_score(self, user_id) -> int:
        return self.scores.get(user_id, 0)

    def get_leader(self) -> Optional[Tuple[UserId, int]]:
        return max(self.scores, key=self.scores.get) 
