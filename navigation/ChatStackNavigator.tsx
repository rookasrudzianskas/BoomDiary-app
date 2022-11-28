import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatsScreen from "../screens/ChatScreen";
import ChatContextProvider from "../contexts/ChatContext";
import ModalScreen from "../screens/ModalScreen";
import UsersScreen from "../screens/UsersScreen";
import * as React from "react";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Entypo} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        // @ts-ignore
                        <TouchableOpacity onPress={() => navigation.navigate("Users")} activeOpacity={0.7} className=" px-1 items-end">
                            {/*    some kind of info icon */}
                            <Entypo name="info-with-circle" size={20} color="black" />
                        </TouchableOpacity>
                    )
                }}
                name="Chats" component={ChatsScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen  name="Users" component={UsersScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
