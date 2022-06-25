import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MainAccessPoint from './components/MainAccessPoint';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 3000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  
  return (
    <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
    <div className="App">
      <MainAccessPoint/>
    </div>
    </AlertProvider>
    </BrowserRouter>
    
  );
}

export default App;
