import datetime
from src.utils.gen_id import gen_id


class Message:
    time_format = '%Y-%m-%d %H:%M:%S'
    messages = []
    
    @classmethod
    def find_by_id(cls, id: int) -> "Message":
        for message in cls.messages:
            if message.id == id:
                return message
    
    def __init__(self, user_id: int, text: str):
        self.id = gen_id("message") 
        self.user_id: int = user_id
        self.text: str = text
        self.timestamp: str = datetime.datetime.now().strftime(Message.time_format)
        Message.messages.append(self)

    def format_for_display(self) -> str:
        return f"{self.timestamp} - {self.user_id}: {self.text}"
