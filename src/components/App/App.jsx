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
import MainApi from '../../utils/api/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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

  // API
  const mainApi = new MainApi({
    url: 'https://api.movies-exporer.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  useEffect(() => {
    async function recieveUserInfo() {
      if (loggedIn) {
        try {
          const response = await mainApi.getCurrentUser();
          setCurrentUser(response);
        } catch (error) {
          console.log(error);
        }
      }
    }

    recieveUserInfo();
  }, [loggedIn]);

  // Логин/логаут
  function handleLogin() {
    navigate('/movies', { replace: true })
    setLoggedIn(true);
  }

  function handleLogout() {
    navigate('/', { replace: true });
    localStorage.clear();
    setLoggedIn(false);
  }

  // Проверка токена пользователя
  async function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      try {
        const response = await auth.checkToken(jwt);

        if (response) {
          setCurrentUser({
            name: response.name,
            email: response.email
          });
          handleLogin();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  // Изменение информации о текущем пользователе при её обновлении
  function changeCurrentUser(data) {
    setCurrentUser(data)
  }

  return (
    <div className="page">
      <UserContext.Provider value={currentUser}>
        {isContextPages && <Header loggedIn={loggedIn} />}
        <main className="content">
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
              />
            } />
            <Route path='/saved-movies' element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
              />
            } />
            <Route path='/profile' element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                handleLogout={handleLogout}
                changeCurrentUser={changeCurrentUser}
              />} />
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
