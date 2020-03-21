const events = (state = [], action: { type: string; title: string, eventDate: Date }) => {
    switch (action.type) {
        case "ADD_EVENT":
            return [
                ...state,
                {
                    title: action.title,
                    eventDate: action.eventDate
                }
            ];
        default:
            return state;
    }
};

export default events;
