import React from "react";
import "../css/style_search.css";

class NewsItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      title: props.title,
      sub_title: props.sub_title,
      body: props.body,
      date: props.date,
      creator_id: props.creator_id,
    }
  }
  render()
  {
    return (
      <div className="list_sc">
        <h3 className="tit_list" dangerouslySetInnerHTML={{__html: this.props.article.title}}></h3>
        <h1 className="tit_list" dangerouslySetInnerHTML={{__html: "<i> 부제목:"+this.props.article.title+"</i>"}}>
        </h1>
        <p className="desc"  dangerouslySetInnerHTML={{__html: this.props.article.body}}></p>
        <p className="sc_footer" >
          <span>{this.props.article.date}</span>
          <span>{this.props.article.creator_id}</span>
        </p>
      </div>
    );
  }
};

export default NewsItem;
