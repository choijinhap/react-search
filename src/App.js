import React, { useState, useEffect } from "react";
import "./css/style_search.css";
import ApiService from "./ApiService.js";
import Main from "./components/Main";

class App extends React.Component {
  render(){
    return (
      <Main/>
    );
  }
};
export default React.memo(App);
