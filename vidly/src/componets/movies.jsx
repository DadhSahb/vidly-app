import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "../Utils/Paginate";
import GroupListing from "./common/GroupListing";
import Like from "./common/Like";
import Paginations from "./common/Paginations";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (like) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(like);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handelGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = Paginate(filtered, currentPage, pageSize);

    if (count === 0)
      return (
        <p style={{ padding: "20px 10px" }}>
          There are no movies in the database
        </p>
      );
    return (
      <div className="row">
        <div className="col-3">
          <GroupListing
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handelGenreSelect}
          />
        </div>
        <div className="col-3">
          <p>Showing {filtered.length} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genra</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      like={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginations
            pageLength={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
