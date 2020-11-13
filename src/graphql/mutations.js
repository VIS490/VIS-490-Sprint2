import { gql } from '@apollo/client'

export const ADD_NEW_USER = gql`
	mutation ($input:Users_insert_input!){
		insert_Users_one(object:$input){
		  name
		  id
		}
	  }
	`;