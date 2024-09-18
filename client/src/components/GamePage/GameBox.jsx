import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactConfetti from 'react-confetti';
import LoadingScreen from '../LoadingScreen';

const GameBox = ({ game }) => {
  const [isLaptop, setIsLaptop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isXSMobile, setIsXSMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState('');
  const [windowDimension, setDimension] = useState({width: window.innerWidth, height: window.innerHeight});
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(200); // Initial number of confetti pieces
  const [awayExists, setAwayExists] = useState(false);
  const [homeExists, setHomeExists] = useState(false);

  const NHL_TEAMS = {
    "Boston": "Bruins",
    "Buffalo": "Sabres",
    "Detroit": "Red Wings",
    "Florida": "Panthers",
    "Montréal": "Canadiens",
    "Ottawa": "Senators",
    "Tampa Bay": "Lightning",
    "Toronto": "Maple Leafs",
    "Carolina": "Hurricanes",
    "Columbus": "Blue Jackets",
    "New Jersey": "Devils",
    "New York Islanders": "Islanders",
    "New York Rangers": "Rangers",
    "Philadelphia": "Flyers",
    "Pittsburgh": "Penguins",
    "Washington": "Capitals",
    "Arizona": "Coyotes",
    "Chicago": "Blackhawks",
    "Colorado": "Avalanche",
    "Dallas": "Stars",
    "Minnesota": "Wild",
    "Nashville": "Predators",
    "St. Louis": "Blues",
    "Winnipeg": "Jets",
    "Anaheim": "Ducks",
    "Calgary": "Flames",
    "Edmonton": "Oilers",
    "Los Angeles": "Kings",
    "San Jose": "Sharks",
    "Seattle": "Kraken",
    "Vancouver": "Canucks",
    "Vegas": "Golden Knights",
    "Utah": "Utah",
  };
  const NHL_TEAMS_ABR = {
    "Boston": "BOS",
    "Buffalo": "BUF",
    "Detroit": "DET",
    "Florida": "FLA",
    "Montréal": "MTL",
    "Ottawa": "OTT",
    "Tampa Bay": "TBL",
    "Toronto": "TOR",
    "Carolina": "CAR",
    "Columbus": "CBJ",
    "New Jersey": "NJD",
    "New York Islanders": "NYI",
    "New York Rangers": "NYR",
    "Philadelphia": "PHI",
    "Pittsburgh": "PIT",
    "Washington": "WSH",
    "Arizona": "ARI",
    "Chicago": "CHI",
    "Colorado": "COL",
    "Dallas": "DAL",
    "Minnesota": "MIN",
    "Nashville": "NSH",
    "St. Louis": "STL",
    "Winnipeg": "WPG",
    "Anaheim": "ANA",
    "Calgary": "CGY",
    "Edmonton": "EDM",
    "Los Angeles": "LAK",
    "San Jose": "SJS",
    "Seattle": "SEA",
    "Vancouver": "VAN",
    "Vegas": "VGK",
    "Utah": "UTA",
  };

  let away_logo = ""
  let home_logo = ""
  let away_team = NHL_TEAMS[game.away_team];
  let home_team = NHL_TEAMS[game.home_team];
  let away_team_abr = NHL_TEAMS_ABR[game.away_team];
  let home_team_abr = NHL_TEAMS_ABR[game.home_team];
  // sort out which is New York Islanders and which is New York Rangers
  if (game.away_team == "New York") {
    if (game.away_team_logo == "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/scoreboard/nyr.png&w=40&h=40&scale=crop&cquality=40&location=origin") {
      away_team = "Rangers";
      away_team_abr = "NYR"
      game.away_logo = "https://assets.nhle.com/logos/nhl/svg/NYR_dark.svg"
    } else {
      away_team = "Islanders";
      away_team_abr = "NYI"
      game.away_logo = "https://assets.nhle.com/logos/nhl/svg/NYI_dark.svg"
    }
  } 
  if (game.home_team == "New York") {
    if (game.home_team_logo == "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/scoreboard/nyr.png&w=40&h=40&scale=crop&cquality=40&location=origin") {
      home_team = "Rangers";
      home_team_abr = "NYR"
      game.home_logo = "https://assets.nhle.com/logos/nhl/svg/NYR_dark.svg"
    } else {
      home_team = "Islanders";
      home_team_abr = "NYI"
      game.home_logo = "https://assets.nhle.com/logos/nhl/svg/NYI_dark.svg"
    }
  }
  let away = game.away_team + " " + away_team;
  let home = game.home_team + " " + home_team;

  // Check if we have any data on the teams
  const checkImageExists = (teamName, setExists) => {
    const img = new Image();
    img.src = `/graphs/${teamName}.png`;
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
  };
  useEffect(() => {
    checkImageExists(away, setAwayExists);
    checkImageExists(home, setHomeExists);
  }, [away, home]);  

  // Check type of device
  useEffect(() => {
    // Add listeners for changes to the screen size
    const laptopQuery = window.matchMedia("(min-width: 1168px)");
    const mobileQuery = window.matchMedia("(min-width: 400px) and (max-width: 440px)");
    const xsMobileQuery = window.matchMedia("(max-width: 400px)");
  
    // Set the initial values of the `isMobile` and `isXSMobile` state variables
    setIsLaptop(laptopQuery.matches);
    setIsMobile(mobileQuery.matches);
    setIsXSMobile(xsMobileQuery.matches);
  
    // Define callback functions to handle changes to the media queries
    const handleLaptopQueryChange = (event) => {
      setIsLaptop(event.matches);
    };

    const handleMobileQueryChange = (event) => {
      setIsMobile(event.matches);
    };
  
    const handleXSMobileQueryChange = (event) => {
      setIsXSMobile(event.matches);
    };
  
    // Add the callback functions as listeners for changes to the media queries
    laptopQuery.addEventListener("change", handleLaptopQueryChange);
    mobileQuery.addEventListener("change", handleMobileQueryChange);
    xsMobileQuery.addEventListener("change", handleXSMobileQueryChange);
  
    return () => {
      laptopQuery.removeEventListener("change", handleLaptopQueryChange);
      mobileQuery.removeEventListener("change", handleMobileQueryChange);
      xsMobileQuery.removeEventListener("change", handleXSMobileQueryChange);
    };
  }, []);

  // Detect changes in screen size for Confetti to take up whole screen
  const detectSize = () => {
    setDimension({width: window.innerWidth, height: window.innerHeight});
  }
  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, [windowDimension]);

  // Function to format the date
  const formatDate = (dateString) => {
    // Remove the day of the week from the date string
    const trimmedDateString = dateString.replace(/^\w+, /, '');

    // Parse the trimmed date string
    const date = new Date(trimmedDateString);

    // Extract the year, month (0-based, so add 1), and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Return the formatted date string
    return `${year}/${month}/${day}`;
  };

  // Start the confetti
  const deployConfetti = () => {
    setShowConfetti(true);

    // Stop confetti after 3 seconds
    const stopConfettiTimer = setTimeout(() => {
      setConfettiPieces(0);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the stop confetti timer if the component is unmounted
    return () => clearTimeout(stopConfettiTimer);
  }

  // Fetch game prediction from ML part
  const fetchPrediction = async () => {
    setLoading(true);

    // Format the parameters so that it matches format of the csv file
    let date = formatDate(game.date)

    try {
      const response = await axios.post('http://localhost:8080/game-prediction', {
        away_team: away,
        home_team: home,
        date: date,
      });

      if (response.data.winner == away) {
        // Away Team Wins
        setWinner(away_team);
        deployConfetti()
      } else if (response.data.winner == home) {
        // Home Team Wins
        setWinner(home_team);
        deployConfetti()
      } else if (!awayExists || !homeExists) {
        // No historical data available on one of the teams
        setWinner("No Data");
      } else {
        // Draw
        setWinner("Draw");
      }

      

    } catch (error) {
      console.error('Error fetching prediction:', error);
      setWinner('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, [game, isMobile, isXSMobile]);

  return (
    <div className='pt-[5rem] pb-20'>
      {showConfetti && (
        <ReactConfetti 
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={confettiPieces}
          tweenDuration={2000}
        />
      )}
      <div className='game-prediction-box'>
        {isMobile || isLaptop ? 
        <>
          <div className='flex flex-col items-center'>
            <div className='flex items-center mb-2'>
              
              {isMobile ? 
                <>
                  <h1 className='gameTitleText text-white'>{isMobile ? away_team_abr : away_team}</h1>
                  <img src={game.away_logo} alt={game.away_team} className={`${isMobile ? "w-[9vw] h-[9vw]" : "w-[60px] h-[60px]"} ml-2 mr-5`}/>
                </>
                :
                <div className='flex flex-col'>
                  <p className='gameSubText text-left'>{game.away_team}</p>
                  <div className='flex flex-row items-center'>
                    <h1 className='gameTitleText text-white'>{isMobile ? away_team_abr : away_team}</h1>
                    <img src={game.away_logo} alt={game.away_team} className={`${isMobile ? "w-[9vw] h-[9vw]" : "w-[60px] h-[60px]"} ml-2 mr-5`}/>
                  </div>
                </div>
              }

              <h1 className={`gameTitleText ${isLaptop ? 'vs-text' : null}`}>vs.</h1>

              {isMobile ? 
                <>
                  <img src={game.home_logo} alt={game.home_team} className={`${isMobile ? "w-[9vw] h-[9vw]" : "w-[60px] h-[60px]"} ml-5 mr-2`}/>
                  <h1 className='gameTitleText text-white'>{isMobile ? home_team_abr : home_team}</h1>
                </>
                :
                <div className='flex flex-col'>
                  <p className='gameSubText text-right'>{game.home_team}</p>
                  <div className='flex flex-row items-center'>
                    <img src={game.home_logo} alt={game.home_team} className={`${isMobile ? "w-[9vw] h-[9vw]" : "w-[60px] h-[60px]"} ml-5 mr-2`}/>
                    <h1 className='gameTitleText text-white'>{isMobile ? home_team_abr : home_team}</h1>
                  </div>
                </div>
              }
              
            </div>
          </div>
        </> 
        : 
        <div className='flex flex-col items-center'>

          <div className='flex flex-col'>
            {!isXSMobile && <p className='gameSubText text-left'>{game.away_team}</p>}
            <div className='flex flex-row items-center'>
              <h1 className='gameTitleText text-white'>{isXSMobile ? away_team_abr : away_team}</h1>
              <img src={game.away_logo} alt={game.away_team} className={`${isXSMobile ? "w-[13vw] h-[13vw]" : "w-[60px] h-[60px]"} ml-3 mr-4`}/>
            </div>
          </div>

          <h1 className='gameTitleText'>vs.</h1>

          <div className='flex flex-col'>
            {!isXSMobile && <p className='gameSubText text-left'>{game.home_team}</p>}
            <div className='flex flex-row items-center'>
              <h1 className='gameTitleText text-white'>{isXSMobile ? home_team_abr : home_team}</h1>
              <img src={game.home_logo} alt={game.home_team} className={`${isXSMobile ? "w-[13vw] h-[13vw]" : "w-[60px] h-[60px]"} ml-3 mr-4`}/>
            </div>
          </div>

        </div>
        }
        <p className='gameSubText'>{game.date}</p>
        <p className='gameSubText'>{game.time}</p>

        <div className='flex justify-center items-center mt-2'>
          <p className='gameSub2Text'>Predicted Winner: </p>
          {loading ? (
            <LoadingScreen message={"Analyzing..."}/>
          ) : (
            <h1 className='gameTitleText text-white'>
              {winner === "Draw" || winner === "No Data" || winner === "Error" 
                ? winner 
                : (isMobile || isXSMobile) 
                  ? (winner === away_team ? away_team_abr : home_team_abr)
                  : winner}
            </h1>
          )}
        </div>

        {!loading && awayExists && homeExists ? 
          <div className='metrics-container'>
            <div className='metrics-card'>
              <p className='gameSubText'>Accuracy: <span className='text-[#FCA311]'>71.23%</span></p>
            </div>
            <div className='metrics-card'>
              <p className='gameSubText'>Precision: <span className='text-[#FCA311]'>64.47%</span></p>
            </div>
            <div className='metrics-card'>
              <p className='gameSubText'>Recall: <span className='text-[#FCA311]'>69.03%</span></p>
            </div>
            <div className='metrics-card'>
              <p className='gameSubText'>AUC-ROC: <span className='text-[#FCA311]'>73.89%</span></p>
            </div>
          </div>
          : null
        }

        {!loading && awayExists && homeExists ? 
          <div className='image-container'>
            <img src={`/graphs/${away}.png`} alt='img' className='image-card'/>
            <img src={`/graphs/${home}.png`} alt='img' className='image-card'/>
          </div>
          : null
        }
      </div>        
    </div>
  );
}

export default GameBox;
