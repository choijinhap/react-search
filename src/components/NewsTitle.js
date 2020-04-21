import React, { Component } from "react";
import axios from "axios";

class NewsTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexName: "",
      indexTotalCount: "",
    };
  }
  componentDidMount() {
    this.getTitle();
  }
  getTitle() {
    const url = "http://192.168.0.5:7501/api/search_json.jsp";

    axios
      .get(url)
      .then((data) => {
        this.setState({
          indexName: data.data.result.indexName,
          indexTotalCount: data.data.result.indexTotalCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h2 className="tit_category">
          {this.setState.indexName} (
          <span>{this.setState.indexTotalCount}</span>)
        </h2>
      </div>
    );
  }
}

export default NewsTitle;
