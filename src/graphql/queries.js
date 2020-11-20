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

export const GET_WELLNESS_SCORE = gql`
  query MyQuery($email: String!) {
    Users(where: {email: {_eq: $email}, _and: {}}, limit: 1) {
      UserTests(order_by: {created_at: desc_nulls_last}) {
        Test {
          score
        }
      }
    }
  }
`
