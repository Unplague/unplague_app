import { executeAction as queueAction } from "../../actions";
import React from 'react';
import {store} from '../../index';
import { connect } from "react-redux";

function createAction(item: any, i: number) {
    return <div>
        <button onClick={() => store.dispatch(queueAction(i))} disabled={item.used === true}>
            {item.name} ({item.costs} ₮)
        </button>
    </div>
}

const ActionList = (props: any) => {
    return (
        <div className="ActionContainer">
            <h3>Actions</h3>
            <div className="ActionList">
                    {
                        props.actions.map((item: any, i: any) => {
                            return createAction(item, i);
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