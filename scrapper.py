import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

YEARS = list(range(2024, 2022, -1))  # 2024, 2023
MATCHES = []

for year in YEARS:
    current_season = str(year-1) + str(year)
    URL = f"https://www.nhl.com/stats/teams?aggregate=0&reportType=game&seasonFrom={current_season}&seasonTo={current_season}&dateFromSeason&gameType=2&sort=gameDate&page=0&pageSize=50"

    # Set Chrome options to run in headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # To hide the browser window from popping up
    chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration

    # Use Selenium to fetch the page with dynamic content
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(URL)

    # Wait for a few seconds for dynamic content to load
    time.sleep(5)  # Adjust the sleep time as needed

    while True:
        # Now use BeautifulSoup to parse the page content
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # Find the header and body elements
        header_div = soup.select_one('.table-header-container')
        body_div = soup.select_one('.rt-tbody')

        if body_div and header_div:
            # Extract column names
            headers = [header.text.strip() for header in header_div.find_all('div', {'class': 'rt-th'})]

            # Find all rows
            rows = body_div.find_all('div', {'class': 'rt-tr-group'})

            # Initialize a list to hold the data
            data = []

            # Extract data from each row
            for row in rows:
                # Find all columns within the row
                cols = row.find_all('div', {'class': 'rt-td'})
                cols = [col.text.strip() for col in cols]
                data.append(cols)

            # Convert the data into a DataFrame and set the column names
            df = pd.DataFrame(data, columns=headers)

            # Add 'Season' column
            df['Season'] = str(year-1) + "-" + str(year)

            # Split the 'Game' column into 'Date' and 'Opponent'
            df['Date'] = df['Game'].str[:10]
            df['Opponent'] = df['Game'].str[-3:]

            # Drop the original 'Game' column
            df.drop(columns=['Game'], inplace=True)

            # Update MATCHES
            MATCHES.append(df)

            # Print the DataFrame (optional)
            # print(df)
        else:
            print("Target div or header div not found or not loaded.")
            break

        # Check for the "Next" button and click it if available
        try:
            next_button = driver.find_element(By.CSS_SELECTOR, 'button.next-button:not([disabled])')
            driver.execute_script("arguments[0].scrollIntoView(true);", next_button)
            time.sleep(1)  # Wait for scrolling to complete
            next_button.click()
            time.sleep(2)  # Adjust the sleep time as needed
        except Exception as e:
            break

    # Clean up
    driver.quit()

# Combine all the collected data
MATCHES_DF = pd.concat(MATCHES)
print(MATCHES_DF)

# Save the DataFrame to a CSV file
MATCHES_DF.to_csv('nhl_matches.csv', index=False)