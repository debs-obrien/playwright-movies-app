
import Link from 'next/link';

import AppBar from 'components/UI/AppBar';
import HamburgerButton from 'components/UI/HamburgerButton';
import SearchBar from 'containers/SearchBar';
import DarkModeToggle from 'containers/DarkModeToggle';
import TheUser from 'containers/TheUser';
import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATIC_MOVIE_CATEGORIES from 'utils/constants/static-movie-categories';

const BurgerHeader = ({
  openMenu,
  opened
}) => (
  <>
    <AppBar>
      <div className='left-section'>
        <HamburgerButton
          opened={opened}
          onClick={openMenu} />
        <Link
          href={{
            pathname: LINKS.HOME.HREF,
            query: {
              [QUERY_PARAMS.CATEGORY]: STATIC_MOVIE_CATEGORIES[0].name,
              [QUERY_PARAMS.PAGE]: 1
            }
          }}
          className='logo-link'
          aria-label='Movies home'>
          <img
            className='logo-img'
            width='56'
            height='56'
            src={LOGO_IMAGE_PATH}
            alt='' />
        </Link>
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
        gap: 4px;
        min-width: 0;
      }

      :global(.logo-link) {
        display: flex;
        align-items: center;
        margin-left: 4px;
        border-radius: 8px;
      }

      :global(.logo-link:focus) {
        outline: none;
      }

      :global(.logo-link:focus-visible) {
        outline: 2px solid var(--palette-primary-main);
        outline-offset: 2px;
      }

      .logo-img {
        max-height: 44px;
        width: auto;
        display: block;
      }

      .sticky-bar-widgets-container {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }
    `}</style>
  </>
);

export default BurgerHeader;
