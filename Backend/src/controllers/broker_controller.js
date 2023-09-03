const mqtt = require("mqtt");

const brokerUrl = "";
const options = {
    username: "",
    password: ""
}

const client = mqtt.connect(brokerUrl, options);

const estado = async (req, res) => {
    client.on('message', (topic, message) => {
        const state = message.toString();

        return res.status(200).json({msg: state});
    })
}

const actualizarEstado = async (req, res) => {

    const {estado} = req.body;

    if (estado == "1") {
        client.publish("tema", "1");
        return res.status(200).json({msg: "Bombilla encendida"});
    } else {
        client.publish("tema", "0");
        return res.status(200).json({msg: "Bombilla apagada"});
    }
    
}

module.exports = {
    estado: estado,
    actualizarEstado: actualizarEstado
}