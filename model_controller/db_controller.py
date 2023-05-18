from pymongo import MongoClient

class DBController():    
    def __init__(self, db_name, collection_name) -> None:
        self.DB_NAME = db_name
        self.COLLECTION_NAME = collection_name
        self.collection = self.connect()

    def get_database(self):
        client = MongoClient('mongodb', port=27017)
        db = client[self.DB_NAME]
        return db
    
    def connect(self):
        db = self.get_database()
        return db[self.COLLECTION_NAME]
    
    def insert_one(self, entry):
        self.collection.insert_one(entry)

    def get_all(self):
        evals = list(self.collection.find())
        return list(map(lambda e: self.remap(e), evals))  # makes sure the FastAPI can return the ObjectId type
    
    def remap(self, eval):
        e = eval
        e['_id'] = str(e['_id'])
        return e

    def __str__(self) -> str:
        return f'db_name={self.DB_NAME}, collection_name={self.COLLECTION_NAME}, col_connection={self.collection}'
