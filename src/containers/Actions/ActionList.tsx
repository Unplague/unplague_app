import { queueAction as queueAction } from "../../actions";
import React from 'react';
import {store} from '../../index';
import { connect } from "react-redux";

function createAction(item: any, i: number) {
    return <div>
        <button onClick={() => store.dispatch(queueAction(item.global, i))} disabled={item.used === true}>
            {item.name} ({item.costs} ₮)
        </button>
    </div>
}

const ActionList = (props: any) => {
    return (
        <div className="ActionContainer board">
            <h3>Actions</h3>
            <h4>Global</h4>
            <div className="ActionList">
                    {
                        props.globalActions.map((item: any, i: any) => {
                            return createAction(item, i);
                        })
                    }
            </div>
            <h4>Local</h4>
            <div className="ActionList">
                    {
                        props.localActions.map((item: any, i: any) => {
                            return createAction(item, i);
                        })
                    }
            </div>
        </div>
    );
};

const mapStateToProps: any = (state: any) => {
    return {
        localActions: (state.world.selectedRegion === -1) ? [] : state.world.regions[state.world.selectedRegion].actionList,
        globalActions: state.world.globalActions,
    }
  };

  export default connect(mapStateToProps)(ActionList);