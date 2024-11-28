import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import HouseCalculator from './components/HouseCalculator';

function App() {
  useEffect(() => {
    try {
      // Initialize GA4
      ReactGA.initialize('G-V83GGYK9W6');
      
      // Send pageview
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
      });

      // Debug logs
      console.log('GA Initialized');
      console.log('Current path:', window.location.pathname);
      
      // Test event
      ReactGA.event({
        category: "Test",
        action: "Page Load",
        label: "Initial Load"
      });
      console.log('Test event sent');
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