import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	question: {
		display: 'flex',
		justifyContent: 'start',
		padding: '10px',
	},
	title: {
		fontSize: 34,
		justifyContent: 'flex-start'
	},
	labels:{
		display:'flex',
		justifyContent: 'flex-end',
	}
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
		<div className={classes.question}>
			<Paper elevation={0}>
				<FormControl component="fieldset" style={{}}>
					<FormLabel component="legend" style={{fontSize:'20px',fontWeight:'bold', color:'black'}}> {props.questionName} </FormLabel>
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
							labelPlacement="end"
							classes={classes}

						/>
						<FormControlLabel
							value="5"
							control={<Radio />}
							label="Agree"
							labelPlacement="end"
							classes={classes}
						/>
						<FormControlLabel
							value="4"
							control={<Radio />}
							label="Somewhat Agree"
							labelPlacement="end"
							classes={classes}
						/>
						<FormControlLabel
							value="3"
							control={<Radio />}
							label="Somewhat Disagree"
							labelPlacement="end"
							classes={classes}
						/>
						<FormControlLabel
							value="2"
							control={<Radio />}
							label="Disagree"
							labelPlacement="end"
							classes={classes}
						/>
						<FormControlLabel
							value="1"
							control={<Radio />}
							label="Strongly Disagree"
							labelPlacement="end"
							classes={classes}
						/>
					</RadioGroup>
				</FormControl>
			</Paper>
		</div>
	)
}

export default Question
