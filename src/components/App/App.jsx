import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.scss';

import Header from '../Header/Header';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Registration from '../../pages/Registration/Registration';
import Login from '../../pages/Login/Login';
import Footer from '../Footer/Footer';
import NotFound from '../../pages/NotFound/NotFound';

function App() {

  const location = useLocation();
  const isContextPages = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';
  const isNotProfilePage = location.pathname === '/profile';

  return (
    <div className="page">
      {isContextPages && <Header />}
      <main className="content">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-up' element={<Registration />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      {isContextPages && !isNotProfilePage && <Footer />}
    </div>
  );
}

export default App;