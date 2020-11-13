import React from "react";
import Question from "./Question.js";
import Socket from "./Socket.js";
import Button from "@material-ui/core/Button";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_ALL_QUESTIONS } from "../graphql/queries";

const Quiz = (props) => {
  const resetList = [
    { qid: "1", qval: 0 },
    { qid: "2", qval: 0 },
    { qid: "3", qval: 0 },
    { qid: "4", qval: 0 },
    { qid: "5", qval: 0 },
    { qid: "6", qval: 0 },
    { qid: "7", qval: 0 },
    { qid: "8", qval: 0 },
    { qid: "9", qval: 0 },
    { qid: "10", qval: 0 },
    { qid: "11", qval: 0 },
    { qid: "12", qval: 0 },
    { qid: "13", qval: 0 },
    { qid: "14", qval: 0 },
    { qid: "15", qval: 0 },
    { qid: "16", qval: 0 },
    { qid: "17", qval: 0 },
    { qid: "18", qval: 0 },
    { qid: "19", qval: 0 },
    { qid: "20", qval: 0 }
  ];
  const [userResponses, updateUserResponses] = React.useState(resetList);
  let questionList = [];

  function getAllQuestionsQuery() {
     const { loading, error, data } = useQuery(GET_ALL_QUESTIONS_QUERY);
     if (loading) return 'Loading...';
     if (error) return `Error! ${error.message}`;
     for(temp in data['data']['Questions']){
         questionList.push(temp['question']);
     }
  }
  getAllQuestionsQuery();

  const handleUpdate = (id, newVal, e) => {
    const elementIndex = id - 1;
    let newUserResponses = [...userResponses];
    newUserResponses[elementIndex] = {
      ...newUserResponses[elementIndex],
      qval: newVal
    };
    updateUserResponses(newUserResponses);
    console.log(JSON.stringify(userResponses));
  };

  const handleClick = (e) => {
    console.log(JSON.stringify(userResponses));
    Socket.emit("on_quiz_submission", userResponses);
    updateUserResponses(resetList);
  };

  return (
    <div className="Quiz">
      <ul list-style-type="none">
        {questionList.map((item, id) => (
          <li key={id}>
            <Question questionName={item} update={handleUpdate} />
          </li>
        ))}
      </ul>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Submit Responses
      </Button>
    </div>
  );
};

export default Quiz;
