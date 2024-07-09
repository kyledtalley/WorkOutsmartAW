import React, { createContext, useState, useEffect } from "react"
import { Client, Account, Databases } from "appwrite"

const AppwriteContext = createContext()

export const AppwriteProvider = ({ children }) => {
	const [client, setClient] = useState(null)
	const [account, setAccount] = useState(null)
	const [databases, setDatabases] = useState(null)

	useEffect(() => {
		const client = new Client()
			.setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
			.setProject("668d3a380038795e6ef5") // Your Project ID

		const account = new Account(client)
		const databases = new Databases(client)

		setClient(client)
		setAccount(account)
		setDatabases(databases)
	}, [])

	return (
		<AppwriteContext.Provider value={{ client, account, databases }}>
			{children}
		</AppwriteContext.Provider>
	)
}

export default AppwriteContext
