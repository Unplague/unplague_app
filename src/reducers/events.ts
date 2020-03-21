import defaultEvents from '../data/events.json';

const events = (state = [], action: { type: string; eventDate: Date }) => {
    switch (action.type) {
        case "ADD_EVENT":
            let eventId = Math.floor(Math.random() * (defaultEvents.events.length));
            let eventTitle = defaultEvents.events[eventId].title;
            
            return [
                ...state,
                {
                    title: eventTitle,
                    eventDate: action.eventDate
                }
            ];
        default:
            return state;
    }
};

export default events;
