import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
	root: {

		display: 'flex',
		justifyContent: 'space-between',
		width: '1350px',

	},
	title: {
		fontSize: 34,
	},
})

const Question = (props) => {
	const [questionValue, setQuestionValue] = useState('0')
	const classes = useStyles()

	const handleChange = (event) => {
		event.preventDefault()
		setQuestionValue(event.target.value)
		let newQID = props.questionID + 1
		props.onUpdate(newQID, event.target.value, event)
	}
	return (
		<FormControl component="fieldset">
			<FormLabel component="legend"> {props.questionName} </FormLabel>
			<RadioGroup
				aria-label="question"
				name={props.questionName}
				value={questionValue}
				onChange={handleChange}
				classes={classes.title}
			>
				<FormControlLabel
					value="6"
					control={<Radio />}
					label="Strongly Agree"
					labelPlacement="start"
					classes={classes}
				/>
				<FormControlLabel
					value="5"
					control={<Radio />}
					label="Agree"
					labelPlacement="start"
					classes={classes}
				/>
				<FormControlLabel
					value="4"
					control={<Radio />}
					label="Somewhat Agree"
					labelPlacement="start"
					classes={classes}
				/>
				<FormControlLabel
					value="3"
					control={<Radio />}
					label="Somewhat Disagree"
					labelPlacement="start"
					classes={classes}
				/>
				<FormControlLabel
					value="2"
					control={<Radio />}
					label="Disagree"
					labelPlacement="start"
					classes={classes}
				/>
				<FormControlLabel
					value="1"
					control={<Radio />}
					label="Strongly Disagree"
					labelPlacement="start"
					classes={classes}
				/>
			</RadioGroup>
		</FormControl>
	)
}

export default Question
