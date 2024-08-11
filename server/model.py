import pandas as pd
import numpy as np
import json
from sklearn.ensemble import RandomForestClassifier
import game_schedule_scrapper

def predict_results():
    # Load the historical data
    data = pd.read_csv('/Users/syedshahmeerrahman/Desktop/GitHub/Projects/Hockey-match-predictor/server/nhl_matches.csv')
    
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
        game_data = {
            "opponent_code": data[data["Team"] == game["away_team"]]["opponent_code"].iloc[0],
            "day_code": pd.to_datetime(game["date"]).dayofweek,
            "GF/GP": np.nan,  # Placeholder, need to populate based on your data structure
            "GA/GP": np.nan,  # Placeholder, need to populate based on your data structure
            "Net PP%": np.nan,  # Placeholder, need to populate based on your data structure
            "Net PK%": np.nan,  # Placeholder, need to populate based on your data structure
            "SA/GP": np.nan,  # Placeholder, need to populate based on your data structure
            "FOW%": np.nan,  # Placeholder, need to populate based on your data structure
            "ROW": np.nan,  # Placeholder, need to populate based on your data structure
            "RW": np.nan,  # Placeholder, need to populate based on your data structure
        }
        prediction = random_forest.predict(pd.DataFrame([game_data]))
        predictions.append({
            "date": game["date"],
            "time": game["time"],
            "home_team": game["home_team"],
            "away_team": game["away_team"],
            "predicted_winner": game["home_team"] if prediction == 1 else game["away_team"]
        })

    # Output predictions to a JSON file
    with open('predictions.json', 'w') as json_file:
        json.dump(predictions, json_file, indent=4)

if __name__ == '__main__':
    predict_results()
