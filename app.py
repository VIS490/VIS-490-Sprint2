import flask
import os
from flask import Flask
from dotenv import load_dotenv
import flask_socketio

load_dotenv()

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")


@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print("Someone Connected")

@socketio.on('new login')
def onLogin(msg):
    print(msg)

@socketio.on('disconnect')
def on_disconnect():
    print('Someone disconnected!')

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 5000)),
        debug=True
    )
