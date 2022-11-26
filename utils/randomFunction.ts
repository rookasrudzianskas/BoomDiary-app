//@ts-nocheck
import {AgendaSchedule} from "react-native-calendars/src";

export const getEventsSchedule = (events: []): AgendaSchedule => {
    const items: AgendaSchedule = {};

    events.forEach((event) => {
        const day = event.date.slice(0, 10);

        if (!items[day]) {
            items[day] = [];
        }
        items[day].push({ ...event, day, height: 50 });
    });

    return items;
};
