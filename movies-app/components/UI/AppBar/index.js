

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
        box-shadow: ${theme.shadows[3]};
        clip-path: inset(0 -100px -100px -100px);
        background-color: rgba(var(--palette-background-paper-rgb, 255, 255, 255), 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        -webkit-tap-highlight-color: transparent;
        border-bottom: 1px solid var(--palette-divider);
        transition: all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut};
      }

      .toolbar {
        min-height: 64px;
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      @media ${theme.mediaQueries.small} {
        .toolbar {
          min-height: 56px;
          padding: 0 20px;
        }
      }

      @media ${theme.mediaQueries.smaller} {
        .app-bar {
          background-color: rgba(var(--palette-background-paper-rgb, 255, 255, 255), 0.92);
          width: 100%;
          left: 0;
        }
        .toolbar {
          padding: 0 16px;
        }
      }
    `}</style>
  </>
);

export default withTheme(AppBar);
