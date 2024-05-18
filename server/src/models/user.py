class User:
    def __init__(self, user_id, nickname):
        self.user_id = user_id
        self.nickname = nickname

    def change_nickname(self, new_nickname):
        self.nickname = new_nickname