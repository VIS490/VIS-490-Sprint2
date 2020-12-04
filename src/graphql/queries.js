import { gql } from '@apollo/client'

export const GET_ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    Questions {
      question
    }
  }
`
export const GET_PROFILE_NAME = gql`query($email:String!){
  Users(
    where: {email: {_eq: $email}}
    ){
      name
    }
  }
`

export const GET_WELLNESS_SCORE = gql`
  query MyQuery($email: String!) {
    UserTests(where: {user_email: {_eq: $email}}, order_by: {created_at: asc_nulls_first}, limit: 1) {
      Test {
        score
        peer_relations_score
        leader_support_score
        impact_score
        development_score
        autonomy_score
        work_load_score
      }
    }
  }
`

export const GET_LINECHART_SCORES = gql`
  query MyQuery($email: String!) {
    UserTests(where: {user_email: {_eq: $email}}, order_by: {created_at: desc_nulls_last}) {
      Test {
        score
      }
      created_at
    }
  }
`
export const FINDUSER = gql`
  query findUser($emailUser: String!){
    Users_by_pk(email:$emailUser){
  	  id
      email
    }
  }`