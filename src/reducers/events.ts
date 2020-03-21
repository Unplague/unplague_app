import defaultEvents from '../data/events.json';

const events = (state = [], action: any) => {
    switch (action.type) {
        case "ADD_RANDOM_EVENT":
            let eventId = Math.floor(Math.random() * (defaultEvents.events.length));
            let eventTitle = defaultEvents.events[eventId].title;
            
            return [
                ...state,
                {
                    title: eventTitle,
                    week: action.week
                }
            ];
        case "ADD_EVENT":
            return [
                ...state,
                {
                    title: action.title,
                    week: 0
                }
            ];
        default:
            return state;
    }
};

export default events;
