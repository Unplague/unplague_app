const news = (state = [], action: { type: string; title: string }) => {
    switch (action.type) {
        case "ADD_NEWS":
            return [
                ...state,
                {
                    title: action.title,
                }
            ];
        default:
            return state;
    }
};

export default news;
