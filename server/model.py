import pandas as pd
import numpy as np
import json
from sklearn.ensemble import RandomForestClassifier
import game_schedule_scrapper

def predict_winner(away_team, home_team, date):
    
    data = pd.read_csv('nhl_matches.csv')
    
    # Preprocess the data
    data["Date"] = pd.to_datetime(data["Date"])  # Convert to datetime
    data["PP%"] = data["PP%"].replace('--', np.nan).astype("float")  # Convert to float
    data["Net PP%"] = data["Net PP%"].replace('--', np.nan).astype("float")
    data["Net PK%"] = data["Net PK%"].replace('--', np.nan).astype("float")
    data["PK%"] = data["PK%"].replace('--', np.nan).astype("float")

    # Encode categorical variables
    data["opponent_code"] = data["Opponent"].astype("category").cat.codes
    data["day_code"] = data["Date"].dt.dayofweek

    # Initialize Random Forest classifier
    random_forest = RandomForestClassifier(n_estimators=60, min_samples_split=10, random_state=1)

    # Train the model on the entire dataset
    predictors = ["opponent_code", "day_code", "GF/GP", "GA/GP", "Net PP%", "Net PK%", "SA/GP", "FOW%", "ROW", "RW"]
    random_forest.fit(data[predictors], data["W"])

    #getting the value of ungiven match predictors
    ungiven_predictors = ["GF/GP", "GA/GP", "Net PP%", "Net PK%", "SA/GP", "FOW%", "ROW", "RW"]
    team_averages = data.groupby('Team')[ungiven_predictors].mean().reset_index()

    #average data for each time
    home_team_avg = team_averages[team_averages["Team"] == home_team].iloc[0]
    away_team_avg = team_averages[team_averages["Team"] == away_team].iloc[0]

    #this list will contain the data about prediction
    predictions = []

    #this list will contain game_data
    game_data_list = []
    
    game_data = {
            "opponent_code": data[data["Team"] == away_team]["opponent_code"].iloc[0],
            "day_code": pd.to_datetime(date).dayofweek,
            "GF/GP": (away_team_avg["GF/GP"] + home_team_avg["GF/GP"]) / 2,
            "GA/GP": (away_team_avg["GA/GP"] + home_team_avg["GA/GP"]) / 2,
            "Net PP%": (away_team_avg["Net PP%"] + home_team_avg["Net PP%"]) / 2,
            "Net PK%": (away_team_avg["Net PK%"] + home_team_avg["Net PK%"]) / 2,
            "SA/GP": (away_team_avg["SA/GP"] + home_team_avg["SA/GP"]) / 2,
            "FOW%": (away_team_avg["FOW%"] + home_team_avg["FOW%"]) / 2,
            "ROW": (away_team_avg["ROW"] + home_team_avg["ROW"]) / 2,
            "RW": (away_team_avg["RW"] + home_team_avg["RW"]) / 2
        }
    game_data_list.append(game_data)
    game_data_df = pd.DataFrame(game_data_list)

    prediction = random_forest.predict(game_data_df)
    predicted_winner = home_team if prediction == 1 else away_team

    return predicted_winner
