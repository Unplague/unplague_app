import { connect } from "react-redux";
import React from "react";
import { Region } from "../model/region";
import { World } from "../model/world";
import { selectRegion } from "../actions";
import RegionButton from "../components/RegionButton";

const createRegions = (regions: Array<Region>, selectedRegion: string, onRegionClick: Function) => {
  return regions.map((region: Region, index: number) => 
    <RegionButton name={region.name} selected={selectedRegion == region.name} onClick={() => onRegionClick(region.name)}></RegionButton>);
};

const RegionList = (props: any) => {
  console.log(props);
  return <div>{createRegions(props.regions, props.selectedRegion, props.onRegionClick)}</div>;
};

const mapStateToProps: any = (state: any) => {
  return {
    regions: state.world.regions,
    selectedRegion: state.world.selectedRegion,
  }
};

const mapDispatchToProps:any = (dispatch: any) => {
  return {
    onRegionClick: (name: string) => {
      dispatch(selectRegion(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionList);
