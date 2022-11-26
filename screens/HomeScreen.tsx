//@ts-nocheck
import {ActivityIndicator, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StatusBar} from "expo-status-bar";
import {Agenda, AgendaEntry, AgendaSchedule, DateData} from "react-native-calendars/src";
import {useState} from "react";
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {gql, useQuery} from "@apollo/client";
import {getEventsSchedule} from "../utils/randomFunction";

const GetEvents = gql`
    query GetEvents {
        Event {
            id
            name
            date
        }
    }
`;

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
    const { data, loading, error } = useQuery(GetEvents);
    const [items, setItems] = useState<AgendaSchedule>({});

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
                <Text className="text-red-500">Error: {error.message}</Text>
            </View>
        )
    }
    const events = getEventsSchedule(data.Event);
    const loadItems = (day: DateData) => {
        setItems(events);
    };


      const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 15 : 13;
        const color = isFirst ? "black" : "#43515c";

        return (
            <TouchableOpacity
              style={[styles.item, {height: reservation.height}]}
              onPress={() => navigation.navigate("Modal", {id: reservation.id})}
              activeOpacity={0.7}
              className="shadow-sm mt-3"
            >
              <Text className="text-gray-500" style={{ fontSize, color }}>{reservation.name}</Text>
            </TouchableOpacity>
        )
      }

  return (
      <View className="flex-1 bg-white">
          <TouchableOpacity onPress={() => navigation.navigate("Users")} activeOpacity={0.7} className="pt-12 px-6 items-end">
          {/*    some kind of info icon */}
              <Entypo name="info-with-circle" size={20} color="black" />
          </TouchableOpacity>
        <Agenda
          items={events}
          selected={"2022-11-25"}
          renderItem={renderItem}
          loadItemsForMonth={loadItems}
          // showOnlySelectedDayItems={true}
          renderEmptyDate={() => <View className="flex-1 items-center justify-center"><Text className="text-gray-500">No events for this day</Text></View>}
        />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
