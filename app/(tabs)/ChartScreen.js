import React, { useContext, useState, useEffect } from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import { LineChart, BarChart } from "react-native-chart-kit"
import { Picker } from "@react-native-picker/picker"
import { WorkoutContext } from "../../context/WorkoutContext"

const screenWidth = Dimensions.get("window").width

const ChartScreen = () => {
	const { workouts } = useContext(WorkoutContext)
	const [dayType, setDayType] = useState(Object.keys(workouts)[0] || "")
	const [phase, setPhase] = useState("")
	const [selectedLifts, setSelectedLifts] = useState([])

	useEffect(() => {
		if (dayType && phase) {
			const filteredWorkouts = Object.values(workouts).filter(
				(workout) =>
					workout.phase === phase && workout.name.includes(dayType)
			)
			setSelectedLifts(filteredWorkouts)
		}
	}, [dayType, phase, workouts])

	const data = {
		labels: selectedLifts.map((lift) => lift.name.split(": ")[1]),
		datasets: [
			{
				data: selectedLifts.map((lift) => lift.max),
				color: () => `rgba(134, 65, 244, 1)`,
			},
		],
	}

	const lineData = {
		labels: selectedLifts.map((lift) => lift.name.split(": ")[1]),
		datasets: [
			{
				data: selectedLifts.map((lift, index) =>
					index > 0
						? ((lift.max - selectedLifts[index - 1].max) /
								selectedLifts[index - 1].max) *
						  100
						: 0
				),
				color: () => `rgba(75, 192, 192, 1)`,
			},
		],
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Progress Chart</Text>
			<Picker
				selectedValue={dayType}
				onValueChange={setDayType}
				style={styles.picker}
			>
				{Object.keys(workouts).map((type) => (
					<Picker.Item key={type} label={type} value={type} />
				))}
			</Picker>
			<TextInput
				style={styles.input}
				placeholder="Phase"
				value={phase}
				onChangeText={setPhase}
			/>
			{selectedLifts.length > 0 ? (
				<>
					<BarChart
						data={data}
						width={screenWidth - 40}
						height={220}
						yAxisLabel="lbs"
						chartConfig={{
							backgroundColor: "#e26a00",
							backgroundGradientFrom: "#fb8c00",
							backgroundGradientTo: "#ffa726",
							decimalPlaces: 2,
							color: (opacity = 1) =>
								`rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16,
							},
						}}
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
					/>
					<LineChart
						data={lineData}
						width={screenWidth - 40}
						height={220}
						yAxisSuffix="%"
						chartConfig={{
							backgroundColor: "#022173",
							backgroundGradientFrom: "#1a2a6c",
							backgroundGradientTo: "#b21f1f",
							decimalPlaces: 2,
							color: (opacity = 1) =>
								`rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16,
							},
						}}
						style={{
							marginVertical: 8,
							borderRadius: 16,
						}}
					/>
				</>
			) : (
				<Text>
					No data available. Please select a workout day and phase.
				</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	picker: {
		height: 50,
		width: "100%",
		marginVertical: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginVertical: 10,
	},
})

export default ChartScreen
