import { Character } from '../../types/character.types';

/**
 * Generic API response type for paginated data
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * API error response
 */
export interface APIError {
  status: number;
  message: string;
}

/**
 * Base API service interface
 */
export interface APIService {
  get<T>(url: string): Promise<T>;
  getAll<T>(url: string): Promise<T[]>;
}

/**
 * Character API service interface
 */
export interface CharacterAPIService {
  getAllCharacters(): Promise<PaginatedResponse<Character>>;
  getCharacterHomeworld(url: string): Promise<{ name: string }>;
}

/**
 * API configuration type
 */
export interface APIConfig {
  baseURL: string;
  endpoints: {
    [key: string]: string;
  };
  imageBaseURL: string;
}
