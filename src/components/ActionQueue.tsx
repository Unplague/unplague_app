import React, { FunctionComponent } from 'react';
import { store } from '..';

type ActionQueueProps = {
    actions: Array<any>,
}

const ActionQueue: FunctionComponent<ActionQueueProps> = ({ actions }: any) => {
    if (actions.length == 0) {
        return <p className="no-actions">Please select a region and choose one or more actions to fight the virus!</p>
    }

    let regions = store.getState().world.regions;

    return <div className="ActionList">
        <div className="data">Actions selected for the next round:</div>
        
        {
            actions.map((item: any, i: any) => {
                return <div className="data">
                    <div className="round">{item.action.name}</div>
                    <div className="data">{ item.action.global ? "Global" : regions[item.regionId].name }</div>
                </div>
            })
        }
        </div>;
}

export default ActionQueue;