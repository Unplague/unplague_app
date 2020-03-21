import { Region } from "../model/Region";

export const addInform = (value: number) => ({
    type: 'ADD_INFORM',
    value
});

export const addEvent = (title: string, eventDate: Date) => ({
    type: 'ADD_EVENT',
    title,
    eventDate
});


export const executeAction = (value: number) => ({
    type: 'EXECUTE_ACTION',
    value
});


export const addRegion = (region: Region) => ({
    type: 'ADD_REGION',
    region,
});

export const selectRegion = (region: Region) => ({
    type: 'SELECT_REGION',
    region,
});

export const nextRound = () => ({
    type: 'NEXT_ROUND',
});