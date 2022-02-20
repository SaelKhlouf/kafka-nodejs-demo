import { Kafka } from "kafkajs";

const run = async () => {
    try
    {
         const kafka = new Kafka({
              clientId: "myapp",
              brokers :["localhost:29092", "localhost:39092"],
         });

        const admin = kafka.admin();
        console.log("Connecting.....");
        await admin.connect();
        console.log("Connected!");

        await admin.createTopics({
            topics: [{
                topic : "Users",
                numPartitions: 2,
                replicationFactor: 2
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