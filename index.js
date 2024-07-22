const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controller');
const KafkaConfig = require('./config');

const app = express();
const jsonParser = bodyParser.json();

app.post('/api/send', jsonParser, controllers.sendMessageToKafka);

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume('my-topic', (value) => {
    console.log('Consumed message:', value);
});

app.listen(8000, () => {
    console.log("server is running on port 8000");
});
