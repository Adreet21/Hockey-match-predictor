import pandas as pd
import matplotlib.pyplot as plt
import os

# Load the data with the correct path
file_path = '/Users/syedshahmeerrahman/Desktop/GitHub/Projects/Hockey-match-predictor/server/nhl_matches.csv'
df = pd.read_csv(file_path)

# Ensure the 'Date' column is in datetime format
df['Date'] = pd.to_datetime(df['Date'])

# Sort by date to ensure cumulative calculation is correct
df = df.sort_values(by='Date')

# Create a directory to save the graphs in a writable location
output_dir = '/Users/syedshahmeerrahman/Desktop/GitHub/Projects/Hockey-match-predictor/client/public/graphs'
os.makedirs(output_dir, exist_ok=True)

# Initialize a dictionary to store cumulative points for each team
teams = {}

# Iterate through the dataframe and calculate cumulative points
for index, row in df.iterrows():
    season = row['Season']
    team = row['Team']
    points = row['P']

    # Update cumulative points for the team
    if team not in teams:
        teams[team] = {}
    if season not in teams[team]:
        teams[team][season] = {'GamesPlayed': 0, 'CumulativePoints': []}
    
    teams[team][season]['GamesPlayed'] += 1
    if teams[team][season]['CumulativePoints']:
        new_cumulative_points = teams[team][season]['CumulativePoints'][-1] + points
    else:
        new_cumulative_points = points
    
    teams[team][season]['CumulativePoints'].append(new_cumulative_points)

# Generate and save the graphs for each team
for team, seasons in teams.items():
    plt.figure(figsize=(10, 6))
    
    # Set the background color
    plt.gca().set_facecolor('#1A1A1A')
    plt.gcf().set_facecolor('#1A1A1A')

    for i, (season, data) in enumerate(seasons.items()):
        games_played = range(1, data['GamesPlayed'] + 1)
        season_label = f'{season-1}-{season} Season (Total: {data["CumulativePoints"][-1]})'
        plt.plot(games_played, data['CumulativePoints'], label=season_label)  # Use default colors

    # Set axis limits to ensure 0 starts at the intersection of x and y axes
    plt.xlim(left=0)
    plt.ylim(bottom=0)

    # Set the title and labels with larger font size and bold text
    plt.title(f'Cumulative Points - {team}', color='#FFFFFF', fontsize=18, fontweight='bold')
    plt.xlabel('Games Played', color='#FFFFFF', fontsize=14, fontweight='bold')
    plt.ylabel('Cumulative Points', color='#FFFFFF', fontsize=14, fontweight='bold')
    
    # Set axis tick labels with larger font size
    plt.tick_params(axis='x', colors='#FFFFFF', labelsize=12)
    plt.tick_params(axis='y', colors='#FFFFFF', labelsize=12)

    # Set legend with larger font size and white text
    plt.legend(facecolor='#1A1A1A', edgecolor='#FFFFFF', labelcolor='#FFFFFF', fontsize=12, loc='upper left')
    plt.grid(True, color='#444444')

    # Save the plot
    plt_path = os.path.join(output_dir, f'{team}.png')
    plt.savefig(plt_path)
    plt.close()

print("Graphs have been generated and saved successfully.")