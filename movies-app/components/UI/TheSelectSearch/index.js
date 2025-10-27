import React from 'react';

import { useSelect } from 'downshift';
import clsx from 'clsx';

import Label from 'components/UI/Label';
import FormControl from 'components/UI/FormControl';
import defaultClasses from 'components/UI/TheSelectSearch/default-style.module.css';

const TheSelectSearch = React.forwardRef(({
  id,
  name,
  label,
  classes,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  ...rest
}, ref) => {
  // Find the selected item from options based on value prop
  const selectedItem = React.useMemo(() => {
    if (!value) return null;
    return options.find(option => option.value === value) || null;
  }, [options, value]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString: (item) => (item ? item.name : ''),
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem && onChange) {
        onChange(newSelectedItem.value);
      }
    },
  });

  const mergedClasses = React.useMemo(() => ({
    container: clsx('select-search-container', defaultClasses?.container, classes?.container, {
      [clsx('is-disabled', defaultClasses?.['is-disabled'])]: disabled,
      [clsx('has-focus', defaultClasses?.['has-focus'])]: isOpen,
    }),
    input: clsx('select-search-input', defaultClasses?.input, classes?.input),
    select: clsx('select-search-select', defaultClasses?.select, classes?.select),
    options: clsx('select-search-options', defaultClasses?.options, classes?.options),
    option: defaultClasses?.option,
  }), [classes, defaultClasses, disabled, isOpen]);

  return (
    <FormControl>
      {label && <Label {...getLabelProps()} htmlFor={id}>{label}</Label>}
      <div className={mergedClasses.container} ref={ref}>
        <div className={defaultClasses?.value}>
          <button
            type="button"
            {...getToggleButtonProps({
              disabled,
              id,
              name,
              'aria-labelledby': label ? undefined : id,
            })}
            className={mergedClasses.input}
          >
            {selectedItem ? selectedItem.name : placeholder}
          </button>
        </div>
        <div className={mergedClasses.select} style={{ display: isOpen && !disabled ? 'block' : 'none' }}>
          <ul {...getMenuProps()} className={mergedClasses.options}>
            {isOpen && !disabled && options.map((item, index) => {
              const itemProps = getItemProps({ item, index });
              return (
                <li
                  key={item.value}
                  className={clsx(
                    'select-search-row',
                    {
                      [clsx('is-highlighted', defaultClasses?.['is-highlighted'])]: highlightedIndex === index,
                      [clsx('is-selected', defaultClasses?.['is-selected'])]: selectedItem?.value === item.value,
                    }
                  )}
                >
                  <button
                    type="button"
                    {...itemProps}
                    className={clsx(
                      'select-search-option',
                      mergedClasses.option,
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FormControl>
  );
});

export default TheSelectSearch;
