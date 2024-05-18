class Prompt:
    def __init__(self, prompt_id, text):
        self.prompt_id = prompt_id
        self.text = text

    def change_text(self, new_text):
        self.text = new_text

    def current_prompt(self):
        if 0 <= self.current_prompt_index<len(self.prompts):
            return self.prompts[self.current_prompt_index]
        return None
    
    def next_prompt(self):
        self.current_prompt_index += 1
        if self.current_prompt_index >= len(self.prompts):
            self.end_game()
            return None
        return self.prompts[self.current_prompt_index]
    
    def submit_answer(self, user_id, answer):
        prompt = self.current_prompt()
        if prompt:
            if user_id not in self.user_answers:
                self.user_answers[user_id] = []
            self.user_answers[user_id].append(answer)
            
            if len(self.user_answers) == len(self.users):
                time.sleep(120) 
                self.next_prompt()
                
                for user in self.users:
                    if user.user_id not in self.user_answers:
                        self.user_answers[user.user_id] = [None]
                
                self.next_prompt()