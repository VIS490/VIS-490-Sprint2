import unittest
import sys
from os.path import dirname, join

sys.path.insert(1, join(dirname(__file__), '../'))
import score

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

KEY_WORK_LOAD = "Work Load"
KEY_INDEPENDENCE = "Independence"
KEY_LEADER_SUPPORT = "Leader Support"
KEY_PEER_RELATIONSHIPS = "Peer Relationships"
KEY_CONTRIBUTION_IMPACT = "Contribution and Impact"
KEY_DEVELOPMENT = "Development"
KEY_TOTAL = "Wellness Score"

TEST_COMPLETE_USER_RESPONSE = {
    "q1": 1, "q2": 1, "q3": 1, "q4": 1, "q5": 1, "q6": 1, "q7": 1, "q8": 1, "q9": 1, "q10": 1,
    "q11": 1, "q12": 1, "q13": 1, "q14": 1, "q15": 1, "q16": 1, "q17": 1, "q18": 1, "q19": 1, "q20": 1
}

TEST_INCOMPLETE_USER_RESPONSE = {
    "q1": 1, "q2": 1, "q3": 1, "q4": 1, "q5": 1, "q6": 1, "q7": 1, "q8": 1, "q9": 1, "q10": 1
}


class ScoresTest(unittest.TestCase):
    def setUp(self):
        self.success_split_data_test_params = [
            {
                KEY_INPUT: TEST_COMPLETE_USER_RESPONSE,
                KEY_EXPECTED: {
                    KEY_WORK_LOAD: 4,
                    KEY_INDEPENDENCE: 4,
                    KEY_LEADER_SUPPORT: 3,
                    KEY_PEER_RELATIONSHIPS: 3,
                    KEY_CONTRIBUTION_IMPACT: 3,
                    KEY_DEVELOPMENT: 3
                }
            }
        ]
        self.failure_split_data_test_params = [
            {
                KEY_INPUT: TEST_COMPLETE_USER_RESPONSE,
                KEY_EXPECTED: {
                    KEY_WORK_LOAD: 3,
                    KEY_INDEPENDENCE: 3,
                    KEY_LEADER_SUPPORT: 4,
                    KEY_PEER_RELATIONSHIPS: 4,
                    KEY_CONTRIBUTION_IMPACT: 4,
                    KEY_DEVELOPMENT: 4
                }
            }
        ]

    def test_split_data_success(self):
        for test in self.success_split_data_test_params:
            score.split_data(test[KEY_INPUT])
            self.assertDictEqual(score.SCORES, test[KEY_EXPECTED])

    def test_split_data_failure(self):
        for test in self.failure_split_data_test_params:
            score.split_data(test[KEY_INPUT])
            self.assertNotEqual(score.SCORES[KEY_WORK_LOAD], test[KEY_EXPECTED][KEY_WORK_LOAD])
            self.assertNotEqual(score.SCORES[KEY_INDEPENDENCE], test[KEY_EXPECTED][KEY_INDEPENDENCE])
            self.assertNotEqual(score.SCORES[KEY_LEADER_SUPPORT], test[KEY_EXPECTED][KEY_LEADER_SUPPORT])
            self.assertNotEqual(score.SCORES[KEY_PEER_RELATIONSHIPS], test[KEY_EXPECTED][KEY_PEER_RELATIONSHIPS])
            self.assertNotEqual(score.SCORES[KEY_CONTRIBUTION_IMPACT], test[KEY_EXPECTED][KEY_CONTRIBUTION_IMPACT])
            self.assertNotEqual(score.SCORES[KEY_DEVELOPMENT], test[KEY_EXPECTED][KEY_DEVELOPMENT])


if __name__ == '__main__':
    unittest.main()
