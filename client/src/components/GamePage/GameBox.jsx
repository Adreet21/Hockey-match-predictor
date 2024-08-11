import { useEffect, useState } from 'react';
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

  const NHL_TEAMS = {
    "Boston": "Bruins",
    "Buffalo": "Sabres",
    "Detroit": "Red Wings",
    "Florida": "Panthers",
    "Montreal": "Canadiens",
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
    "Vegas": "Knights",
    "Utah": "Utah",
  };
  const NHL_TEAMS_ABR = {
    "Boston": "BOS",
    "Buffalo": "BUF",
    "Detroit": "DET",
    "Florida": "FLA",
    "Montreal": "MTL",
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
  if ((game.away_team == "New York") || (game.home_team == "New York")) {
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
    } else {
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
  }

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

  // useEffect(() => {
  //   // Dummy API call to Python script
  //   const fetchPrediction = async () => {
  //     setLoading(true);
  //     try {
  //       // Replace with the actual API endpoint when available
  //       const response = await fetch('/api/predict-winner', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           away_team: game.away_team,
  //           home_team: game.home_team,
  //           date: game.date,
  //           time: game.time,
  //         }),
  //       });
  //       const data = await response.json();
  //       setWinner(data.winner);
  //       setShowConfetti(true);

  //       // Stop confetti after 3 seconds
  //       const stopConfettiTimer = setTimeout(() => {
  //         setConfettiPieces(0);
  //       }, 3000); // 3000 milliseconds = 3 seconds

  //       // Cleanup the stop confetti timer if the component is unmounted
  //       return () => clearTimeout(stopConfettiTimer);

  //     } catch (error) {
  //       console.error('Error fetching prediction:', error);
  //       setWinner('Error fetching prediction');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPrediction();
  // }, [game]);

  // Timeout before showing winner for Testing Purposes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setWinner(home_team);
      setShowConfetti(true);
      setLoading(false);

      // Stop confetti after 3 seconds
      const stopConfettiTimer = setTimeout(() => {
        setConfettiPieces(0);
      }, 3000); // 3000 milliseconds = 3 seconds

      // Cleanup the stop confetti timer if the component is unmounted
      return () => clearTimeout(stopConfettiTimer);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the main timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [game]);

  return (
    <div className='pt-[5rem] pb-20'>
      {showConfetti && (
        <ReactConfetti 
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={confettiPieces}
        />
      )}
      <div className='game-prediction-box'>
        {isMobile || isLaptop ? 
        <>
          <div className='flex flex-col items-center'>
            <div className='flex items-center mb-2'>
              <h1 className='gameTitleText text-white'>{isMobile ? away_team_abr : away_team}</h1>
              <img src={game.away_logo} alt={game.away_team} className={`${isMobile ? "w-[9vw] h-[9vw]" : "w-[60px] h-[60px]"} ml-2 mr-5`}/>
              <h1 className='gameTitleText'>vs.</h1>
              <img src={game.home_logo} alt={game.home_team} className={`${isMobile ? "w-[9vw] h-[9vw]" : "w-[60px] h-[60px]"} ml-5 mr-2`}/>
              <h1 className='gameTitleText text-white'>{isMobile ? home_team_abr : home_team}</h1>
            </div>
          </div>
        </> 
        : 
        <div className='flex flex-col items-center'>
          <div className='flex items-center mb-2'>
            <h1 className='gameTitleText text-white'>{isXSMobile ? away_team_abr : away_team}</h1>
            <img src={game.away_logo} alt={game.away_team} className={`${isXSMobile ? "w-[13vw] h-[13vw]" : "w-[60px] h-[60px]"} ml-3 mr-4`}/>
          </div>
          <h1 className='gameTitleText'>vs.</h1>
          <div className='flex items-center mt-2'>
            <h1 className='gameTitleText text-white'>{isXSMobile ? home_team_abr : home_team}</h1>
            <img src={game.home_logo} alt={game.home_team} className={`${isXSMobile ? "w-[13vw] h-[13vw]" : "w-[60px] h-[60px]"} ml-3 mr-4`}/>
          </div>
        </div>
        }
        <p className='gameSubText'>{game.date}</p>
        <p className='gameSubText'>{game.time}</p>

        <div className='flex justify-center items-center mt-2'>
          <p className='gameSub2Text'>Predicted Winner: </p>
          {loading ? (
            <LoadingScreen />
          ) : (
            <h1 className='gameTitleText text-white'>{winner}</h1>
          )}
        </div>
      </div>        
    </div>
  );
}

export default GameBox;
