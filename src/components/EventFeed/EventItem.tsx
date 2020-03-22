import React, { FunctionComponent } from 'react';
import './EventFeed.sass';

type EventItemProps = {
    round: number,
    title: string,
}

const EventItem: FunctionComponent<EventItemProps> = ({ title, round }: any) => (
    <div>
        <div className="EventDate">
            Round {round}
        </div>
        <div className="EventTitle"> {title} </div>
    </div>
)

export default EventItem;