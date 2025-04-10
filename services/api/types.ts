import { Character } from '../../types/character.types';

/**
 * Generic API response type for paginated data
 */
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

/**
 * API error response
 */
export type APIError = {
  status: number;
  message: string;
};

/**
 * Base API service type
 */
export type APIService = {
  get<T>(url: string): Promise<T>;
  getAll<T>(url: string): Promise<T[]>;
};

/**
 * Character API service type
 */
export type CharacterAPIService = {
  getAllCharacters(): Promise<PaginatedResponse<Character>>;
  getCharacterHomeworld(url: string): Promise<{ name: string }>;
};

/**
 * API configuration type
 */
export type APIConfig = {
  baseURL: string;
  endpoints: {
    [key: string]: string;
  };
  imageBaseURL: string;
};
