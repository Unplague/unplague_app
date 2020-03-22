import { queueAction as queueAction } from "../actions";
import React from 'react';
import {store} from '../index';
import { connect } from "react-redux";

function printStat(value: number, negIsGood: boolean) {
    let perc = (value - 1) * 100
    let className = "positive";
    if ((negIsGood && perc > 0) || (!negIsGood && perc < 0)) {
        className = "negative";
    }
    return <span className={className}>{ perc < 0 ? "" : "+" }{perc.toFixed(0)} %</span>
}

function createAction(item: any, i: number, money: number) {
    return <div>
        <button onClick={() => store.dispatch(queueAction(item.global, i))} disabled={item.used === true || item.costs > money}>
            <p className="name">{item.name} ({item.costs} <span className="tpp">🧻</span>)</p>
            <p className="stats">Infection: {printStat(item.infection, true)}</p>
            <p className="stats">Satisfaction: {printStat(item.satisfaction, false)}</p>
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
                            return createAction(item, i, props.money);
                        })
                    }
            </div>
            <h4>Local</h4>
            <div className="ActionList">
                    {
                        props.localActions.map((item: any, i: any) => {
                            return createAction(item, i, props.money);
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
        money: state.world.money,
    }
  };

  export default connect(mapStateToProps)(ActionList);