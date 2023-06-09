import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler 
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, log_loss, roc_auc_score, mean_absolute_error, mean_squared_error
import time

class ModelController():
    def classify(self, observation):
        print(observation)
        o_class = self.model.predict(observation)
        o_prob = self.model.predict_proba(observation)
        
        classification = {
            'class' : int(o_class[0]),
            'probability' : float(o_prob[0][o_class][0]),
        }
        return classification

    def build_and_evaluate(self):
        timestamp = time.time()

        colnames=['variance', 'skewness', 'curtosis', 'entropy', 'class'] 
        df = pd.read_csv('./data_banknote_authentication.txt', sep=',', names=colnames, header=None)

        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values 

        # Split dataset into random train and test subsets:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20) 

        # Standardize features by removing mean and scaling to unit variance:
        scaler = StandardScaler()
        scaler.fit(X_train)

        X_train = scaler.transform(X_train)
        X_test = scaler.transform(X_test) 

        classifier = LogisticRegression()

        classifier.fit(X_train, y_train) 

        # Predict y data with classifier: 
        y_predict = classifier.predict(X_test)

        # Print results: 
        loss = log_loss(y_test, y_predict, eps=1e-15)
        accuracy = accuracy_score(y_test, y_predict)
        auc = roc_auc_score(y_test, y_predict)
        mae = mean_absolute_error(y_test, y_predict)
        rmse = mean_squared_error(y_test, y_predict, squared=False)
        
        # Save model
        self.model = classifier

        eval = {
            'loss' : loss,
            'accuracy' : accuracy,
            'auc' : auc,
            'mae' : mae,
            'rmse' : rmse,
            'timestamp': timestamp
        }
        return eval
          