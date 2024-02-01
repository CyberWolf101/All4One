import React from 'react';
import ShopWigets from '../components/home/shopWigets';
import Updates from '../components/home/updates';
import Nav from '../components/partials/nav';

function Home(props) {
  
  return (
    <div>
        <Nav />

      <ShopWigets />
      <Updates/>
    </div>
  );
}

export default Home;