

import LazyLoad from 'components/UI/LazyLoad';

import withTheme from 'utils/hocs/withTheme';

const SummaryWrapper = ({
  theme,
  children
}) => (
  <>
    {/* TODO: double check if we really need LazyLoad */}
    <LazyLoad
      height={500}
      className='summary-lazy-load'>
      <section data-testId="movie-summary" className='summary-wrapper'>
        {children}
      </section>
    </LazyLoad>
    <style jsx>{`
      :global(.summary-lazy-load) {
        display: block !important;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        height: auto !important;
      }

      .summary-wrapper {
        display: grid;
        grid-template-columns: 40% 60%;
        max-width: 120rem;
        margin: 0 auto;
        margin-bottom: 7rem;
        min-width: 0;
      }

      @media ${theme.mediaQueries.largest} {
        .summary-wrapper {
          max-width: 105rem;
        }
      }

      @media ${theme.mediaQueries.larger} {
        .summary-wrapper {
          max-width: 110rem;
          margin-bottom: 6rem;
        }
      }

      @media ${theme.mediaQueries.large} {
        .summary-wrapper {
          max-width: 110rem;
          margin-bottom: 5rem;
        }
      }

      @media ${theme.mediaQueries.medium} {
        .summary-wrapper {
          display: block;
          grid-template-columns: unset;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          margin-bottom: 5rem;
        }
      }

      @media ${theme.mediaQueries.small} {
        .summary-wrapper {
          margin-bottom: 3rem;
        }
      }
    `}</style>
  </>
);

export default withTheme(SummaryWrapper);
