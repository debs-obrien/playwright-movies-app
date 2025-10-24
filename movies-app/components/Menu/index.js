
import { useSelector } from 'react-redux';

import SectionHeading from './SectionHeading';
import MenuItem from './MenuItem';
import MenuItemLink from './MenuItemLink';
import TMDBMark from 'components/TMDBMark';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';

const renderStaticCategories = (staticCategories, selectedMenuItemName, closeMenu = null) => {
  const menuItemLinks = staticCategories.map(staticCategory => (
    <li key={staticCategory.id}>
      <MenuItemLink
        href={{
          pathname: LINKS.HOME.HREF,
          query: {
            [QUERY_PARAMS.CATEGORY]: staticCategory.name,
            [QUERY_PARAMS.PAGE]: 1
          }
        }}
        onClick={closeMenu}
        selected={staticCategory.name === selectedMenuItemName}>
        <MenuItem title={staticCategory.name} />
      </MenuItemLink>
    </li>
  ));

  return menuItemLinks;
};

const renderGenres = (genres, selectedMenuItemName, closeMenu = null) => {
  const menuItemLinks = genres.map(genre => (
    <li key={genre.id}>
      <MenuItemLink
        href={{
          pathname: LINKS.GENRE.HREF,
          query: {
            [QUERY_PARAMS.ID]: genre.id,
            [QUERY_PARAMS.NAME]: genre.name,
            [QUERY_PARAMS.PAGE]: 1
          }
        }}
        onClick={closeMenu}
        selected={genre.name === selectedMenuItemName}>
        <MenuItem title={genre.name} />
      </MenuItemLink>
    </li>
  ));

  return menuItemLinks;
};

const Menu = ({
  closeMenu,
  ...rest
}) => {
  const staticCategories = useSelector(state => state.general.staticCategories);
  const genres = useSelector(state => state.general.genres);
  const selectedMenuItemName = useSelector(state => state.general.selectedMenuItemName);

  return (
    <>
      <nav {...rest}>
        <section>
          <SectionHeading>Discover</SectionHeading>
          <ul role="list">
            {renderStaticCategories(staticCategories, selectedMenuItemName, closeMenu)}
          </ul>
        </section>
        <section>
          <SectionHeading>Genres</SectionHeading>
          <ul role="list">
            {renderGenres(genres, selectedMenuItemName, closeMenu)}
          </ul>
        </section>
        <TMDBMark className='tmdb-mark' />
      </nav>
      <style jsx>{`
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          margin: 0;
          padding: 0;
        }

        section {
          margin-bottom: 2rem;
        }

        :global(.copyright) {
          display: flex;
          justify-content: center;
          margin: 24px 8px;
        }

        :global(.tmdb-mark) {
          margin: 16px 8px;
        }
      `}</style>
    </>
  );
};

export default Menu;
