import React, { useState, useContext } from "react"
import {
	View,
	Text,
	TextInput,
	Button,
	ScrollView,
	StyleSheet,
} from "react-native"
import { WorkoutContext } from "../../context/WorkoutContext"

const WorkoutScreen = () => {
	const { addWorkout, deleteWorkout, workouts } = useContext(WorkoutContext)
	const [dayType, setDayType] = useState("")
	const [liftName, setLiftName] = useState("")
	const [maxWeight, setMaxWeight] = useState("")
	const [phase, setPhase] = useState("")

	const handleAddWorkout = () => {
		if (
			dayType.trim() === "" ||
			liftName.trim() === "" ||
			maxWeight.trim() === "" ||
			phase.trim() === ""
		)
			return
		addWorkout({
			name: `${dayType}: ${liftName}`,
			max: parseFloat(maxWeight),
			phase,
		})
		setLiftName("")
		setMaxWeight("")
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Add a new lift</Text>
			<TextInput
				style={styles.input}
				placeholder="Workout Day Type (e.g., Push, Pull)"
				value={dayType}
				onChangeText={setDayType}
			/>
			<TextInput
				style={styles.input}
				placeholder="Lift Name"
				value={liftName}
				onChangeText={setLiftName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Max Weight"
				value={maxWeight}
				onChangeText={setMaxWeight}
			/>
			<TextInput
				style={styles.input}
				placeholder="Phase"
				value={phase}
				onChangeText={setPhase}
			/>
			<Button title="Add Lift" onPress={handleAddWorkout} />
			<Text style={styles.title}>Workouts</Text>
			{Object.values(workouts).map((workout) => (
				<View key={workout.$id} style={styles.workoutContainer}>
					<Text>{`${workout.phase} - ${workout.name}: ${workout.max} lbs`}</Text>
					<Button
						title="Delete"
						onPress={() => deleteWorkout(workout.$id)}
					/>
				</View>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginVertical: 10,
	},
	workoutContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
	},
})

export default WorkoutScreen
