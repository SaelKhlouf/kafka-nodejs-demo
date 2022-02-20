const { Kafka } = require('kafkajs');
const { config } = require('./config.js');

const run = async () => {
    try
    {
        const kafka = new Kafka({
            clientId: config.kafka.CLIENT_ID,
            brokers : config.kafka.BROKERS,
        });

        const consumer = kafka.consumer({
            groupId: config.kafka.CONSUMER_GROUP_ID
        });

        console.log("Connecting...");

        await consumer.connect();

        console.log("Connected!");
        
        await consumer.subscribe({
            topic: config.kafka.TOPIC,
            fromBeginning: true
        });
        
        await consumer.run({
            eachMessage: async ({ message, partition }) => {
                try {
                    console.log(`message Received : ${message.value} on partition : ${partition}`);

                    const jsonObj = JSON.parse(message.value.toString());
                    console.log(
                        '******* Alert !!!!! *********',
                        jsonObj
                    );
                    
                  } catch (error) {
                    console.log('Error while processing message : ', error);
                  }
            }
        });
    }
    catch(ex)
    {
        console.error(`Exception : ${ex}`);
    }
    finally{
        
    }
}

run();