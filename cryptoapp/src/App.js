
import './App.css';
import React, { useState } from 'react';
import Header from './components/Global/Header';
import Footer from './components/Global/Footer';

import CryptoList from './components/Crypto/CryptoList';
import CryptoDetails from './components/Crypto/CryptoDetails';


const App = () => {

  const [selectedCryptoId, setSelectedCryptoId] = useState(null);

  // Handle selecting a cryptocurrency from the list
  const handleSelectCrypto = (id) => {
    setSelectedCryptoId(id);
  };


  return (
    <div className="app">
      <Header />
      <div className='bodySection'>
        <div>
          <CryptoList onSelectCrypto={handleSelectCrypto} />
          {selectedCryptoId && <CryptoDetails selectedCryptoId={selectedCryptoId} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
