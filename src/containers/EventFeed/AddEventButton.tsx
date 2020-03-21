import { connect } from "react-redux";
import React from 'react';

import { addEvent } from "../../actions";


const AddEventButton = ({ dispatch }: { dispatch: any }) => {
    return <button onClick={() => dispatch(addEvent(new Date()))}>Add Event</button>;
};

export default connect()(AddEventButton)