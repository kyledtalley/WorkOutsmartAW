import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	useEffect,
} from "react"
import { getCurrentUser } from "../lib/appwrite"

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isLogged, setIsLogged] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkUserStatus = async () => {
			setLoading(true)
			try {
				const currentUser = await getCurrentUser()
				if (currentUser) {
					setUser(currentUser)
					setIsLogged(true)
				} else {
					setIsLogged(false)
				}
			} catch (error) {
				console.error("Error fetching current user:", error)
			} finally {
				setLoading(false)
			}
		}

		checkUserStatus()
	}, [])

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			isLogged,
			setIsLogged,
			loading,
		}),
		[user, isLogged, loading]
	)

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
