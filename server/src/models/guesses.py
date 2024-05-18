from typing import Dict, Tuple, List

UserId = int
Nickname = str
RealName = str

class Guess:
    # User_id 
    guesses: Dict[UserId, List[Tuple[Nickname, RealName]]] = {}
