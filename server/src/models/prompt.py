class Prompt:
    def __init__(self, prompt_id, text):
        self.prompt_id = prompt_id
        self.text = text

    def change_text(self, new_text):
        self.text = new_text