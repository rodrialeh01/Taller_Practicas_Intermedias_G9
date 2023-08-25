import React, { useState } from 'react';
import './App.css';
import bomb1 from './bombilla_apagada.png';
import bomb2 from './bombilla_encendida.png';
import SwitchButton from './components/Slider';

function App() {
  const [isOn, setIsOn] = useState(true);

  const handleToggle2 = () => {
    setIsOn(!isOn);
  };

  const bombillaImagen = isOn ? bomb2 : bomb1;

  return (
    <div className="App">
      <header className="App-header">
        <img src={bombillaImagen} className="App-logo" alt="logo" />
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <SwitchButton/>
        </div>
      </header>
    </div>
  );
}

export default App;
