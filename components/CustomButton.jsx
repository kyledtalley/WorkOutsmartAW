import React from "react"
import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet,
} from "react-native"

const CustomButton = ({ title, handlePress, containerStyles, isLoading }) => (
	<TouchableOpacity
		onPress={handlePress}
		style={[styles.button, containerStyles]}
		disabled={isLoading}
	>
		{isLoading ? (
			<ActivityIndicator color="#fff" />
		) : (
			<Text style={styles.buttonText}>{title}</Text>
		)}
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#1E90FF",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
})

export default CustomButton
