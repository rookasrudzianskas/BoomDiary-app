//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import users from '../../assets/data/users.json';
import UserListItem from "../../components/UserListItem";

const UsersScreen = () => {
    return (
        <FlatList
            data={users}
            renderItem={({ item }) => <UserListItem user={item} />}
        />
    );
};

export default UsersScreen;
