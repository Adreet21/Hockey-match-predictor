import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv('/Users/syedshahmeerrahman/Desktop/GitHub/Projects/Hockey-match-predictor/nhl_matches.csv')
data.head()

data.shape

data["Team"].value_counts() #counting values of team

data.dtypes
data["Date"] = pd.to_datetime(data["Date"]) #converting to date  
data["PP%"] = ((data["PP%"].replace('--', np.nan))).astype("float") #conveting the object values in float
data["Net PP%"] = (data["Net PP%"].replace('--', np.nan)).astype("float")
data["Net PK%"] = (data["Net PK%"].replace('--', np.nan)).astype("float")
data["PK%"] = (data["PK%"].replace('--', np.nan)).astype("float")

del data["T"]

#encoding the values of opponent teams and day of week
data["opponent_code"] = data["Opponent"].astype("category").cat.codes
data["day_code"] = data["Date"].dt.dayofweek

#random forest initializer
random_for = RandomForestClassifier(n_estimators = 50, min_samples_split = 10, random_state = 1)

train = data[data["Date"] < '2024-01-01'] #training data before 2024 season
test = data[data["Date"] > '2024-01-01']  #testing data for 2024 season

predictors = ["opponent_code","day_code","GF/GP","GA/GP","Net PP%","Net PK%","SA/GP","FOW%","ROW","RW"] #predictors
