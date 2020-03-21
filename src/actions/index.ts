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
