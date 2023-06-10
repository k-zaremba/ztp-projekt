from kafka import KafkaConsumer
import requests
import ast

# KAFKA STREAMS FOR PYTHON
# https://streamsets.com/blog/kafka-stream-processing-in-python/


API_URL = 'http://api-controller:8000/classifications'

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

            byte_str = message.value
            dict_str = byte_str.decode("UTF-8")
            data = ast.literal_eval(dict_str)
            body = {'data': data['observation']}
            headers = {"Content-Type": "application/json"}

            res = requests.post(API_URL, json = body, headers = headers)
            print(res)

if __name__ == '__main__':
    BOOTSTRAP_SERVERS = ['broker:29092']
    TOPIC_NAME = 'ztp-projekt-topic'

    consumer = StreamsConsumer(BOOTSTRAP_SERVERS, TOPIC_NAME)
    consumer.receive_observations()
