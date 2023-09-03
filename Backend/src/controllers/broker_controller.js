const mqtt = require("mqtt");

const brokerUrl = "mqtt://18.232.98.71:1883";
const options = {
    username: "intermedias",
    password: "passworddificil"
}

//mosquitto_pub -h 18.232.98.71 -p 1883 -u intermedias -P passworddificil -t Bombilla/intermedias -m 1

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
    console.log('Conexión al broker MQTT exitosa');

    // Suscríbete al tema desde el que deseas obtener valores
    client.subscribe('Bombilla/intermedias', (err) => {
        if (err) {
            console.error('Error al suscribirse al tema:', err);
        } else {
            console.log('Suscripción exitosa al tema Bombilla/intermedias');
        }
    });
    
});

const encender = async (req, res) => {
    client.publish("Bombilla/intermedias", "1");
    return res.status(200).json({msg: "Bombilla encendida"});
    
}

const apagar = async (req, res) => {
    client.publish("Bombilla/intermedias", "0");
    return res.status(200).json({msg: "Bombilla apagada"});
}

module.exports = {
    encender: encender,
    apagar: apagar
}