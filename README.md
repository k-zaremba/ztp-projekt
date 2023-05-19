### HOW TO USE

* run mongodb service and FastApi using `docker compose up`
* GET localhost:8000/evals to list all recorded evaluations
* POST localhost:8000/evaluate to build and evaluate the model manually (evaluation is done automatically every 30 seconds)

#### whats missing
* front 
* ~~model building scheduler~~
* ~~close everything in docker~~
* add persistent storage
