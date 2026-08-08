import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import Sidebar from 'containers/Sidebar';
import AppHeader from 'containers/AppHeader';
import MyHead from 'components/MyHead';
import SearchBar from 'containers/SearchBar';
import DarkModeToggle from 'containers/DarkModeToggle';
import TheUser from 'containers/TheUser';
import DemoBanner from 'components/DemoBanner';
import { LOGO_IMAGE_PATH } from 'utils/constants/image-paths';
import MainWrapper from './MainWrapper';
import ContentWrapper from './ContentWrapper';
import init from 'actions/init';
import withTheme from 'utils/hocs/withTheme';
import { Media, MediaContextProvider } from 'utils/helpers/media';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATIC_MOVIE_CATEGORIES from 'utils/constants/static-movie-categories';

const Layout = ({
  theme,
  children
}) => {
  // TODO: Client-side Rendering for now
  // RE: https://nextjs.org/learn/basics/data-fetching/two-forms
  // RE: https://nextjs.org/learn/basics/data-fetching/request-time
  // RE: https://nextjs.org/docs/basic-features/data-fetching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <>
      <MyHead />
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>
      <DemoBanner />
      {/**
       * TODO: it could be more efficient in using markups.
       * children is duplicated -> looks like it affects the performance (a little).
       * Could use SearchBar and DarkModeToggle just once by CSS tricks.
       * If we updated the layout (similar to the one in the Material Music project) from a designing perspective we could avoid duplicating children.
       */}
      <MediaContextProvider>
        <Media at='sm'>
          <MainWrapper theme={theme}>
            <AppHeader />
            <ContentWrapper theme={theme}>
              {children}
            </ContentWrapper>
          </MainWrapper>
        </Media>
        <Media greaterThan='sm'>
          <MainWrapper theme={theme}>
            <Sidebar />
            <div className='desktop-header-container'>
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
              <div className='desktop-widgets-container'>
                <SearchBar id='desktop' />
                <DarkModeToggle
                  id='desktop'
                  className='left-margin' />
                <TheUser />
              </div>
            </div>
            <ContentWrapper theme={theme}>
              {children}
            </ContentWrapper>
          </MainWrapper>
        </Media>
      </MediaContextProvider>
      <style jsx>{`
        .skip-link {
          position: absolute;
          top: 0;
          left: 0;
          z-index: ${theme.zIndex.tooltip};
          padding: 12px 16px;
          background: var(--palette-primary-main);
          color: var(--palette-primary-contrast-text);
          font-size: 1.4rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 0 0 8px 0;
          transform: translateY(-120%);
          transition: transform 0.2s ease;
        }

        .skip-link:focus {
          transform: translateY(0);
          outline: 2px solid var(--palette-primary-contrast-text);
          outline-offset: 2px;
        }
        
        .desktop-header-container {
          position: fixed;
          top: 30px;
          left: 0;
          right: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 2rem;
          z-index: ${theme.zIndex.appBar + 10};
          background-color: var(--palette-background-paper);
        }

        :global(.logo-link) {
          display: flex;
          align-items: center;
          margin-left: 15px;
          border-radius: 8px;
        }

        :global(.logo-link:focus-visible) {
          outline: 2px solid var(--palette-primary-main);
          outline-offset: 2px;
        }

        .logo-img {
          max-height: 56px;
          width: auto;
          margin-top: -10px;
          margin-bottom: -10px;
        }

        .desktop-widgets-container {
          display: flex;
          align-items: center;
        }

        .desktop-widgets-container > :global(*:not(:first-child)) {
          margin-left: 12px;
        }
      `}</style>
    </>
  );
};

export default withTheme(Layout);
