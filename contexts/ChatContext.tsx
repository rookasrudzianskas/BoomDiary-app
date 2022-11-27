import React, { createContext, useContext } from 'react';

interface ChatContextType {};

const ChatContext = createContext<ChatContextType>({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const value = {};
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
