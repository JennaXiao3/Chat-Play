from src.models import User, Room, Prompt, Message
import json, datetime, time

from .server import socketio
from src.utils.colours import reset_colours


def update_lobby(room: Room):
    response = {
        "room_id": room.id,
        "users": [User.find_by_id(user_id).__dict__ for user_id in room.user_ids],
    }

    socketio.emit("updated-lobby", json.dumps(response))


def update_chat(room: Room):
    prompts: list[Prompt] = [Prompt.find_by_id(prompt_id) for prompt_id in room.prompt_ids]
    
    chat = {}
    
    for prompt in prompts:
        messages = []
        for message_id in prompt.message_ids:
            message = Message.find_by_id(message_id)
            messages.append(message.__dict__)
        chat[prompt.content] = messages
    
    response = {
        "room_id": room.id,
        "chat": chat
    }
    
    socketio.emit("update-chat", json.dumps(response))
    

def send_new_prompt(room: Room):
    if Room.TOTAL_NUM_PROMPTS == len(room.prompt_ids):
        room.end_game()
        return
    
    prompt = Prompt()
    
    room.add_prompt_id(prompt.id)
    
    response = {
        "room_id": room.id,
        "prompt_content": prompt.content,
        "deletion_time": prompt.deletion_time.strftime(Prompt.time_format)
   
    }
    
    socketio.emit("new-prompt", response)
    
    time.sleep(Prompt.lifespan.total_seconds())
    
    if prompt.deletion_time < datetime.datetime.now():
        send_new_prompt(room)
    

def create_room(host_name):
    host = User(host_name)
    room = Room(host.id)
    reset_colours()

    response = {
        "room_id": room.id,
        "room_code": room.code,
        "user_id": host.id,
        "user_colour" : host.colour,
        "user_nickname": host.nickname
    }

    socketio.emit("created-room", json.dumps(response))

    update_lobby(room)


def join_room(user_name, room_code):
    print([room.code for room in Room.rooms])
    print(room_code)
    user = User(user_name)
    room = Room.find_by_code(room_code)

    room.add_user_id(user.id)

    response = {"room_id": room.id, "user_id": user.id, "room_code": room.code, "user_colour": user.colour, "user_nickname": user.nickname}

    socketio.emit("joined-room", json.dumps(response))

    update_lobby(room)


def start_room(user_id: int, room_code: int):
    room = Room.find_by_code(room_code)

    if room.host_id != user_id:
        raise ValueError("user id is not the host of the room")

    room.start_game()

    socketio.emit("started-game")
    
    send_new_prompt(room)


def add_message(user_id: int, room_code: int, message_text: str):
    print("hi")
    print(user_id, room_code, message_text)
    room: Room = Room.find_by_code(room_code)
    
    message = Message(user_id, message_text)
    
    prompt_id = room.prompt_ids[-1]
    prompt: Prompt = Prompt.find_by_id(prompt_id)
    
    prompt.add_message_id(message.id)
    
    update_chat(room)
    
    
    responded_user_ids = set([Message.find_by_id(message_id).user_id for message_id in prompt.message_ids])
    room_user_ids = room.user_ids
    
    prompt_is_answered_by_all_users = len(responded_user_ids) == len(room_user_ids)
    if prompt_is_answered_by_all_users:
        send_new_prompt(room)

def add_guess(user_id: int, user_guesses, room_code: int):
    room: Room = Room.find_by_code(room_code)
    room.add_guesses(user_id, user_guesses)
    room_user_ids = room.user_ids
    
    prompt_is_answered_by_all_users = len(room.user_guesses) == len(room_user_ids)
    if prompt_is_answered_by_all_users:
        send_leaderboard(room)

def send_leaderboard(room):
    room.end_game()

    response = {
        "room_id": room.id,
        "scores": room.leaderboard.scores
        
    }
    
    socketio.emit("scores", response)

    

