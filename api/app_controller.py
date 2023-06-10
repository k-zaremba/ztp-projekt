from fastapi import FastAPI
from model_controller import ModelController
from db_controller import DBController
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# CONFIGS
DB_NAME = 'ztp_projekt'
COLLECTION_NAME_EVALS = 'evals'
COLLECTION_NAME_CLASSIFICATIONS = 'classifications'
BOOTSTRAP_SERVERS = ['broker:29092']
TOPIC_NAME = 'ztp-projekt-topic'

# INIT
db_controller_evals = DBController(DB_NAME, COLLECTION_NAME_EVALS)
db_controller_classifications = DBController(DB_NAME, COLLECTION_NAME_CLASSIFICATIONS)
model_controller = ModelController()

app = FastAPI()

origins = ["*"]


class Observation(BaseModel):
    data : list[list[float]]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/evals")
def root ():
    return db_controller_evals.get_all()

@app.post("/evaluate", status_code=202)
def build_model():
   eval = model_controller.build_and_evaluate()
   db_controller_evals.insert_one(eval)

@app.on_event('startup')
def init_data():
    build_model()
    scheduler = BackgroundScheduler() # https://apscheduler.readthedocs.io/en/3.x/modules/triggers/cron.html
    scheduler.add_job(build_model, 'cron', minute='*/1')
    scheduler.start()

@app.post("/classifications", status_code=202)
def add_classification(observation: Observation):
    classification = model_controller.classify(observation.data)
    print(classification)
    db_controller_classifications.insert_one(classification)

@app.get("/classifications")
def get_classifications ():
    return db_controller_classifications.get_all()

if __name__ == "__main__":
    # TESTING ZONE
    # item = db_controller_evals.get_all()
    pass