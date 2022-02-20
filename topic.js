const { Kafka } = require('kafkajs');
const { config } = require('./config.js');

const run = async () => {
    try
    {
        const kafka = new Kafka({
            clientId: config.kafka.CLIENT_ID,
            brokers : config.kafka.BROKERS,
        });

        const admin = kafka.admin();

        console.log("Connecting...");

        await admin.connect();

        console.log("Connected!");

        await admin.createTopics({
            topics: [{
                topic : config.kafka.TOPIC,
                numPartitions: config.kafka.NUMBER_OF_PARTITIONS,
                replicationFactor: config.kafka.REPLICATION_FACTOR
            }]
        });
        console.log("Topics have been created.");
        
        await admin.disconnect();
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