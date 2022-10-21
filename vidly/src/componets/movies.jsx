import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "../Utils/Paginate";
import GroupListing from "./common/GroupListing";
import Paginations from "./common/Paginations";
import MoviesTable from "./moviesTable";

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
        <p>Showing {filtered.length} movies in the database</p>
        <div className="col-3">
          <GroupListing
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handelGenreSelect}
          />
        </div>
        <div className="col-3">
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
          />
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
