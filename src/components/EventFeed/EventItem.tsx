import React, { FunctionComponent } from 'react';
import './EventFeed.css';

type EventItemProps = {
    week: Date,
    title: string,
}

const EventItem: FunctionComponent<EventItemProps> = ({ title, week }: any) => (
    <div>
        <div className="EventDate">
            Week {week}
        </div>
        <div className="EventTitle"> {title} </div>
    </div>
)

export default EventItem;