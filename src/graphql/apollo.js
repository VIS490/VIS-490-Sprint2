
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const createApolloClient = () => new ApolloClient({
    link: new HttpLink({
        uri: 'https://project3-vis-cs490.hasura.app/v1/graphql',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
        }
    }),
    cache: new InMemoryCache(),
})

export { createApolloClient }