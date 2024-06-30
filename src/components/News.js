import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  
  constructor(){
    super();
    this.state={
      article:[],
    }
  }

  async componentDidMount(){
    const today=new Date();
    today.setDate(today.getDate()-2);
    let url=`https://newsapi.org/v2/everything?q=sports&from=${today}&sortBy=publishedAt&apiKey=b78849dd6768481fb4b0e9b1528efddf`;
    let result=await fetch(url);
    let data=await result.json();
    this.setState({article:data.articles});
 
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
      </div>
    )
  }
}
