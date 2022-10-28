import React, { Component } from "react";
//movies, onLike, Like, onDelete
class TableBody extends Component {
  render() {
    const { data, columbs } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr>
            {columbs.map((column) => (
              <td></td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
