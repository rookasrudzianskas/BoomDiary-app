//@ts-nocheck
import { StatusBar } from 'expo-status-bar';
import {Image, Platform, ScrollView, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import event from "../assets/data/event.json";
import {AntDesign} from "@expo/vector-icons";
import users from "../assets/data/users.json";
import CustomButton from "./AuthScreens/components/CustomButton";

export default function ModalScreen({route, navigation}: RootStackScreenProps<"Modal">) {
  const id = route?.params?.id;
  console.log("Rendering event ", id);
  const onJoin = () => {

  }
  return (
      <View style={styles.container}>
        <Text className="text-2xl font-bold">{event.name}</Text>
        <Text className="items-center flex text-xl justify-center">
          <AntDesign name="calendar" size={22} color={"black"} />
          {"  | "}
          {new Date(event.date).toDateString()}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.subtitle}>Attendees</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row items-center">
              {users?.map((user, i) => (
                  <Image
                      source={{ uri: user?.avatarUrl || "" }}
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
