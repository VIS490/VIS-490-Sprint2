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
      admin_email
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

export const GET_ADMIN_USERS  =gql`query($email:String!){
  Users(
    where: {admin_email: {_eq: $email}}
    ){
      name
      email
    }
  }
`
export const FIND_ADMIN_EMAIL = gql`
  query findAdmin($admin_email:String!) {
    Admins_by_pk(admin_email:$admin_email){
      admin_email
    }
  }
`
export const GET_AVERAGE_WELLNESS_SCORE = gql`
  query Myquery($email: String!){
    Users(where: {admin_email: {_eq: $email}}) {
      user_tests_rel(limit: 1, order_by: {created_at: desc}) {
        Test {
          score
        }
      }
    }
  }
`

export const GET_AVERAGE_BAR_SCORES = gql`
  query Myquery($email: String!){
    Users(where: {admin_email: {_eq: $email}}) {
      user_tests_rel(order_by: {created_at: desc}, limit: 1) {
        Test {
          work_load_score
          peer_relations_score
          leader_support_score
          impact_score
          autonomy_score
          development_score
        }
      }
    }
  }
`

export const GET_AVERAGE_LINE = gql`
  query MyQuery($email: String!) {
    Users(where: {admin_email: {_eq: $email}}) {
      user_tests_rel(order_by: {created_at: desc}, limit: 5) {
        Test {
          score
        }
      }
    }
  }
`