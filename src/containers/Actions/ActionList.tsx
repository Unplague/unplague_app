import { executeAction as queueAction } from "../../actions";
import React from 'react';

import '../../components/EventFeed/EventFeed.css';
import {store} from '../../index';
import { connect } from "react-redux";

const ActionList = (props: any) => {
    return (
        <div className="EventContainer">
            <h3>Actions</h3>
            <div className="EventFeed">
                    {
                        props.actions.map((item: any, i: any) => {
                        return <div>
                                <button onClick={() => store.dispatch(queueAction(i))} disabled={item.used === true}>
                                    {item.name} ({item.costs} ₮)
                                </button>
                            </div>
                        })
                    }
            </div>
        </div>
    );
};

const mapStateToProps: any = (state: any) => {
    if ((state.world.selectedRegion !== undefined) && (state.world.selectedRegion !== -1) ) {
        return {
            actions: state.world.regions[state.world.selectedRegion].actionList,
        }
    } else  {
        return {
            actions: []
        }
    }
  };

  export default connect(mapStateToProps)(ActionList);