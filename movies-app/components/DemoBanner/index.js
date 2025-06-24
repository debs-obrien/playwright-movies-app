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
        /* height: 30px; */
        background-color: #ffee5b;
        color: #444;
        padding: 0.75rem 1rem;
        text-align: center;
        border-bottom: 1px solid #cc0;
        z-index: 1000;
      }
    `}</style>
  </>
);

export default DemoBanner;
