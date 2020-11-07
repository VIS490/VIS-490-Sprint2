import unittest
import unittest.mock as mock
import score
import sys
from os.path import dirname, join

sys.path.insert(1, join(dirname(__file__), '../'))

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


# TODO: write success and failure tests for:
#  get all scaled scores

class ScoresTest(unittest.TestCase):
    @classmethod
    def setUpClass(self):
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
            },
            {
                KEY_INPUT: TEST_INCOMPLETE_USER_RESPONSE,
                KEY_EXPECTED: {
                    KEY_WORK_LOAD: 3,
                    KEY_INDEPENDENCE: 1,
                    KEY_LEADER_SUPPORT: 1,
                    KEY_PEER_RELATIONSHIPS: 1,
                    KEY_CONTRIBUTION_IMPACT: 1,
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
            },
            {
                KEY_INPUT: TEST_INCOMPLETE_USER_RESPONSE,
                KEY_EXPECTED: {
                    KEY_WORK_LOAD: 8,
                    KEY_INDEPENDENCE: 8,
                    KEY_LEADER_SUPPORT: 8,
                    KEY_PEER_RELATIONSHIPS: 8,
                    KEY_CONTRIBUTION_IMPACT: 8,
                    KEY_DEVELOPMENT: 8
                }
            }
        ]
        self.success_create_category_scaled_score_test_params = [
            {
                KEY_INPUT: KEY_WORK_LOAD,
                KEY_EXPECTED: 0
            },
            {
                KEY_INPUT: KEY_PEER_RELATIONSHIPS,
                KEY_EXPECTED: 0
            }
        ]
        self.failure_create_category_scaled_score_test_params = [
            {
                KEY_INPUT: KEY_WORK_LOAD,
                KEY_EXPECTED: 10
            },
            {
                KEY_INPUT: KEY_PEER_RELATIONSHIPS,
                KEY_EXPECTED: 10
            }
        ]
        self.success_get_all_scaled_score_test_params = [
            {
                KEY_INPUT: TEST_COMPLETE_USER_RESPONSE,
                KEY_EXPECTED: {
                    KEY_WORK_LOAD: 0.0,
                    KEY_INDEPENDENCE: 0.0,
                    KEY_LEADER_SUPPORT: 0.0,
                    KEY_PEER_RELATIONSHIPS: 0.0,
                    KEY_CONTRIBUTION_IMPACT: 0.0,
                    KEY_DEVELOPMENT: 0.0,
                    KEY_TOTAL: 0.0
                }
            }
        ]
        self.failure_get_all_scaled_score_test_params = [
            {
                KEY_INPUT: TEST_COMPLETE_USER_RESPONSE,
                KEY_EXPECTED: {
                    KEY_WORK_LOAD: 1.0,
                    KEY_INDEPENDENCE: 1.0,
                    KEY_LEADER_SUPPORT: 1.0,
                    KEY_PEER_RELATIONSHIPS: 1.0,
                    KEY_CONTRIBUTION_IMPACT: 1.0,
                    KEY_DEVELOPMENT: 1.0,
                    KEY_TOTAL: 1.0
                }
            }
        ]

    def test_split_data_success(self):
        for test in self.success_split_data_test_params:
            score_test = score.ScoresGenerator()
            score_test.split_data(test[KEY_INPUT])
            self.assertDictEqual(score_test.SCORES, test[KEY_EXPECTED])

    def test_split_data_failure(self):
        for test in self.failure_split_data_test_params:
            score_test = score.ScoresGenerator()
            score_test.split_data(test[KEY_INPUT])
            self.assertNotEqual(score_test.SCORES[KEY_WORK_LOAD], test[KEY_EXPECTED][KEY_WORK_LOAD])
            self.assertNotEqual(score_test.SCORES[KEY_INDEPENDENCE], test[KEY_EXPECTED][KEY_INDEPENDENCE])
            self.assertNotEqual(score_test.SCORES[KEY_LEADER_SUPPORT], test[KEY_EXPECTED][KEY_LEADER_SUPPORT])
            self.assertNotEqual(score_test.SCORES[KEY_PEER_RELATIONSHIPS], test[KEY_EXPECTED][KEY_PEER_RELATIONSHIPS])
            self.assertNotEqual(score_test.SCORES[KEY_CONTRIBUTION_IMPACT], test[KEY_EXPECTED][KEY_CONTRIBUTION_IMPACT])
            self.assertNotEqual(score_test.SCORES[KEY_DEVELOPMENT], test[KEY_EXPECTED][KEY_DEVELOPMENT])

    def test_create_category_scaled_score_success(self):
        score_test = score.ScoresGenerator()
        for test in self.success_create_category_scaled_score_test_params:
            score_test.create_category_scaled_score(test[KEY_INPUT])
            self.assertEqual(score_test.SCALED_SCORES[test[KEY_INPUT]], test[KEY_EXPECTED])

    def test_create_category_scaled_score_failure(self):
        score_test = score.ScoresGenerator()
        for test in self.failure_create_category_scaled_score_test_params:
            score_test.create_category_scaled_score(test[KEY_INPUT])
            self.assertNotEqual(score_test.SCALED_SCORES[test[KEY_INPUT]], test[KEY_EXPECTED])

    def test_create_total_scaled_score(self):
        score_test = score.ScoresGenerator()
        expected = 0
        score_test.create_total_scaled_score()
        self.assertEqual(score_test.SCALED_SCORES[KEY_TOTAL], expected)

    def test_get_all_scaled_scores_success(self):
        with mock.patch('score.ScoresGenerator.split_data') as mock_split_data:
            with mock.patch('score.ScoresGenerator.create_category_scaled_score') as mock_scaled_category:
                with mock.patch('score.ScoresGenerator.create_total_scaled_score') as mock_scaled_total:
                    for test in self.success_get_all_scaled_score_test_params:
                        score_test = score.ScoresGenerator()
                        score_test.get_all_scaled_scores(test[KEY_INPUT])
                        self.assertDictEqual(score_test.SCALED_SCORES, test[KEY_EXPECTED])

    def test_get_all_scaled_scores_failure(self):
        with mock.patch('score.ScoresGenerator.split_data') as mock_split_data:
            with mock.patch('score.ScoresGenerator.create_category_scaled_score') as mock_scaled_category:
                with mock.patch('score.ScoresGenerator.create_total_scaled_score') as mock_scaled_total:
                    for test in self.failure_get_all_scaled_score_test_params:
                        score_test = score.ScoresGenerator()
                        score_test.get_all_scaled_scores(test[KEY_INPUT])
                        self.assertNotAlmostEqual(score_test.SCORES[KEY_WORK_LOAD],
                                                  test[KEY_EXPECTED][KEY_WORK_LOAD], places=1)
                        self.assertNotAlmostEqual(score_test.SCORES[KEY_INDEPENDENCE],
                                                  test[KEY_EXPECTED][KEY_INDEPENDENCE], places=1)
                        self.assertNotAlmostEqual(score_test.SCORES[KEY_LEADER_SUPPORT],
                                                  test[KEY_EXPECTED][KEY_LEADER_SUPPORT], places=1)
                        self.assertNotAlmostEqual(score_test.SCORES[KEY_PEER_RELATIONSHIPS],
                                                  test[KEY_EXPECTED][KEY_PEER_RELATIONSHIPS], places=1)
                        self.assertNotAlmostEqual(score_test.SCORES[KEY_CONTRIBUTION_IMPACT],
                                                  test[KEY_EXPECTED][KEY_CONTRIBUTION_IMPACT], places=1)
                        self.assertNotAlmostEqual(score_test.SCORES[KEY_DEVELOPMENT],
                                                  test[KEY_EXPECTED][KEY_DEVELOPMENT], places=1)


if __name__ == '__main__':
    unittest.main()
