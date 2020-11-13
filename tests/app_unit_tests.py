import unittest
import unittest.mock as mock
from os.path import dirname, join
import sys
import app
from app import app as Flask_App
sys.path.insert(1, join(dirname(__file__), '../'))


KEY_WORK_LOAD = "Work Load"
KEY_INDEPENDENCE = "Independence"
KEY_LEADER_SUPPORT = "Leader Support"
KEY_PEER_RELATIONSHIPS = "Peer Relationships"
KEY_CONTRIBUTION_IMPACT = "Contribution and Impact"
KEY_DEVELOPMENT = "Development"
KEY_TOTAL = "Wellness Score"

KEY_QUIZ_SOCKET_RESPONSE = "on_quiz_submission_response"

TEST_SCALED_SCORES = {
    KEY_WORK_LOAD: 1.666666667,
    KEY_INDEPENDENCE: 1.666666667,
    KEY_LEADER_SUPPORT: 1.666666667,
    KEY_PEER_RELATIONSHIPS: 1.666666667,
    KEY_CONTRIBUTION_IMPACT: 1.666666667,
    KEY_DEVELOPMENT: 1.666666667,
    KEY_TOTAL: 10.0
}

qval = "qval"
qid = "qid"

TEST_QUIZ_SUBMISSION = [
    {qid: "1", qval: 1},
    {qid: "2", qval: 1},
    {qid: "3", qval: 1},
    {qid: "4", qval: 1},
    {qid: "5", qval: 1},
    {qid: "6", qval: 1},
    {qid: "7", qval: 1},
    {qid: "8", qval: 1},
    {qid: "9", qval: 1},
    {qid: "10", qval: 1},
    {qid: "11", qval: 1},
    {qid: "12", qval: 1},
    {qid: "13", qval: 1},
    {qid: "14", qval: 1},
    {qid: "15", qval: 1},
    {qid: "16", qval: 1},
    {qid: "17", qval: 1},
    {qid: "18", qval: 1},
    {qid: "19", qval: 1},
    {qid: "20", qval: 1}
]


class AppTest(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.flask_test_client = app.app.test_client()
        self.socketio_test_client = app.socketio.test_client(app.app, flask_test_client=self.flask_test_client)

    def test_on_connected_success(self):
        assert self.socketio_test_client.is_connected()

    def test_home(self):
        """/ ROUTE"""
        tester = Flask_App.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_on_quiz_submission_success(self):
        with mock.patch('score.ScoresGenerator.get_all_scaled_scores') as mock_get_all_scaled_scores:
            mock_get_all_scaled_scores.return_value = TEST_SCALED_SCORES
            self.socketio_test_client.emit('on_quiz_submission', TEST_QUIZ_SUBMISSION)

        response = self.socketio_test_client.get_received()
        self.assertEqual(response[0]['name'], KEY_QUIZ_SOCKET_RESPONSE)
        self.assertAlmostEqual(response[0]['args'][0][KEY_WORK_LOAD],
                               TEST_SCALED_SCORES[KEY_WORK_LOAD], places=7)
        self.assertAlmostEqual(response[0]['args'][0][KEY_INDEPENDENCE],
                               TEST_SCALED_SCORES[KEY_INDEPENDENCE], places=7)
        self.assertAlmostEqual(response[0]['args'][0][KEY_LEADER_SUPPORT],
                               TEST_SCALED_SCORES[KEY_LEADER_SUPPORT], places=7)
        self.assertAlmostEqual(response[0]['args'][0][KEY_PEER_RELATIONSHIPS],
                               TEST_SCALED_SCORES[KEY_PEER_RELATIONSHIPS], places=7)
        self.assertAlmostEqual(response[0]['args'][0][KEY_CONTRIBUTION_IMPACT],
                               TEST_SCALED_SCORES[KEY_CONTRIBUTION_IMPACT], places=7)
        self.assertAlmostEqual(response[0]['args'][0][KEY_DEVELOPMENT],
                               TEST_SCALED_SCORES[KEY_DEVELOPMENT], places=7)
        self.assertAlmostEqual(response[0]['args'][0][KEY_TOTAL],
                               TEST_SCALED_SCORES[KEY_TOTAL], places=1)


if __name__ == '__main__':
    unittest.main()
