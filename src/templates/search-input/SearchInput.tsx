import React, { FC, useState } from "react";
import styles from "./search-input.module.scss";

export interface SearchInputState {
  textSearch: string;
}

type Props = {
  onSubmit: (query: string) => void;
};

const SearchInput: FC<Props> = ({ onSubmit }) => {
  const [textSearch, setTextSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(textSearch);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Rechercher..."
        name="search"
        value={textSearch}
        onChange={handleSearchChange}
      />
      <button className={styles.searchButton} type="submit">
        <svg
          className={styles.searchIcon}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.60809 9.60806L13.3334 13.3333"
            stroke="white"
            strokeLinecap="square"
          />
          <path
            d="M6.66669 10.6667C8.87583 10.6667 10.6667 8.8758 10.6667 6.66666C10.6667 4.45752 8.87583 2.66666 6.66669 2.66666C4.45755 2.66666 2.66669 4.45752 2.66669 6.66666C2.66669 8.8758 4.45755 10.6667 6.66669 10.6667Z"
            stroke="white"
            strokeLinecap="square"
          />
        </svg>
      </button>
      <svg
        className={styles.buttonVector}
        viewBox="0 0 93 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.6239 52L86.4943 39.3456L93 -3.8147e-06L-2.02199e-06 5.74232L19.6239 52Z"
          fill="#E05A4F"
        />
      </svg>
    </form>
  );
};

export default SearchInput;
