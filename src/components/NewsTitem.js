import React from "react";

const NewsTitem = () => {
  return (
    <div>
      <h2 className="tit_category">
        {this.setState.indexName} (<span>{this.setState.indexTotalCount}</span>)
      </h2>
    </div>
  );
};

export default NewsTitem;
