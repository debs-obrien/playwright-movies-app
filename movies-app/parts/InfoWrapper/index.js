

import withTheme from 'utils/hocs/withTheme';

const InfoWrapper = ({
  theme,
  children
}) => (
  <>
    <div className='info-wrapper'>
      {children}
    </div>
    <style jsx>{`
      .info-wrapper {
        padding: 4rem;
        min-width: 0;
        max-width: 100%;
        overflow-wrap: anywhere;
      }

      @media ${theme.mediaQueries.largest} {
        .info-wrapper {
          padding: 3rem;
        }
      }

      @media ${theme.mediaQueries.large} {
        .info-wrapper {
          padding: 2rem;
        }
      }

      @media ${theme.mediaQueries.medium} {
        .info-wrapper {
          width: 100%;
          box-sizing: border-box;
        }
      }

      @media ${theme.mediaQueries.smaller} {
        .info-wrapper {
          padding: 1.5rem 1rem;
        }
      }

      @media ${theme.mediaQueries.smallest} {
        .info-wrapper {
          padding: 1rem 0.75rem;
        }
      }
    `}</style>
  </>
);

export default withTheme(InfoWrapper);
