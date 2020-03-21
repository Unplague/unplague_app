import { connect } from "react-redux";
import { addInform } from "../actions";
import React from "react";

const InformResidentsButton = ({ dispatch }: { dispatch: any }) => {
  return <button onClick={() => dispatch(addInform(1000))}>Click here to add a inform measure</button>;
};

export default connect()(InformResidentsButton)