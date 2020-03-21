import { connect } from "react-redux";
import React from "react";
import { Region } from "../model/Region";
import { selectRegion } from "../actions";
import RegionButton from "../components/RegionButton";

const createRegions = (regions: Array<Region>, selectedRegion: number, onRegionClick: Function) => {
  return regions.map((region: Region, index: number) => 
    <RegionButton name={region.name} selected={selectedRegion == index} onClick={() => onRegionClick(index)}></RegionButton>);
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
    onRegionClick: (regionId: number) => {
      dispatch(selectRegion(regionId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionList);