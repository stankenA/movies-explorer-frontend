// Пользователь

import { RouterProps } from "react-router-dom"

export type TCurrentUser = {
  _id: string
  name: string
  email: string
}

// Фильмы

type TMovieCommon = {
  country: string,
  director: string,
  duration: number,
  year: string,
  description: string,
  nameRU: string,
  nameEN: string,
  movieId: number,
  trailerLink: string,
  thumbnail: string,
}

export type TMovie = TMovieCommon & {
  image: string,
  id?: number,
  _id?: string,
  owner?: {
    _id: string
    name: string
    email: string
  },
}

export type TInitialMovie = TMovie & {
  image: any
}

export type TMoviesCardProps = {
  movie: TMovie
  title: string
  duration: number
  thumbnail: string
  trailerLink: string
  handleDelete: (movie: TMovie) => void
  savedMoviesArr: TMovie[]
}

export type TMoviesCardSaveBtnProps = {
  onLike: () => void,
  isLiked: boolean
}

export type TMoviesCardListProps = {
  moviesArr: TMovie[]
  isMoreBtnVisible: boolean
  savedMoviesArr?: TMovie[]
  handleMoreBtn?: () => void
  handleDelete?: (movie: TMovie) => void
}

export type TPopupProps = {
  isPoupOpened: boolean
  onClose: () => void
  onBgClose: () => void
  popupMessage: string
  isSuccessfull: boolean
}

export type TProtectedRouteProps = {
  loggedIn: boolean,
  [x: string]: any,
}

export type TSearchFormProps = {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void
}

export type TSignFormProps = {
  isRegistration: boolean
  errors: {
    name: string
    password: string
    email: string
  }
  isValid: boolean
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void
}
