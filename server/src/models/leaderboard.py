from src.models.user import User
from typing import Tuple, List, Dict
from src.models.guesses import UserGuesses

UserId = int
Score = int
NickName = str
Name = str

def calculate_scores(ug: UserGuesses) -> Tuple[List[Tuple[Dict]], Dict[NickName, Name]]:
    scores = []
    for u in User.users:
        score = 0
        user_guesses = ug[u.id] 
        for guess in user_guesses:
            for other_user in User.users:
                if other_user.nickname == guess[0] and other_user.name == guess[1]:
                    score += 1
        u.score = score
        scores.append(u.__dict__)

    answers = dict()
    for user in User.users:
        answers[user.nickname] = user.name
    return scores, answers
        
class Leaderboard:
    def __init__(self, ug: UserGuesses):
        self.scores = calculate_scores(ug)

