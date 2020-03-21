export const addInform = (value: number) => ({
    type: 'ADD_INFORM',
    value
});

export const addNews = (title: string, newsDate: Date) => ({
    type: 'ADD_NEWS',
    title,
    newsDate
});
