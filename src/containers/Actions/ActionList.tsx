
import actionList from '../../data/actions.json';
import { executeAction, addEvent } from "../../actions";
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
                <ul>
                    {
                        actions.map((item: any, i: any) => {
                        return <button onClick={() => store.dispatch(executeAction(i))}>
                            {item.name}
                            </button>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default ActionList;