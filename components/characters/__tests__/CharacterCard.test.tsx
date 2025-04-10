import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterCard from '../CharacterCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', ...props }: { alt?: string; [key: string]: any }) => (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

jest.mock('react-parallax-tilt', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tilt-component">{children}</div>
  ),
}));

describe('CharacterCard', () => {
  const mockCharacter = {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'Tatooine',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
    imageUrl: '/path/to/image.jpg',
  };

  const mockProps = {
    character: mockCharacter,
    index: 0,
    onCharacterClick: jest.fn(),
    isOpen: false,
    selectedCharacter: null,
    handleTabKey: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the character card with correct content', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CharacterCard {...mockProps} ref={ref} />);

      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByTestId('tilt-component')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', '/path/to/image.jpg');
    });

    it('renders placeholder state correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CharacterCard
          {...mockProps}
          character={{ ...mockCharacter, placeholder: true }}
          ref={ref}
        />
      );

      expect(screen.getByAltText('Placeholder for Luke Skywalker')).toHaveAttribute(
        'src',
        '/img/svg/human.svg'
      );
      expect(screen.getByRole('button')).toHaveStyle({ opacity: 0.5 });
    });

    it('applies correct styles when modal is open', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CharacterCard {...mockProps} isOpen={true} selectedCharacter={mockCharacter} ref={ref} />
      );

      const card = screen.getByRole('button');
      expect(card).toHaveStyle({ opacity: mockProps.character.id === '1' ? 1 : 0.5 });
    });
  });

  describe('User Interactions', () => {
    it('handles keyboard navigation correctly', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLDivElement>();
      render(<CharacterCard {...mockProps} ref={ref} />);

      const card = screen.getByRole('button');

      await user.tab();
      expect(card).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(mockProps.onCharacterClick).toHaveBeenCalledWith(mockCharacter, 0);
      expect(mockProps.handleTabKey).toHaveBeenCalled();
    });

    it('handles click events', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLDivElement>();
      render(<CharacterCard {...mockProps} ref={ref} />);

      await user.click(screen.getByRole('button'));
      expect(mockProps.onCharacterClick).toHaveBeenCalledWith(mockCharacter, 0);
    });

    it('prevents interaction when in placeholder state', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CharacterCard
          {...mockProps}
          character={{ ...mockCharacter, placeholder: true }}
          ref={ref}
        />
      );

      await user.click(screen.getByRole('button'));
      expect(mockProps.onCharacterClick).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('handles image loading errors', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CharacterCard {...mockProps} ref={ref} />);

      const image = screen.getByRole('img');
      fireEvent.error(image);

      expect(image).toHaveAttribute('src', '/img/placeholder.jpg');
    });
  });
});
