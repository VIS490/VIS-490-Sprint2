import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    Questions {
      question
    }
  }
`

export const GET_WELLNESS_SCORE = gql`
  query($email: String!){
    Tests(where: {
      User:{
        email:{
          _eq:$email
        
        }
      }
    }) {
      score
    }
  }  
`
