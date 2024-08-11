import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const Schedule = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() returns month from 0-11
  const day = today.getDate();
  let currentSeason = ""

  if (month >= 7 && month <= 9) {
    currentSeason = `Preseason (${year})`;
  } else if ((month >= 10 && month <= 12) || (month >= 1 && month <= 3) || (month === 4 && day <= 15) ) {
    if (month > 0 && month <= 7) {
      currentSeason = `Regular Season (${year - 1}-${year})`;
    } else {
      currentSeason = `Regular Season (${year}-${year + 1})`;
    }
  } else if ((month === 4 && day >= 16) || (month >= 5 && month <= 6)) {
    currentSeason = `Playoffs (${year - 1}-${year})`;
  }
  
  return (
    <>
      <motion.div variants={textVariant()} className="mt-5">
        <p className={`${styles.sectionSubText}`}>
          {currentSeason}
        </p>
        <h2 className='sectionHeadText text-white'>
          Game Schedule.
        </h2>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Schedule, "schedule");
