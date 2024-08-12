from flask import Flask, jsonify
from flask_cors import CORS
import game_schedule_scrapper
import scrapper
import model


## WORK IN PROGRESS ##



app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route('/game-schedule', methods=['GET'])
def game_schedule():
    SCHEDULE = game_schedule_scrapper.fetch_game_schedule()
    return jsonify(SCHEDULE)

@app.route('/ml-results', methods=['GET'])
def get_predictions():
    # logic for another script
    data = {
        "message": "Data generated by script2"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
