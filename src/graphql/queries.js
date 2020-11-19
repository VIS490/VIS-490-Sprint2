import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    Questions {
      question
    }
  }
`
export const GET_PROFILE_NAME =gql`query($email:String!){
  Users(
    where: {email: {_eq: $email}}
    ){
      name
    }
  }
`