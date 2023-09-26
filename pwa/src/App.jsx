import React, { useRef, useState } from 'react';
import Switch from 'react-switch';
import './App.css';
import bomb1 from './bombilla_apagada.png';
import bomb2 from './bombilla_encendida.png';


function App() {

  const [isOn, setIsOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [entry, setEntry] = useState("");

  const brokerUrl = "mqtt://35.211.252.155:9001";
  const options = {
      username: "intermedias",
      password: "passworddificil"
  }

  const clientRef = useRef(null);
  const topic = 'Bombilla/intermedias';

  if (!clientRef.current) {
    // eslint-disable-next-line no-undef
    clientRef.current = mqtt.connect(brokerUrl, options);
    

    clientRef.current.on('connect', () => {
      console.log('Conexión al broker MQTT exitosa');
  });

  clientRef.current.on('error', (error) => {
        console.error('Error en la conexión MQTT:', error);
    });

    clientRef.current.on('close', () => {
        console.log('Desconectado del broker MQTT');
    });

    clientRef.current.on('message', (topic, message) => {
        console.log(`Mensaje recibido en el tema '${topic}': ${message.toString()}`);
        if (topic === 'Bombilla/intermedias') {
          setEntry(message.toString());
          setIsOn(message.toString() === "1" ? true : false);
        }
    });

    

    clientRef.current.subscribe(topic, (error) => {
      try {
        if (!error) {
          console.log(`Suscrito al tema '${topic}'`);
        } else {
          throw new Error('Error al suscribirse:', error);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  const bombillaImagen = isOn ? bomb2 : bomb1;

  const handleToggle = () => {
    const mensaje = isOn ? "0" : "1"; // Cambié el orden de 1 y 0
    clientRef.current.publish(topic, mensaje, (error) => {
      if (!error) {
        console.log(`Mensaje publicado en el tema '${topic}': ${mensaje}`);
        setIsOn(!isOn); // Actualizo el estado después de enviar el mensaje
      } else {
        console.error('Error al publicar mensaje:', error);
      }
    });
  };
  

  return (
    <div className="App">
      <header className={isOn?'App-header_on': 'App-header_off'}>
        <img src={bombillaImagen} className="App-logo" alt="logo" />
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Switch
              checked={isOn}
              onChange={handleToggle}
              onColor="#4caf50"
              offColor="#e30724"
              onHandleColor="#ffffff"
              offHandleColor="#ffffff"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
            />
            <p>{isOn ? 'Encendido' : 'Apagado'}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
