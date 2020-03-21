import React, { FunctionComponent } from 'react';
import './EventFeed.css';

type EventItemProps = {
    eventDate: Date,
    title: string,
}

const EventItem: FunctionComponent<EventItemProps> = ({ title, eventDate }: any) => (
    <div>
        <div className="EventDate">
            {
                eventDate.toLocaleDateString("en",
                    {
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })
            }
        </div>
        <div className="EventTitle"> {title} </div>
    </div>
)

export default EventItem;