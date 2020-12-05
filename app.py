"""app.py
"""
import os
import flask
from dotenv import load_dotenv
import flask_socketio
import score

load_dotenv()

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app, cors_allowed_origins="*")


def get_room_client_id():
    """get unique client id

    Returns:
        uid: unique client id
    """
    u_id = flask.request.sid
    return u_id


@app.route('/')
def hello():
    """get the index.html file
    """
    return flask.render_template('index.html')


@socketio.on("connect")
def on_connect():
    """print on new user connection
    """
    print(f"Someone connected... {get_room_client_id()}")


@socketio.on("on_quiz_submission")
def on_quiz_submission(data):
    """emit, when user submits a quiz

    Args:
        data ([string]): [quiz responses]
    """
    score_generator = score.ScoresGenerator()
    data_dict = {}
    for var in data:
        q_key = "q" + var['qid']
        data_dict.update({q_key: int(var['qval'])})
    print(data_dict)
    result = score_generator.get_all_scaled_scores(data_dict)
    socketio.emit("on_quiz_submission_response", result, room=get_room_client_id())
    print(f'Emitted socket to client {get_room_client_id()} with updated scores: {result}')


@socketio.on("disconnect")
def on_disconnect():
    """print when user disconnects
    """
    print(f"Someone disconnected... {get_room_client_id()}")


if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
