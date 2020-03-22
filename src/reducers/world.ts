import { Region } from "../model/Region";
import defaultActions from '../data/actions.json';

type Action = {
  name: string,
  infection: number,
  satisfaction: number,
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

  // happiness can be anything between -100% (pure hate) and 200% (exaggerated happiness)
  region.happiness = clamp(-1, 2, region.happiness * (1 - (action.satisfaction / 100)))

  // infectionRate can be anything between 0% and 100%
  region.infectionModifier = clamp(0, 1, region.infectionModifier * (1 - action.infection))

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

  // apply fixed new infections
  // if (new_state.round == 1) {
  //   // assign initial infection
  //   new_state.regions[0].infectionRate = 0.2;

  //   new_state.events= [
  //     ...state.events,
  //     { title: "Initial Infection in Asia", round: new_state.round },
  //     //{ title: "Initial Infection in Europe", round: new_state.round },
  //   ];
  //   new_state.regions[0].lastRoundNewInfections = new_state.regions[0].infectionRate * new_state.regions[0].population;
  // }

  //apply fixed new infections
  switch (new_state.round) {
    case 1:
      //assign infection
      new_state.regions[0].infectionRate = 0.05;
      new_state.regions[1].infectionRate = 0.005;

      //Push to news
      new_state.events = [
        ...state.events,
        { title: "Initial Infection in Asia", round: new_state.round },
        { title: "Initial Infection in Europe", round: new_state.round },
      ];

      //Calculate infections
      new_state.regions[0].lastRoundNewInfections = new_state.regions[0].infectionRate * new_state.regions[0].population;
      new_state.regions[1].lastRoundNewInfections = new_state.regions[1].infectionRate * new_state.regions[1].population;
      break;
    case 3:
      new_state.regions[4].infectionRate = 0.005;

      new_state.events = [
        ...state.events,
        { title: "New Infection in Africa", round: new_state.round },
      ];
      new_state.regions[4].lastRoundNewInfections = new_state.regions[4].infectionRate * new_state.regions[4].population;
      break;
    case 5:
      new_state.regions[3].infectionRate = 0.01;


      new_state.events = [
        ...state.events,
        { title: "New Infection in South America", round: new_state.round },
      ];
      new_state.regions[3].lastRoundNewInfections = new_state.regions[3].infectionRate * new_state.regions[3].population;
      break;
    case 7:
      new_state.regions[2].infectionRate = 0.01;
      new_state.regions[6].infectionRate = 0.01;

      new_state.events = [
        ...state.events,
        { title: "New Infection in North America", round: new_state.round },
        { title: "New Infection in Australia", round: new_state.round },
      ];
      new_state.regions[2].lastRoundNewInfections = new_state.regions[2].infectionRate * new_state.regions[2].population;
      new_state.regions[6].lastRoundNewInfections = new_state.regions[6].infectionRate * new_state.regions[6].population;
      break;
  }

  // calculate total injection rate
  let infectedPopulation = 0;
  let totalPopulation = 0;
  new_state.regions.forEach((region) => {
    totalPopulation += region.population;
    infectedPopulation += (region.infectionRate * region.population);
  });
  new_state.overallInfectionRate = infectedPopulation / totalPopulation;

  // check end condition
  if (new_state.overallInfectionRate >= 0.7) {
    new_state.gameEnded = true;
  }
  return new_state;
}

export default world;
