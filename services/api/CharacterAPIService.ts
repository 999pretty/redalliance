import { BaseAPIService } from './BaseAPIService';
import { CharacterAPIService as ICharacterAPIService, PaginatedResponse } from './types';
import { Character } from '../../types/character.types';
import { API } from '../../config/constants';

export class CharacterAPIService extends BaseAPIService implements ICharacterAPIService {
  constructor() {
    super(API.BASE_URL);
  }

  /**
   * Extracts the character ID from a SWAPI URL
   */
  private getCharacterId(url: string): string {
    const matches = url.match(/\/people\/(\d+)/);
    return matches ? matches[1] : '1';
  }

  /**
   * Adds image URLs to character data
   */
  private addImageUrls(characters: Character[]): Character[] {
    return characters.map((character) => ({
      ...character,
      imageUrl: `${API.IMAGE_BASE_URL}/${this.getCharacterId(character.url)}.jpg`,
    }));
  }

  /**
   * Fetches all characters from the API, handling pagination
   */
  async getAllCharacters(): Promise<PaginatedResponse<Character>> {
    const url = this.buildUrl(API.ENDPOINTS.PEOPLE);
    const allResults = await this.getAll<Character>(url);

    return {
      count: allResults.length,
      next: null,
      previous: null,
      results: this.addImageUrls(allResults),
    };
  }

  /**
   * Fetches a character's homeworld data
   */
  async getCharacterHomeworld(url: string): Promise<{ name: string }> {
    return this.get<{ name: string }>(url);
  }
}
