import { World } from "../model/world";

const regions = (state = [], action: { type: string; value: number }) => {
  debugger;
  console.log("in world rdux");
  console.log(state);
  switch (action.type) {
      default:
          return state;
      }
};

export default regions;
  