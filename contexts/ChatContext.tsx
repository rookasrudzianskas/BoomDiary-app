// @ts-nocheck
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Channel, StreamChat} from 'stream-chat';
import {useUserData} from "@nhost/react";
import {OverlayProvider, Chat} from "stream-chat-expo"
import {ActivityIndicator, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

interface ChatContextType {};

const ChatContext = createContext<ChatContextType>({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const client = StreamChat.getInstance("r84kqq9sv9mm");
    const [chatClient, setChatClient] = useState<StreamChat>();
    const [currentChannel, setCurrentChannel] = useState<Channel>();
    const navigation = useNavigation();
    const user = useUserData();

    useEffect(() => {
        const initChat = async () => {
            if(!user) return;

            await client.connectUser({
                    id: user.id,
                    name: user.displayName,
                    image: user.avatarUrl
                },
                client.devToken(user.id)
            );
            setChatClient(client);
            const globalChannel = client.channel('livestream', 'global', {
                name: 'byrookas.com',
                image: 'https://getstream.io/random_svg/?id=global-channel-icon&name=byrookas.com'
            });
            await globalChannel.watch({ watchers: { limit: 100 } });

        }
        if (!chatClient) {
            initChat();
        }
    }, [user?.id]);

    useEffect(() => {
        return () => {
            chatClient?.disconnectUser();
            setChatClient(undefined);
        }
    }, []);

    const startDMChatRoom = async (chatWithUser) => {
        if (!chatClient?.userID) return;

        try {
            const newChannel = chatClient.channel("messaging", {
                demo: "virtual-event",
                members: [chatClient.userID, chatWithUser.id],
            });

            await newChannel.watch();
            setCurrentChannel(newChannel);
            navigation.replace('ChatRoom');
        } catch (e) {
            console.log(e);
        }

    }

    const joinEventChatRoom = async (event) => {
        if (!chatClient) {
            return;
        }
        const channelId = `room-${event.id}`;
        const eventChannel = chatClient.channel('livestream', channelId, {
            name: event.name,
        });

        await eventChannel.watch({ watchers: { limit: 100 } });
        setCurrentChannel(eventChannel);

        navigation.navigate('Root', {
            screen: 'Chat',
        });
        navigation.navigate('Root', {
            screen: 'Chat',
            params: { screen: 'ChatRoom' },
        });
    };

    const value = { chatClient, currentChannel, setCurrentChannel, startDMChatRoom, joinEventChatRoom };

    if(!chatClient) return (
        <View className="h-screen items-center justify-center">
            <ActivityIndicator />
        </View>
    )


    return (
        <OverlayProvider>
            <Chat client={chatClient}>
                <ChatContext.Provider value={value}>
                    {children}
                </ChatContext.Provider>
            </Chat>
        </OverlayProvider>
    )
}

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;

// q: How to use the ChatContextProvider?
// a: See the snippet from navigation/ChatStackNavigator.tsx above.

// q: How to use the useChatContext hook?
// a: See the snippet from screens/ChatRoomScreen/ChatRoomScreen.tsx above.

// q: What is the answer to universe?
// a: 42
