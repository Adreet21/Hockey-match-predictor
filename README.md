<p align="center">
  <img src="https://github.com/user-attachments/assets/cfee96ae-91cf-416b-9edd-b33a148f36e2" alt="Webpage demo" width="600">
</p>

## Project Overview

This project is a machine learning-based application designed to predict the outcomes of upcoming hockey games. Using historical data, gathered through web scraping, and advanced statistical models, our algorithm forecasts the likelihood of a team's victory in a future match. The project was developed as part of a collaborative effort with a focus on applying machine learning techniques to real-world sports data.

## Table of Contents

•⁠  ⁠[Project Overview](#project-overview)
•⁠  ⁠[Features](#features)
•⁠  ⁠[Data Collection](#data-collection)
•⁠  ⁠[Modeling](#modeling)
•⁠  ⁠[Results](#results)
•⁠  ⁠[Installation](#installation)
•⁠  ⁠[Usage](#usage)
•⁠  ⁠[Contributors](#contributors)
•⁠  ⁠[License](#license)
•⁠  ⁠[Not functioning?](#not-functioning)

## Features

•⁠  ⁠**Historical Data Analysis:** The model uses past game results, team statistics, and other relevant data to train the predictive algorithm.
•⁠  ⁠**Prediction Accuracy:** Our model achieves an accuracy of XX% on test data.
•  **User-Friendly Website:** A website with a highly elegant and easy-to-follow UI, optimized for an excellent user experience, that displays upcoming matches and their predicted outcomes.

## Data Collection

The data used in this project was collected from the NHL's official website through web scraping:
•⁠  **Historical Match Data:** We scraped the NHL official website to gather all previous match results, scores, and team performance data. This information was then compiled into a CSV file for analysis.
•⁠  **Upcoming Match Schedule:** We also used web scraping to retrieve the upcoming match schedule, which is essential for our machine learning model to generate predictions.

## Modeling

We employed the following machine learning techniques:
•⁠  ⁠**Data Preprocessing:** Handling missing values, feature scaling, and encoding categorical variables.
•⁠  ⁠**Model Training:** Trained the model using the Random Forest Classifier from scikit-learn, utilizing the historical match data collected by scraping the NHL's official website.
•  **Prediction:** Used the trained model to predict outcomes for upcoming matches based on the latest schedule data.
•⁠  ⁠**Evaluation:** The model was evaluated using metrics such as accuracy, precision, recall, and AUC-ROC.

## Results

The final model was trained on 2 seasons of hockey data and tested using the K-fold cross-validation technique. The model achieved:
•⁠  ⁠**Accuracy:** XX%
•⁠  ⁠**Precision:** XX%
•⁠  ⁠**Recall:** XX%
•⁠  ⁠**AUC-ROC:** XX%

## Installation

To run this project locally, follow these steps:

1.⁠ ⁠Clone the repository:
   ⁠ bash
   git clone https://github.com/username/hockey-game-predictor.git
    ⁠
2.⁠ ⁠Navigate to the project directory:
   ⁠ bash
   cd hockey-game-predictor
    ⁠
3.⁠ ⁠Install the required dependencies:
   ⁠ bash
   pip install -r requirements.txt
    ⁠

## Usage

1.⁠ ⁠Prepare the dataset:
   - Place the historical game data in the ⁠ data/ ⁠ directory.
   - Ensure the data is in the correct format as specified in the ⁠ data_preprocessing.py ⁠ file.

2.⁠ ⁠Train the model:
   ⁠ bash
   python train_model.py
    ⁠

3.⁠ ⁠Predict outcomes for upcoming games:
   ⁠ bash
   python predict.py --input upcoming_games.csv
    ⁠

4.⁠ ⁠View results:
   - Predictions will be saved in the ⁠ predictions/ ⁠ directory.
   - Use the ⁠ visualize_results.py ⁠ script to generate visualizations.

## Contributors

•⁠  ⁠**Maher Nurul Huda**
   •⁠  Developed the React website that showcases our project.
   •⁠  Wrote the Python web scraping code using Selenium to gather both upcoming game schedules and all historical hockey game data and stats.
   •⁠  Integrated the backend and frontend code, handling all GET and POST requests for smooth data flow between the model and the user interface.
•⁠  ⁠**Syed Shahmeer Rahman**
   •⁠  Preprocessed the collected data, handling missing values, feature scaling, and data transformations.
   •⁠  Structured the data for machine learning input.
   •⁠  Optimized the data pipeline to ensure efficient processing and integration with the machine learning model.
•⁠  ⁠**Sadman Sami**
   •⁠  Implemented the Random Forest Classifier to train the model using the preprocessed data.
   •⁠  Developed the prediction logic for forecasting game outcomes.
   •⁠  Tested the trained model using the K-fold cross-validation technique, evaluating accuracy, precision, recall, and AUC-ROC metrics.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Not functioning?

If you run into difficulties or errors in the code please feel free to reach out.<br>
Email: contact@shahmeer.xyz
