from bs4 import BeautifulSoup
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def fetch_game_schedule():
    
    SCHEDULE = []
    URL = "https://www.espn.com/nhl/schedule"
    NHL_TEAMS = {
    "Boston": "https://assets.nhle.com/logos/nhl/svg/BOS_dark.svg",
    "Buffalo": "https://assets.nhle.com/logos/nhl/svg/BUF_dark.svg",
    "Detroit": "https://assets.nhle.com/logos/nhl/svg/DET_dark.svg",
    "Florida": "https://assets.nhle.com/logos/nhl/svg/FLA_dark.svg",
    "Montreal": "https://assets.nhle.com/logos/nhl/svg/MTL_dark.svg",
    "Ottawa": "https://assets.nhle.com/logos/nhl/svg/OTT_dark.svg",
    "Tampa Bay": "https://assets.nhle.com/logos/nhl/svg/TBL_dark.svg",
    "Toronto": "https://assets.nhle.com/logos/nhl/svg/TOR_dark.svg",
    "Carolina": "https://assets.nhle.com/logos/nhl/svg/CAR_dark.svg",
    "Columbus": "https://assets.nhle.com/logos/nhl/svg/CBJ_dark.svg",
    "New Jersey": "https://assets.nhle.com/logos/nhl/svg/NJD_dark.svg",
    "New York Islanders": "https://assets.nhle.com/logos/nhl/svg/NYI_dark.svg",
    "New York Rangers": "https://assets.nhle.com/logos/nhl/svg/NYR_dark.svg",
    "Philadelphia": "https://assets.nhle.com/logos/nhl/svg/PHI_dark.svg",
    "Pittsburgh": "https://assets.nhle.com/logos/nhl/svg/PIT_dark.svg",
    "Washington": "https://assets.nhle.com/logos/nhl/svg/WSH_dark.svg",
    "Arizona": "https://assets.nhle.com/logos/nhl/svg/ARI_dark.svg",
    "Chicago": "https://assets.nhle.com/logos/nhl/svg/CHI_dark.svg",
    "Colorado": "https://assets.nhle.com/logos/nhl/svg/COL_dark.svg",
    "Dallas": "https://assets.nhle.com/logos/nhl/svg/DAL_dark.svg",
    "Minnesota": "https://assets.nhle.com/logos/nhl/svg/MIN_dark.svg",
    "Nashville": "https://assets.nhle.com/logos/nhl/svg/NSH_dark.svg",
    "St. Louis": "https://assets.nhle.com/logos/nhl/svg/STL_dark.svg",
    "Winnipeg": "https://assets.nhle.com/logos/nhl/svg/WPG_dark.svg",
    "Anaheim": "https://assets.nhle.com/logos/nhl/svg/ANA_dark.svg",
    "Calgary": "https://assets.nhle.com/logos/nhl/svg/CGY_dark.svg",
    "Edmonton": "https://assets.nhle.com/logos/nhl/svg/EDM_dark.svg",
    "Los Angeles": "https://assets.nhle.com/logos/nhl/svg/LAK_dark.svg",
    "San Jose": "https://assets.nhle.com/logos/nhl/svg/SJS_dark.svg",
    "Seattle": "https://assets.nhle.com/logos/nhl/svg/SEA_dark.svg",
    "Vancouver": "https://assets.nhle.com/logos/nhl/svg/VAN_dark.svg",
    "Vegas": "https://assets.nhle.com/logos/nhl/svg/VGK_dark.svg",
    "Utah": "https://assets.nhle.com/logos/nhl/svg/UTA_dark.svg",
    }

    # Set Chrome options to run in headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # To hide the browser window from popping up
    chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
    # chrome_options.add_argument("--no-sandbox")  # Required for running on some systems
    # chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems
    # chrome_options.add_argument("--remote-debugging-port=9222")  # Debugging port

    # Use Selenium to fetch the page with dynamic content
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(URL)

    # Wait for a few seconds for dynamic content to load
    time.sleep(1)  # Adjust the sleep time as needed

    # Now use BeautifulSoup to parse the page content
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Find the upcoming games sorted by the game date
    upcoming_games_divs = soup.find_all('div', class_='ResponsiveTable')
    if upcoming_games_divs:
        for upcoming_games_div in upcoming_games_divs:
            # Find and extract the game date
            game_date = upcoming_games_div.find('div', class_='Table__Title')
            if game_date:
                game_date = game_date.text.strip()
                if game_date[-12:] == ' - Preseason':
                    game_date = game_date[:-12]
                
                # Find and extract the games scheduled on that date
                games = upcoming_games_div.find_all('tr', class_='Table__TR')  # class="Table__TR Table__TR--sm Table__even" 
                if games:
                    for game in games:
                        # Find and extract all game details
                        game_details_uncensored = game.find_all('a', class_='AnchorLink')
                        if game_details_uncensored:
                            for i in range (len(game_details_uncensored)):
                                if i == 0:
                                    img_tag = game_details_uncensored[i].find('img')
                                    if img_tag and 'src' in img_tag.attrs:
                                        away_team_logo = img_tag['src']
                                elif i == 1:
                                    away_team = game_details_uncensored[i].text.strip()
                                elif i == 2:
                                    img_tag = game_details_uncensored[i].find('img')
                                    if img_tag and 'src' in img_tag.attrs:
                                        home_team_logo = img_tag['src']
                                elif i == 3:
                                    home_team = game_details_uncensored[i].text.strip()
                                elif i == 4:
                                    game_time = game_details_uncensored[i].text.strip()
                            
                            # Now add all the game details to SCHEDULE
                            game_details = {
                                'date': game_date,
                                'time': game_time,
                                'away_team': away_team,
                                'home_team': home_team,
                                'away_team_logo': away_team_logo,
                                'home_team_logo': home_team_logo,
                                'away_logo': NHL_TEAMS.get(away_team),
                                'home_logo': NHL_TEAMS.get(home_team),
                                }
                            SCHEDULE.append(game_details)
                            
    # Convert the list to a nicely formatted JSON string
    SCHEDULE = json.dumps(SCHEDULE, indent=4)

    return SCHEDULE
