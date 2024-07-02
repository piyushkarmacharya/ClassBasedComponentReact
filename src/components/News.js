import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  
  constructor(){
    super();
    this.state={
      article:[],
      page:1,
    }
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/everything?q=apple&from=2024-07-01&to=2024-07-01&sortBy=popularity&apiKey=b78849dd6768481fb4b0e9b1528efddf&page=1&pageSize=12`;
    let result=await fetch(url);
    let data=await result.json();
    this.setState({article:data.articles,totalResults:data.totalResults});
 
  }
  handleNextClick=async ()=>{
    if(Math.ceil(this.state.totalResults/12)<this.page){

    }else{
      let url=`https://newsapi.org/v2/everything?q=apple&from=2024-07-01&to=2024-07-01&sortBy=popularity&apiKey=b78849dd6768481fb4b0e9b1528efddf&page=${this.state.page+1}&pageSize=12`;
    let result=await fetch(url);
    let data=await result.json();
    this.setState({article:data.articles,page:this.state.page+1});
    }
    
  }
  handlePrevClick=async ()=>{
    let url=`https://newsapi.org/v2/everything?q=apple&from=2024-07-01&to=2024-07-01&sortBy=popularity&apiKey=b78849dd6768481fb4b0e9b1528efddf&page=${this.state.page-1}&pageSize=12`;
    let result=await fetch(url);
    let data=await result.json();
    this.setState({article:data.articles,page:this.state.page-1});
  }

  render() {
    let count=0;
    return (
      <div className='container my-3'>
        <div className='row'>
          {this.state.article.map((temp)=>{return <div key={count++} className='col my-3 '>
            <NewsItem title={temp.title} description={temp.description} imgurl={temp.urlToImage} url={temp.url}/>
            </div>})}
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button></div>
        
      </div>
    )
  }
}
