import { useContext } from "react"
import AppwriteContext from "../context/AppwriteContext"

const useAppwrite = () => {
	const { client, account, databases } = useContext(AppwriteContext)

	const login = async (email, password) => {
		try {
			await account.createEmailSession(email, password)
			return true
		} catch (error) {
			console.error("Login failed:", error)
			return false
		}
	}

	const signup = async (email, password, name) => {
		try {
			await account.create("unique()", email, password, name)
			return true
		} catch (error) {
			console.error("Signup failed:", error)
			return false
		}
	}

	const logout = async () => {
		try {
			await account.deleteSession("current")
			return true
		} catch (error) {
			console.error("Logout failed:", error)
			return false
		}
	}

	const getCurrentUser = async () => {
		try {
			return await account.get()
		} catch (error) {
			console.error("Failed to get current user:", error)
			return null
		}
	}

	const createWorkout = async (data) => {
		try {
			const result = await databases.createDocument(
				"668d3bcc0028fe7d7e06",
				"668d3bf90029847a6bcd",
				"unique()",
				data
			)
			return result
		} catch (error) {
			console.error("Failed to create workout:", error)
			return null
		}
	}

	const getWorkouts = async () => {
		try {
			const result = await databases.listDocuments(
				"668d3bcc0028fe7d7e06",
				"668d3bf90029847a6bcd"
			)
			return result.documents
		} catch (error) {
			console.error("Failed to fetch workouts:", error)
			return []
		}
	}

	return { login, signup, logout, getCurrentUser, createWorkout, getWorkouts }
}

export default useAppwrite
