from os.path import dirname, join
import sys

sys.path.insert(1, join(dirname(__file__), '../'))

# TODO: Reformat as a Class file

KEY_WORK_LOAD = "Work Load"
KEY_INDEPENDENCE = "Independence"
KEY_LEADER_SUPPORT = "Leader Support"
KEY_PEER_RELATIONSHIPS = "Peer Relationships"
KEY_CONTRIBUTION_IMPACT = "Contribution and Impact"
KEY_DEVELOPMENT = "Development"
KEY_TOTAL = "Wellness Score"

WORK_LOAD_QUESTIONS = ["q2", "q6", "q10", "q14"]
INDEPENDENCE_QUESTIONS = ["q8", "q12", "q16", "q19"]
LEADER_SUPPORT_QUESTIONS = ["q3", "q17", "q20"]
PEER_RELATIONSHIPS_QUESTIONS = ["q7", "q13", "q18"]
CONTRIBUTION_IMPACT_QUESTIONS = ["q5", "q11", "q15"]
DEVELOPMENT_QUESTIONS = ["q1", "q4", "q9"]

SCALE_MULTIPLIER = 10

SCORES = {
    KEY_WORK_LOAD: 0,
    KEY_INDEPENDENCE: 0,
    KEY_LEADER_SUPPORT: 0,
    KEY_PEER_RELATIONSHIPS: 0,
    KEY_CONTRIBUTION_IMPACT: 0,
    KEY_DEVELOPMENT: 0
}

SCALED_SCORES = {
    KEY_WORK_LOAD: 0.0,
    KEY_INDEPENDENCE: 0.0,
    KEY_LEADER_SUPPORT: 0.0,
    KEY_PEER_RELATIONSHIPS: 0.0,
    KEY_CONTRIBUTION_IMPACT: 0.0,
    KEY_DEVELOPMENT: 0.0,
    KEY_TOTAL: 0.0
}


def split_data(data):
    for k, v in data.items():
        if k in WORK_LOAD_QUESTIONS:
            SCORES[KEY_WORK_LOAD] += v
        if k in INDEPENDENCE_QUESTIONS:
            SCORES[KEY_INDEPENDENCE] += v
        if k in LEADER_SUPPORT_QUESTIONS:
            SCORES[KEY_LEADER_SUPPORT] += v
        if k in PEER_RELATIONSHIPS_QUESTIONS:
            SCORES[KEY_PEER_RELATIONSHIPS] += v
        if k in CONTRIBUTION_IMPACT_QUESTIONS:
            SCORES[KEY_CONTRIBUTION_IMPACT] += v
        if k in DEVELOPMENT_QUESTIONS:
            SCORES[KEY_DEVELOPMENT] += v


def get_category_raw_score(category):
    return SCORES[category]


def get_category_scaled_score(category):
    if category == KEY_WORK_LOAD or category == KEY_INDEPENDENCE:
        scaled_res = (SCORES[category] * SCALE_MULTIPLIER) / 24
        SCALED_SCORES[category] = scaled_res

    scaled_res = (SCORES[category] * SCALE_MULTIPLIER) / 18
    SCALED_SCORES[category] = scaled_res
    # return scaled_res


def get_total_scaled_score():
    for v in SCALED_SCORES.values():
        SCALED_SCORES[KEY_TOTAL] += v
    # return SCALED_SCORES[KEY_TOTAL]


def get_all_scaled_scores(data):
    split_data(data)
    for k in SCORES.keys():
        get_category_scaled_score(k)
    get_total_scaled_score()
    return SCALED_SCORES
