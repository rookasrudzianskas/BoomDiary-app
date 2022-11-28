//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { ChannelList } from 'stream-chat-expo';
import {useChatContext} from "../../contexts/ChatContext";
import {Channel} from "stream-chat";
import {useNavigation} from "@react-navigation/native";

const ChatsScreen = () => {
    const { setCurrentChannel } = useChatContext();
    const navigation = useNavigation();

    const onSelect = (channel: Channel) => {
        setCurrentChannel(channel);
        navigation.navigate('ChatRoom');
    }

    return (
        <>
            <ChannelList onSelect={onSelect} />
        </>
    );
};

export default ChatsScreen;
