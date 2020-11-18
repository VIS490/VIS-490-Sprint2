import React from 'react'
import Question from './Question.js'
import Socket from './Socket.js'
import Button from '@material-ui/core/Button'
import { gql, useQuery, useMutation } from '@apollo/client'
import {List,ListItem,Paper,Card} from '@material-ui/core'

const queryString = `
		query  {
			Questions  {
			    question
			}
    }`
  
const GET_ALL_QUESTIONS = gql`${queryString}`

const Quiz = (props) => {
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
    const elementIndex = id - 1;
    let newUserResponses = [...userResponses];
    newUserResponses[elementIndex] = {
      ...newUserResponses[elementIndex],
      qval: newVal
    };
    updateUserResponses(newUserResponses);
  };

	const handleClick = (e) => {
		console.log(JSON.stringify(userResponses))
		Socket.emit('on_quiz_submission', userResponses)
		updateUserResponses(resetList)
	}

  return (
    <div className="Quiz">
			<Paper style={{maxHeight: 900, overflow: 'auto'}}>
				<List component="nav"  aria-label="contacts">
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

const callSetQuestionList = () =>  {
  const { loading, error, data } = useQuery(GET_ALL_QUESTIONS)
  
  let questionList = []

  if (loading) return <div>'Loading...'</div>
  if (error) return `Error! ${error.message}`
  
  for(let i = 0; i < data['Questions'].length; i++){
    let qtext = data['Questions'][i]['question']
    questionList.push(qtext)
  }
  console.log(JSON.stringify(questionList))

  return <Quiz questions={questionList} />
}

export default callSetQuestionList
export { GET_ALL_QUESTIONS }
