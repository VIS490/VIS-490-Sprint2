import flask
import os
from flask import Flask
from dotenv import load_dotenv
import flask_socketio
from Oath import Oauth
import score

load_dotenv()

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app, cors_allowed_origins="*")

score_generator = score.ScoresGenerator()

def get_room_client_id():
    u_id = flask.request.sid
    return u_id


@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on("connect")
def on_connect():
    print(f"Someone connected... {get_room_client_id()}")

@socketio.on("on_quiz_submission")
def on_quiz_submission(data):
    result = score_generator.get_all_scaled_scores(data)
    socketio.emit("on_quiz_submission_response", result, room=get_room_client_id())

@socketio.on('new login')
def onLogin(msg):
    oath = Oauth()
    res = oath.login_user(msg['email'], msg['password'])
    print(res)
    socketio.emit('new user', res)


@socketio.on("disconnect")
def on_disconnect():
    print(f"Someone disconnected... {get_room_client_id()}")

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', 'localhost'),
        port=int(os.getenv('PORT', 5000)),
        debug=True
    )