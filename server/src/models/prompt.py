import datetime, string, random
from src.utils.gen_id import gen_id
from src.utils import groq
from src.models import Message


class Prompt:
    lifespan = datetime.timedelta(seconds=60)
    time_format = "%Y-%m-%d %H:%M:%S"
    
    prompts = []
    
    @classmethod
    def find_by_id(cls, id):
        for prompt in cls.prompts:
            if prompt.id == id:
                return prompt
    
    def __init__(self):
        self.id = gen_id("prompt")
        self.deletion_time = datetime.datetime.now() + Prompt.lifespan
        self.content = groq.generate_prompt()
        self.message_ids = []
        Prompt.prompts.append(self)
        
    def add_message_id(self, message_id):
        self.message_ids.append(message_id)
        
    def is_answered_by_all_users(self, room) -> bool:
        responded_user_ids = set([Message.find_by_id(message_id).user_id for message_id in self.message_ids])
        return len(responded_user_ids) == len(room.user_ids)
        
    
    
    