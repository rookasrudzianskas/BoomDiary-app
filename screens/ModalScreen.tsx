//@ts-nocheck
import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import {AntDesign} from "@expo/vector-icons";
import users from "../assets/data/users.json";
import CustomButton from "./AuthScreens/components/CustomButton";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useUserId} from "@nhost/react";

const GetEvent = gql`
    query GetEvent($id: uuid!) {
        Event_by_pk(id: $id) {
            id
            name
            date
        }
    }
`;

const JoinEvent = gql`
    mutation InsertEventAttendee($eventId: uuid!, $userId: uuid!) {
        insert_EventAttendee(objects: [{ eventId: $eventId, userId: $userId }]) {
            returning {
                id
                userId
                eventId
                Event {
                    id
                    EventAttendee {
                        id
                    }
                }
            }
        }
    }
`;

const GetEvent = gql`
    query GetEvent($id: uuid!) {
        Event_by_pk(id: $id) {
            id
            name
            date
            EventAttendees {
                user {
                    id
                    displayName
                    avatarUrl
                }
            }
        }
    }
`;

export default function ModalScreen({route, navigation}: RootStackScreenProps<"Modal">) {
    const id = route?.params?.id;
    const { data, loading, error } = useQuery(GetEvent, { variables: { id } });
    const [doJoinEvent, { loading: loadingJoinEvent, error: errorJoinEvent }] = useMutation(JoinEvent);
    const userId = useUserId();
    const event = data?.Event_by_pk;

    if(loading) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    if(error) {
        return (
            <View className="h-screen items-center justify-center">
                <Text>{error.message}</Text>
            </View>
        )
    }

    const onJoin = async () => {
        try {
            await doJoinEvent({variables: {eventId: id, userId}});
        } catch (err) {
            Alert.alert("Failed to join the event!", (e as Error).message);
        }
    }
    return (
        <View style={styles.container}>
            <Text className="text-3xl font-bold text-purple-600 mt-3 mb-1">Events of today</Text>
            <TouchableOpacity activeOpacity={0.7} className="bg-gray-100 p-3 rounded-md shadow-sm">
                <Text className="text-2xl font-semibold">{event.name}</Text>
                <Text className="items-center flex text-lg justify-center">
                    <AntDesign name="calendar" size={19} color={"black"} />
                    {"  | "}
                    <Text className="text-gray-600">{new Date(event.date).toDateString()}</Text>
                </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.subtitle}>Attendees</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className="flex-row items-center">
                        {users?.map((user, i) => (
                            <Image
                                source={{ uri: user?.avatarUrl || "https://picsum.photos/500/300?random=3" }}
                                style={[
                                    styles.userAvatar,
                                    { transform: [{ translateX: -15 * i }] },
                                ]}
                                key={user.id}
                            />
                        ))}
                        <View
                            style={[
                                styles.userAvatar,
                                {
                                    transform: [{ translateX: -15 * users.length }],
                                },
                            ]}
                        >
                            <Text className="text-gray-600">+{users.length}</Text>
                        </View>
                    </View>
                </ScrollView>

                <CustomButton text="Join the event" onPress={onJoin} />
            </View>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    time: {
        fontSize: 20,
    },
    footer: {
        marginTop: "auto",
    },
    users: {
        flexDirection: "row",
        marginVertical: 10,
    },
    userAvatar: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 30,
        margin: 2,
        borderColor: "white",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gainsboro",
    },
});
