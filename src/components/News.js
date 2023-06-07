import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  constructor(props) {
    super(props);
    this.state = {
      articles : [],
      loading : true,
      page:1,
      totalResults:0
    }
    document.title = `MonkNews - ${this.capitalizeFirstLetter(this.props.category)}`; 
   }

   async updatenews(){
    this.props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    this.props.setprogress(20);
    this.setState({loading:true})
    this.props.setprogress(40);
    let parsedData = await data.json();
    this.props.setprogress(70);
    console.log(parsedData);
    this.setState({
      articles : parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading:false
    });
    this.props.setprogress(100);
   }

  async componentDidMount(){
    this.updatenews();
   }

 
   fetchMoreData = async () => {
    this.setState({page : this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines? 
                  country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles : this.state.articles.concat(parsedData.articles), 
      totalResults:parsedData.totalResults  
     });

  }


  render() {
    console.log("render");
    return (
      <>
        <h1 className='text-center' style ={{margin:'40px'}}>  MonkNews - Top {this.capitalizeFirstLetter(this.props.category)} Category</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>

          <div className='container'>
        <div className="row">
           {this.state.articles.map((element) => {
          return <div className="col-md-4" key = {element.url}>
            <Newsitem title = {element.title} description = {element.description} imageurl={element.urlToImage} newsurl={element.url} author = {element.author} date = 
             {element.publishedAt} source = {element.source.name}/>
                </div>
                   })}
      </div>
      </div>
      </InfiniteScroll>
     </>
    )
  }
}
