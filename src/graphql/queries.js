import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    Questions {
      question
    }
  }
`