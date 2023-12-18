const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    const producer = kafka.producer();
    console.log('producer connection');
    await producer.connect();
    console.log('producer connected');

    rl.setPrompt("Enter rider id location: ");
    rl.prompt();

    rl.on('line', async (line) => {
        const [id, loc] = line.split(' ');
        console.log('sending message', id, loc);
        await producer.send({
            topic: 'rider_updates',
            messages: [
                { key: 'location_update', value: JSON.stringify({ id, loc }), partition: loc.toLowerCase() === 'ctc' ? 0 : 1 },
            ],
        });
        console.log('sent message');
        rl.prompt();
    }).on('close', async () => {
        console.log('disconnecting producer');
        producer.disconnect();
        process.exit(0);
    });

    // console.log('sending message');
    // await producer.send({
    //     partition: 0,
    //     topic: 'rider_updates',
    //     messages: [
    //         { key: 'location_update', value: JSON.stringify({id: 1, loc: 'ctc'}) },
    //     ],
    // });
    // console.log('sent message');

    // console.log('disconnecting producer');
    // await producer.disconnect();
}

init();