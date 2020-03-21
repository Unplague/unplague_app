import actionList from '../data/actions.json';
import { Region } from "../model/Region";

type Action = {
  name: string,
  infection: number,
  satisfaction: number,
  costs: number,
}

type WorldState = {
  regions: Array<Region>,
  money: number,
  round: number,
  selectedRegion?: Region,
  queuedActions: Array<{action: any, region: Region}>,
}

const initialState : WorldState = {
  regions: [],
  money: 100,
  round: 0,
  selectedRegion: undefined,
  queuedActions: [],
}

const world = (state = initialState, action: any) => {
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
    case "QUEUE_ACTION":
      alert('Clicked: ' + action.value)
      return state;
    default:
      return state;
    }
};

function applyAction(action: Action, region: Region): Region {

  return region;
}

function nextRound(state: WorldState): WorldState {
  let new_state = Object.assign({}, state, {
      round: state.round + 1
  });
  if (new_state.round == 1) {
    // assign initial infection
    new_state.regions[0].infectionRate = 0.7;
    new_state.regions[1].infectionRate = 0.2;
  }
  new_state.regions.forEach(region => {
    region.infectionRate += 0.1;
    if (region.infectionRate > 1.0) {
        region.infectionRate = 1.0;
    }
  });
  let action: Action = actionList.actions[0];
  let region = new_state.regions[0];

  new_state.regions[0] = applyAction(action, region);

  return new_state;
}

export default world;
  