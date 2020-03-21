import { connect } from "react-redux";
import React from 'react';

import { addNews } from "../../actions";

const AddNewsButton = ({ dispatch }: { dispatch: any }) => {
    return <button onClick={() => dispatch(addNews("meintext", new Date()))}>Add news</button>;
};

export default connect()(AddNewsButton)