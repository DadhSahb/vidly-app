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
    { key: "like" },
    { key: "delete" },
  ];
  render() {
    const { movies, onLike, onDelete, onSort, sortColumb } = this.props;

    return (
      <table className="table">
        <TableHedaer
          columbs={this.columbs}
          onSort={onSort}
          sortColumb={sortColumb}
        />
        <tbody>
          {/* <TableBody data={movies} columbs={this.columbs} /> */}
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like like={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
