import datetime

class Message:
    def __init__(self, nickname: str, text: str):
        self.nickname: str = nickname
        self.text: str = text
        self.timestamp: datetime.datetime = datetime.datetime.now()

    def format_for_display(self) -> str:
        return f"{self.timestamp.strftime('%Y-%m-%d %H:%M:%S')} - {self.nickname}: {self.text}"