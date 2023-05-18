from fastapi import FastAPI
from model_controller import ModelController
from db_controller import DBController


DB_NAME = 'ztp_projekt'
COLLECTION_NAME = 'evals'

model_controller = ModelController()
db_controller = DBController(DB_NAME, COLLECTION_NAME)

app = FastAPI()
    
@app.get("/evals")
def root ():
  return db_controller.get_all()

@app.post("/evaluate", status_code=202)
def build_model():
   eval = model_controller.build_and_evaluate()
   db_controller.insert_one(eval)

if __name__ == "__main__":
   # TESTING ZONE 
   item = db_controller.get_all()
   print(item)
