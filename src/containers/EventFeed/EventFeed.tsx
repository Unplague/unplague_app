import { connect } from "react-redux";
import React from 'react';
import EventItem from '../../components/EventFeed/EventItem';

import '../../components/EventFeed/EventFeed.sass';

const EventFeed = (props: any) => {
    

    return (
        <div className="EventContainer">
            <h3>Events</h3>
            <div className="EventFeed">
                <ul>
                    {
                        props.events.map((item: any, i: any) => {
                            return <EventItem key={i} title={item.title} round={item.round} />
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps: any = (state: any) => {
    return {
        events: state.world.events
    }
};

export default connect(mapStateToProps)(EventFeed);