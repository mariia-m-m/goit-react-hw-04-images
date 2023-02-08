import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChage = useCallback(event => {
    const { value } = event.target;
    setSearch(value);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ search });
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <header className={styles.SearchBar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}></span>
        </button>
        <label htmlFor="search">
          <input
            className={styles.SearchFormInput}
            onChange={handleChage}
            name="search"
            value={search.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </label>
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
