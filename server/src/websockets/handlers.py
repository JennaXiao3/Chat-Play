from ..models.user import User
from ..models.room import Room


def create_room(host_name: str):
    print(host_name)
    host = User(host_name)
    room = Room(host.id)
    
    return {
        "room_id": room.id,
        "room_code": room.code,
        "user_id": host.id
    }
    

def join_room(user_name: str, room_code: int):
    user = User(user_name)
    room = Room.find_by_code(room_code)
    
    room.add_player(user.id)
    
    return {
        "user_id": user.id
    }
    
def start_room(user_id: int, room_code: int):
    room = Room.find_by_code(room_code)
    
    if room.host_id != user_id:
        raise ValueError("user id is not the host of the room")
    
    room.start_game()
    return {}
