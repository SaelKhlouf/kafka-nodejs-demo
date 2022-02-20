module.exports = {
    config: {
        kafka: {
            TOPIC: 'patients-info',
            BROKERS: ["localhost:29092", "localhost:39092"],
            CONSUMER_GROUP_ID: 'patients-group',
            CLIENT_ID: 'myapp',
            NUMBER_OF_PARTITIONS: 2,
            REPLICATION_FACTOR: 2
        }
    }
};