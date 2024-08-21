import pandas as pd
import matplotlib.pyplot as plt
import os
from datetime import datetime

def plot_logic_line_graphs(data, output_dir):
    # Create a directory to save the graphs if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Get unique teams
    teams = data['Team'].unique()

    for team in teams:
        team_data = data[data['Team'] == team].sort_values(by='Date')
        
        # Create a logic line graph based on Wins (1) and Losses (0)
        team_data['State'] = team_data['W'].apply(lambda x: 1 if x > 0 else 0)

        # Plot the step function without markers
        plt.figure(figsize=(18, 5), facecolor='#1A1A1A')  # Set background color
        ax = plt.gca()
        ax.set_facecolor('#1A1A1A')  # Set background color for the plot area

        plt.step(team_data['Date'], team_data['State'], where='mid', color='#FCA311', lw=3, label='Win/Loss State')  # Set line color

        # Add labels and title
        plt.xlabel('Date', color='#FFFFFF')  # Set label color
        plt.ylabel('Game Results', color='#FFFFFF')  # Set label color
        plt.title(f'{team} - Logic Line Graph of Win/Loss State', color='#FFFFFF')  # Set title color
        plt.ylim(-0.1, 1.1)  # Keep y-axis between 0 and 1
        plt.yticks([0, 1], ['Loss', 'Win'], color='#FFFFFF')  # Set y-tick labels color
        
        # Set x-tick labels color
        plt.xticks(rotation=45, color='#FFFFFF')
        
        # Adding a background grid for better readability
        plt.grid(True, which = 'both', linestyle = '--', linewidth = 0.5, color = '#FFFFFF')

        # Limit the number of x-axis labels to avoid clutter
        #plt.gca().xaxis.set_major_locator(plt.MaxNLocator(8))  # Reduce number of x-ticks

        # Set axis color
        ax.spines['bottom'].set_color('#FFFFFF')
        ax.spines['left'].set_color('#FFFFFF')

        # Hide top and right spines to match background
        ax.spines['top'].set_color('#1A1A1A')  
        ax.spines['right'].set_color('#1A1A1A')

        # Save the plot as an image file
        output_file = os.path.join(output_dir, f'{team}_Win/Loss_graph.png')
        plt.savefig(output_file, bbox_inches = 'tight', facecolor = '#1A1A1A')
        plt.close()

if __name__ == "__main__":
    # Example usage
    input_csv = '/Users/syedshahmeerrahman/Desktop/GitHub/Projects/Hockey-match-predictor/server/nhl_matches.csv'
    output_dir = '/Users/syedshahmeerrahman/Desktop/GitHub/Projects/Hockey-match-predictor/server/team_Win/Loss_graph'

    # Load the CSV file
    data = pd.read_csv(input_csv)

    # Convert 'Date' to datetime format for consistency
    data['Date'] = pd.to_datetime(data['Date'])

    # Define the start and end of the season
    season_start = datetime(2023, 10, 1)
    season_end = datetime(2024, 4, 30)

    # Filter data to include only the last season
    data = data[(data['Date'] >= season_start) & (data['Date'] <= season_end)]

    # Generate enhanced logic line graphs
    plot_logic_line_graphs(data, output_dir)
