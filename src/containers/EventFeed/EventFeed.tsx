import { connect } from "react-redux";
import React from 'react';
import EventItem from '../../components/EventFeed/EventItem';

import AddEventButton from './AddEventButton'

import '../../components/EventFeed/EventFeed.css';

const EventFeed = (props: any) => {
    

    return (
        <div className="EventContainer">
            <h3>Events</h3>
            <AddEventButton />
            <div className="EventFeed">
                <ul>
                    {
                        props.events.map((item: any, i: any) => {
                            return <EventItem key={i} title={item.title} eventDate={item.eventDate} />
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps: any = (state: any) => {
    return {
        events: state.events
    }
};



export default connect(mapStateToProps)(EventFeed);