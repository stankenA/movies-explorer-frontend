import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.scss';

import Header from '../Header/Header';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import Footer from '../Footer/Footer';

function App() {

  const location = useLocation();
  const isNotAuth = location.pathname === '/sign-in'
    || location.pathname === '/sign-up'
    || location.pathname === '*';

  return (
    <div className="App">
      {!isNotAuth && <Header />}
      <Routes>
        <Route path='/'>
          <Route index element={<Main />} />
          <Route path='/movies' element={<Movies />} />
        </Route>
        {/* <Route path='/profile' element={<Profile />} />
        <Route path='/sign-up' element={<Registration />} />
        <Route path='/sign-in' element={<Login />} />
      <Route path='*' element={<NotFound />} /> */}
      </Routes>
      {!isNotAuth && <Footer />}
    </div>
  );
}

export default App;
