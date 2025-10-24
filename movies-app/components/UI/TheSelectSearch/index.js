import React from 'react';

import SelectSearch from 'react-select-search/dist/cjs';
import clsx from 'clsx';

import Label from 'components/UI/Label';
import FormControl from 'components/UI/FormControl';
import defaultClasses from 'components/UI/TheSelectSearch/default-style.module.css';

const TheSelectSearch = React.forwardRef(({
  id,
  name,
  label,
  classes,
  ...rest
}, ref) => {
  const classNameMap = React.useMemo(() => {
    const libraryClasses = {
      container: 'select-search-container',
      value: 'select-search-value',
      input: 'select-search-input',
      select: 'select-search-select',
      options: 'select-search-options',
      row: 'select-search-row',
      option: 'select-search-option',
      group: 'select-search-group',
      'group-header': 'select-search-group-header',
      'not-found': 'select-search-not-found',
      'is-disabled': 'select-search-is-disabled',
      'is-loading': 'select-search-is-loading',
      'is-multiple': 'select-search-is-multiple',
      'has-focus': 'select-search-has-focus',
      'is-highlighted': 'select-search-is-highlighted',
      'is-selected': 'select-search-is-selected',
    };

    const moduleKeyMap = {
      container: 'container',
      value: 'value',
      input: 'input',
      select: 'select',
      options: 'options',
      row: 'row',
      option: 'option',
      group: 'group',
      'group-header': 'group-header',
      'not-found': 'not-found',
      'is-disabled': 'is-disabled',
      'is-loading': 'is-loading',
      'is-multiple': 'container--multiple',
      'has-focus': 'has-focus',
      'is-highlighted': 'is-highlighted',
      'is-selected': 'is-selected',
    };

    return Object.entries(libraryClasses).reduce((acc, [key, libraryClass]) => {
      const moduleKey = moduleKeyMap[key];
      acc[key] = clsx(
        libraryClass,
        moduleKey ? defaultClasses?.[moduleKey] : null,
        moduleKey ? classes?.[moduleKey] : null,
        classes?.[key],
      );
      return acc;
    }, {});
  }, [classes]);

  return (
    <>
      {/* Hidden fake password field to confuse autofill */}
      <input
        type="password"
        style={{ display: 'none' }}
        autoComplete="new-password"
        tabIndex="-1"
      />
      <FormControl>
        {label && <Label htmlFor={id}>{label}</Label>}
        <SelectSearch
          ref={ref}
          className={classNameMap}
          renderValue={valueProps => (
            <input
              id={id}
              name="search-movies-query"
              type="text"
              inputMode="search"
              role="combobox"
              aria-autocomplete="list"
              className={clsx('select-search-input', defaultClasses?.['input'], classes?.['input'])}
              autoComplete="nope"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-1p-ignore="true"
              data-ms-editor="false"
              data-webkit-autofill="false"
              {...valueProps} />
          )}
          {...rest} />
      </FormControl>
    </>
  );
});

export default TheSelectSearch;
