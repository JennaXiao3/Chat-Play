import datetime
from typing import Optional

class Message:
    def __init__(self, user_id: int, text: str):
        self.user_id: int = user_id
        self.text: str = text
        self.timestamp: datetime.datetime = datetime.datetime.now()

    def format_for_display(self) -> str:
        return f"{self.timestamp.strftime('%Y-%m-%d %H:%M:%S')} - {self.user_id}: {self.text}"
