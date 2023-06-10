import React from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  )
}
