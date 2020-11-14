import { gql } from '@apollo/client';

const GET_ALL_QUESTIONS_QUERY = gql`
  query getAllQuestions {
    Questions {
      question
    }
  }
`;