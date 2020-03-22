import { Region } from "../model/Region";

export const addInform = (value: number) => ({
    type: 'ADD_INFORM',
    value
});

export const queueAction = (global:boolean, value: number) => ({
    type: 'QUEUE_ACTION',
    global,
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

export const restartGame = () => ({
    type: 'RESTART_GAME',
});