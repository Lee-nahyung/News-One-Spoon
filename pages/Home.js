import React from 'react';
import '../css/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';


function Home() {
  return (
    <div class="Home">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;