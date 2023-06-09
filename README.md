### HOW TO USE

* run kafka services using `docker compose -f docker-compose-kafka.yml up`
* run mongodb service and FastApi using `docker compose up`

* GET localhost:8000/evals to list all recorded evaluations
* POST localhost:8000/evaluate to build and evaluate the model manually (evaluation is done automatically every 30 seconds)

* producer serves one observation every 10 seconds and consumer orders API to process the observation
* GET localhost:8000/classifications to list all classifications
* POST localhost:8000/classifications with BODY as `list[list[float]]` to classify observation manually

#### whats missing
* ~~front~~
* ~~model building scheduler~~
* ~~close everything in docker~~
* ~~add persistent storage~~
* ~~producer post on API~~
* display classifications on the website

##### important commands
* https://developer.confluent.io/quickstart/kafka-docker/