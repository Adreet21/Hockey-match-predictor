import pandas as pd
import numpy as np
import json
from sklearn.ensemble import RandomForestClassifier
import game_schedule_scrapper
import time




#﹀﹀﹀ TEMPORARY PREDICTOR ﹀﹀﹀#
def predict_winner(away_team, home_team, date):
    time.sleep(5)
    return home_team
#︿︿︿ TEMPORARY PREDICTOR ︿︿︿#


def predict_results():
    # Load the historical data
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

    # Fetch upcoming matches for the next 7 days
    upcoming_matches = game_schedule_scrapper.fetch_game_schedule()
    
    # Check the structure of upcoming_matches
    print("Structure of upcoming_matches:", upcoming_matches)
    
    # Ensure upcoming_matches is a list of dictionaries
    if not isinstance(upcoming_matches, list) or not all(isinstance(game, dict) for game in upcoming_matches):
        raise ValueError("upcoming_matches should be a list of dictionaries.")

    # Filter matches to include only the next 7 days
    today = pd.Timestamp.today()
    upcoming_matches = [game for game in upcoming_matches if pd.to_datetime(game["date"]) <= today + pd.Timedelta(days=7)]

    

    # Predict outcomes for upcoming matches
    predictions = []
    for game in upcoming_matches:
        
        home_team_avg = team_averages[team_averages["Team"] == game["home_team"]].iloc[0]
        away_team_avg = team_averages[team_averages["Team"] == game["away_team"]].iloc[0]
    
        game_data = {
            "opponent_code": data[data["Team"] == game["away_team"]]["opponent_code"].iloc[0],
            "day_code": pd.to_datetime(game["date"]).dayofweek,
            "GF/GP": (away_team_avg["GF/GP"] + home_team_avg["GF/GP"]) / 2,
            "GA/GP": (away_team_avg["GA/GP"] + home_team_avg["GA/GP"]) / 2,
            "Net PP%": (away_team_avg["Net PP%"] + home_team_avg["Net PP%"]) / 2,
            "Net PK%": (away_team_avg["Net PK%"] + home_team_avg["Net PK%"]) / 2,
            "SA/GP": (away_team_avg["SA/GP"] + home_team_avg["SA/GP"]) / 2,
            "FOW%": (away_team_avg["FOW%"] + home_team_avg["FOW%"]) / 2,
            "ROW": (away_team_avg["ROW"] + home_team_avg["ROW"]) / 2,
            "RW": (away_team_avg["RW"] + home_team_avg["RW"]) / 2
        }
        prediction = random_forest.predict(pd.DataFrame([game_data]))
        predictions.append({
            "date": game["date"],
            "time": game["time"],
            "home_team": game["home_team"],
            "away_team": game["away_team"],
            "predicted_winner": game["home_team"] if prediction == 1 else game["away_team"]
        })

        # print(game_data)
        # Output predictions to a JSON file
    with open('predictions.json', 'w') as json_file:
        json.dump(predictions, json_file, indent=4)
