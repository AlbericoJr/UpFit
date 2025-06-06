import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Platform } from "react-native"

import HomeSvg from "@assets/home.svg"
import HistorySvg from "@assets/history.svg"
import ProfileSvg from "@assets/profile.svg"

import { Home } from "@screens/Home"
import { History } from "@screens/History"
import { Profile } from "@screens/Profile"
import { Exercise } from "@screens/Exercise"

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: {exerciseId: string}
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["6"]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.warning500,
        tabBarInactiveTintColor: tokens.colors.gray200,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray600,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["14"],
          paddingTop: tokens.space["2"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: 'none'
          }
        }}
      />
    </Navigator>
  )
}