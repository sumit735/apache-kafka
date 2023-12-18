const { kafka } = require("./client");


async function init() {
    const admin = kafka.admin();
    console.log("admin connection");
    await admin.connect();
    console.log("admin connected");

    console.log("creating topic")
    await admin.createTopics({
        topics: [{
            topic: 'rider_updates',
            numPartitions: 2
        }]
    });
    console.log("topic created");
    // console.log("listing topics");
    // const topics = await admin.fetchTopicMetadata();
    // console.log(topics);
    console.log("disconnecting admin");
    await admin.disconnect();
}

init();