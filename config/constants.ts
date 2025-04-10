/**
 * API Configuration
 */
export const API = {
  BASE_URL: 'https://swapi.py4e.com/api',
  ENDPOINTS: {
    PEOPLE: '/people/',
  },
  IMAGE_BASE_URL: 'https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people',
} as const;

/**
 * Pagination Configuration
 */
export const PAGINATION = {
  ITEMS_PER_PAGE: 8,
  DEFAULT_PAGE: 1,
} as const;

/**
 * UI Configuration
 */
export const UI = {
  SUGGESTIONS_LIMIT: 5,
  PLACEHOLDER_COUNT: 8,
  THEME: {
    PRIMARY_COLOR: '#8B0000',
    TEXT_COLOR: '#FFFFFF',
    ERROR_BG: 'rgba(139, 0, 0, 0.9)',
  },
  FOCUS_STYLES: {
    BOX_SHADOW: '0 0 0 2px #8B0000',
  },
} as const;

/**
 * Asset paths
 */
export const ASSETS = {
  PLACEHOLDER_IMAGE: '/img/placeholder.jpg',
  DEFAULT_AVATAR: '/img/svg/human.svg',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  FETCH_CHARACTERS: 'An unknown error occurred while fetching characters',
  FETCH_HOMEWORLD: 'Failed to fetch homeworld',
  HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
} as const;
