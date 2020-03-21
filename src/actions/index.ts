import { Region } from "../model/Region";

export const addInform = (value: number) => ({
    type: 'ADD_INFORM',
    value
});

export const addRandomEvent = (week: number) => ({
    type: 'ADD_RANDOM_EVENT',
    week
});

export const addEvent = (title: string, week: number) => ({
    type: 'ADD_EVENT',
    title,
    week
});

export const executeAction = (value: number) => ({
    type: 'QUEUE_ACTION',
    value
});


export const addRegion = (region: Region) => ({
    type: 'ADD_REGION',
    region,
});

export const selectRegion = (regionId: number) => ({
    type: 'SELECT_REGION',
    regionId,
});

export const nextRound = () => ({
    type: 'NEXT_ROUND',
});