import { stat } from "fs";
import { Region } from "../model/Region";

type WorldState = {
    regions: Array<Region>,
    money: number,
    round: number,
    selectedRegion?: Region,
}

const initialState : WorldState = {
  regions: [],
  money: 100,
  round: 0,
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
    case "NEXT_ROUND":
        return nextRound(state);
    default:
      return state;
    }
};

function nextRound(state: WorldState): WorldState {
    let new_state = Object.assign({}, state, {
        round: state.round + 1
    });
    if (new_state.round == 1) {
        // assign initial infection
        new_state.regions[0].infectionRate = 0.7;
        new_state.regions[1].infectionRate = 0.2;
    }
    return new_state;
}

export default world;
  