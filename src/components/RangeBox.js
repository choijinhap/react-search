import React from "react";

class RangeBox extends React.Component{
  constructor(props){
    super(props);
    this.state={
      all_on:true,
      title_on:false,
      content_on:false,
      subtitle_on:false,
    }
  }
  rangeClick(e){

  }

  render(){
    return(
      <div className="box">
        <p className="tit">검색범위</p>
        <a onClick={this.rangeClick.bind(this)} className={"range"+(this.state.all_on?" on":"")}>전체</a>
        <a onClick={this.rangeClick.bind(this)} className={"range"+(this.state.all_on?" on":"")}>제목</a>
        <a onClick={this.rangeClick.bind(this)} className={"range"+(this.state.all_on?" on":"")}>본문</a>
        <a onClick={this.rangeClick.bind(this)} className={"range"+(this.state.all_on?" on":"")}>부제목</a>
      </div>
    );
  }
}

export default RangeBox
