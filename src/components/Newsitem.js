import React from 'react'

const Newsitem  = (props)=> {
  let { title, description, imageurl, newsurl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card" >

          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }} >
            <span className=" badge rounded-pill bg-danger" >{source}</span>
          </div>

          <img src={!imageurl ? "https://images.moneycontrol.com/static-mcnews/2023/06/stocks_sensex_nifty_stockmarket-1-770x433.jpg" : imageurl} className="card-img- 
                     top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? <strong>{author}</strong> : <strong>"Unknown"</strong>} on {new Date(date).toGMTString()} 
                    </small></p>
            <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem
