<p align="center">
  <img src="https://github.com/user-attachments/assets/cfee96ae-91cf-416b-9edd-b33a148f36e2" alt="Webpage demo" width="600">
</p>

## Project Overview

This project is a machine learning-based application designed to predict the outcomes of upcoming hockey games. Using historical data, gathered through web scraping, and advanced statistical models, our algorithm forecasts the likelihood of a team's victory in a future match. The project was developed as part of a collaborative effort with a focus on applying machine learning techniques to real-world sports data.

## Table of Contents

•⁠  ⁠[Project Overview](#project-overview)<br/>
•⁠  ⁠[Features](#features)<br/>
•⁠  ⁠[Data Collection](#data-collection)<br/>
•⁠  ⁠[Modeling](#modeling)<br/>
•⁠  ⁠[Results](#results)<br/>
•⁠  ⁠[Installation](#installation)<br/>
•⁠  ⁠[Usage](#usage)<br/>
•⁠  ⁠[Contributors](#contributors)<br/>
•⁠  ⁠[License](#license)<br/>
•⁠  ⁠[Not functioning?](#not-functioning)<br/>

## Features

•⁠  ⁠**Historical Data Analysis:** The model uses past game results, team statistics, and other relevant data to train the predictive algorithm.<br/>
•⁠  ⁠**Prediction Accuracy:** Our model achieves an accuracy of XX% on test data.<br/>
•⁠  ⁠**Visualization:** The project includes various visualizations to help interpret the data and the model's predictions.<br/>
•  **User-Friendly Website:** A website with a highly elegant and easy-to-follow UI, optimized for an excellent user experience, that displays upcoming matches and their predicted outcomes.<br/>

## Data Collection

The data used in this project was collected from the NHL's official website through web scraping:<br/>
&emsp;•⁠  **Historical Match Data:** We scraped the NHL official website to gather all previous match results, scores, and team performance data. This information was then compiled into a CSV file for analysis.<br/>
&emsp;•⁠  **Upcoming Match Schedule:** We also used web scraping to retrieve the upcoming match schedule, which is essential for our machine learning model to generate predictions.<br/>

## Modeling

We employed the following machine learning techniques:<br/>
&emsp;•⁠  ⁠**Data Preprocessing:** Handling missing values, feature scaling, and encoding categorical variables.<br/>
&emsp;•⁠  ⁠**Model Training:** Trained the model using the Random Forest Classifier from scikit-learn, utilizing the historical match data collected by scraping the NHL's official website.<br/>
&emsp;•  **Prediction:** Used the trained model to predict outcomes for upcoming matches based on the latest schedule data.<br/>
&emsp;•⁠  ⁠**Evaluation:** The model was evaluated using metrics such as accuracy, precision, recall, and AUC-ROC.<br/>

## Results

The final model was trained on 2 seasons of hockey data and tested using the K-fold cross-validation technique. The model achieved:<br/>
&emsp;•⁠  ⁠**Accuracy:** XX%<br/>
&emsp;•⁠  ⁠**Precision:** XX%<br/>
&emsp;•⁠  ⁠**Recall:** XX%<br/>
&emsp;•⁠  ⁠**AUC-ROC:** XX%<br/>

## Installation

To run this project locally, follow these steps:<br/>

1.⁠ ⁠Clone the repository:<br/>
   ⁠ bash<br/>
   git clone https://github.com/username/hockey-game-predictor.git<br/>
    ⁠
2.⁠ ⁠Navigate to the project directory:<br/>
   ⁠ bash<br/>
   cd hockey-game-predictor<br/>
    ⁠
3.⁠ ⁠Install the required dependencies:<br/>
   ⁠ bash<br/>
   pip install -r requirements.txt<br/>
    ⁠

## Usage

1.⁠ ⁠Prepare the dataset:<br/>
   - Place the historical game data in the ⁠ data/ ⁠ directory.<br/>
   - Ensure the data is in the correct format as specified in the ⁠ data_preprocessing.py ⁠ file.<br/>

2.⁠ ⁠Train the model:<br/>
   ⁠ bash<br/>
   python train_model.py<br/>
    ⁠

3.⁠ ⁠Predict outcomes for upcoming games:<br/>
   ⁠ bash<br/>
   python predict.py --input upcoming_games.csv<br/>
    ⁠

4.⁠ ⁠View results:<br/>
   - Predictions will be saved in the ⁠ predictions/ ⁠ directory.<br/>
   - Use the ⁠ visualize_results.py ⁠ script to generate visualizations.<br/>

## Contributors

•⁠  ⁠**Maher Nurul Huda**<br/>
&emsp;•⁠  Developed the React website that showcases our project.<br/>
&emsp;•⁠  Wrote the Python web scraping code using Selenium to gather both upcoming game schedules and all historical hockey game data and stats.<br/>
&emsp;•⁠  Integrated the backend and frontend code, handling all GET and POST requests for smooth data flow between the model and the user interface.<br/><br/>
•⁠  ⁠**Syed Shahmeer Rahman**<br/>
&emsp;•⁠  Preprocessed the collected data, handling missing values, feature scaling, and data transformations.<br/>
&emsp;•⁠  Optimized the data pipeline to ensure efficient processing and integration with the machine learning model.<br/>
&emsp;•⁠  Developed insightful visualizations, enabling comparative analysis of team performance trends.<br/><br/>
•⁠  ⁠**Sadman Sami**<br/>
&emsp;•⁠  Implemented the Random Forest Classifier to train the model using the preprocessed data.<br/>
&emsp;•⁠  Developed the prediction logic for forecasting game outcomes.<br/>
&emsp;•⁠  Tested the trained model using the K-fold cross-validation technique, evaluating accuracy, precision, recall, and AUC-ROC metrics.<br/>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.<br/>

## Not functioning?

If you run into difficulties or errors in the code please feel free to reach out.<br/>
Email: contact@shahmeer.xyz
