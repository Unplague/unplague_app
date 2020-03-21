import { connect } from "react-redux";
import React from "react";
import { Region } from "../model/Region";
import { selectRegion } from "../actions";
import RegionButton from "../components/RegionButton";

const createRegions = (regions: Array<Region>, selectedRegion: Region, onRegionClick: Function) => {
  return regions.map((region: Region, index: number) => 
    <RegionButton name={region.name} selected={selectedRegion == region} onClick={() => onRegionClick(region)}></RegionButton>);
};

const RegionList = (props: any) => {
  console.log(props);
  return <div className="interactionboard_buttons">{createRegions(props.regions, props.selectedRegion, props.onRegionClick)}</div>;
};

const mapStateToProps: any = (state: any) => {
  return {
    regions: state.world.regions,
    selectedRegion: state.world.selectedRegion,
  }
};

const mapDispatchToProps:any = (dispatch: any) => {
  return {
    onRegionClick: (region: Region) => {
      dispatch(selectRegion(region))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionList);