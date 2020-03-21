import { connect } from "react-redux";
import React from "react";
import { Region } from "../model/region";
import { World } from "../model/world";

const createRegions = (regions: Array<Region>) => {
  return regions.map((region: Region, index: number) => <button>{region.name}</button>);
};

const RegionList = (props: any) => {
  debugger;
  console.log(props);
  return <div>{createRegions(props.regions)}</div>;
};

const mapStateToProps: any = (state: any) => {
  debugger;
  return {
      regions: state.regions
  }
};

export default connect(mapStateToProps)(RegionList);
