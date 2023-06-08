from kafka import KafkaProducer, KafkaConsumer
import json
from bson import json_util
import random


class StreamsConsumer():
    def __init__(self, bootstrap_servers, topic_name):
        self.bootstrap_servers = bootstrap_servers
        self.topic_name = topic_name
        self.consumer = KafkaConsumer(self.topic_name, bootstrap_servers=self.bootstrap_servers)

    def shutdown(self):
        self.consumer.close()

    def receive_observations(self):
        print('consumer started')
        for message in self.consumer:
            print ('observed: ', message.value)

        # KAFKA STREAMS FOR PYTHON
        # https://streamsets.com/blog/kafka-stream-processing-in-python/


DB_NAME = 'ztp_projekt'
COLLECTION_NAME = 'classifications'
BOOTSTRAP_SERVERS = ['broker:29092']
TOPIC_NAME = 'ztp-projekt-topic'

consumer = StreamsConsumer(BOOTSTRAP_SERVERS, TOPIC_NAME)
consumer.receive_observations()