import React, { Component } from "react";
import TableHedaer from "./common/tableHeader";
import Like from "./common/Like";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columbs = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like like={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumb } = this.props;

    return (
      <table className="table">
        <TableHedaer
          columbs={this.columbs}
          onSort={onSort}
          sortColumb={sortColumb}
        />
        <TableBody data={movies} columbs={this.columbs} />
      </table>
    );
  }
}

export default MoviesTable;
