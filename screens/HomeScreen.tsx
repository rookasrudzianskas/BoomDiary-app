//@ts-nocheck
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StatusBar} from "expo-status-bar";
import {Agenda, AgendaEntry, AgendaSchedule, DateData} from "react-native-calendars/src";
import events from "../assets/data/events.json";
import {useState} from "react";

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [items, setItems] = useState<AgendaSchedule>({});


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
      <View className="flex-1 bg-white pt-16">
        <Agenda
          items={events}
          selected={"2022-11-25"}
          renderItem={renderItem}
          loadItemsForMonth={loadItems}
          showOnlySelectedDayItems={true}
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
