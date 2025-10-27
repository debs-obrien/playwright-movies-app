

import TheSelectSearch from 'components/UI/TheSelectSearch';
import { SORT_BY_OPTIONS } from 'utils/constants/select-search';

const SortBy = props => (
  <TheSelectSearch
    options={SORT_BY_OPTIONS}
    {...props} />
);

export default SortBy;
