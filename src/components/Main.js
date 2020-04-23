import React  from "react";
import "../css/style_search.css";
import ApiService from "../ApiService.js";
import NewsList from "./NewsList";
import RangeBox from "./RangeBox";
import Sort from "./Sort";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Picker from "./Picker";
import Cookie from "./Cookie";


class Main extends React.Component{
  shouldComponentUpdate(nextProps){
    return nextProps.message === this.props.message;
  }
  constructor(props){
    super(props);
    this.state={
      query:'',
      realQuery:'',
      search: '',
      sfield: '',
      sort:'SCORE',
      date: new Date(),

    }

    this.rangeOnClick=this.rangeOnClick.bind(this);
    this.sortOnClick=this.sortOnClick.bind(this);
  }
  onChangeDate=(date)=>{
    this.setState({date});
  }
  onChangeQuery = (e) => {

     this.setState({
       query: e.target.value
     });
  }
   componentDidMount(){
     ApiService.NewsSerch(this.state.realQuery+"&sort="+this.state.sort).then((res) => {
       this.setState({
         query: '',
         search: res.data
      });
    });
  }
  onClick = () => {
    this.setState({
      realQuery:this.state.query
    });
    ApiService.NewsSerch(this.state.query).then((res) => {
       this.setState({
         search: res.data
      });
    });
  }
  sortOnClick(e){
    let sort="";
    sort=e.target.id;
    this.setState({
      sort:[e.target.id]
    });
    ApiService.NewsSerch(this.state.realQuery+"&sort="+e.target.id+"&sfield="+this.state.sfield).then((res) => {
       this.setState({
         search: res.data
      });
    });
  }
  rangeOnClick(e){
    let range="";
    range=e.target.id;
    this.setState({
      sfield:[e.target.id]
    });
    ApiService.NewsSerch(this.state.realQuery+"&sort="+this.state.sort+"&sfield="+e.target.id).then((res) => {
       this.setState({
         search: res.data
      });
    });
  }
  render(){
    const { query , search } = this.state;
    return (
      <div className="wrap_search">
        <div className="search_box">
          <form
            name="prosearch"
            id="prosearch"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="main_search">
              <h1>통합검색</h1>
              <input
                className="input-type"
                name="query"
                id="query"
                type="text"
                value={this.state.query}
                onChange={this.onChangeQuery}
              />
              <button className="btn_seach" onClick={this.onClick}>
                검색
              </button>
              <label className="futher_search">
                <input type="checkbox" id="reChk" />
                결과내 재검색
              </label>
            </div>
          </form>
        </div>
        <div className="search_result">
          <div className="search_index">
            <div className="box">
              <ul className="category">
                <li></li>
              </ul>
            </div>
            <RangeBox rangeOnClick={this.rangeOnClick}/>
            <Picker/>
            <div className="box myword">
              <p className="tit">내가 찾은 검색어</p>
              <ul className="keyword" id="mySearchKeyword"></ul>
              <Cookie/>
            </div>
          </div>
          <div className="result_header">
            "{search && <b>{search.query}</b>}"에 대한 통합 검색 결과는 총
            {search && <b>{search.totalCount}</b>}건 입니다.
            <Sort sortOnClick={this.sortOnClick}/>
          </div>

          <NewsList search={search} />
        </div>
      </div>
    );
  }
};

export default Main;
