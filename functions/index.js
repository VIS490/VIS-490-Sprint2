const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.processSignUp = functions.auth.user().onCreate(user => {
	console.log(user)
	let customClaims
	if (user.email && user.email.indexOf('@hasura.io') !== -1) {
		customClaims = {
			'https://hasura.io/jwt/claims': {
				'x-hasura-default-role': 'admin',
				'x-hasura-allowed-roles': ['user', 'admin'],
				'X-Hasura-User-Id': user.uid
			}
		}
	}
	else {
		customClaims = {
			'https://hasura.io/jwt/claims': {
				'x-hasura-default-role': 'user',
				'x-hasura-allowed-roles': ['user'],
				'X-Hasura-User-Id': user.uid
			}
		}
	}
	return admin.auth().setCustomUserClaims(user.uid, customClaims)
		.then(() => {
			const metadataRef = admin.database().ref('metadata/' + user.uid)
			return metadataRef.set({ refreshTime: new Date().getTime() })
		})
		.catch(error => {
			console.log(error)
		})
})
