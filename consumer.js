const { kafka } = require('./client');
const group = process.argv[2] || 'test';

async function init() {
    const consumer = kafka.consumer({ groupId: group });
    console.log('consumer connection');
    await consumer.connect();
    console.log('consumer connected');

    await consumer.subscribe({ topics: ['rider_updates'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
        },
    });

    // await consumer.disconnect();
}

init();