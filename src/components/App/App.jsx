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
import ProtectedAuthRoute from '../ProtectedAuthRoute/ProtectedAuthRoute';
import { BASE_URL } from '../../utils/constants';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('jwt')));

  const navigate = useNavigate();

  const location = useLocation();
  const isContextPages = location.pathname === '/'
    || location.pathname === '/movies'
    || location.pathname === '/saved-movies'
    || location.pathname === '/profile';
  const isProfilePage = location.pathname === '/profile';

  // API
  const mainApi = new MainApi({
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  // Логин/логаут
  function handleLogin() {
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
            _id: response._id,
            name: response.name,
            email: response.email
          });
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

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
            <Route path='/sign-up' element={
              <ProtectedAuthRoute
                element={Registration}
                handleLogin={handleLogin}
                loggedIn={loggedIn}
              />
            } />
            <Route path='/sign-in' element={
              <ProtectedAuthRoute
                element={Login}
                handleLogin={handleLogin}
                loggedIn={loggedIn}
              />
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        {isContextPages && !isProfilePage && <Footer />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
