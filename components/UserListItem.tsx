//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface UserListItemProps {
    user: any;
}

const UserListItem = ({ user }: UserListItemProps) => {
    return (
        <View>
            <Text>
                byrookas 🚀
            </Text>
        </View>
    );
};

export default UserListItem;
