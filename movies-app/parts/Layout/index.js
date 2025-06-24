import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
              <div className='logo-container'>
                <img
                  className='logo-img'
                  width='56'
                  height='56'
                  src={LOGO_IMAGE_PATH}
                  alt='movie ticket' />
              </div>
              <div className='desktop-widgets-container'>
                <SearchBar id='desktop' />
                <DarkModeToggle
                  id='desktop'
                  className='left-margin' />
                <TheUser />
              </div>
            </div>
            <style jsx>{`
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
              
              .logo-container {
                display: flex;
                align-items: center;
                margin-left: 15px;
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
            <ContentWrapper theme={theme}>
              {children}
            </ContentWrapper>
          </MainWrapper>
        </Media>
      </MediaContextProvider>
      <DemoBanner />
    </>
  );
};

export default withTheme(Layout);
