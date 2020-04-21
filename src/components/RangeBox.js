import React from "react";

class RangeBox extends React.Component{
  constructor(props){
    super(props);
    this.state={
      _on:true,
      title_on:false,
      body_on:false,
      sub_title_on:false,
    };

    this.rangeClick=this.rangeClick.bind(this);
  }
  rangeClick(e){
    if(e.target.className!="range on"){
      this.setState({
        _on: false,
        title_on: false,
        body_on: false,
        sub_title_on: false,
        [e.target.id+"_on"]: true,
      });
    }
  }

  render(){
    return(
      <div className="box">
        <p className="tit">검색범위</p>
        <a onClick={event=>{this.rangeClick(event); this.props.rangeOnClick(event);}} className={"range"+(this.state._on?" on":"")} id="">전체</a>
        <a onClick={event=>{this.rangeClick(event); this.props.rangeOnClick(event);}} className={"range"+(this.state.title_on?" on":"")} id="title">제목</a>
        <a onClick={event=>{this.rangeClick(event); this.props.rangeOnClick(event);}} className={"range"+(this.state.body_on?" on":"")} id="body">본문</a>
        <a onClick={event=>{this.rangeClick(event); this.props.rangeOnClick(event);}} className={"range"+(this.state.sub_title_on?" on":"")} id="sub_title">부제목</a>
      </div>
    );
  }
}

export default RangeBox
