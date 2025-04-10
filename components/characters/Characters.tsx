import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from 'react-modal';
import { poppins } from '@/app/fonts';
import { Character } from '../../types/character.types';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import SearchAndFilter from './SearchAndFilter';
import ErrorBoundary from '../ErrorBoundary';
import { useCharacters } from '../../hooks/useCharacters';

Modal.setAppElement('#__next');

type CharactersProps = {
  setShowCursor?: (show: boolean) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
};

const Characters: React.FC<CharactersProps> = ({ setShowCursor, setIsModalOpen }) => {
  const {
    characters: allCharacters,
    loading,
    error,
    fetchAllCharacters,
    fetchCharacterHomeworld,
  } = useCharacters();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterProperty, setFilterProperty] = useState<keyof Character>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const ITEMS_PER_PAGE = 8;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const filterSelectRef = useRef<HTMLSelectElement>(null);
  const ascButtonRef = useRef<HTMLButtonElement>(null);
  const descButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const characterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number>(-1);

  const [filterInputFocused, setFilterInputFocused] = useState(false);
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const [ascButtonFocused, setAscButtonFocused] = useState(false);
  const [descButtonFocused, setDescButtonFocused] = useState(false);

  useEffect(() => {
    if (setShowCursor && setIsModalOpen) {
      setShowCursor(true);
      setIsModalOpen(isOpen);
    }
  }, [isOpen, setShowCursor, setIsModalOpen]);

  useEffect(() => {
    characterRefs.current = new Array(characters.length).fill(null);
  }, [characters]);

  useEffect(() => {
    fetchAllCharacters();
  }, [fetchAllCharacters]);

  const sortCharacters = useCallback(
    (chars: Character[], direction: 'asc' | 'desc'): Character[] => {
      return [...chars].sort((a, b) => {
        if (filterProperty === 'birth_year') {
          if (a.birth_year === 'unknown' && b.birth_year === 'unknown') return 0;
          if (a.birth_year === 'unknown') return 1;
          if (b.birth_year === 'unknown') return -1;

          const yearA = parseFloat(a.birth_year.replace('BBY', '').replace('ABY', '')) || 0;
          const yearB = parseFloat(b.birth_year.replace('BBY', '').replace('ABY', '')) || 0;

          const isABby = a.birth_year.includes('BBY');
          const isBBby = b.birth_year.includes('BBY');

          const normalizedYearA = isABby ? yearA : -yearA;
          const normalizedYearB = isBBby ? yearB : -yearB;

          return direction === 'asc'
            ? normalizedYearB - normalizedYearA
            : normalizedYearA - normalizedYearB;
        }

        const valueA = String(a[filterProperty]).toLowerCase();
        const valueB = String(b[filterProperty]).toLowerCase();

        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
    },
    [filterProperty]
  );

  useEffect(() => {
    const filteredChars = allCharacters.filter((character) => {
      const searchValue = searchTerm.toLowerCase();
      const propertyValue = String(character[filterProperty]).toLowerCase();

      if (filterProperty === 'birth_year' && searchValue && character.birth_year === 'unknown') {
        return false;
      }

      if (filterProperty === 'gender' && !searchValue) {
        return true;
      }

      if (filterProperty === 'gender') {
        return searchValue === propertyValue;
      }
      return propertyValue.includes(searchValue);
    });

    const sortedChars = sortCharacters(filteredChars, sortDirection);
    setTotalPages(Math.ceil(sortedChars.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
    setCharacters(sortedChars.slice(0, ITEMS_PER_PAGE));
  }, [searchTerm, filterProperty, allCharacters, sortDirection, sortCharacters]);

  useEffect(() => {
    const filteredChars = allCharacters.filter((character) => {
      const searchValue = searchTerm.toLowerCase();
      const propertyValue = String(character[filterProperty]).toLowerCase();

      if (filterProperty === 'birth_year' && searchValue && character.birth_year === 'unknown') {
        return false;
      }

      if (filterProperty === 'gender' && !searchValue) {
        return true;
      }

      if (filterProperty === 'gender') {
        return searchValue === propertyValue;
      }
      return propertyValue.includes(searchValue);
    });

    const sortedChars = sortCharacters(filteredChars, sortDirection);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCharacters(sortedChars.slice(startIndex, endIndex));
  }, [currentPage, allCharacters, searchTerm, filterProperty, sortDirection, sortCharacters]);

  const handleCharacterClick = async (character: Character, index: number): Promise<void> => {
    if (character.placeholder) return;

    setLastSelectedIndex(index);

    try {
      const characterWithHomeworld = await fetchCharacterHomeworld(character);
      setSelectedCharacter(characterWithHomeworld);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching character details:', error);
      setSelectedCharacter({
        ...character,
        homeworld: 'Failed to load homeworld',
      });
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    if (lastSelectedIndex >= 0 && characterRefs.current[lastSelectedIndex]) {
      setTimeout(() => {
        characterRefs.current[lastSelectedIndex]?.focus();
      }, 0);
    }
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const getSuggestions = (value: string): string[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : allCharacters
          .map((char) => String(char[filterProperty]))
          .filter((val) => val.toLowerCase().includes(inputValue))
          .slice(0, 5);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestions(getSuggestions(value));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (isOpen) {
        closeButtonRef.current?.focus();
        return;
      }
      if (e.target === filterSelectRef.current) {
        ascButtonRef.current?.focus();
      } else if (e.target === ascButtonRef.current) {
        descButtonRef.current?.focus();
      } else if (e.target === descButtonRef.current) {
        searchInputRef.current?.focus();
      } else if (e.target === searchInputRef.current) {
        characterRefs.current[0]?.focus();
      } else {
        const currentIndex = characterRefs.current.findIndex((ref) => ref === e.target);
        if (currentIndex >= 0) {
          if (currentIndex < characterRefs.current.length - 1) {
            characterRefs.current[currentIndex + 1]?.focus();
          } else {
            if (currentPage !== 1 && prevButtonRef.current) {
              prevButtonRef.current.focus();
            } else if (currentPage !== totalPages && nextButtonRef.current) {
              nextButtonRef.current.focus();
            } else {
              filterSelectRef.current?.focus();
            }
          }
        } else if (e.target === prevButtonRef.current) {
          if (currentPage !== totalPages && nextButtonRef.current) {
            nextButtonRef.current.focus();
          } else {
            filterSelectRef.current?.focus();
          }
        } else if (e.target === nextButtonRef.current) {
          filterSelectRef.current?.focus();
        }
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/img/placeholder.jpg';
  };

  if (error) {
    return (
      <div
        className={poppins.className}
        style={{
          padding: '20px',
          textAlign: 'center',
          color: '#FFFFFF',
          backgroundColor: 'rgba(139, 0, 0, 0.9)',
          borderRadius: '8px',
          margin: '20px',
        }}
      >
        <h2 style={{ marginBottom: '15px' }}>Error loading characters</h2>
        <p style={{ marginBottom: '15px' }}>{error.message}</p>
        <button
          onClick={() => fetchAllCharacters()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FFFFFF',
            color: '#8B0000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <style jsx>{`
        @media (max-width: 450px) {
          .page-btn {
            font-size: 11px !important;
            padding: 6px 12px !important;
            min-width: 50px !important;
          }
          .pagination {
            gap: 10px !important;
          }
          .page-info {
            font-size: 8px !important;
          }
        }
      `}</style>
      <div className={`characters_list ${poppins.className}`}>
        <SearchAndFilter
          filterProperty={filterProperty}
          setFilterProperty={setFilterProperty}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
          showSuggestions={showSuggestions}
          filterSelectRef={filterSelectRef}
          ascButtonRef={ascButtonRef}
          descButtonRef={descButtonRef}
          searchInputRef={searchInputRef}
          handleTabKey={handleTabKey}
          filterInputFocused={filterInputFocused}
          setFilterInputFocused={setFilterInputFocused}
          searchInputFocused={searchInputFocused}
          setSearchInputFocused={setSearchInputFocused}
          ascButtonFocused={ascButtonFocused}
          setAscButtonFocused={setAscButtonFocused}
          descButtonFocused={descButtonFocused}
          setDescButtonFocused={setDescButtonFocused}
        />

        <ul className="character-grid">
          {loading
            ? Array(8)
                .fill(null)
                .map((_, index) => (
                  <CharacterCard
                    key={`loading-${index}`}
                    character={{
                      id: `loading-${index}`,
                      name: 'Loading...',
                      placeholder: true,
                      height: '',
                      mass: '',
                      hair_color: '',
                      skin_color: '',
                      eye_color: '',
                      birth_year: '',
                      gender: '',
                      homeworld: '',
                      films: [],
                      species: [],
                      vehicles: [],
                      starships: [],
                      created: '',
                      edited: '',
                      url: '',
                      imageUrl: '/img/svg/human.svg',
                    }}
                    index={index}
                    onCharacterClick={handleCharacterClick}
                    isOpen={isOpen}
                    selectedCharacter={selectedCharacter}
                    handleTabKey={handleTabKey}
                    ref={(el) => {
                      characterRefs.current[index] = el;
                    }}
                  />
                ))
            : characters.map((character, index) => (
                <CharacterCard
                  key={`${character.name}-${index}`}
                  character={character}
                  index={index}
                  onCharacterClick={handleCharacterClick}
                  isOpen={isOpen}
                  selectedCharacter={selectedCharacter}
                  handleTabKey={handleTabKey}
                  ref={(el) => {
                    characterRefs.current[index] = el;
                  }}
                />
              ))}
        </ul>

        <div className="pagination">
          <button
            ref={prevButtonRef}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`page-btn ${poppins.className}`}
            onKeyDown={handleTabKey}
            tabIndex={-1}
            aria-label="Go to previous page"
            style={{
              outline: 'none',
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '16px',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow = '0 0 0 2px #8B0000';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Previous
          </button>
          <span
            className={`page-info ${poppins.className}`}
            aria-live="polite"
            style={{
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              fontWeight: '600',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            ref={nextButtonRef}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`page-btn ${poppins.className}`}
            onKeyDown={handleTabKey}
            tabIndex={-1}
            aria-label="Go to next page"
            style={{
              outline: 'none',
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '16px',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.boxShadow = '0 0 0 2px #8B0000';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Next
          </button>
        </div>

        <CharacterModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          character={selectedCharacter}
          closeButtonRef={closeButtonRef}
          handleImageError={handleImageError}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Characters;
