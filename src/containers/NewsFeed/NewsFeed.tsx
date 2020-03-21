import { connect } from "react-redux";
import React from 'react';
import NewsItem from '../../components/NewsFeed/NewsItem';

import AddNewsButton from './AddNewsButton'

import '../../components/NewsFeed/NewsFeed.css';


const NewsFeed = (props: any) => {

    return (
        <div className="NewsContainer">
            <h3>News</h3>
            <AddNewsButton />
            <div className="NewsFeed">
                <ul>
                    {
                        props.news.map((item: any, i: any) => {
                            return <NewsItem key={i} title={item.title} newsDate={item.newsDate} />
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps: any = (state: any) => {
    return {
        news: state.news
    }
};

export default connect(mapStateToProps)(NewsFeed);
//export default NewsFeed;