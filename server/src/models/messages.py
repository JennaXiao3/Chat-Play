import datetime

class Message:
    def __init__(self, nickname, text):
        self.nickname = nickname
        self.text = text
        self.timestamp = datetime.datetime.now()

    def format_for_display(self):
        return f"{self.timestamp.strftime('%Y-%m-%d %H:%M:%S')} - {self.user_id}: {self.text}"