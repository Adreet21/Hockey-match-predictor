<p align="center">
  <img src="https://github.com/user-attachments/assets/cfee96ae-91cf-416b-9edd-b33a148f36e2" alt="Webpage demo" width="600">
</p>

# Hockey match predictor<br>
We made an NHL match predictor. It takes in the data of the last 2 years of all the hockey matches and learns from it to predict the outcome of upcoming matches.
It uses web scraping to gather all the data about the matches already played and the upcoming match schedules.
Then an ML model is used to predict the upcoming matches with high accuracy.


## Why we needed Web Scraping?<br>
To gather all the previous match data we scrapped the Official NHL website to gather all the necessary data and make a CSV file.<br>
Additionally, we used web scraping again to get the upcoming match schedule 

## What did we do with the ML model?
We trained the model using the previous match data (2022, 2023) from a CSV file that we made by scraping the Official NHL website. We then used the trained model to predict the upcoming matches in 2024. The model works with high accuracy as we used excellent predictors to train and test the model.


## How did we implement it?<br>
I used each block in the blockchain to keep the transaction data.
Each block in the blockchain contains one transaction.

I used the SHA-256 algorithm to a string to create hash values for the blocks,<br> 
apply the ECDSA Signature and verify a string signature to ensure the data was not tampered with.<br>

                                                                  
## Installation

Make a clone of all the files in the repository.<br>

You need to have Java and JDK installed.

You have to add the JAR files in the "libs" file in your java library.<br>
OR<br>
If you are using vscode you can drag and drop the libs file in the reference folder under the java project section.

After it is done next you will have to run the BlockChain.java and wait for the output in the terminal.

## Output

After successfully running the code, in the terminal, there should be a prompt asking how much money you want to transfer to wallet B.<br>
You can send up to 1000 coins. with Multiple transactions. After you finish all your money the program will end and it will say if the block that you used was valid(Not tampered with).<br>



## Not functioning?
If you run into difficulties or errors in the code please feel free to reach out.<br>
Email: contact@shahmeer.xyz
