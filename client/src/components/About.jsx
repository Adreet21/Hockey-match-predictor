import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
    return (
        <>
          <motion.div variants={textVariant()} className="pt-10 mt-10">
            <p className={styles.sectionSubText}>About Us</p>
            <h2 className='sectionHeadText text-white'>Overview.</h2>
          </motion.div>
    
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-4 text-white text-[17px] max-w-5xl leading-[30px]'
          >
            Welcome to <span className="orange-text-gradient" style={{ whiteSpace: 'nowrap' }}>NHL Games Predictions</span>, your go-to platform for predicting the outcomes of upcoming NHL matches! 
            Using an advanced machine learning algorithm, we analyze a vast array of historical data, including past match results, player statistics, team performance, and various other factors, 
            to forecast game outcomes with high accuracy. Whether you're a passionate fan, a sports analyst, or just curious about the future results of your favorite teams, our platform 
            offers reliable and up-to-date predictions to guide your decisions. Dive into the world of predictive sports analytics with <span className="orange-text-gradient" 
            style={{ whiteSpace: 'nowrap' }}>NHL Games Predictions</span> and stay ahead of the game, enhancing your hockey experience with data-driven insights.
          </motion.p>
        </>
    );
}

export default SectionWrapper(About, "about");
