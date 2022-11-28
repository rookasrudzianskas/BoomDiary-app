//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useChatContext} from "../../contexts/ChatContext";
import {Channel, MessageList, MessageInput} from "stream-chat-expo";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications

const ChatRoomScreen = () => {
    const { currentChannel } = useChatContext();

    return (
        <Channel channel={currentChannel}>
            <MessageList />
            <MessageInput />
        </Channel>
    );
};

export default ChatRoomScreen;
