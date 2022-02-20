import { Kafka } from "kafkajs";

const msg = process.argv[2];

const run = async () => {
    try
    {
         const kafka = new Kafka({
              clientId: "myapp",
              brokers :["localhost:29092", "localhost:39092"],
         });

        const producer = kafka.producer();
        console.log("Connecting.....");
        await producer.connect();
        console.log("Connected!");

        const partition = msg[0];

        const result =  await producer.send({
            topic: "Users",
            messages: [
                {
                    value: msg,
                    partition: partition
                }
            ],
            partitionMetadata: [
                { partitionId: 1, leader: 0 }
            ]
        });

        console.log(`Send done : ${JSON.stringify(result)}`);
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