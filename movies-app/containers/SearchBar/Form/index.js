import React from 'react';

const Form = React.forwardRef(({
  opened,
  theme,
  children,
  ...rest
}, ref) => (
  <>
    <form
      role='search'
      ref={ref}
      className={`form${opened ? ' form--opened' : ''}`}
      {...rest}>
      {children}
    </form>
    <style jsx>{`
      .form {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: ${theme.shadows[1]};
        background-color: var(--palette-secondary-dark);
        border: 1px solid var(--palette-secondary-main);
        width: 4.4rem;
        min-width: 4.4rem;
        min-height: 4.4rem;
        cursor: pointer;
        padding: 0;
        height: 4.4rem;
        outline: none;
        border-radius: 100px;
        transition: width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut},
          max-width ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut};
        -webkit-tap-highlight-color: transparent;
      }

      .form--opened {
        width: 30rem;
        max-width: 100%;
        cursor: auto;
        padding: 0.8rem 1.2rem;
      }

      .form:focus-within {
        box-shadow: 0 0 0 2px var(--palette-primary-main);
      }

      @media ${theme.mediaQueries.large} {
        .form {
          border: 1px solid transparent;
          background-color: var(--palette-secondary-main);
        }

        .form--opened {
          width: min(30rem, 100%);
        }
      }

      @media ${theme.mediaQueries.small} {
        .form--opened {
          width: 100%;
          max-width: 100%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .form {
          transition: none;
        }
      }
    `}</style>
  </>
));

export default Form;
