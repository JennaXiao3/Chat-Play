# server.py
from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


client_count = 0

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('disconnect')
def handle_disconnect():
    global client_count
    client_count -= 1
    notify_all_clients(f"number of connected clients {client_count}")


@socketio.on('connect')
def handle_connect():
    global client_count
    client_count += 1
    print('Client connected')
    emit('response', {'data': 'Connected to server'})
    notify_all_clients(f"number of connected clients {client_count}")

@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    emit('response', {'data': f'server says hi {client_count}'})

def notify_all_clients(data):
    print("notifying")
    socketio.emit('notification', {'data': data})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
        
