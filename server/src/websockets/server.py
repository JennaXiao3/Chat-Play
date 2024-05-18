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
            response = handlers.create_room(data["hostName"])
            socketio.emit("created-room", json.dumps(response))
            
        case "join-room":
            response = handlers.join_room(data["userName"], data["roomCode"])
            socketio.emit("joined-room", json.dumps(response))
            
        case "start-room":
            handlers.start_room(data["userId"], data["roomCode"])
        
        case _:
            raise ValueError("no action matched")
    
    
def start():
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
