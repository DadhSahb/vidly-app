import React, { Component } from "react";
import _ from "lodash";
//movies, onLike, Like, onDelete
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  cerateKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columbs } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columbs.map((column) => (
              <td key={this.cerateKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
