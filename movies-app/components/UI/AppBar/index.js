

import clsx from 'clsx';

import withTheme from 'utils/hocs/withTheme';

const AppBar = ({
  theme,
  className = '',
  children
}) => (
  <>
    <header className={clsx('app-bar', className)}>
      <div className='toolbar'>
        {children}
      </div>
    </header>
    <style jsx>{`
      .app-bar {
        position: fixed;
        top: 30px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: ${theme.zIndex.appBar};
        box-shadow: ${theme.shadows[4]};
        clip-path: inset(0 -100px -100px -100px);
        background-color: var(--palette-background-paper);
        -webkit-tap-highlight-color: transparent;
      }

      .toolbar {
        min-height: 46px;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between
      }

      @media ${theme.mediaQueries.small} {
        .toolbar {
          min-height: 42px;
          padding: 0 16px;
        }
      }

      @media ${theme.mediaQueries.smaller} {
        .app-bar {
          background-color: var(--palette-background-paper);
          width: 100%;
          left: 0;
        }
      }
    `}</style>
  </>
);

export default withTheme(AppBar);
