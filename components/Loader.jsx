import React from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"

const Loader = ({ isLoading }) => {
	if (!isLoading) return null

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#ffffff" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
	},
})

export default Loader
