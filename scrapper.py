import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

URL = "https://www.nhl.com/stats/teams?aggregate=0&reportType=game&seasonFrom=20232024&seasonTo=20232024&dateFromSeason&gameType=2&sort=points,wins&page=0&pageSize=50"

# Set Chrome options to run in headless mode
chrome_options = Options()
chrome_options.add_argument("--headless")  # To hide the browser window from popping up
chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration

# Use Selenium to fetch the page with dynamic content
driver = webdriver.Chrome(options=chrome_options)
driver.get(URL)

# Wait for a few seconds for dynamic content to load
time.sleep(5)  # Adjust the sleep time as needed

# Now use BeautifulSoup to parse the page content
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Find your element
target_div = soup.select_one('.rt-table')

# Clean up
driver.quit()

if target_div:
    print(target_div)
    
    
else:
    print("Target div not found or not loaded.")
