

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
            width='48'
            height='48'
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
        margin-left: 16px;
        display: flex;
        align-items: center;
      }
      
      .logo-img {
        max-height: 48px;
        width: auto;
        margin-top: -5px;
        margin-bottom: -5px;
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
