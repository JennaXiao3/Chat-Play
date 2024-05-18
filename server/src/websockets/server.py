from flask import Flask
from flask_socketio import SocketIO
import json

from . import handlers

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('message')
def handle_message(message: str):
    data = json.loads(message)
    
    match data["action"]:
        case "create-room":
            handlers.create_room(data["hostName"])
            
        case "join-room":
            handlers.join_room(data["userName"], data["roomCode"])
            
        case "start-room":
            handlers.start_room(data["userId"], data["roomCode"])
            
        case "add-message":
            handlers.add_message(data["userId"], data["roomCode"], data["messageText"])
        
        case _:
            raise ValueError("no action matched")
    
    
def start():
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
