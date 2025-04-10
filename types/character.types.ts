import { StaticImageData } from 'next/image';

export interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  imageUrl: string | StaticImageData;
  placeholder?: boolean;
}

export interface CharactersProps {
  setShowCursor?: (show: boolean) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
}

export interface SWAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
