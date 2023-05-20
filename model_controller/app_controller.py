from fastapi import FastAPI
from model_controller import ModelController
from db_controller import DBController
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi.middleware.cors import CORSMiddleware


DB_NAME = 'ztp_projekt'
COLLECTION_NAME = 'evals'

db_controller = DBController(DB_NAME, COLLECTION_NAME)
model_controller = ModelController()

app = FastAPI()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/evals")
def root ():
    return db_controller.get_all()

@app.post("/evaluate", status_code=202)
def build_model():
   eval = model_controller.build_and_evaluate()
   db_controller.insert_one(eval)

@app.on_event('startup')
def init_data():
    scheduler = BackgroundScheduler()
    # https://apscheduler.readthedocs.io/en/3.x/modules/triggers/cron.html
    scheduler.add_job(build_model, 'cron',minute='*', second='*/30')
    scheduler.start()

if __name__ == "__main__":
   # TESTING ZONE
   item = db_controller.get_all()
   print(item)
