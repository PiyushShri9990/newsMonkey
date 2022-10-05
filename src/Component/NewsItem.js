// import React, { Component } from 'react'
import React from 'react'

// export class NewsItem extends Component {}
const NewsItem = (props) => {

    // render() {}
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-2">
            <div className="card">
                <div style={{
                    display: `flex`,
                    justifyContent: `flex-end`,
                    position: `absolute`,
                    right: `0`
                }}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={!imageUrl ? "https://c.ndtvimg.com/2022-04/0ql59cnk_supreme-court-ani-twitter_625x300_08_April_22.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="bg-info text-dark">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
