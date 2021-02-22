import React from 'react';
import logo from './logo.svg';
import './App.css';
import Details from './component/details';

function App() {
  return (
    <div data-testid="app" className="App">
      <header className="App-header">
        <div>
          <Details/>
        </div>
      </header>
    </div>
  );
}

export default App;
