

import AppBar from 'components/UI/AppBar';
import HamburgerButton from 'components/UI/HamburgerButton';
import SearchBar from 'containers/SearchBar';
import DarkModeToggle from 'containers/DarkModeToggle';
import TheUser from 'containers/TheUser';
import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths';

const BurgerHeader = ({ openMenu }) => (
  <>
    <AppBar>
      <div className='left-section'>
        <HamburgerButton onClick={openMenu} />
        <div className='logo-container'>
          <img
            className='logo-img'
            width='56'
            height='56'
            src={LOGO_IMAGE_PATH}
            alt='movie ticket' />
        </div>
      </div>
      <div className='sticky-bar-widgets-container'>
        <SearchBar id='mobile' />
        <DarkModeToggle
          id='mobile'
          className='left-margin' />
        <TheUser />
      </div>
    </AppBar>
    <style jsx>{`
      .left-section {
        display: flex;
        align-items: center;
      }
      
      .logo-container {
        margin-left: 25px;
        display: flex;
        align-items: center;
      }
      
      .logo-img {
        max-height: 56px;
        width: auto;
        margin-top: -10px;
        margin-bottom: -10px;
      }
      
      .sticky-bar-widgets-container {
        display: flex;
        align-items: center;
      }

      .sticky-bar-widgets-container > :global(*:not(:first-child)) {
        margin-left: 8px;
      }
    `}</style>
  </>
);

export default BurgerHeader;
