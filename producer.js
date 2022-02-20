const { Kafka } = require('kafkajs');
const { config } = require('./config.js');

const messagesToSend = require("./input.json");

const run = async () => {
    try
    {
        const kafka = new Kafka({
            clientId: config.kafka.CLIENT_ID,
            brokers : config.kafka.BROKERS,
        });

        const producer = kafka.producer();

        console.log("Connecting...");

        await producer.connect();

        console.log("Connected!");

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

        for (let step = 0; step < messagesToSend.length; step++) {
            const message = messagesToSend[step];
            console.log(`Sending message : ${JSON.stringify(message)}`);

            const result =  await producer.send({
                topic: config.kafka.TOPIC,
                messages: [
                    { 
                        value: JSON.stringify(message),
                        partition: message.age < 35 ? 1 : 0
                    }
                ]
            });

            console.log(`Message sent : ${JSON.stringify(result)}`);

            await delay(2000); //Just for simulation
        }

        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`Exception : ${ex}`);
    }
    finally{
        process.exit(0);
    }
}

run();