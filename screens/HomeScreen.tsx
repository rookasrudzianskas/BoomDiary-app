//@ts-nocheck
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StatusBar} from "expo-status-bar";
import {Agenda} from "react-native-calendars/src";

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
      <View className="flex-1 bg-white pt-16">
        <Agenda />
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
