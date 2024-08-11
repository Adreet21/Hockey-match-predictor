import { useParams } from 'react-router-dom';
import { game_schedule } from '../../constants';
import Header from './Header';
import GameBox from './GameBox';
import Footer from './Footer';

const GamePrediction = () => {
  const { id } = useParams();
  const game = game_schedule[id];

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className='flex flex-col min-h-screen bg-secondary'>
      <Header />
      <div className='flex-grow'>
        <GameBox game={game} />
      </div>
      <Footer />
    </div>
  );
};

export default GamePrediction;
