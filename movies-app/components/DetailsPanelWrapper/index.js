
const DETAILS_PANEL_WRAPPER = 'details-panel-wrapper';

const DetailsPanelWrapper = ({
  theme,
  children
}) => (
  <>
    <div className={DETAILS_PANEL_WRAPPER}>
      {children}
    </div>
    <style jsx>{`
      .${DETAILS_PANEL_WRAPPER} {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2.4rem;
        gap: 1.2rem;
        background: var(--palette-background-paper);
        position: relative;
        z-index: 2;
      }

      @media ${theme.mediaQueries.smaller} {
        .${DETAILS_PANEL_WRAPPER} {
          padding: 1.6rem 1.6rem;
          gap: 1rem;
        }
      }
    `}</style>
  </>
);

export default DetailsPanelWrapper;
