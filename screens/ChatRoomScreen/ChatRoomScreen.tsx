//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useChatContext} from "../../contexts/ChatContext";
import {Channel, MessageList, MessageInput} from "stream-chat-expo";
import { LogBox } from 'react-native';
import {useNavigation} from "@react-navigation/native";

LogBox.ignoreAllLogs();//Ignore all log notifications

const ChatRoomScreen = () => {
    const { currentChannel } = useChatContext();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: currentChannel?.data?.name || 'Chat',
        })
    }, [currentChannel?.data?.name]);

    return (
        <Channel channel={currentChannel}>
            <MessageList />
            <MessageInput />
        </Channel>
    );
};

export default ChatRoomScreen;
