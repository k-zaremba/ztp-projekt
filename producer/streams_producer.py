from kafka import KafkaProducer
import time
import json
from bson import json_util
import random


class StreamsProducer():
    def __init__(self, bootstrap_servers, topic_name):
        self.bootstrap_servers = bootstrap_servers
        self.topic_name = topic_name
        self.producer = KafkaProducer(bootstrap_servers=self.bootstrap_servers)

    def generateData(self):
        variance = random.uniform(-7.042100, 6.824800)
        skewness = random.uniform(-13.773100, 12.951600)
        curtosis = random.uniform(-5.286100, 17.927400)
        entropy = random.uniform(-8.548200, 2.449500)

        return [[variance, skewness, curtosis, entropy]]

    def send_observation(self):
        observation = self.generateData()
        data = { 
        'observation': observation,
        }   
        self.producer.send(self.topic_name, json.dumps(data, default=json_util.default).encode('utf-8'))
        print(f"Observation sent: {observation}")

    def shutdown(self):
        self.producer.close()
        
if __name__ == '__main__':
    BOOTSTRAP_SERVERS = ['broker:29092']
    TOPIC_NAME = 'ztp-projekt-topic'

    producer = StreamsProducer(BOOTSTRAP_SERVERS, TOPIC_NAME)

    while 1:
        producer.send_observation()
        time.sleep(5)
    producer.shutdown()
