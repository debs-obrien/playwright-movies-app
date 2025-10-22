
import clsx from 'clsx';

import withTheme from 'utils/hocs/withTheme';

/**
 * MEMO:
 * Could follow the MUI practices for size specs like padding.
 * Could split up into contained and outlined buttons.
 */
const ButtonBase = ({
  theme,
  className,
  contained,
  children,
  ...rest
}) => (
  <>
    <button
      className={clsx('button-base', className)}
      {...rest}>
      {children}
    </button>
    <style jsx>{`
      .button-base {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        outline: none;
        padding: 10px 24px;
        min-width: 100px;
        min-height: 44px;
        user-select: none;
        font-weight: ${theme.typography.fontWeightSemiBold};
        font-size: 1.5rem;
        letter-spacing: 0.02em;
        color: ${contained ? 'var(--palette-primary-contrast-text)' : 'var(--palette-primary-main)'};
        border: ${contained ? 'none' : '2px solid var(--palette-primary-main)'};
        border-radius: ${theme.shape.borderRadius}px;
        box-shadow: ${contained ? `${theme.shadows[3]}` : 'none'};
        background-color: ${contained ? 'var(--palette-primary-main)' : 'transparent'};
        transition: all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut};
        position: relative;
        overflow: hidden;
      }

      .button-base::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${contained ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)' : 'transparent'};
        opacity: 0;
        transition: opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut};
      }

      .button-base:hover {
        transform: translateY(-2px);
        box-shadow: ${contained ? `${theme.shadows[5]}` : `${theme.shadows[2]}`};
        background-color: ${contained ? 'var(--palette-primary-dark)' : 'rgba(var(--palette-primary-main-rgb), 0.08)'};
      }

      .button-base:hover::before {
        opacity: 1;
      }

      .button-base:active {
        transform: translateY(0px);
        box-shadow: ${contained ? `${theme.shadows[2]}` : `${theme.shadows[1]}`};
        transition-duration: ${theme.transitions.duration.shortest}ms;
      }

      .button-base:disabled {
        color: var(--palette-action-disabled);
        background-color: var(--palette-action-disabled-background);
        border-color: var(--palette-action-disabled-background);
        box-shadow: none;
        transform: none;
        pointer-events: none;
      }

      @media ${theme.mediaQueries.small} {
        .button-base {
          padding: 8px 16px;
          min-width: 80px;
          min-height: 40px;
          font-size: 1.4rem;
        }
      }
    `}</style>
  </>
);

export default withTheme(ButtonBase);
