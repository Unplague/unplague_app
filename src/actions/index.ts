import { Region } from "../model/region";

export const addInform = (value: number) => ({
    type: 'ADD_INFORM',
    value
});

export const addNews = (title: string, newsDate: Date) => ({
    type: 'ADD_NEWS',
    title,
    newsDate
});

export const addRegion = (region: Region) => ({
    type: 'ADD_REGION',
    region,
});

export const selectRegion = (name: string) => ({
    type: 'SELECT_REGION',
    name,
});