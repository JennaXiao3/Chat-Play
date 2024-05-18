from typing import Dict, Tuple, List

UserId = int
NickName = str
RealName = str
Guesses = List[Tuple[NickName, RealName]]

UserGuesses = Dict[UserId, Guesses]
