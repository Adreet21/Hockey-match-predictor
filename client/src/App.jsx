import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Hero, Navbar, About, Schedule, Timeline, GamePrediction, Footer } from "./components";

const App = () => {
  return (
    <Router>
      <div className='relative z-0 bg-secondary'>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Schedule />
              <Timeline />
              <Footer />
            </>
          } />
          <Route path="/game/:id" element={<GamePrediction />} />
        </Routes>  
      </div>
    </Router>
  );
}

export default App;
