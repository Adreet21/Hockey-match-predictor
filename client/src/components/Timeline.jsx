import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { useNavigate } from 'react-router-dom';
import 'react-vertical-timeline-component/style.min.css';
import { game_schedule } from '../constants';
import { SectionWrapper } from '../hoc';

const GameCard = ({ game, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${index}`);
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
  return (
    <div className="flex flex-col pb-20">
      <VerticalTimeline>
        {game_schedule.map((game, index) => (
          <GameCard key={`game-${index}`} game={game} index={index} />
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default SectionWrapper(Timeline, '');
