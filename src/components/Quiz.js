import React from "react";
import Question from "./Question.js";
import Socket from "./Socket.js";
import Button from "@material-ui/core/Button";
import { gql, useQuery, useMutation } from "@apollo/client";
//import { GET_ALL_QUESTIONS } from "../graphql/queries";

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
  let questionList = [
    "I am motivated to contribute and work today.",
    "The tasks I have to get done today are manageable.",
    "I am able to actively communicate any difficulties with my manager/team lead.",
    "The tasks that I am currently working on challenge my thinking and original perceptions.",
    "The tasks I work on offer visible real-world impact.",
    "I am not working on tasks after work hours.",
    "I feel confident in reaching out to team members to resolve any difficulties I am currently facing.",
    "I am encouraged to approach the tasks as I best see fit.",
    "I am progressing towards either my personal or career goals.",
    "I have taken breaks to calmly eat my lunch.",
    "The team meetings I attend are necessary and effective in progressing the team.",
    "I worry about my current work environment.",
    "My team members respect me.",
    "I am able to maintain a work-life balance.",
    "I feel that my questions, concerns, and/or suggestions are validated by both my peers and the manager/team lead.",
    "My current state of emotions are an not impediment to my current work ethic.",
    "My manager/team lead respects me.",
    "I am able to socialize with my team members or others not regarding my work.",
    "I am able to step away from my desk or main workspace and not feel restless.",
    "At present, I feel my manager/team lead supports me."
  ];

  const handleUpdate = (id, newVal, e) => {
    const elementIndex = id - 1;
    let newUserResponses = [...userResponses];
    newUserResponses[elementIndex] = {
      ...newUserResponses[elementIndex],
      qval: newVal
    };
    updateUserResponses(newUserResponses);
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
            <Question questionName={item} questionID={id} onUpdate={handleUpdate} />
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
