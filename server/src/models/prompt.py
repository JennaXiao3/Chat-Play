import time
from typing import List, Dict, Optional

class Prompt:
    def __init__(self, prompt_id: int, text: str):
        self.prompt_id: int = prompt_id
        self.text: str = text
        self.current_prompt_index: int = 0
        self.prompts: List[str] = []
        self.user_answers: Dict[int, List[Optional[str]]] = {}
        self.users: List[User] = []  # Assuming there's a User class with user_id attribute

    def change_text(self, new_text: str):
        self.text = new_text

    def current_prompt(self) -> Optional[str]:
        if 0 <= self.current_prompt_index < len(self.prompts):
            return self.prompts[self.current_prompt_index]
        return None
    
    def next_prompt(self) -> Optional[str]:
        self.current_prompt_index += 1
        if self.current_prompt_index >= len(self.prompts):
            self.end_game()
            return None
        return self.prompts[self.current_prompt_index]
    
    def submit_answer(self, user_id: int, answer: str):
        prompt = self.current_prompt()
        if prompt:
            if user_id not in self.user_answers:
                self.user_answers[user_id] = []
            self.user_answers[user_id].append(answer)
            
            if len(self.user_answers) == len(self.users):
                time.sleep(120)  # This will block execution; consider using async sleep in async context
                self.next_prompt()
                
                for user in self.users:
                    if user.id not in self.user_answers:
                        self.user_answers[user.id] = [None]
                
                self.next_prompt()
                
    def end_game(self):
        # Implementation for ending the game
        pass
