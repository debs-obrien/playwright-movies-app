

import PageWrapper from 'parts/PageWrapper';
import TitleSection from './TitleSection';
import NotFoundImage from './NotFoundImage';
import LinkButton from 'components/LinkButton';
import LINKS from 'utils/constants/links';
import withTheme from 'utils/hocs/withTheme';
import HomeIcon from 'public/assets/svgs/icons/home.svg';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATIC_MOVIE_CATEGORIES from 'utils/constants/static-movie-categories';

const NotFound = ({
  theme,
  title,
  subtitle
}) => (
  <>
    <PageWrapper className='not-found'>
      <div className='title-section'>
        <h3 className='title'>{title}</h3>
        <h4 className='subtitle'>{subtitle}</h4>
      </div>
      <NotFoundImage
        src='/assets/svgs/empty.svg'
        alt='Not found!' />
      <LinkButton
        href={{
          pathname: LINKS.HOME.HREF,
          query: {
            [QUERY_PARAMS.CATEGORY]: STATIC_MOVIE_CATEGORIES[0].name,
            [QUERY_PARAMS.PAGE]: 1
          }
        }}
        buttonProps={{
          contained: true,
          title: 'Home',
          startIcon: (
            <HomeIcon
              fill='currentColor'
              width='1.125em' />
          )
        }} />
    </PageWrapper>
    <style jsx>{`
      .title-section {
        text-align: center;
        margin-bottom: 6rem;
      }

      .title-section .title {
        color: var(--palette-text-primary);
        font-weight: ${theme.typography.fontWeightLight};
        font-size: 3.75rem;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .title-section .subtitle {
        color: var(--palette-text-secondary);
        font-weight: ${theme.typography.fontWeightBold};
        font-size: 2.125rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      :global(.not-found) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      @media ${theme.mediaQueries.medium} {
        :global(.not-found) {
          width: 65%;
        }
      }
    `}</style>
  </>
);

export default withTheme(NotFound);
