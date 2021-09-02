import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category:"general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }



    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=809f6c8284c54a1ca949c9ceffc70358&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})
    }

    handleNextClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=809f6c8284c54a1ca949c9ceffc70358&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })
        }
    }
    handlePreClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=809f6c8284c54a1ca949c9ceffc70358&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }

    render() {
        return (
            <div className="container my-3">
                <div className="d-flex justify-content-between">
                    <h1 style={{minWidth:'fit-content'}}>NewsZ - Top Headlines</h1>
                    <div className="container">
                        <form className="d-flex">
                            <input className="form-control w-50" type="text" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" >Search</button>
                        </form>
                    </div>
                </div> 
                {this.state.loading && <Spinner />}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,57):""} description={element.description?element.description.slice(0,97):""} imageUrl={element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/new-skills-knowledge-webinar-training-business-internet-technology-concept-new-skills-knowledge-webinar-training-business-internet-121274023.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}
                </div>
                <div className="container d-flex justify-content-between ">
                    <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreClick} type="button"> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary"  onClick={this.handleNextClick} type="button">Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News
