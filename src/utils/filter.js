export function filterMovies(moviesArr, searchValue, isShorts) {
  const filteredBySearchMovies = moviesArr.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchValue);
  });

  if (isShorts) {
    const filteredMovies = filteredBySearchMovies.filter((movie) => movie.duration <= 40);
    return filteredMovies;
  }

  return filteredBySearchMovies;
}
