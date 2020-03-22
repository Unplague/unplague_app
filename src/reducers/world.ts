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

function clamp(min: number, max: number, val: number) {
  return Math.max(Math.min(val, max), min);
}


function applyAction(action: Action, region: Region): Region {
  // happiness can be anything between -100% (pure hate) and 200% (exaggerated happiness)
  region.happiness = clamp(-1, 2, region.happiness * (1 - (action.satisfaction / 100)))

  // infectionRate can be anything between 0% and 100%
  region.infectionModifier = clamp(0, 1, region.infectionModifier * (1 - (action.infection / 100)))

  return region;
}

function nextRound(state: WorldState): WorldState {
  // increment clock and money
  let new_state = Object.assign({}, state, {
      round: state.round + 1,
      money: state.money + 100 // constant money gain
  });


  if (new_state.round == 1) {
    // assign initial infection
    new_state.regions[0].infectionRate = 0.7;

    new_state.events= [
      ...state.events,
      { title: "Initial Infection in Asia", round: new_state.round },
      { title: "Initial Infection in Europe", round: new_state.round },
    ];
  }

    // maybe change this...
    new_state.regions[0].lastRoundNewInfections = new_state.regions[0].infectionRate * new_state.regions[0].population;
  }

  // apply measures
  let action: Action = actionList.actions[0];

  let region = new_state.regions[0];

  region = applyAction(action, region);

  console.log(region)

  // apply effects of game events
  // ...

  // calculate new infections etc
  let new_infections = region.lastRoundNewInfections * region.reproductionRate * region.infectionModifier;
  region.lastRoundNewInfections = new_infections;

  region.infectionRate = Math.min(region.infectionRate + (new_infections / region.population), 1);

  new_state.regions[0] = region;
  return new_state;
}

export default world;
  