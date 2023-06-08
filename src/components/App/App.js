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
import Footer from '../Footer/Footer';

function App() {

  const location = useLocation();
  const isNotContextPages = location.pathname === '/sign-in'
    || location.pathname === '/sign-up'
    || location.pathname === '*';
  const isNotProfilePage = location.pathname === '/profile';

  return (
    <div className="App">
      {!isNotContextPages && <Header />}
      <main className="content">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/sign-up' element={<Registration />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </main>
      {!isNotContextPages && !isNotProfilePage && <Footer />}
    </div>
  );
}

export default App;
