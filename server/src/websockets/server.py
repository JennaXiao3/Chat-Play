from flask import Flask
from flask_socketio import SocketIO, emit
import json

from . import handlers

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('message')
def handle_message(message: str):
    data = json.loads(message)
    
    match data["action"]:
        case "create_room":
            message = json.dumps(handlers.create_room(data["user_id"]))
            socketio.emit("created-room", message)
            
        case "join_room":
            message = handlers.join_room(data["room_id"])
            socketio.emit("joined-room", message)
            
        case "start_room":
            response = handlers.start_room(data["user_id"], data["room_code"])
        
        case _:
            raise ValueError("no action matched")
    
    
def start():
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
