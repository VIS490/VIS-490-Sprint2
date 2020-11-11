import flask
import os
from flask import Flask
from dotenv import load_dotenv
import flask_socketio
from Oath import Oauth

load_dotenv()

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app, cors_allowed_origins="*")


@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print("Someone Connected")


@socketio.on('new login')
def onLogin(msg):
    oath = Oauth()
    res = oath.login_user(msg['email'], msg['password'])
    socketio.emit('new user', res)

@socketio.on('disconnect')
def on_disconnect():
    print('Someone disconnected!')

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', 'localhost'),
        port=int(os.getenv('PORT', 5000)),
        debug=True
    )
