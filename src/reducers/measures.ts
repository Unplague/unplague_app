const measures = (state = [], action: { type: string; value: number }) => {
console.log(state);
  switch (action.type) {
    case "ADD_INFORM":
      return [
        ...state,
        {
          value: action.value,
          completed: false
        }
      ];
    default:
      return state;
  }
};

export default measures;
