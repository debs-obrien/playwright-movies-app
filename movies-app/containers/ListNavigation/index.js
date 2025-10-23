
import Link from 'next/link';
import { useRouter } from 'next/router';

import Navbar, { NavbarItem } from 'components/UI/Navbar';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';

const ListNavigation = ({ listId }) => {
  const { pathname } = useRouter();

  const listLinks = [
    {
      title: 'Edit List',
      href: {
        pathname: LINKS.ADD_OR_EDIT_LIST.HREF,
        query: {[QUERY_PARAMS.ID]: listId}
      },
      disabled: false
    },
    {
      title: 'View List',
      href: {
        pathname: LINKS.LIST.HREF,
        query: {
          [QUERY_PARAMS.ID]: listId,
          [QUERY_PARAMS.PAGE]: 1
        }
      },
      disabled: false
    },
    {
      title: 'Add/Remove Movies',
      href: {
        pathname: LINKS.ADD_OR_REMOVE_ITEMS_AT_LIST.HREF,
        query: {
          [QUERY_PARAMS.LIST_ID]: listId,
          [QUERY_PARAMS.PAGE]: 1
        }
      },
      disabled: false
    },
    {
      title: 'Choose Image',
      href: {
        pathname: LINKS.CHOOSE_LIST_IMAGE.HREF,
        query: {[QUERY_PARAMS.LIST_ID]: listId, [QUERY_PARAMS.PAGE]: 1}
      },
      disabled: false
    },
    {
      title: 'Delete List',
      href: {
        pathname: LINKS.REMOVE_LIST.HREF,
        query: {[QUERY_PARAMS.ID]: listId}
      },
      disabled: false
    }
  ];

  return (
    <Navbar>
      {listLinks.map(listLink => (
        <NavbarItem
          key={listLink.title}
          disabled={listLink.disabled}
          selected={pathname === listLink.href.pathname}>
          <Link href={listLink.href}>
            {listLink.title}
          </Link>
        </NavbarItem>  
      ))}
    </Navbar>
  );
};

export default ListNavigation;
