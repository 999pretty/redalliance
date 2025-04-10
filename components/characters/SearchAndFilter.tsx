import React from 'react';
import { Character } from '../../types/character.types';
import { CSSProperties } from 'react';

interface SearchAndFilterProps {
  filterProperty: keyof Character;
  setFilterProperty: (property: keyof Character) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
  showSuggestions: boolean;
  filterSelectRef: React.RefObject<HTMLSelectElement>;
  ascButtonRef: React.RefObject<HTMLButtonElement>;
  descButtonRef: React.RefObject<HTMLButtonElement>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  handleTabKey: (e: React.KeyboardEvent) => void;
  filterInputFocused: boolean;
  setFilterInputFocused: (focused: boolean) => void;
  searchInputFocused: boolean;
  setSearchInputFocused: (focused: boolean) => void;
  ascButtonFocused: boolean;
  setAscButtonFocused: (focused: boolean) => void;
  descButtonFocused: boolean;
  setDescButtonFocused: (focused: boolean) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filterProperty,
  setFilterProperty,
  sortDirection,
  setSortDirection,
  searchTerm,
  handleSearchChange,
  suggestions,
  handleSuggestionClick,
  showSuggestions,
  filterSelectRef,
  ascButtonRef,
  descButtonRef,
  searchInputRef,
  handleTabKey,
  filterInputFocused,
  setFilterInputFocused,
  searchInputFocused,
  setSearchInputFocused,
  ascButtonFocused,
  setAscButtonFocused,
  descButtonFocused,
  setDescButtonFocused,
}) => {
  const focusedInputStyle: CSSProperties = {
    boxShadow: '0 0 0 2px #8B0000',
    border: '1px solid #8B0000',
  };

  const baseInputStyle: CSSProperties = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'transparent',
    color: 'inherit',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: '"Poppins", sans-serif',
    outline: 'none',
  };

  const baseSortButtonStyle: CSSProperties = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: '"Poppins", sans-serif',
    outline: 'none',
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              style={{
                backgroundColor: '#490d12',
                color: '#fff',
                padding: '0 2px',
              }}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div
      style={{
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div className="filterControls">
        <select
          ref={filterSelectRef}
          value={filterProperty}
          onChange={(e) => setFilterProperty(e.target.value as keyof Character)}
          onFocus={() => setFilterInputFocused(true)}
          onBlur={() => setFilterInputFocused(false)}
          onKeyDown={handleTabKey}
          tabIndex={0}
          aria-label="Filter characters by property"
          className="filterSelect"
          style={{
            ...baseInputStyle,
            ...(filterInputFocused ? focusedInputStyle : {}),
          }}
        >
          <option value="name">Name</option>
          <option value="gender">Gender</option>
          <option value="birth_year">Birth Year</option>
          <option value="homeworld">Homeworld</option>
          <option value="hair_color">Hair Color</option>
          <option value="eye_color">Eye Color</option>
        </select>
        <div className="sortButtons">
          <button
            ref={ascButtonRef}
            onClick={() => setSortDirection('asc')}
            className={`sort-button ${sortDirection === 'asc' ? 'active' : ''}`}
            onFocus={() => setAscButtonFocused(true)}
            onBlur={() => setAscButtonFocused(false)}
            onKeyDown={handleTabKey}
            tabIndex={-1}
            aria-label="Sort ascending"
            style={{
              ...baseSortButtonStyle,
              backgroundColor: sortDirection === 'asc' ? '#191C26' : 'transparent',
              color: sortDirection === 'asc' ? '#ffffff' : 'inherit',
              ...(ascButtonFocused ? { boxShadow: '0 0 0 2px #8B0000' } : {}),
            }}
          >
            <span style={{ fontSize: '16px' }}>↑</span>
            Asc
          </button>
          <button
            ref={descButtonRef}
            onClick={() => setSortDirection('desc')}
            className={`sort-button ${sortDirection === 'desc' ? 'active' : ''}`}
            onFocus={() => setDescButtonFocused(true)}
            onBlur={() => setDescButtonFocused(false)}
            onKeyDown={handleTabKey}
            tabIndex={-1}
            aria-label="Sort descending"
            style={{
              ...baseSortButtonStyle,
              backgroundColor: sortDirection === 'desc' ? '#191C26' : 'transparent',
              color: sortDirection === 'desc' ? '#ffffff' : 'inherit',
              ...(descButtonFocused ? { boxShadow: '0 0 0 2px #8B0000' } : {}),
            }}
          >
            <span style={{ fontSize: '16px' }}>↓</span>
            Desc
          </button>
        </div>
        <div className="searchContainer">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
            onKeyDown={handleTabKey}
            placeholder="Search characters by..."
            tabIndex={-1}
            aria-label="Search characters"
            style={{
              ...baseInputStyle,
              width: '100%',
              ...(searchInputFocused ? focusedInputStyle : {}),
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#111319',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginTop: '5px',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSuggestionClick(suggestion);
                    }
                  }}
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    borderBottom: index < suggestions.length - 1 ? '1px solid #222' : 'none',
                    transition: 'background-color 0.2s',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    font: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#191C26';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = '#191C26';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  role="option"
                  aria-selected={false}
                >
                  {highlightMatch(suggestion, searchTerm)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
