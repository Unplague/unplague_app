import React, { FunctionComponent } from 'react';
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
        let newsList = this.state.news;

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


type NewsProps = {
    newsDate: Date,
    title: string,
}

const NewsItem: FunctionComponent<NewsProps> = ({ newsDate, title }: News) => (
    <div>
        <div className="NewsDate">
            {newsDate.toLocaleDateString("en",
                {
                    year: "numeric",
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                })}
        </div>
        <div className="NewsTitle"> {title} </div>
    </div>
)

export default NewsFeed;