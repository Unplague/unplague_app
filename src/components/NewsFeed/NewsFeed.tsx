import { connect } from "react-redux";
import React from 'react';
import NewsItem from './NewsItem';
import NewsItemProps from './NewsItem';

import { addNews } from "../../actions";

import './NewsFeed.css';


const AddNewsButton = ({ dispatch }: { dispatch: any }) => {
    return <button onClick={() => dispatch(addNews("meintext"))}>Add news</button>;
};

const MyButton = connect()(AddNewsButton)

const NewsFeed = (props: any) => {

    return (
        <div className="NewsContainer">
            <h3>News</h3>
            <MyButton />
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