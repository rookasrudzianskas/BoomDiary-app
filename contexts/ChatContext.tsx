// @ts-nocheck
import React, {createContext, useContext, useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import {useUserData} from "@nhost/react";

interface ChatContextType {};

const ChatContext = createContext<ChatContextType>({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [chatClient, setChatClient] = useState<StreamChat>();
    const [currentChannel, setCurrentChannel] = useState<Channel>();
    const value = {};
    const user = useUserData();

    useEffect(() => {

    }, [user?.id]);

    useEffect(() => {
        const initClient = async () => {
            const client = StreamChat.getInstance("r84kqq9sv9mm");
        }
    }, []);


    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
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
