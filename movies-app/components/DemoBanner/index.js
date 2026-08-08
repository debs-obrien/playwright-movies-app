import React from 'react';

const DemoBanner = () => (
  <>
    <div className="demo-banner">
      This is a demo intended for testing. Data and images are provided by{' '}
      <a href="https://www.themoviedb.org">TMDB</a>.
    </div>
    <style jsx>{`
      .demo-banner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #ffee5b;
        color: #444;
        padding: calc(0.5rem + env(safe-area-inset-top, 0px)) 1rem 0.5rem;
        text-align: center;
        border-bottom: 1px solid #cc0;
        z-index: 1000;
        font-size: 1.3rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }

      .demo-banner :global(a) {
        color: inherit;
        text-decoration: underline;
      }

      .demo-banner :global(a:focus-visible) {
        outline: 2px solid #222;
        outline-offset: 2px;
      }
    `}</style>
  </>
);

export default DemoBanner;
