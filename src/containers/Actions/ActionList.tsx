
import actionList from '../../data/actions.json';
import { executeAction as queueAction, addEvent } from "../../actions";
import React from 'react';

import '../../components/EventFeed/EventFeed.css';
import {store} from '../../index';

const ActionList = (props: any) => {
    let actions: any = actionList.actions;
    console.log(actions)
    return (
        <div className="EventContainer">
            <h3>Actions</h3>
            <div className="EventFeed">
                    {
                        actions.map((item: any, i: any) => {
                        return <div><button onClick={() => store.dispatch(queueAction(i))}>
                            {item.name}
                            </button></div>
                        })
                    }
            </div>
        </div>
    );
};

export default ActionList;