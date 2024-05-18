from typing import Dict, Tuple, List

UserId = int
NickName = str
RealName = str
Guesses = List[Tuple[NickName, RealName]]

class Guess:
    # User_id 
    guesses: Dict[UserId, Guesses] = {}

    @classmethod
    def add_guesses(cls, user_id: UserId, guesses: Guesses):
        Guess.guesses[user_id] = guesses
