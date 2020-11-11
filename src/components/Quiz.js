import React from "react";
import Question from "./Question.js";
import Button from "@material-ui/core/Button";

const Quiz = () => {
  const [userResponses, updateUserResponses] = React.useState(
    { name: "q1", val: 0 },
    { name: "q2", val: 0 },
    { name: "q3", val: 0 }
  );

  const lst = ["q1-text", "q2-text", "q3-text"];

  function handleUpdate(id, e, itemAttributes) {
    var index = userResponses.findIndex((x) => x.id === id);
    console.log({ userResponses });
    if (index === -1) console.log("error");
    else updateUserResponses();
  }

  function handleClick(e) {
    // TODO: send a socket emit to python server
    console.log("in handle submit");
  }

  return (
    <div className="Quiz">
      <ul list-style-type="none">
        {lst.map((item, index) => (
          <li key={index}>
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