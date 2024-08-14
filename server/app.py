from flask import Flask, jsonify, request
from flask_cors import CORS
import game_schedule_scrapper
import model

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route('/game-schedule', methods=['GET'])
def game_schedule():
    SCHEDULE = game_schedule_scrapper.fetch_game_schedule()
    return jsonify(SCHEDULE)

@app.route('/game-prediction', methods=['POST'])
def get_predictions():
    # Get game data from the request
    game_data = request.json
    away_team = game_data.get('away_team')
    home_team = game_data.get('home_team')
    date = game_data.get('date')
    
    # Predict the winner
    winner = model.predict_winner(away_team, home_team, date)

    # Return the winner as the response to the POST request
    return jsonify({"winner": winner})

if __name__ == '__main__':
    app.run(debug=True, port=8080)