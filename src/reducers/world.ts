import actionList from '../data/actions.json';
import { Region } from "../model/Region";

type Action = {
  name: string,
  infection: number,
  satisfaction: number,
  costs: number,
  used: Boolean,
}

type Event = {
  title: string,
  round: number,
}

type WorldState = {
  regions: Array<Region>,
  money: number,
  round: number,
  selectedRegion?: number,
  queuedActions: Array<{action: any, region: Region}>,
  events: Array<Event>
}

const initialState : WorldState = {
  regions: [],
  money: 100,
  round: 0,
  selectedRegion: undefined,
  queuedActions: [],
  events: [],
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
      if (state.round == 0) {
        return state;
      }
      return Object.assign({}, state, {
        selectedRegion: action.regionId
      });
    case "NEXT_ROUND":
      return nextRound(state);
    case "QUEUE_ACTION":
      // error handling
      if (state.selectedRegion === undefined) {
        alert("No region selected");
        return state;
      }
      if (state.round == 0) {
        return state;
      }
      let userAction:Action = state.regions[state.selectedRegion].actionList[action.value];
      if (state.money < userAction.costs) {
        alert("You do not have enough money");
        return state;
      }
      let new_state = Object.assign({}, state, {
        money: state.money - userAction.costs,
        queuedActions: [
          ...state.queuedActions,
          {
            region: state.selectedRegion,
            action: userAction,
          }
        ]
      });
      new_state.regions[state.selectedRegion].actionList = state.regions[state.selectedRegion].actionList.slice();
      new_state.regions[state.selectedRegion].actionList[action.value] = Object.assign({}, userAction, {
        used: true,
      });
      return new_state;
    default:
      return state;
    }
};

function applyAction(action: Action, region: Region): Region {
  // happiness can be anything between -100% (pure hate) and 200% (exaggerated happiness)
  region.happiness = Math.max(Math.min(region.happiness * (1 - (action.satisfaction / 100)), 2), -1);

  // infectionRate can be anything between 0% and 100%
  region.infectionRate = Math.max(Math.min(region.infectionRate * (1 - (action.infection / 100)), 1), 0); 

  return region;
}

function nextRound(state: WorldState): WorldState {
  let new_state = Object.assign({}, state, {
      round: state.round + 1,
      money: state.money + 100 // constant money gain
  });

  if (new_state.round == 1) {
    // assign initial infection
    new_state.regions[0].infectionRate = 0.7;
    new_state.regions[1].infectionRate = 0.2;
    new_state.events= [
      ...state.events,
      { title: "Initial Infection in Asia", round: new_state.round },
      { title: "Initial Infection in Europe", round: new_state.round },
    ];
  }

  /*new_state.regions.forEach(region => {
  new_state.regions.forEach(region => {
    region.infectionRate += 0.1;
    if (region.infectionRate > 1.0) {
        region.infectionRate = 1.0;
    }
  });*/

  let action: Action = actionList.actions[0];
  let region = new_state.regions[0];

  new_state.regions[0] = applyAction(action, region);

  console.log(new_state.regions[0])

  return new_state;
}

export default world;
  