import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import HouseCalculator from './components/HouseCalculator';

function App() {
  useEffect(() => {
    try {
      ReactGA.initialize('G-V83GGYK9W6');
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
      });
      console.log('GA Initialized');
    } catch (error) {
      console.error('GA Error:', error);
    }
  }, []);

  return (
    <div className="App">
      <h1>House Calculator</h1>
      <HouseCalculator />
    </div>
  );
}

export default App;