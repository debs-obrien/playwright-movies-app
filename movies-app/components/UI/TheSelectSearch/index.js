import React from 'react';

import Select from 'react-select';

import Label from 'components/UI/Label';
import FormControl from 'components/UI/FormControl';

const TheSelectSearch = React.forwardRef(({
  id,
  name,
  label,
  classes,
  options,
  value,
  onChange,
  ...rest
}, ref) => {
  // Transform options from {value, name} to {value, label} format for react-select
  const transformedOptions = React.useMemo(() => {
    if (!options) return [];
    return options.map(opt => ({
      value: opt.value,
      label: opt.label || opt.name // Support both label and name for backward compatibility
    }));
  }, [options]);

  // Find the selected option object from the value
  const selectedOption = React.useMemo(() => {
    if (!value || !transformedOptions.length) return null;
    return transformedOptions.find(opt => opt.value === value) || null;
  }, [value, transformedOptions]);

  // Handle onChange to pass only the value (not the entire option object)
  const handleChange = React.useCallback((selectedOption) => {
    if (onChange) {
      onChange(selectedOption?.value || '');
    }
  }, [onChange]);

  // Custom styles matching the original CSS
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: '48px',
      minHeight: '48px',
      background: 'linear-gradient(135deg, var(--palette-background-paper) 0%, var(--palette-background-elevated) 100%)',
      border: '2px solid var(--palette-divider)',
      borderRadius: '12px',
      boxShadow: state.isFocused ? 'none' : '0 2px 12px rgba(0, 0, 0, 0.08)',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: 'var(--palette-divider)',
        boxShadow: 'none',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 20px',
      height: '48px',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--palette-text-primary)',
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: '1.4rem',
      fontWeight: 500,
    }),
    input: (base) => ({
      ...base,
      color: 'var(--palette-text-primary)',
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: '1.4rem',
      fontWeight: 500,
      margin: 0,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--palette-text-secondary)',
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: '1.4rem',
      fontWeight: 500,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--palette-action-active)',
      padding: '0 19px',
      '&:hover': {
        color: 'var(--palette-action-active)',
      },
    }),
    menu: (base) => ({
      ...base,
      background: 'linear-gradient(135deg, var(--palette-background-paper) 0%, var(--palette-background-elevated) 100%)',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      marginTop: '8px',
      padding: '8px 0',
      overflow: 'hidden',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      maxHeight: '320px',
    }),
    option: (base, state) => ({
      ...base,
      height: '44px',
      padding: '12px 20px',
      margin: '4px 8px',
      color: state.isSelected 
        ? 'var(--palette-primary-contrast-text)' 
        : state.isFocused 
          ? 'var(--palette-text-primary)' 
          : 'var(--palette-text-secondary)',
      background: state.isSelected
        ? 'linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main))'
        : state.isFocused
          ? 'var(--palette-action-hover)'
          : 'transparent',
      borderRadius: '8px',
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: '1.4rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      transform: state.isFocused && !state.isSelected ? 'translateX(4px)' : 'none',
      boxShadow: state.isSelected ? '0 2px 8px rgba(var(--palette-primary-main-rgb), 0.3)' : 'none',
      '&:active': {
        background: state.isSelected
          ? 'linear-gradient(135deg, var(--palette-primary-main), var(--palette-secondary-main))'
          : 'var(--palette-action-hover)',
      },
    }),
  };

  return (
    <FormControl>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select
        ref={ref}
        inputId={id}
        name={name}
        options={transformedOptions}
        value={selectedOption}
        onChange={handleChange}
        styles={customStyles}
        isSearchable={false}
        {...rest}
      />
    </FormControl>
  );
});

TheSelectSearch.displayName = 'TheSelectSearch';

export default TheSelectSearch;
