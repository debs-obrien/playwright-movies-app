
import React from 'react';
import clsx from 'clsx';
import { TMDB_API_VERSION, TMDB_IMAGE_BASE_URL } from 'config/tmdb';
import { NOTHING_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import tmdbAPI from 'services/tmdbAPI';
import { W92H138 } from 'config/image-sizes';
import classes from './style.module.css';

// Remove unused renderOption function - we use renderEnhancedOption instead

const getOptions = async query => {
  try {
    // Add a small delay to show loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/search/movie`, {
      params: {
        query
      }
    });
    const results = response.data.results;
    
    if (results.length === 0) {
      // Return a special "no results" option with shorter text
      return [{
        value: 'no-results',
        name: `No movies found for "${query}"`,
        subtitle: `Try a different search term`,
        disabled: true
      }];
    }
    
    const options = results.map(result => ({
      value: result.id.toString(),
      name: result.title,
      image: result.poster_path ? `${TMDB_IMAGE_BASE_URL}w${W92H138.WIDTH}${result.poster_path}` : NOTHING_PLACEHOLDER_IMAGE_PATH
    }));
    return options;
  } catch (error) {
    console.log('[MovieSelectSearch getOptions] error => ', error);
    // Return error option that user can see
    return [{
      value: 'error',
      name: 'Search failed',
      subtitle: 'Please try again',
      disabled: true
    }];
  }
};

const MovieSelectSearch = props => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  const handleSearch = async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    setShowDropdown(true);
    
    try {
      const options = await getOptions(searchQuery);
      setResults(options);
    } catch (error) {
      console.error('Search error:', error);
      setResults([{
        value: 'error',
        name: 'Search failed',
        subtitle: 'Please try again',
        type: 'error-state',
        disabled: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce the search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleOptionClick = (option) => {
    if (option.disabled) return;
    if (props.onChange) {
      // The parent expects just the movie ID, not the full option object
      props.onChange(option.value);
    }
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div className={clsx(classes.container, 'select-search-container', { 'is-loading': loading })}>
      <input
        type="text"
        placeholder={props.placeholder || "Search for a movie..."}
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(query.length > 0)}
        className={clsx(classes.input, { [classes['is-loading']]: loading })}
        id={props.id}
        role="textbox"
        name={props.label || "Add Item"}
        aria-label={props.label || "Add Item"}
      />
      
      {showDropdown && (
        <div className={clsx(classes.select, 'select-search-options')}>
          {loading ? (
            <div className={classes.loading}>
              <div className={classes.loadingSpinner} />
              <div className={classes.loadingText}>
                Searching for movies...
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className={classes['not-found']}>
              Type to search for movies
            </div>
          ) : (
            <div className={classes.options}>
              {results.map((option, index) => (
                <div
                  key={option.value || index}
                  className="select-search-option"
                >
                  {option.disabled ? (
                    // No results or error state - show as text, not clickable button
                    <div className={classes['not-found']}>
                      {option.name}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      className={classes.option}
                    >
                      <img
                        src={option.image || NOTHING_PLACEHOLDER_IMAGE_PATH}
                        alt={option.name}
                      />
                      <span>
                        {option.name}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSelectSearch;
