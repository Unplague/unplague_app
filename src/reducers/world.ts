import { Region } from "../model/Region";
import defaultActions from '../data/actions.json';
import RegionButton from "../components/RegionButton";

type Action = {
  name: string,
  infection: number,
  satisfaction: number,
  base_costs: number,
  costs: number,
  used: Boolean,
  global: Boolean,
}

type Event = {
  title: string,
  round: number,
}

type WorldState = {
  regions: Array<Region>,
  money: number,
  round: number,
  selectedRegion: number,
  queuedActions: Array<{ action: any, regionId: number }>,
  events: Array<Event>,
  overallInfectionRate: number,
  gameEnded: boolean,
  globalActions: Array<Action>,
}

const initialState: WorldState = {
  regions: [],
  money: 100,
  round: 0,
  selectedRegion: -1,
  queuedActions: [],
  events: [],
  overallInfectionRate: 0.0,
  gameEnded: false,
  globalActions: defaultActions.global.map(action => Object.assign({}, action, {
    "costs": action.base_costs,
    "used": false,
    "global": true,
  })),
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
      if (state.gameEnded) return state;
      return nextRound(state);
    case "QUEUE_ACTION":
      // error handling
      if (!action.global && state.selectedRegion === -1) {
        alert("No region selected");
        return state;
      }
      if (state.round == 0 || state.gameEnded) {
        return state;
      }

      // retrieve action object
      let userAction;
      if (action.global || state.selectedRegion === -1) {
        userAction = state.globalActions[action.value];
      } else {
        userAction = state.regions[state.selectedRegion].actionList[action.value];
      }
      if (state.money < userAction.costs) {
        alert("You do not have enough money");
        return state;
      }
      let new_state = Object.assign({}, state, {
        money: state.money - userAction.costs,
        queuedActions: [
          ...state.queuedActions,
          {
            regionId: action.global ? -1 : state.selectedRegion,
            action: userAction,
          }
        ]
      });
      // update used attribute
      if (action.global || state.selectedRegion === -1) {
        new_state.globalActions = state.globalActions.map((userAction, i) => {
          return Object.assign({}, userAction, {
            used: i === action.value ? true : state.globalActions[i].used
          })
        });
      } else {
        new_state.regions[state.selectedRegion].actionList = new_state.regions[state.selectedRegion].actionList.map((userAction, i) => {
          return Object.assign({}, userAction, {
            used: i === action.value ? true : new_state.regions[state.selectedRegion!].actionList[i].used
          })
        });
      }
      return new_state;
    default:
      return state;
  }
};

function clamp(min: number, max: number, val: number) {
  return Math.max(Math.min(val, max), min);
}

function applyAction(action: Action, region: Region): Region {
  console.log("applying " + action.name + " to region " + region.name);

  // happiness can be anything between 0 and 1
  region.happiness = Math.min(1, region.happiness * action.satisfaction);

  // infectionModifier can be anything between 0.1 and inf
  region.infectionModifier = region.infectionModifier * action.infection
  if(region.infectionModifier <= 0)
    region.infectionModifier = 0.1;

  region.actionList.forEach(action => {
    let modifier: number = 0;

    if(region.happiness >= 0.9 && region.happiness <= 1) {
      modifier = 1;
    } else if(region.happiness >= 0.8 && region.happiness <= 0.89) {
      modifier = 1.03;
    } else if(region.happiness >= 0.7 && region.happiness <= 0.79) {
      modifier = 1.05;
    } else if(region.happiness >= 0.6 && region.happiness <= 0.69) {
      modifier = 1.08;
    } else if(region.happiness >= 0.5 && region.happiness <= 0.59) {
      modifier = 1.1;
    } else if(region.happiness >= 0.4 && region.happiness <= 0.49) {
      modifier = 1.13;
    } else if(region.happiness >= 0.3 && region.happiness <= 0.39) {
      modifier = 1.16;
    } else if(region.happiness >= 0.2 && region.happiness <= 0.29) {
      modifier = 1.19;
    } else if(region.happiness >= 0.1 && region.happiness <= 0.19) {
      modifier = 1.22;
    } else {
      modifier = 1.25;
    }
    
    action.costs = Math.floor(action.base_costs * modifier);
  });

  return region;
}

function nextRound(state: WorldState): WorldState {
  // increment clock and money
  let new_state = Object.assign({}, state, {
    round: state.round + 1,
    money: state.money + 100, // constant money gain
    queuedActions: [],
  });

  // apply queued actions
  state.queuedActions.forEach(queuedAction => {
    // apply global actions to all regions
    if (queuedAction.action.global) {
      new_state.regions.forEach(region => {
        applyAction(queuedAction.action, region);
      })
    } else {
      applyAction(queuedAction.action, new_state.regions[queuedAction.regionId]);
    }
  });

  // apply effects of game events
  // ...

  // calculate new infections for every region
  new_state.regions = new_state.regions.map(oldRegion  => {
    let region:Region = Object.assign({}, oldRegion, {});

    console.log("Calculating new infections for " + region.name +  " modifier=" + oldRegion.infectionModifier + " reprod=" + oldRegion.reproductionRate);
    console.log("before: infRate=" + oldRegion.infectionRate + " lastRoundNewInfections=" + oldRegion.lastRoundNewInfections);

    let new_infections = region.lastRoundNewInfections * region.reproductionRate * region.infectionModifier;
    region.lastRoundNewInfections = new_infections;

    region.infectionRate = Math.min(region.infectionRate + (new_infections / region.population), 1);

    console.log("after: newInfections=" + new_infections + " infRate=" + region.infectionRate);

    return region;
  });

  //apply fixed new infections
  let newsItems = []
  switch (new_state.round) {
    case 1:
      newsItems.push(createInfection(new_state.regions[0], new_state.round, 0.05));
      newsItems.push(createInfection(new_state.regions[1], new_state.round, 0.005));
      break;
    case 3:
      newsItems.push(createInfection(new_state.regions[4], new_state.round, 0.005));
      break;
    case 5:
      newsItems.push(createInfection(new_state.regions[3], new_state.round, 0.01));
      break;
    case 7:
      newsItems.push(createInfection(new_state.regions[2], new_state.round, 0.01));
      newsItems.push(createInfection(new_state.regions[5], new_state.round, 0.01));
      break;
  }
  // add news items
  new_state.events = [
    ...new_state.events,
    ...newsItems
  ];
  // calculate total injection rate
  let infectedPopulation = 0;
  let totalPopulation = 0;
  new_state.regions.forEach((region) => {
    totalPopulation += region.population;
    infectedPopulation += (region.infectionRate * region.population);

    // set trend
    if (region.infectionRate == 0) {
      region.infectionTrend = 0;
    } else if (region.infectionModifier >= 1) {
      region.infectionTrend = 3;
    } else if (region.infectionModifier >= 0.75) {
      region.infectionTrend = 2;
    } else {
      region.infectionTrend = 1;
    }
  });
  new_state.overallInfectionRate = infectedPopulation / totalPopulation;

  // check end condition
  if (new_state.overallInfectionRate >= 0.7) {
    new_state.gameEnded = true;
  }
  return new_state;
}

function createInfection(region: Region, round: number, rate: number) {
  // assign infection
  region.infectionRate = rate;

  // calculate infections
  region.lastRoundNewInfections = region.infectionRate * region.population;

   // return news item
  return { title: "⚠️ New infection in " + region.name, round: round };
}

export default world;
