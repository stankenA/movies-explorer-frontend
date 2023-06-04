import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.scss';

import Header from '../Header/Header';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import Footer from '../Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
