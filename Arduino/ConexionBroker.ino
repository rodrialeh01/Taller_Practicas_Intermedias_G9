#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include<strings_en.h>
#include<WiFiManager.h>
#include<DNSServer.h>
#include<ESP8266WebServer.h>

#include <Ticker.h>
#define ledWifi D4

Ticker ticker;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

// const char* ssid = "COLOCATUSSID";
// const char* password = "PASSWORD";
const char* mqttServer = "3.91.22.95";
int mqttPort = 1883;

int pinBombilla = 4;  // GPIO 2 para NodeMCU
int fotopin = A0;

int var = 0;
int ledval = 0;
int fotoval = 0;
char datos[40];
String resultS = "";

void reconnect() {
    while (!mqttClient.connected()) {
        Serial.print("Intentando conectarse a MQTT...");

        if (mqttClient.connect("esp8266Client")) {
            Serial.println("Conectado");

            mqttClient.subscribe("Bombilla/intermedias");
        } else {
            Serial.print("Fallo, rc=");
            Serial.print(mqttClient.state());
            Serial.println(" intentar de nuevo en 5 segundos");
            // Espera 5 segundos antes de intentar nuevamente
            delay(5000);
        }
    }
}

void setup() {

    pinMode(pinBombilla, OUTPUT);
    pinMode(ledWifi, OUTPUT);
    Serial.begin(115200);
    delay(10);
    wifiInit();
    mqttClient.setServer(mqttServer, mqttPort);
    mqttClient.setCallback(callback);

}

void loop() {
    if (!mqttClient.connected()) {
        reconnect();
    }
    mqttClient.loop();

    Serial.print("String: ");
    Serial.println(resultS);

    if (var == 0) {
        digitalWrite(pinBombilla, LOW);
    } else if (var == 1) {
        digitalWrite(pinBombilla, HIGH);
    }

    fotoval = analogRead(fotopin);
    Serial.print("Foto: ");
    Serial.println(fotoval);

    sprintf(datos, "Valor fotoresistencia: %d ", fotoval);
    mqttClient.publish("Salida/01", datos);
    delay(5000);
}

void wifiInit() {

    ticker.attach(0.2, indicadorWifi);

    WiFiManager wifiManager;

    // wifiManager.resetSettings();

    if(!wifiManager.autoConnect("BOMBILLA")) {
      Serial.println("Fallo en la conexion");
      ESP.reset();
      delay(1000);
    }


    Serial.println("Se ha conectado a la red correctamente");

    ticker.detach();

    digitalWrite(ledWifi, HIGH);

    // Serial.print("Conectando a ");
    // Serial.println(ssid);

    // WiFi.begin(ssid, password);

    // while (WiFi.status() != WL_CONNECTED) {
    //     Serial.print(".");
    //     delay(500);
    // }
    // Serial.println("");
    // Serial.println("Conectado a WiFi");
    // Serial.println("Dirección IP: ");
    // Serial.println(WiFi.localIP());
}

void indicadorWifi()
{
  byte estado = digitalRead(ledWifi);
  digitalWrite(ledWifi, !estado);
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Mensaje recibido [");
    Serial.print(topic);
    Serial.print("] ");

    char payload_string[length + 1];

    int resultI;

    memcpy(payload_string, payload, length);
    payload_string[length] = '\0';
    resultI = atoi(payload_string);

    var = resultI;

    resultS = "";

    for (int i = 0; i < length; i++) {
        resultS = resultS + (char)payload[i];
    }
    Serial.println();
}
