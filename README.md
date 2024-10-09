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

## Features

•⁠  ⁠**Historical Data Analysis:** The model uses past game results, team statistics, and other relevant data to train the predictive algorithm.<br/>
•⁠  ⁠**Prediction Accuracy:** Our model achieves an accuracy of 71.23% on test data.<br/>
•⁠  ⁠**Visualization:** The project includes various visualizations to help interpret the data and the model's predictions.<br/>
•  **User-Friendly Website:** A responsive website with a highly elegant and easy-to-follow UI, optimized for an excellent user experience, that displays upcoming matches and their predicted outcomes.<br/>

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
&emsp;•⁠  ⁠**Accuracy:** 71.23%<br/>
&emsp;•⁠  ⁠**Precision:** 64.47%<br/>
&emsp;•⁠  ⁠**Recall:** 69.03%<br/>
&emsp;•⁠  ⁠**AUC-ROC:** 73.89%<br/>

## Installation

To run this project locally, follow these steps:<br/>

### 1. Clone/Download the Repository

### 2. Navigate to the client directory:
`$ cd Hockey-match-predictor/client`

### 3. Install Dependencies:
`$ npm install`

### 4. Then, navigate to the server directory:
`$ cd ../server`

### 5. Run the python backend script
`$ python3 app.py`

### 6. Start frontend
In a separate terminal execute:
`$ npm run dev`

## Demo video on YouTube

https://github.com/user-attachments/assets/ecdea418-d7bc-4157-91d2-310e0ecb19fc

[https://youtu.be/cPGDbJZeprY
](https://www.youtube.com/watch?v=Kxj6o96q-5c)
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
