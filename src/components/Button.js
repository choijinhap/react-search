import React from "react";

class Button extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let {typeName,text,clicked}=this.props;
    let button=null;
    if(typeName=="sort"){
      button=  <a href="#" className={"btn_sort"+(clicked?"_selected":"")} onClick={this.props.onClick}>{text}</a>;
    }else{
      button=null;
    }

    return(button);
  }

}
export default Button;
