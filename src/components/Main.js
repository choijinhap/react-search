import React, { useState, useEffect } from "react";
import "../css/style_search.css";
import ApiService from "../ApiService.js";
import NewsList from "./NewsList";
import Button from "./Button";
import RangeBox from "./RangeBox";

class Main extends React.Component{
  shouldComponentUpdate(nextProps){
    return nextProps.message === this.props.message;
  }
  constructor(props){
    super(props);
    this.state={
      query:'',
      search: '',
      sfield: '',
      sort:'',

      score_on:true,
      date_on:false,
    }

    this.rangeOnClick=this.rangeOnClick.bind(this);
  }

  onChangeQuery = (e) => {

     this.setState({
       query: e.target.value
     });
  }
   componentDidMount(){
     ApiService.NewsView().then((res) => {
       this.setState({
         query: '',
         search: res.data
      });
    });
  }
  onClick = () => {
    ApiService.NewsSerch(this.state.query).then((res) => {
       this.setState({
         search: res.data
      });
    });
  }
  sortOnClick(e){
    let sort="";

    if(e.target.className!="btn_sort_selected"){
      this.setState({
        score_on: !this.state.score_on,
        date_on: !this.state.date_on
      });
      sort=this.state.date_on?"SCORE/desc":"date/desc";
      ApiService.NewsSerch(this.state.query+"&sort="+sort+"&sfield="+this.state.sfield).then((res) => {
         this.setState({
           search: res.data
        });
      });
    }
  }
  rangeOnClick(e){
    let range="";
    console.log(e.target.id);
    range=e.target.id
    this.setState({
      sfield:[e.target.id]
    });
    ApiService.NewsSerch(this.state.query+"&sort="+this.state.sort+"&sfield="+e.target.id).then((res) => {
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
            <div className="box">
              <p className="tit">기간</p>
              <div className="date_setting">
                <label className="radio-type">
                  <input type="radio" name="dt" value="ALL" />
                  <span>전체</span>
                </label>
                <label className="radio-type">
                  <input type="radio" name="dt" value="1" />
                  <span>기간</span>
                </label>
                <input type="text" name="sDate" id="sDate" />
                ~
                <input type="text" name="eDate" id="eDate" />
              </div>
            </div>
            <div className="box myword">
              <p className="tit">내가 찾은 검색어</p>
              <ul className="keyword" id="mySearchKeyword"></ul>
            </div>
          </div>
          <div className="result_header">
            "{search && <b>{search.query}</b>}"에 대한 통합 검색 결과는 총
            {search && <b>{search.totalCount}</b>}건 입니다.
            <div className="header_sort">
              <Button href="#" typeName="sort" text="정확도순" onClick={this.sortOnClick.bind(this)} clicked={this.state.score_on}/>
              <Button href="#" typeName="sort" text="날짜순" onClick={this.sortOnClick.bind(this)} clicked={this.state.date_on}/>
            </div>
          </div>

          <NewsList search={search} />
        </div>
      </div>
    );
  }
};

export default Main;
