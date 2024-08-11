import { herobg } from '../assets';

const Hero = () => {
  return (
    <div className = "hero">
      <div className='hero-slider'>
        <img 
          src={herobg} 
          alt="Hero Background" 
          className='hero-image'
        />
      </div>
      <div className='hero-slider'>
        <img 
          src={herobg} 
          alt="Hero Background" 
          className='hero-image'
        />
      </div>
      <div className="hero-text">
        <h1>Predict the Puck Drop</h1>
        <h2>Your NHL Winner Forecaster</h2>
      </div>
    </div>
  );
}

export default Hero;
