import React from "react";
import Question from "./Question.js";
import Button from "@material-ui/core/Button";

const Quiz = () => {
  const [userResponses, updateUserResponses] = React.useState([
    { id: "q1", name: "q1", val: 0 },
    { id: "q2", name: "q2", val: 0 }
  ]);

  // TODO: Populate questionList with the questions from the DB
  const questionList = ["q1-text", "q2-text"];

  // TODO: Not sure how/where this function should be called
  function handleUpdate(id, newVal, e) {
    e.preventDefault();
    const elementIndex = userResponses.findIndex(
      (element) => element.id === id
    );
    let newUserResponses = [...userResponses];
    newUserResponses[elementIndex] = {
      ...newUserResponses[elementIndex],
      val: newVal
    };
    updateUserResponses(newUserResponses);
  }

  function handleClick(e) {
    // TODO: send a socket emit to python server
    // TODO: clear userResponses state
    console.log("in handle submit");
    console.log(JSON.stringify(userResponses));
  }

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
