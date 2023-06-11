### HOW TO USE

* run kafka services using `docker compose -f docker-compose-kafka.yml up`
* run mongodb FastApi, producer and consumer using `docker compose up`

* GET localhost:8000/evals to list all recorded evaluations
* POST localhost:8000/evaluate to build and evaluate the model manually (evaluation is done automatically every 15 minutes)

* producer serves one observation every 5 seconds and consumer orders API to process the observation
* GET localhost:8000/classifications to list all classifications
* POST localhost:8000/classifications with BODY as `[[variance, skewness, curtosis, entropy]]` to classify observation manually

#### whats missing
* ~~front~~
* ~~model building scheduler~~
* ~~close everything in docker~~
* ~~add persistent storage~~
* ~~consumer post on API~~
* ~~display classifications on the website~~

From project description
* ~~stream data~~
* ~~website~~
* ~~everything as docker containers~~
* ~~project PDF report~~

##### important commands
* https://developer.confluent.io/quickstart/kafka-docker/