from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    emit('response', {'data': f'server says hi {client_count}'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
