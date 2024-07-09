import { Client, Account, Databases, ID, Query } from "appwrite"

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
	.setProject("668d3a380038795e6ef5") // Your project ID

const account = new Account(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)
		const newUser = await databases.createDocument(
			"668d3bcc0028fe7d7e06", // Your database ID
			"668d3bf20026a71fd3e0", // Your user collection ID
			ID.unique(),
			{
				username,
				email,
				avi: `https://ui-avatars.com/api/?name=${username}`,
				workouts: [],
			}
		)

		await signIn(email, password)

		return newUser
	} catch (error) {
		console.error("Error creating user:", error)
		throw error
	}
}

export const signIn = async (email, password) => {
	try {
		await account.createEmailSession(email, password)
	} catch (error) {
		console.error("Error signing in:", error)
		throw error
	}
}

export const getCurrentUser = async () => {
	try {
		const currentUser = await account.get()
		return currentUser
	} catch (error) {
		console.error("Error fetching current user:", error)
		return null
	}
}
