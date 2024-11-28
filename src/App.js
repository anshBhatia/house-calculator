import React from 'react';
import './App.css';
import HouseCalculator from './components/HouseCalculator';  // Make sure this path is correct
import ReactGA from 'react-ga4';

// Initialize GA4 with your measurement ID
ReactGA.initialize('G-V83GGYK9W6'); // Replace with your GA4 measurement ID

function App() {
  // Track page view
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });

  return (
    <div className="App">
      <h1>House Calculator</h1>
      <HouseCalculator />
    </div>
  );
}

export default App;