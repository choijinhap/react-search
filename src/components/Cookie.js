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
  // 쿠키값 조회
getCookie=(c_name)=> {
  const{cookies}=this.props;
	var i,x,y;
  var a=cookies.get(c_name);

  //const cookie=(cookies.get(c_name)).split(";");
	// for (i=0;i<cookie.length;i++) {
	// 	x=cookie[i].substr(0,cookie[i].indexOf("="));
	// 	y=cookie[i].substr(cookie[i].indexOf("=")+1);
	// 	x=x.replace(/^\s+|\s+$/g,"");
	// 	if (x==c_name) {
	// 		return unescape(y);
	// 	}
	// }
  return a;
}

// 쿠키값 설정
 setCookie=(c_name,value,exdays)=> {
  const{cookies}=this.props;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	cookies.set(c_name + "=" + c_value);
}

// 내가 찾은 검색어 조회
 getSearchMyKeyword=(keyword, totCount) =>{
  const{cookies}=this.props;
	var MYKEYWORD_COUNT = 10; //내가 찾은 검색어 갯수 + 1
	var myKeyword = this.getCookie("mySearchKeyword");
	if( myKeyword== null) {
		myKeyword = "";
	}

	var myKeywords = myKeyword.split("^%");

	if( totCount > 0 ) {
		var existsKeyword = false;
		for( var i = 0; i < myKeywords.length; i++) {
			if( myKeywords[i] == keyword) {
				existsKeyword = true;
				break;
			}
		}

		if( !existsKeyword ) {
			myKeywords.push(keyword);
			if( myKeywords.length == MYKEYWORD_COUNT) {
				myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
			}
		}
		this.setCookie("mySearchKeyword", myKeywords.join("^%"), 365);
	}

	this.searchMyKeyword(myKeywords.reverse());
}


// 내가 찾은 검색어 삭제
removeMyKeyword=(keyword)=> {
  const{cookies}=this.props;
	var myKeyword = this.getCookie("mySearchKeyword");
	if( myKeyword == null) {
		myKeyword = "";
	}

	var myKeywords = myKeyword.split("^%");

	var i = 0;
	while (i < myKeywords.length) {
		if (myKeywords[i] == keyword) {
			myKeywords.splice(i, 1);
		} else {
			i++;
		}
	}

	this.setCookie("mySearchKeyword", myKeywords.join("^%"), 365);

	this.searchMyKeyword(myKeywords);
}

// 내가 찾은 검색어
searchMyKeyword=(myKeywords)=> {
	//var str = "<p class=\"tit\">내가 찾은 검색어</p>";

	var str = "";

	//for( var i = 0; i < myKeywords.length; i++) {
	//	if( myKeywords[i] == "") continue;

		str += "<li><a href=\"#\" onClick=\"javascript:goKeywordSearch('"+myKeywords+"');\">"+myKeywords+"</a> <a href=\"#\" onClick=\"javascript:removeMyKeyword('"+myKeywords+"');\" class=\"btn_del\"></a></li>";
	//}

	//alert(str);
  return str;
	//$("#mySearchKeyword").html(str);
}
  handleNameChange(name){
    const{cookies} = this.props;
    cookies.set('name',name,{path:'/'});
    this.setState({name});
  }

  render(){
    return(
      <div>
      {this.searchMyKeyword(this.getCookie("mySearchKeyword"))}
      </div>
    );
  }
}

export default withCookies(Cookie);
