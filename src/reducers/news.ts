const news = (state = [], action: { type: string; title: string, newsDate: Date }) => {
    switch (action.type) {
        case "ADD_NEWS":
            return [
                ...state,
                {
                    title: action.title,
                    newsDate: action.newsDate
                }
            ];
        default:
            return state;
    }
};

export default news;
