
import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import withTheme from 'utils/hocs/withTheme';
import Backdrop from 'components/UI/Backdrop';
import CloseIconButton from 'components/IconButtons/CloseIconButton';

const SideDrawer = ({
  theme,
  opened,
  close,
  children
}) => {
  const drawerRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!opened) {
      return undefined;
    }

    previouslyFocusedRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const closeButton = drawerRef.current?.querySelector('[data-drawer-close]');
      closeButton?.focus();
    }, 0);

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return;
      }

      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [opened, close]);

  return (
    <>
      <Backdrop
        opened={opened}
        onClick={close}
        aria-hidden='true' />
      <div
        id='mobile-navigation-drawer'
        ref={drawerRef}
        className={clsx('side-drawer', opened ? 'opened' : 'closed')}
        role='dialog'
        aria-modal='true'
        aria-label='Navigation menu'
        aria-hidden={!opened}>
        <div className='drawer-header'>
          <CloseIconButton
            data-drawer-close
            aria-label='Close navigation menu'
            onClick={close} />
        </div>
        {children}
      </div>
      <style jsx>{`
        .side-drawer {
          position: fixed;
          width: 280px;
          max-width: min(75%, 320px);
          height: 100%;
          height: 100dvh;
          left: 0;
          top: 0;
          z-index: ${theme.zIndex.drawer};
          padding: calc(1rem + env(safe-area-inset-top, 0px)) 0 calc(2rem + env(safe-area-inset-bottom, 0px));
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-sizing: border-box;
          transition: transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut};
          box-shadow: ${theme.shadows[16]};
          background: linear-gradient(180deg, var(--palette-background-paper) 0%, var(--palette-background-elevated) 100%);
          border-right: 1px solid var(--palette-divider);
          visibility: hidden;
        }

        .drawer-header {
          display: flex;
          justify-content: flex-end;
          padding: 0 0.75rem 0.5rem;
        }

        .opened {
          transform: translateX(0);
          visibility: visible;
        }

        .closed {
          transform: translateX(-100%);
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .side-drawer {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default withTheme(SideDrawer);
