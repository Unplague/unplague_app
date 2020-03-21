import React from 'react';
import NewsItem from './NewsItem';
import NewsItemProps from './NewsItem';

import './NewsFeed.css';

interface News {
    newsDate: Date;
    title: string;
}

interface INewsFeedProps {
}

interface INewsFeedState {
    news: any[];
}

class NewsFeed extends React.Component<INewsFeedProps, INewsFeedState> {

    constructor(props: any) {
        super(props);

        this.state = {
            news: []
        }

        this.render = this.render.bind(this)
    }

    addNews(news: News) {
        let oldNews: any[] = this.state.news;

        this.setState({
            news: oldNews.concat(news)
        });
    }

    render() {
        let testinput: News = { title: 'Bla', newsDate: new Date() }

        return (
            <div className="NewsContainer">
                <h3>News</h3>
                <button onClick={() => this.addNews(testinput)}>Add</button>

                <div className="NewsFeed">
                    <ul>
                        {
                            this.state.news.map((item, i) => {
                                return <NewsItem key={i} title={item.title} newsDate={item.newsDate} />
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default NewsFeed;