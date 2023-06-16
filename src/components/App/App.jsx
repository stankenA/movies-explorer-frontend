import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import * as auth from '../../utils/auth.js';
import { UserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/api/MainApi';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const isContextPages = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';
  const isProfilePage = location.pathname === '/profile';

  useEffect(() => {
    async function recieveUserInfo() {
      try {
        const response = await mainApi.getCurrentUser();
        setCurrentUser(response);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }

    recieveUserInfo();
  }, [])

  // Логин/логаут
  function handleLogin() {
    navigate('/movies', { replace: true })
    setLoggedIn(true);
  }

  function handleLogout() {
    navigate('/', { replace: true });
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  // Проверка токена пользователя
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          handleLogin()
        }
      })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  return (
    <div className="page">
      <UserContext.Provider value={currentUser}>
        {isContextPages && <Header loggedIn={loggedIn} />}
        <main className="content">
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/profile' element={<Profile handleLogout={handleLogout} />} />
            <Route path='/sign-up' element={<Registration handleLogin={handleLogin} />} />
            <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        {isContextPages && !isProfilePage && <Footer />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
