echo "running zookeeper in docker"
echo "----------------------"

docker run -d -p 2181:2181 zookeeper

echo "running kafka in docker"
echo "--------------------"

docker run -d -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=192.168.1.37:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.1.37:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka