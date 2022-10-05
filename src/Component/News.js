// import React, { Component } from 'react'
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


// export class News extends Component {}
const News = (props) => {
    // static defaultProps = {
    //     country: "in",
    //     pageSize: 8,
    //     category: 'general',
    // }
    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string
    // }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // articles: [],
    //         // loading: false,
    //         // loading: true,
    //         // page: 1,
    //         totalResults: 0,
    //     }
    //     document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey by Piyush`
    // }

    // async updateNews() {}
    const updateNews = async () => {

        // [all this.props are replased by props]

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        props.setProgress(100);
    }

    // async componentDidMount() {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}`;
    //         this.setState({loading: true});
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         this.setState({ 
    //             articles: parsedData.articles,
    //             totalResults: parsedData.totalResults,
    //             loading: false 
    //         })
    //     this.updateNews();
    // }
    // [async componentDidMount is replaced by useEffect]

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey by Piyush`;
        updateNews()
        //eslint-disable-next-line
    }, [])

    // handelPrevClick = async () => {
    //     // console.log("Previous");
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }
    // const handelPrevClick = async () => {
    //     setPage(page - 1 )
    //     updateNews()
    // }

    // handelNextClick = async () => {
    //     // console.log("Next");
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     //     this.setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     })
    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
    // const handelNextClick = async () => {
    //     setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
        setPage(page+1)
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
    };

    // render() {}
    return (
        // <div className="container my-3">
        <>
            <h1 className="text-center" style={{ margin: '59px 0px 10px' }} >NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                // hasMore={this.state.articles.length !== this.state.totalResults}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {/* {!this.state.loading && this.state.articles.map((element) => { */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handelPrevClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
                    </div> */}
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
