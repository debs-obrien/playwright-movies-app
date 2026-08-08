
import withTheme from 'utils/hocs/withTheme';

const PaddingWrapper = ({
  theme,
  children
}) => (
  <>
    <div className='padding-wrapper'>
      {children}
    </div>
    <style jsx>{`
      .padding-wrapper {
        padding-right: 4rem;
        padding-left: 4rem;
      }

      @media ${theme.mediaQueries.larger} {
        .padding-wrapper {
          padding-right: 3rem;
          padding-left: 3rem;
        }
      }

      @media ${theme.mediaQueries.large} {
        .padding-wrapper {
          padding-right: 2rem;
          padding-left: 2rem;
        }
      }

      @media ${theme.mediaQueries.small} {
        .padding-wrapper {
          padding-right: 1.25rem;
          padding-left: 1.25rem;
        }
      }

      @media ${theme.mediaQueries.smaller} {
        .padding-wrapper {
          padding-right: 1rem;
          padding-left: 1rem;
        }
      }
    `}</style>
  </>
);

export default withTheme(PaddingWrapper);
