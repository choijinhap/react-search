/* eslint-disable array-callback-return */
import React  from "react";
import NewsItem from "./NewsItem";

class NewsList extends React.Component{
  //const [crticles, setCrticles] = useState(null);
//  const {title,sub_title,body,date,creator_id }= {article}


  onClick = () =>{
    this.props.search.result[0].items.map((article)=>{alert(article.title)});
    console.log("Asd");
  }


  render(){




    //const {articles} = this.state.search;
    if(this.props.search.result){
      return this.props.search.result[0].items.map((article) => <NewsItem article={article} />);
    }else{
      return <div></div>;
    }
  }
};

export default NewsList;
