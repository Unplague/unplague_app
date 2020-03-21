import React, { FunctionComponent } from 'react';
import './NewsFeed.css';

type NewsItemProps = {
    newsDate: Date,
    title: string,
}

const NewsItem: FunctionComponent<NewsItemProps> = ({ newsDate, title }: any) => (
    <div>
        <div className="NewsDate">
            {
                newsDate.toLocaleDateString("en",
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
        <div className="NewsTitle"> {title} </div>
    </div>
)

export default NewsItem;