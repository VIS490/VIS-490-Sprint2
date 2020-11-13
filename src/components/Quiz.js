import React from 'react'
import Question from './Question.js'
import Button from '@material-ui/core/Button'

const Quiz = () => {
	const resetList = [
		{ id: '1', name: 'q1-text', qval: 0 },
		{ id: '2', name: 'q2-text', qval: 0 },
		{ id: '3', name: 'q3-text', qval: 0 },
		{ id: '4', name: 'q4-text', qval: 0 },
		{ id: '5', name: 'q5-text', qval: 0 },
		{ id: '6', name: 'q6-text', qval: 0 },
		{ id: '7', name: 'q7-text', qval: 0 },
		{ id: '8', name: 'q8-text', qval: 0 },
		{ id: '9', name: 'q9-text', qval: 0 },
		{ id: '10', name: 'q10-text', qval: 0 },
		{ id: '11', name: 'q11-text', qval: 0 },
		{ id: '12', name: 'q12-text', qval: 0 },
		{ id: '13', name: 'q13-text', qval: 0 },
		{ id: '14', name: 'q14-text', qval: 0 },
		{ id: '15', name: 'q15-text', qval: 0 },
		{ id: '16', name: 'q16-text', qval: 0 },
		{ id: '17', name: 'q17-text', qval: 0 },
		{ id: '18', name: 'q18-text', qval: 0 },
		{ id: '19', name: 'q19-text', qval: 0 },
		{ id: '20', name: 'q20-text', qval: 0 }
	]
	const [userResponses, updateUserResponses] = React.useState(resetList)

	// TODO: Populate questionList with the questions from the DB
	const questionList = [
		'q1-text',
		'q2-text',
		'q3-text',
		'q4-text',
		'q5-text',
		'q6-text',
		'q7-text',
		'q8-text',
		'q9-text',
		'q10-text',
		'q11-text',
		'q12-text',
		'q13-text',
		'q14-text',
		'q15-text',
		'q16-text',
		'q17-text',
		'q18-text',
		'q19-text',
		'q20-text'
	]

	const handleUpdate = (id, newVal, e) => {
		console.log('in parent handle update id: ' + id + ' newval: ' + newVal)
		const elementIndex = id - 1
		console.log(elementIndex)
		let newUserResponses = [...userResponses]
		newUserResponses[elementIndex] = {
			...newUserResponses[elementIndex],
			qval: newVal
		}
		updateUserResponses(newUserResponses)
		console.log(JSON.stringify(userResponses))
	}

	const handleClick = (e) => {
		// TODO: send a socket emit to python server
		console.log('in handle submit')
		console.log(JSON.stringify(userResponses))
		updateUserResponses(resetList)
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
	)
}

export default Quiz
