import { connect } from "react-redux";
import React from "react";

const createLogs = (measures: any) => {
  return measures.map((loggedMeasure: any, index: number) => <p key={index}>Logged Measure: {loggedMeasure.value}</p>);
};

const InformedStatus = (props: any) => {
    console.log(props);
  return <div>{createLogs(props.measures)}</div>;
};

const mapStateToProps: any = (state: any) => {
    return {
        measures: state.measures
    }
};

export default connect(mapStateToProps)(InformedStatus);
