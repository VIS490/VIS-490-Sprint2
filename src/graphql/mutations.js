import { gql } from '@apollo/client'

export const ADD_NEW_USER = gql`
	mutation ($input:Users_insert_input!){
		insert_Users_one(object:$input){
		  name
		  id
		}
	  }
	`

export const ADD_NEW_TEST = gql`
	mutation insertTestforOneUser($objects: [Tests_insert_input!]!) {
	  insert_Tests(objects: $objects) {
		affected_rows
		returning {
		  id
		  test_users_rel {
			id
		  }
		}
	  }
	}
  `
 

  export const REMOVE_USER_ADMIN = gql`
  mutation MyMutation($_set: Users_set_input!, $where: Users_bool_exp!) {
    update_Users(_set: $_set, where: $where) {
      affected_rows
    }
  }
` 
  
export const ADD_NEW_ADMIN_USER = gql`
  mutation insertAdminUser($objects: [Admins_insert_input!]!, $objects1: [Users_insert_input!]!) {
    insert_Admins(objects: $objects) {
      affected_rows
    }
    insert_Users(objects: $objects1) {
		affected_rows
	}
  }
`

export const UPDATE_USER_ADMIN = gql`
  mutation MyMutation($_set: Users_set_input!, $where: Users_bool_exp!) {
    update_Users(_set: $_set, where: $where) {
      affected_rows
    }
  }
` 

