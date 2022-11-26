//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import users from '../../assets/data/users.json';
import UserListItem from "../../components/UserListItem";
import {gql, useQuery} from "@apollo/client";

const GetUsers = gql`
    query GetUsers {
        users {
            id
            displayName
            avatarUrl
        }
    }
`;

const UsersScreen = () => {
    const { data, loading, error } = useQuery(GetUsers);

    if(loading) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        );
    }

    if(error) {
        return (
            <View className="h-screen items-center justify-center">
                <Text>{error.message}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={data?.users || []}
            renderItem={({ item }) => <UserListItem user={item} />}
        />
    );
};

export default UsersScreen;
