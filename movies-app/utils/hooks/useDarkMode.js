import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'dark-mode';
const DEFAULT_DARK_CLASS = 'dark';
const DEFAULT_LIGHT_CLASS = 'light';

const getInitialPreference = (initialValue) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (storedValue !== null) {
    return storedValue === 'true';
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return initialValue;
};

const useDarkMode = (initialValue = false, options = {}) => {
  const darkClass = options.classNameDark || DEFAULT_DARK_CLASS;
  const lightClass = options.classNameLight || DEFAULT_LIGHT_CLASS;
  const hasExplicitPreferenceRef = useRef(false);
  const shouldPersistRef = useRef(false);
  const [value, setValue] = useState(() => getInitialPreference(initialValue));

  const applyClassNames = useCallback((isDark) => {
    if (typeof document === 'undefined') {
      return;
    }

    const { classList } = document.body;
    if (!classList) {
      return;
    }

    classList.toggle(darkClass, isDark);
    classList.toggle(lightClass, !isDark);
  }, [darkClass, lightClass]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    const hasExplicitPreference = storedValue !== null;
    hasExplicitPreferenceRef.current = hasExplicitPreference;
    shouldPersistRef.current = hasExplicitPreference;
    applyClassNames(value);
  // we want to run this effect once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      if (hasExplicitPreferenceRef.current) {
        return;
      }

      setValue(event.matches);
    };

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(handleChange);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handleChange);
      } else if (typeof media.removeListener === 'function') {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    applyClassNames(value);

    if (typeof window !== 'undefined' && shouldPersistRef.current) {
      window.localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
    }
  }, [applyClassNames, value]);

  const markExplicitPreference = useCallback(() => {
    hasExplicitPreferenceRef.current = true;
    shouldPersistRef.current = true;
  }, []);

  const enable = useCallback(() => {
    markExplicitPreference();
    setValue(true);
  }, [markExplicitPreference]);

  const disable = useCallback(() => {
    markExplicitPreference();
    setValue(false);
  }, [markExplicitPreference]);

  const toggle = useCallback(() => {
    markExplicitPreference();
    setValue((prev) => !prev);
  }, [markExplicitPreference]);

  return useMemo(() => ({
    value,
    enable,
    disable,
    toggle,
  }), [disable, enable, toggle, value]);
};

export default useDarkMode;
