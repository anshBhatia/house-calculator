import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import HouseCalculator from './components/HouseCalculator';

function App() {
  useEffect(() => {
    // Initialize GA4 with your actual measurement ID
    ReactGA.initialize('G-V83GGYK9W6');
    
    // Send pageview
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });

    console.log('GA Initialized'); // Debug log
  }, []);

  return (
    <div className="App">
      <h1>House Calculator</h1>
      <HouseCalculator />
    </div>
  );
}

export default App;