const initialState = {
  regions: [],
  money: 100,
  clock: 1,
  selectedRegion: undefined,
}

const world = (state = initialState, action: any) => {
  console.log("in world rdux");
  console.log(state);
  switch (action.type) {
    case "ADD_REGION":
      return Object.assign({}, state, {
        regions: [
          ...state.regions,
          action.region
        ]
      })
    case "SELECT_REGION":
      return Object.assign({}, state, {
        selectedRegion: action.region
      });
    default:
      return state;
    }
};

export default world;
  