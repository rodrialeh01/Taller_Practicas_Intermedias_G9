const mqtt = require("mqtt");

const brokerUrl = "mqtt://35.211.252.155:1883";
const options = {
    username: "intermedias",
    password: "passworddificil"
}

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
    console.log('Conexión al broker MQTT exitosa');
});

client.on('error', (error) => {
    console.error('Error en la conexión MQTT:', error);
});

client.on('close', () => {
    console.log('Desconectado del broker MQTT');
});

var state = "";

client.on('message', (topic, message) => {
    state = message.toString();
    console.log(`Mensaje recibido en el tema '${topic}': ${message.toString()}`);
});

const topic = 'Bombilla/intermedias';

client.subscribe(topic, (error) => {
    if (!error) {
        console.log(`Suscrito al tema '${topic}'`);
    } else {
      console.error('Error al suscribirse:', error);
    }
});

const mensaje = "0";

client.publish(topic, mensaje, (error) => {
    if (!error) {
      console.log(`Mensaje publicado en el tema '${topic}': ${mensaje}`);
    } else {
      console.error('Error al publicar mensaje:', error);
    }
});

process.on('SIGINT', () => {
    // Cierra la conexión MQTT antes de salir
    client.end(); 
    console.log('Aplicación terminada');
    process.exit(0);
  });

const estado = async (req, res) => {
    return res.status(200).json({ msg: state });
}

const encender = async (req, res) => {
    client.publish("Bombilla/intermedias", "1");
    return res.status(200).json({msg: "Bombilla encendida"});
}

const apagar = async (req, res) => {
    client.publish("Bombilla/intermedias", "0");
    return res.status(200).json({msg: "Bombilla apagada"});
}

module.exports = {
    estado: estado,
    encender: encender,
    apagar: apagar
}