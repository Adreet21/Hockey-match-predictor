import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Edit the path to your file manually
data = pd.read_csv('nhl_matches.csv')
data.head()

#counting values of team
data["Team"].value_counts()

# Converting the data types
data["Date"] = pd.to_datetime(data["Date"]) #converting to date  
data["PP%"] = ((data["PP%"].replace('--', np.nan))).astype("float") #conveting the object values in float
data["Net PP%"] = (data["Net PP%"].replace('--', np.nan)).astype("float")
data["Net PK%"] = (data["Net PK%"].replace('--', np.nan)).astype("float")
data["PK%"] = (data["PK%"].replace('--', np.nan)).astype("float")

#encoding the values of opponent teams and day of week

data["opponent_code"] = data["Opponent"].astype("category").cat.codes
data["day_code"] = data["Date"].dt.dayofweek

#random forest initializer
random_forest = RandomForestClassifier(n_estimators = 60, min_samples_split = 10, random_state = 1)

train = data[data["Date"] < '2024-01-01'] #training data before 2024 season
test = data[data["Date"] >= '2024-01-01']  #testing data for 2024 season

predictors = ["opponent_code","day_code","GF/GP","GA/GP","Net PP%","Net PK%","SA/GP","FOW%","ROW","RW"] #predictors

#Training the model
random_forest.fit(train[predictors], train["W"])
predictions = random_forest.predict(test[predictors])

#Testing the model
accuracy = accuracy_score(test["W"], predictions)
print(f'Accuracy = {round(accuracy * 100, 2)}%')

# Table for accurcy scores
combined = pd.DataFrame(dict(actual = test["W"], predicted = predictions))
print(pd.crosstab(index = combined["actual"], columns = combined["predicted"]))