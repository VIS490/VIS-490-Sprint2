import unittest
import unittest.mock as mock
import app

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

TEST_COMPLETE_USER_RESPONSE = {
    "q1": 1, "q2": 1, "q3": 1, "q4": 1, "q5": 1, "q6": 1, "q7": 1, "q8": 1, "q9": 1, "q10": 1,
    "q11": 1, "q12": 1, "q13": 1, "q14": 1, "q15": 1, "q16": 1, "q17": 1, "q18": 1, "q19": 1, "q20": 1
}


class AppTest(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.flask_test_client = app.app.test_client()
        self.socketio_test_client = app.socketio.test_client(app.app, flask_test_client=self.flask_test_client)

    def test_on_connected_success(self):
        assert self.socketio_test_client.is_connected()

    def test_on_quiz_submission_success(self):
        with mock.patch('score.ScoresGenerator.get_all_scaled_scores') as mock_get_all_scaled_scores:
            mock_get_all_scaled_scores.return_value = TEST_SCALED_SCORES
            self.socketio_test_client.emit('on_quiz_submission', TEST_COMPLETE_USER_RESPONSE)

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