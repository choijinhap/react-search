import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies , Cookies} from 'react-cookie';
class Cookie extends React.Component{
  static porpTypes={
    cookies:instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const{cookies}=props;
    this.state={
      name:cookies.get('name')
    };
  }

  handleNameChange(name){
    const{cookies} = this.props;
    cookies.set('name',name,{path:'/'});
    this.setState({name});
  }

  render(){
    return(
      <div>
      <input type="text" name={this.state.name} onChange={this.handleNameChange.bind(this)} />
      {this.state.name && <h1>Hello {this.state.name}!</h1>}
      </div>
    );
  }
}

export default withCookies(Cookie);
