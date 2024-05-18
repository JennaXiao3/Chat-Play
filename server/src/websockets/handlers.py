from src.models import User, Room
import json

from .server import socketio

def create_room(host_name):
    host = User(host_name)
    room = Room(host.id)

    response = {
        "room_id": room.id,
        "room_code": room.code,
        "user_id": host.id,
    }
    
    socketio.emit("created-room", json.dumps(response))


def join_room(user_name, room_code):
    user = User(user_name)
    room = Room.find_by_code(room_code)

    room.add_user_id(user.id)
    
    print(room.user_ids)

    response = {
        "room_id": room.id,
        "users": [User.find_by_id(user_id).__dict__ for user_id in room.user_ids]
    }
    
    socketio.emit("joined-room", json.dumps(response))


def start_room(user_id: int, room_code: int):
    room = Room.find_by_code(room_code)

    if room.host_id != user_id:
        raise ValueError("user id is not the host of the room")

    room.start_game()
    
    socketio.emit("started-game")
