import React from "react";

class Sort extends React.Component{
  constructor(props){
    super(props);
    this.state={
      SCORE_on:true,
      date_on:false,
    };
    this.onClick=this.onClick.bind(this);
  }
  onClick(e){
    if(e.target.className!="btn_sort_selected"){
      this.setState({
        SCORE_on:false,
        date_on:false,
        [e.target.id+"_on"]:true,
      });
    }
  }
  render(){
    return(
      <div className="header_sort">
        <a href="#"  onClick={event=>{this.onClick(event); this.props.sortOnClick(event);}} className={"btn_sort"+(this.state.SCORE_on?"_selected":"")} id="SCORE">정확도순</a>
        <a href="#"  onClick={event=>{this.onClick(event); this.props.sortOnClick(event);}} className={"btn_sort"+(this.state.date_on?"_selected":"")} id="date">날짜순</a>
      </div>
    );
  }
}

export default Sort;
