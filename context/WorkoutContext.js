import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	useEffect,
} from "react"
import AppwriteContext from "./AppWriteContext"
import { ID, Query } from "appwrite"

export const WorkoutContext = createContext()

export const WorkoutProvider = ({ children }) => {
	const { databases, account } = useContext(AppwriteContext)
	const [workouts, setWorkouts] = useState({})
	const [currentUser, setCurrentUser] = useState(null)

	const fetchCurrentUser = async () => {
		try {
			const user = await account.get()
			setCurrentUser(user)
		} catch (error) {
			console.error("Error fetching current user:", error)
		}
	}

	const addWorkout = async (workout) => {
		try {
			const newWorkout = await databases.createDocument(
				"668d3bcc0028fe7d7e06", // Your database ID
				"668d3bf90029847a6bcd", // Your workout collection ID
				ID.unique(),
				{
					name: workout.name,
					max: workout.max,
					user: currentUser.$id,
					phase: workout.phase,
				}
			)

			await databases.updateDocument(
				"668d3bcc0028fe7d7e06", // Your database ID
				"668d3bf20026a71fd3e0", // Your user collection ID
				currentUser.$id,
				{
					workouts: [...(currentUser.workouts || []), newWorkout.$id],
				}
			)

			setWorkouts((prevWorkouts) => ({
				...prevWorkouts,
				[newWorkout.$id]: newWorkout,
			}))
		} catch (error) {
			console.error("Error adding workout:", error)
		}
	}

	const fetchWorkouts = async () => {
		try {
			const response = await databases.listDocuments(
				"668d3bcc0028fe7d7e06", // Your database ID
				"668d3bf90029847a6bcd", // Your workout collection ID
				[Query.equal("user", currentUser.$id)]
			)
			const fetchedWorkouts = response.documents.reduce(
				(acc, workout) => {
					acc[workout.$id] = workout
					return acc
				},
				{}
			)
			setWorkouts(fetchedWorkouts)
		} catch (error) {
			console.error("Error fetching workouts:", error)
		}
	}

	const deleteWorkout = async (workoutId) => {
		try {
			await databases.deleteDocument(
				"668d3bcc0028fe7d7e06", // Your database ID
				"668d3bf90029847a6bcd", // Your workout collection ID
				workoutId
			)
			setWorkouts((prevWorkouts) => {
				const newWorkouts = { ...prevWorkouts }
				delete newWorkouts[workoutId]
				return newWorkouts
			})
		} catch (error) {
			console.error("Error deleting workout:", error)
		}
	}

	useEffect(() => {
		fetchCurrentUser()
	}, [])

	useEffect(() => {
		if (currentUser) {
			fetchWorkouts()
		}
	}, [currentUser])

	const contextValue = useMemo(
		() => ({
			workouts,
			addWorkout,
			deleteWorkout,
		}),
		[workouts, currentUser]
	)

	return (
		<WorkoutContext.Provider value={contextValue}>
			{children}
		</WorkoutContext.Provider>
	)
}
