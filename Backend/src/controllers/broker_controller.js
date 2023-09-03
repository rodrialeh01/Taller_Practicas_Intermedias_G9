const mqtt = require("mqtt");

const brokerUrl = "18.232.98.71:1883";
const options = {
    username: "intermedias",
    password: "passworddificl"
}

const client = mqtt.connect(brokerUrl, options);

const estado = async (req, res) => {
    client.on('message', (topic, message) => {
        const state = message.toString();

        return res.status(200).json({msg: state});
    })
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