import { connect } from "react-redux";
import React from 'react';

import { addRandomEvent } from "../../actions";


const AddEventButton = ({ dispatch }: { dispatch: any }) => {
    return <button onClick={() => dispatch(addRandomEvent(0))}>Add Event</button>;
};

export default connect()(AddEventButton)