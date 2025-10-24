
import Link from 'next/link';
import DotCircleIcon from 'public/assets/svgs/icons/dot-circle.svg';

import withTheme from 'utils/hocs/withTheme';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';

const GenreLink = ({
  theme,
  genre
}) => (
  <li>
    <Link
      href={{
        pathname: LINKS.GENRE.HREF,
        query: {
          [QUERY_PARAMS.ID]: genre.id,
          [QUERY_PARAMS.NAME]: genre.name,
          [QUERY_PARAMS.PAGE]: 1
        }
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 8px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '16px',
        color: 'var(--palette-secondary-main)',
        textDecoration: 'none',
        lineHeight: '1',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap'
      }}>

      <DotCircleIcon
        fill='currentColor'
        width='12px'
        height='12px'
        style={{marginRight: '5px', flexShrink: 0}} />
      {genre.name}

    </Link>
    <style jsx>{`
      li {
        list-style-type: none;
      }
    `}</style>
  </li>
);

export default withTheme(GenreLink);
