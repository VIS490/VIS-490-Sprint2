
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const createApolloClient = () => new ApolloClient({
	link: new HttpLink({
		uri: 'https://vis-cs490-sprint2.hasura.app/v1/graphql',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
		}
	}),
	cache: new InMemoryCache(),
})

export { createApolloClient }
