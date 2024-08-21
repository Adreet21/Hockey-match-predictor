import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { useNavigate } from 'react-router-dom';
import 'react-vertical-timeline-component/style.min.css';
import { SectionWrapper } from '../hoc';
import LoadingScreen from './LoadingScreen';

const GameCard = ({ game, index }) => {
  // Fix Montreal naming issue
  if (game.away_team == "Montreal") {
    game.away_team = "Montréal";
  }
  if (game.home_team == "Montreal") {
    game.home_team = "Montréal";
  }

  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/game/${index}`);
    navigate(`/game/${index}`, { state: { game } });
  };

  return (
    <VerticalTimelineElement
      className="game-card"
      onTimelineElementClick={handleClick}
      contentStyle={{
        background: '#121212',
        color: '#FCA311',
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 1)',
        border: '2px solid #FCA311',
        borderRadius: '10px',
      }}
      contentArrowStyle={{ borderRight: '10px solid  #FCA311' }}
      date={<span className="date-text">{game.date}</span>}
      iconStyle={{ background: '#F9F9F9' }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-1/2 h-full flex justify-center items-center">
            <img
              src={game.away_team_logo}
              alt={game.away_team}
              className="w-[100%] h-[100%] object-contain"
            />
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <img
              src={game.home_team_logo}
              alt={game.home_team}
              className="w-[100%] h-[100%] object-contain"
            />
          </div>
        </div>
      }
    >
      <div>
        <h3 className="game-title">{`${game.away_team} vs. ${game.home_team}`}</h3>
        <p className="game-time" style={{ margin: 0 }}>
          {game.time}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

const Timeline = () => {
  const [loading, setLoading] = useState(true);
  const [gameSchedule, setGameSchedule] = useState(null)

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/game-schedule");
      setGameSchedule(response.data);
    } catch {
      console.error('Error fetching game schedule:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <div className="flex flex-col pb-20">
      {loading ? (
        <LoadingScreen message={"Fetching Latest Game Schedule..."} />
      ) : (
        <VerticalTimeline>
          {gameSchedule.map((game, index) => (
            <GameCard key={`game-${index}`} game={game} index={index} />
          ))}
        </VerticalTimeline>
      )}
    </div>
  );
};

export default SectionWrapper(Timeline, '');
