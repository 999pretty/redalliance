import { APIService } from './types';
import { ERROR_MESSAGES } from '../../config/constants';

type PaginatedResponse<T> = {
  next: string | null;
  results: T[];
};

export class BaseAPIService implements APIService {
  constructor(protected baseURL: string) {}

  /**
   * Handles API errors and transforms them into a consistent format
   */
  protected handleError(error: unknown): never {
    if (error instanceof Response) {
      throw new Error(ERROR_MESSAGES.HTTP_ERROR(error.status));
    }

    const message = error instanceof Error ? error.message : ERROR_MESSAGES.FETCH_CHARACTERS;
    throw new Error(message);
  }

  /**
   * Makes a GET request to the specified URL
   */
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw response;
      }
      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Makes multiple GET requests to fetch all paginated data
   * @param initialUrl - The initial URL to start fetching from
   * @returns An array of all results from all pages
   */
  async getAll<T>(initialUrl: string): Promise<T[]> {
    try {
      let url: string | null = initialUrl;
      const results: T[] = [];

      while (url) {
        const response: PaginatedResponse<T> = await this.get(url);
        if (!response.results) {
          throw new Error('Invalid response format: missing results array');
        }
        results.push(...response.results);
        url = response.next;
      }

      return results;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Builds a full URL by combining the base URL with the provided path
   */
  protected buildUrl(path: string): string {
    return `${this.baseURL}${path}`;
  }
}
