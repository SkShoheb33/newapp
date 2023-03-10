import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  articles = [
    {
        "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
        "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
        "publishedAt": "2020-04-27T11:41:47Z",
        "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
        "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
        "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
        "publishedAt": "2020-03-30T15:26:05Z",
        "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
]
  no_of_pics = 0;


  constructor(){
    super();
    this.no_of_pics = 12;
    this.state = {
      "articles" : this.articles,
      "loading" : false,
      "page" : 1,
      "total_retreved" : this.no_of_pics,
      "totalResult" : 0
    };
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7cb5783ad2244877b63950745197251f&pagesize=${this.no_of_pics}&page=1`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData.totalResults);
    this.setState({
      totalResult : parseData.totalResult
    })
    this.setState({articles:parseData.articles,totalResult:parseData.totalResults})
  }
   incrementPage = async () =>{
    this.setState({page : this.state.page+1});
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7cb5783ad2244877b63950745197251f&pagesize=${this.no_of_pics}&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      total_retreved : this.state.total_retreved+this.no_of_pics
    });
    // console.log("i"+this.state.total_retreved);
  }
  decrementPage =async () =>{
    this.setState({page : this.state.page-1
    });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7cb5783ad2244877b63950745197251f&pagesize=${this.no_of_pics}&page=${this.state.page-1}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      total_retreved : this.state.total_retreved-this.no_of_pics
    });
    console.log("d"+this.state.total_retreved);
  }
  render() {
    return (
      <div className='container my-2'>
        <h2>News Monkey - top head lines</h2>
        <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,40)+"...":"title for this news is not updated  "} description={element.description?element.description.slice(0,90)+"....":"this descrtiption is not available"} imageURL={element.urlToImage?element.urlToImage:"https://cdn.arstechnica.net/wp-content/uploads/2023/01/GettyImages-1246184086-1-760x380.jpg"} newsURL={element.url}/>
                </div>
          })}
        </div>
        <div className='d-flex justify-content-between'>  
          <button onClick={this.decrementPage} disabled={this.state.page<=1} type="button" className="btn btn-dark">Previous</button>
          <button onClick={this.incrementPage} disabled={this.state.total_retreved>=this.state.totalResult} type="button" className="btn btn-dark">Next</button>
        </div>
      </div>
    )
  }
}
