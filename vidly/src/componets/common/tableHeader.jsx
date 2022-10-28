import React, { Component } from "react";
//columns: array
//onSort: function
//sortColumn: obj

class TableHedaer extends Component {
  raiseSort = (path) => {
    const sortColumb = { ...this.props.sortColumb };
    if (sortColumb.path === path)
      sortColumb.order = sortColumb.order === "asc" ? "desc" : "asc";
    else {
      sortColumb.path = path;
      sortColumb.order = "asc";
    }
    this.props.onSort(sortColumb);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columbs.map((columb) => (
            <th
              key={columb.path || columb.key}
              onClick={() => this.raiseSort(columb.path)}
            >
              {columb.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHedaer;
