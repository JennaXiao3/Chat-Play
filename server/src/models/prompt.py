import datetime


LIFE_TIME = datetime.timedelta(minutes=2)

class Prompt:
    def __init__(self, room_id, creation_time = datetime.datetime.now()):
        self.room_id = room_id
        self.deletion_time = creation_time + LIFE_TIME
        self.content = "what is your fav city"
        self.message_ids = []
    
    
    