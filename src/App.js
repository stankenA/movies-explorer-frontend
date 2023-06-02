import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './vendor/normalize.css';
import './vendor/fonts/fonts.css';
import './App.scss';

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Movies from './pages/Movies/Movies';


function App() {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
