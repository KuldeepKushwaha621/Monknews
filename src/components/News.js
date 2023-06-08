import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
 

  const  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


   const updatenews = async() =>{
    props.setprogress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setprogress(20);
    setLoading(true)
    props.setprogress(40);
    let parsedData = await data.json();
    props.setprogress(70);
    
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setprogress(100);
   }

   useEffect(() => {
     document.title = `MonkNews - ${capitalizeFirstLetter(props.category)}`; 
    updatenews();
   }, [])
   

  

 
   const fetchMoreData = async () => {
   
    const url = `https://newsapi.org/v2/top-headlines? 
                  country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
                  setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
}

return (
      <>
        <h1 className='text-center' style ={{margin:'40px',  marginTop :'87px'}}>  MonkNews - Top {capitalizeFirstLetter(props.category)} Category</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}>

          <div className='container'>
        <div className="row">
           {articles.map((element) => {
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


News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}
export default News
