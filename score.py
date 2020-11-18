"""score.py

Returns:
    int: test score
"""
from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))

KEY_WORK_LOAD = "Work_Load"
KEY_INDEPENDENCE = "Independence"
KEY_LEADER_SUPPORT = "Leader_Support"
KEY_PEER_RELATIONSHIPS = "Peer_Relationships"
KEY_CONTRIBUTION_IMPACT = "Contribution_and_Impact"
KEY_DEVELOPMENT = "Development"
KEY_TOTAL = "Wellness_Score"

WORK_LOAD_QUESTIONS = ["q2", "q6", "q10", "q14"]
INDEPENDENCE_QUESTIONS = ["q8", "q12", "q16", "q19"]
LEADER_SUPPORT_QUESTIONS = ["q3", "q17", "q20"]
PEER_RELATIONSHIPS_QUESTIONS = ["q7", "q13", "q18"]
CONTRIBUTION_IMPACT_QUESTIONS = ["q5", "q11", "q15"]
DEVELOPMENT_QUESTIONS = ["q1", "q4", "q9"]


class ScoresGenerator:
    """ScoresGenerator class"""
    SCALE_MULTIPLIER = 10
    SCORES = {}
    SCALED_SCORES = {}

    def __init__(self):
        """initialize variables
        """
        self.SCORES = {
            KEY_WORK_LOAD: 0,
            KEY_INDEPENDENCE: 0,
            KEY_LEADER_SUPPORT: 0,
            KEY_PEER_RELATIONSHIPS: 0,
            KEY_CONTRIBUTION_IMPACT: 0,
            KEY_DEVELOPMENT: 0
        }

        self.SCALED_SCORES = {
            KEY_WORK_LOAD: 0.0,
            KEY_INDEPENDENCE: 0.0,
            KEY_LEADER_SUPPORT: 0.0,
            KEY_PEER_RELATIONSHIPS: 0.0,
            KEY_CONTRIBUTION_IMPACT: 0.0,
            KEY_DEVELOPMENT: 0.0,
            KEY_TOTAL: 0.0
        }

    def split_data(self, data):
        """spliting the data
        """
        for k, v in data.items():
            if k in WORK_LOAD_QUESTIONS:
                self.SCORES[KEY_WORK_LOAD] += v
            if k in INDEPENDENCE_QUESTIONS:
                self.SCORES[KEY_INDEPENDENCE] += v
            if k in LEADER_SUPPORT_QUESTIONS:
                self.SCORES[KEY_LEADER_SUPPORT] += v
            if k in PEER_RELATIONSHIPS_QUESTIONS:
                self.SCORES[KEY_PEER_RELATIONSHIPS] += v
            if k in CONTRIBUTION_IMPACT_QUESTIONS:
                self.SCORES[KEY_CONTRIBUTION_IMPACT] += v
            if k in DEVELOPMENT_QUESTIONS:
                self.SCORES[KEY_DEVELOPMENT] += v

    def create_category_scaled_score(self, category):
        """create category scaled score
        """
        if category == KEY_WORK_LOAD or category == KEY_INDEPENDENCE:
            scaled_res = (self.SCORES[category] * self.SCALE_MULTIPLIER) / 24
            self.SCALED_SCORES[category] = scaled_res
        else:
            scaled_res = (self.SCORES[category] * self.SCALE_MULTIPLIER) / 18
            self.SCALED_SCORES[category] = scaled_res

    def create_total_scaled_score(self):
        """create total scaled score
        """
        for k, v in self.SCALED_SCORES.items():
            if k != KEY_TOTAL:
                self.SCALED_SCORES[KEY_TOTAL] += v

    def get_all_scaled_scores(self, data):
        """get all scaled score
        """
        self.split_data(data)
        for k in self.SCORES.keys():
            self.create_category_scaled_score(k)
        self.create_total_scaled_score()
        return self.SCALED_SCORES
