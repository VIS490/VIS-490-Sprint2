import React, { useState } from 'react'
import Question from './Question.js'
import Socket from './Socket.js'
import Button from '@material-ui/core/Button'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import {List,ListItem,Paper,Card} from '@material-ui/core'
import { GET_ALL_QUESTIONS_QUERY } from "../graphql/queries"
import { ADD_NEW_TEST } from '../graphql/mutations'
import { Link, useHistory } from 'react-router-dom'

const Quiz = (props) => {
	const { currentUser } = useAuth()
	const email = currentUser.email
	const [addTest] = useMutation(ADD_NEW_TEST)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const resetList = [
		{ qid: '1', qval: 0 },
		{ qid: '2', qval: 0 },
		{ qid: '3', qval: 0 },
		{ qid: '4', qval: 0 },
		{ qid: '5', qval: 0 },
		{ qid: '6', qval: 0 },
		{ qid: '7', qval: 0 },
		{ qid: '8', qval: 0 },
		{ qid: '9', qval: 0 },
		{ qid: '10', qval: 0 },
		{ qid: '11', qval: 0 },
		{ qid: '12', qval: 0 },
		{ qid: '13', qval: 0 },
		{ qid: '14', qval: 0 },
		{ qid: '15', qval: 0 },
		{ qid: '16', qval: 0 },
		{ qid: '17', qval: 0 },
		{ qid: '18', qval: 0 },
		{ qid: '19', qval: 0 },
		{ qid: '20', qval: 0 }
	]

	const [userResponses, updateUserResponses] = React.useState(resetList)

	const handleUpdate = (id, newVal, e) => {
		const elementIndex = id - 1
		let newUserResponses = [...userResponses]
		newUserResponses[elementIndex] = {
			...newUserResponses[elementIndex],
			qval: newVal
		}
		updateUserResponses(newUserResponses)
	}

	const handleClick = (e) => {
		e.preventDefault()
		Socket.emit('on_quiz_submission', userResponses)
		updateUserResponses(resetList)
		Socket.on('on_quiz_submission_response', (data) => {
			console.log(JSON.stringify(data))
			try{
				addTest({
					variables: {
						objects:[{
							score: data['Wellness_Score'],
							work_load_score: data['Work_Load'],
							autonomy_score: data['Independence'],
							peer_relations_score: data['Peer_Relationships'],
							leader_support_score: data['Leader_Support'],
							development_score: data['Development'],
							impact_score: data['Contribution_and_Impact'],
							test_users_rel: {
								data: {
									user_email: email
								}
							}
						}]
					}
				})
			}
			catch (err){
				console.log(err.message)
			}
		})
		try {
			setError('')
			setLoading(true)
			history.push('/dashboard')
		} catch{
			setError('Something went wrong!')
		}
		setLoading(false)
	  }	  

	return (
		<div className="Quiz">
			<Paper style={{ maxHeight: 900, overflow: 'auto' }}>
				<List component="nav" aria-label="contacts">
					{props.questions.map((item, id) => (
						<li key={id}>
							<ListItem button>
								<Question questionName={item} questionID={id} onUpdate={handleUpdate} />
							</ListItem>
						</li>
					))}
				</List>
			</Paper>
				<Button variant="outlined" color="secondary" onClick={handleClick}>
					Submit Responses
				</Button>
		</div>
	)
}

const callSetQuestionList = () => {
	const { loading, error, data } = useQuery(GET_ALL_QUESTIONS_QUERY)

	let questionList = []

	if (loading) return <div>Loading...</div>
	if (error) return `Error! ${error.message}`

	for (let i = 0; i < data['Questions'].length; i++) {
		let qtext = data['Questions'][i]['question']
		questionList.push(qtext)
	}
	console.log(JSON.stringify(questionList))

	return <Quiz questions={questionList} />
}

export default callSetQuestionList
