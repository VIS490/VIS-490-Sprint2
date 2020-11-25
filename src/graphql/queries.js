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
    Users(where: {email: {_eq: $email}}) {
      user_tests_rel(order_by: {created_at: desc_nulls_first}, limit: 1) {
        Test {
          score
          work_load_score
          leader_support_score
          peer_relations_score
          impact_score
          development_score
          autonomy_score
        }
      }
    }
  }
`

export const GET_LINECHART_SCORES = gql`
  query MyQuery($email: String!) {
    Users(where: {email: {_eq: $email}}) {
      user_tests_rel(order_by: {}) {
        Test {
          score
        }
      }
    }
  }
`
