from flask import Flask
from flask_socketio import SocketIO, emit
import json

import handlers

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('message')
def handle_message(message: str):
    data = json.loads(message)
    
    match data["action"]:
        case "create_room":
            handlers.create_room(data["user_id"])
            
        case "join_room":
            handlers.join_room(data["room_id"])
            
        case "start_room":
            handlers.start_room(data["user_id"], data["room_code"])
        
        case _:
            raise ValueError("no action matched")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
