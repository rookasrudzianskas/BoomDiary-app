// @ts-nocheck
import {FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {ActivityIndicator, ColorSchemeName, Pressable, View} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import MyAccount from '../screens/MyAccount';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import UsersScreen from "../screens/UsersScreen/UsersScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import {useAuthenticationStatus} from "@nhost/react";
import ChatStackNavigator from "./ChatStackNavigator";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const { isAuthenticated, isLoading } = useAuthenticationStatus();

    if(isLoading) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    if(!isAuthenticated) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{ title: "Sign in", headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ title: "Create an account", headerShown: false }}
                />
            </Stack.Navigator>
        )
    }
    return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Events',
            headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={22} color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={MyAccount}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={22} color={color} />,
        }}
      />
        <BottomTab.Screen
            name="Chat"
            component={ChatStackNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({ color}) => (
                    <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
                )
            }}

        />
    </BottomTab.Navigator>
  );
}
