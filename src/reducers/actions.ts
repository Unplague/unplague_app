const actions = (state = [], action: { type: string; value: number }) => {
    switch (action.type) {
        case "EXECUTE_ACTION":
            alert('Clicked: ' + action.value)
            return [
                state
            ];
        default:
            return state;
    }
};

export default actions;
