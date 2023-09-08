export const techsArr = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
export const portfolioArr = [
  {
    name: 'Статичный сайт',
    link: 'https://github.com/stankenA/how-to-learn',
  },
  {
    name: 'Адаптивный сайт',
    link: 'https://github.com/stankenA/russian-travel',
  },
  {
    name: 'Одностраничное приложение',
    link: 'https://github.com/stankenA/react-mesto-auth',
  },
];

export const currentYear = new Date().getFullYear();
export const screenWidths = {
  mobie: 320,
  tablet: 768,
  desktop: 1280,
};
export const visibleMoviesProps = {
  desktop: {
    visibleMovies: 12,
    addableMovies: 3,
  },
  tablet: {
    visibleMovies: 8,
    addableMovies: 2,
  },
  mobile: {
    visibleMovies: 5,
    addableMovies: 2,
  },
};

export const BASE_URL = 'http://localhost:3001';
