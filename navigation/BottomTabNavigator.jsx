import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../components/HomeScreen"
import WorkoutScreen from "../(tabs)/WorkoutScreen"
import ChartScreen from "../(tabs)/ChartScreen"
import TabBarIcon from "./TabBarIcon"

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => (
					<TabBarIcon
						route={route}
						focused={focused}
						color={color}
						size={size}
					/>
				),
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Workouts" component={WorkoutScreen} />
			<Tab.Screen name="Charts" component={ChartScreen} />
		</Tab.Navigator>
	)
}
