import { Kafka } from "kafkajs";

const run = async () => {
    try
    {
         const kafka = new Kafka({
              clientId: "myapp",
              brokers :["localhost:29092", "localhost:39092"],
         });

        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting.....");
        await consumer.connect();
        console.log("Connected!");
        
        await consumer.subscribe({
            topic: "Users",
            fromBeginning: true
        });
        
        await consumer.run({
            eachMessage: async result => {
                console.log(`Received message ${result.message.value} on partition ${result.partition}`)
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