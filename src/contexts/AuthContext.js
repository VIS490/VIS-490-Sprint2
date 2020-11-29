import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	const googleProvider = new firebase.auth.GoogleAuthProvider()

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return auth.signOut()
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}

	const updateEmail = (email) => {
		return currentUser.updateEmail(email)
	}

	const updatePassword = (password) => {
		return currentUser.updatePassword(password)
	}
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleProvider).then((res) => {
			console.log(res.user)
			console.log(res.credential.accessToken)
		}).catch((error) => {
			console.log(error.message)
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		signInWithGoogle
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}