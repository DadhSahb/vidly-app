import React, { Component } from "react";
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
  //sortIcons
  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumb.path) return null;
    if (this.props.sortColumb.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    } else {
      return <i className="fa fa-sort-desc"></i>;
    }
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columbs.map((columb) => (
            <th
              key={columb.path || columb.key}
              onClick={() => this.raiseSort(columb.path)}
              style={{ cursor: "pointer" }}
            >
              {columb.label} {this.renderSortIcon(columb)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHedaer;
