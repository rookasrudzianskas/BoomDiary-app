import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatsScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </Stack.Navigator>
    )
}
