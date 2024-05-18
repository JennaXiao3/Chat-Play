import random
import time
from typing import List, Dict, Optional
from src.models.user import User
from src.models.user import room

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
    
    def end_game(self):
        print("PlaceHolder.")
    
    def submit_answer(self, user_id: int, answer: str):
        prompt = self.current_prompt()
        if prompt:
            if user_id not in self.user_answers:
                self.user_answers[user_id] = []
            self.user_answers[user_id].append(answer)
            
            if len(self.user_answers) == len(self.users):
                time.sleep(120)  
                self.next_prompt()
                
                for user in self.users:
                    if user.id not in self.user_answers:
                        self.user_answers[user.id] = [None]
                
                self.next_prompt()
class PromptGenerator:
    def __init__(self):
        self.prompts = [
            "What is your favorite color?",
            "What is your favorite food?",
            "Describe your dream vacation.",
            "What is your favorite book?",
            "What is your favorite movie?",
            "What is your favorite hobby?",
            "If you could have any superpower, what would it be?",
            "What is your biggest fear?",
            "What is your proudest accomplishment?",
            "If you could meet any historical figure, who would it be?"
        ]

    def add_prompt(self, prompt_text: str):
        self.prompts.append(prompt_text)

    def generate_prompt(self) -> str:
        if self.prompts:
            return self.prompts.pop(0)
        return ""
    
    def shuffle_prompts(self):
        random.shuffle(self.prompts)
