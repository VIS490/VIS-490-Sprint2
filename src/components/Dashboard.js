import React from 'react'
import { postAxios } from '../postAxios'


const getUsers = async () => {
	const queryString = `
	query {
		Users{
			name
			id
		}
	}`
	const result = await postAxios(queryString)
	console.log(result)
}
getUsers()
const Dashboard = () => (
	<div className="Dashboard">
		hi
	</div>
)

export default Dashboard