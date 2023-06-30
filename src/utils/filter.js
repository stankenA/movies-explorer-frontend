export function filterMoviesByParams(moviesArr, searchValue, isShorts) {
  const filteredBySearchMovies = moviesArr.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase());
  });

  if (isShorts) {
    const filteredMovies = filteredBySearchMovies.filter((movie) => movie.duration <= 40);
    return filteredMovies;
  }

  return filteredBySearchMovies;
}
