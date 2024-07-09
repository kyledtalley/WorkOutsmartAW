import "react-native-gesture-handler"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppwriteProvider } from "./app/context/AppwriteContext"
import { WorkoutProvider } from "./app/context/WorkoutContext"
import { GlobalProvider } from "./app/context/GlobalProvider"
import BottomTabNavigator from "./app/navigation/BottomTabNavigator"

export default function App() {
	return (
		<AppwriteProvider>
			<GlobalProvider>
				<WorkoutProvider>
					<NavigationContainer>
						<BottomTabNavigator />
					</NavigationContainer>
				</WorkoutProvider>
			</GlobalProvider>
		</AppwriteProvider>
	)
}
