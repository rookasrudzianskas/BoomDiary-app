//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useChatContext} from "../contexts/ChatContext";

interface UserListItemProps {
    user: any;
}

const UserListItem = ({ user }: UserListItemProps) => {
    const {startDMChatRoom} = useChatContext();
    return (
        <TouchableOpacity onPress={() => startDMChatRoom(user)} activeOpacity={0.7} style={styles.container}>
            <Image source={{ uri: user.avatarUrl }} style={styles.image} />
            <Text style={styles.name}>{user.displayName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    image: {
        width: 45,
        aspectRatio: 1,
        borderRadius: 50,
    },
    name: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default UserListItem;
