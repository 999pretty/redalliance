import { useState, useCallback } from 'react';
import { Character } from '../types/character.types';
import { CharacterAPIService } from '../services/api/CharacterAPIService';
import { UI } from '../config/constants';

/**
 * Return type for the useCharacters hook
 */
interface UseCharactersReturn {
  /** List of characters for the current page */
  characters: Character[];
  /** Complete list of all fetched characters */
  allCharacters: Character[];
  /** Loading state indicator */
  loading: boolean;
  /** Error state, null if no error */
  error: Error | null;
  /** Function to fetch all characters from the API */
  fetchAllCharacters: () => Promise<void>;
  /** Function to fetch a character's homeworld */
  fetchCharacterHomeworld: (character: Character) => Promise<Character>;
}

/**
 * Custom hook for managing Star Wars characters data
 * Handles fetching, error states, and loading states for character data
 *
 * @returns {UseCharactersReturn} Object containing character data and management functions
 *
 * @example
 * const { characters, loading, error, fetchAllCharacters } = useCharacters();
 */
export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const api = new CharacterAPIService();

  /**
   * Creates an array of placeholder characters for loading/error states
   * @param count - Number of placeholder characters to create
   * @returns Array of placeholder character objects
   */
  const createPlaceholderCharacters = (count: number): Character[] => {
    return Array(count).fill({
      id: 'error',
      name: 'Error loading character',
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
    });
  };

  /**
   * Fetches all characters from the SWAPI API
   * Handles pagination and adds image URLs to character data
   */
  const fetchAllCharacters = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.getAllCharacters();
      setAllCharacters(response.results);
      setCharacters(response.results);
      setLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(new Error(errorMessage));
      setCharacters(createPlaceholderCharacters(UI.PLACEHOLDER_COUNT));
      setLoading(false);
    }
  }, []);

  /**
   * Fetches the homeworld data for a specific character
   * @param character - The character whose homeworld to fetch
   * @returns The character object with resolved homeworld name
   * @throws Error if the homeworld fetch fails
   */
  const fetchCharacterHomeworld = async (character: Character): Promise<Character> => {
    try {
      const homeworldData = await api.getCharacterHomeworld(character.homeworld);
      return {
        ...character,
        homeworld: homeworldData.name,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch homeworld';
      throw new Error(errorMessage);
    }
  };

  return {
    characters,
    allCharacters,
    loading,
    error,
    fetchAllCharacters,
    fetchCharacterHomeworld,
  };
};
