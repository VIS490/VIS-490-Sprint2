import axiosBase from 'axios'
import * as firebase from 'firebase'


export const postAxios = async (queryString) => {
    // const idToken = await getIdToken()
    const axios = axiosBase.create({
        baseURL: 'https://project3-vis-cs490.hasura.app/v1/graphql',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET
        },
        responseType: 'json',
        method: 'post'
    })
    return await axios({
        data: {
            query: queryString
        }
    }).catch(({ response: r }) => console.log(r))
}