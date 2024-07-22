const { Kafka } = require('kafkajs');

class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            clientId: "nodejs-kafka",
            brokers: ["localhost:10000", "localhost:10001", "localhost:10002"]
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async produce(topic, messages) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: messages,
            });
        } catch (err) {
            console.log(err);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic, cb) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value.toString();
                    cb(value);
                },
            });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = KafkaConfig;
