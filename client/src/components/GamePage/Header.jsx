import { Link } from 'react-router-dom';

import { styles } from '../../styles';
import { logo, home } from '../../assets';

const Header = () => {
  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
            <div className="w-full flex justify-between items-center mx-auto">
                <Link 
                to="/"
                className='flex items-center gap-2'
                >
                <img src={logo} alt="logo" className='w-9 h-9 object-contain' />
                <p className='text-white text-[18px] font-bold cursor-pointer'>NHL Games Predictions</p>
                </Link>
                <Link 
                    to="/"
                    className='flex items-center gap-2'
                >
                    <img src={home} alt='home' className="w-[30px] h-[30px] cursor-pointer"/>
                </Link>
            </div>
    </nav>
  )
}

export default Header
