import json
import os
from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))

KEY_WORK_LOAD = "Work Load"
KEY_INDEPENDENCE = "Independence"
KEY_LEADER_SUPPORT = "Leader Support"
KEY_PEER_RELATIONSHIPS = "Peer Relationships"
KEY_CONTRIBUTION_IMPACT = "Contribution and Impact"
KEY_DEVELOPMENT = "Development"

WORK_LOAD_QUESTIONS = ["q2", "q6", "q10", "q14"]
INDEPENDENCE_QUESTIONS = ["q8", "q12", "q16", "q19"]
LEADER_SUPPORT_QUESTIONS = ["q3", "q17", "q20"]
PEER_RELATIONSHIPS_QUESTIONS = ["q7", "q13", "q18"]
CONTRIBUTION_IMPACT_QUESTIONS = ["q5", "q11", "q15"]
DEVELOPMENT_QUESTIONS = ["q1", "q4", "q9"]

TEST = {"q1": 5, "q2": 4, "q3": 1}

RESPONSES = {
    KEY_WORK_LOAD: 0,
    KEY_INDEPENDENCE: 0,
    KEY_LEADER_SUPPORT: 0,
    KEY_PEER_RELATIONSHIPS: 0,
    KEY_CONTRIBUTION_IMPACT: 0,
    KEY_DEVELOPMENT: 0
}


def split_data(data):
    for k, v in data.items():
        if k in WORK_LOAD_QUESTIONS:
            RESPONSES[KEY_WORK_LOAD] += v
        if k in INDEPENDENCE_QUESTIONS:
            RESPONSES[KEY_INDEPENDENCE] += v
        if k in LEADER_SUPPORT_QUESTIONS:
            RESPONSES[KEY_LEADER_SUPPORT] += v
        if k in PEER_RELATIONSHIPS_QUESTIONS:
            RESPONSES[KEY_PEER_RELATIONSHIPS] += v
        if k in CONTRIBUTION_IMPACT_QUESTIONS:
            RESPONSES[KEY_CONTRIBUTION_IMPACT] += v
        if k in DEVELOPMENT_QUESTIONS:
            RESPONSES[KEY_DEVELOPMENT] += v


def get_category_raw_score(category):
    return RESPONSES[category]


def get_category_scaled_score(category):
    print("")


def get_total_scaled_score():
    print("")


split_data(TEST)
print(RESPONSES)
