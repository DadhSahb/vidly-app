import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "../Utils/Paginate";
import GroupListing from "./common/GroupListing";
import Paginations from "./common/Paginations";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumb: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  //for deleting a movie
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  //for handling like
  handleLike = (like) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(like);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  //hanle pagination
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handelGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumb) => {
    this.setState({ sortColumb });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumb,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumb.path], [sortColumb.order]);

    const movies = Paginate(sorted, currentPage, pageSize);

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
            onSort={this.handleSort}
            sortColumb={sortColumb}
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
