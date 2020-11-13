import React from "react";
import Question from "./Question.js";
import Socket from "./Socket.js";
import Button from "@material-ui/core/Button";

const Quiz = () => {
  const resetList = [
    { id: "1", qval: 0 },
    { id: "2", qval: 0 },
    { id: "3", qval: 0 },
    { id: "4", qval: 0 },
    { id: "5", qval: 0 },
    { id: "6", qval: 0 },
    { id: "7", qval: 0 },
    { id: "8", qval: 0 },
    { id: "9", qval: 0 },
    { id: "10", qval: 0 },
    { id: "11", qval: 0 },
    { id: "12", qval: 0 },
    { id: "13", qval: 0 },
    { id: "14", qval: 0 },
    { id: "15", qval: 0 },
    { id: "16", qval: 0 },
    { id: "17", qval: 0 },
    { id: "18", qval: 0 },
    { id: "19", qval: 0 },
    { id: "20", qval: 0 }
  ];
  const [userResponses, updateUserResponses] = React.useState(resetList);

  // TODO: Populate questionList with the questions from the DB
   const questionList = [
    "q1-text",
    "q2-text",
    "q3-text",
    "q4-text",
    "q5-text",
    "q6-text",
    "q7-text",
    "q8-text",
    "q9-text",
    "q10-text",
    "q11-text",
    "q12-text",
    "q13-text",
    "q14-text",
    "q15-text",
    "q16-text",
    "q17-text",
    "q18-text",
    "q19-text",
    "q20-text"
  ];

  const handleUpdate = (id, newVal, e) => {
    console.log("in parent handle update id: " + id + " newval: " + newVal);
    const elementIndex = id - 1;
    console.log(elementIndex);
    let newUserResponses = [...userResponses];
    newUserResponses[elementIndex] = {
      ...newUserResponses[elementIndex],
      qval: newVal
    };
    updateUserResponses(newUserResponses);
    console.log(JSON.stringify(userResponses));
  };

  const handleClick = (e) => {
    // TODO: send a socket emit to python server
    console.log("in handle submit");
    console.log(JSON.stringify(userResponses));
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
