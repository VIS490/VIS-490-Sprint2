import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Question = (props) => {
  const [value, setValue] = React.useState("0");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"> {props.questionName} </FormLabel>
      <RadioGroup
        aria-label="question"
        name={props.questionName}
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="6"
          control={<Radio />}
          label="Strongly Agree"
          labelPlacement="start"
        />
        <FormControlLabel
          value="5"
          control={<Radio />}
          label="Agree"
          labelPlacement="start"
        />
        <FormControlLabel
          value="4"
          control={<Radio />}
          label="Somewhat Agree"
          labelPlacement="start"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Somewhat Disagree"
          labelPlacement="start"
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="Disagree"
          labelPlacement="start"
        />
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="Strongly Disagree"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Question;
