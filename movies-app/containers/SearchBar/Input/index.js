import React from 'react';

const Input = React.forwardRef(({
  opened,
  theme,
  ...rest
}, ref) => (
  <>
    <input
      className='input'
      ref={ref}
      {...rest} />
    <style jsx>{`
      .input {
        font-size: 1.5rem;
        line-height: 1.2;
        font-weight: ${theme.typography.fontWeightLight};
        background-color: transparent;
        width: 100%;
        margin-left: ${opened ? '0.75rem' : '0rem'};
        color: var(--palette-secondary-contrast-text);
        border: none;
        transition: margin-left ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut};
      }

      @media ${theme.mediaQueries.large} {
        .input {
          /* Keep at least 16px on mobile to avoid iOS input zoom and stay readable */
          font-size: 16px;
        }
      }

      .input:focus,
      .input:active {
        outline: none;
      }

      .input::placeholder {
        color: var(--palette-secondary-contrast-text);
        opacity: 0.85;
      }

      @media (prefers-reduced-motion: reduce) {
        .input {
          transition: none;
        }
      }
    `}</style>
  </>
));

export default Input;
