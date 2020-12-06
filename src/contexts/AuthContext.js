import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'
import {useQuery} from '@apollo/client'
import {FIND_ADMIN_EMAIL} from '../graphql/queries'

const AuthContext = React.createContext(undefined)

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [isAdmin, setisAdmin] = useState(false)
	const [loading, setLoading] = useState(true)
	const googleProvider = new firebase.auth.GoogleAuthProvider()

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	}
	function setAdminStatus(state){
		setisAdmin(state)
	}
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function logout() {
		return auth.signOut()
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password)
	}
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleProvider).then((res) => {
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
		isAdmin,
		setAdminStatus,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		signInWithGoogle,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}