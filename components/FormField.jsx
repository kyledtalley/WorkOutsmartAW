import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"

const FormField = ({
	title,
	value,
	handleChangeText,
	otherStyles,
	keyboardType,
}) => (
	<View style={styles.container}>
		<Text style={styles.label}>{title}</Text>
		<TextInput
			value={value}
			onChangeText={handleChangeText}
			style={[styles.input, otherStyles]}
			keyboardType={keyboardType}
		/>
	</View>
)

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: "#fff",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#fff",
	},
})

export default FormField
