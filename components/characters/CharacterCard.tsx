import React, { ForwardRefRenderFunction } from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { Character } from '../../types/character.types';
import { poppins } from '@/app/fonts';

type CharacterCardProps = {
  character: Character;
  index: number;
  onCharacterClick: (character: Character, index: number) => Promise<void>;
  isOpen: boolean;
  selectedCharacter: Character | null;
  handleTabKey: (e: React.KeyboardEvent) => void;
};

const CharacterCard: ForwardRefRenderFunction<HTMLDivElement, CharacterCardProps> = (
  { character, index, onCharacterClick, isOpen, selectedCharacter, handleTabKey },
  ref
) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/img/placeholder.jpg';
  };

  return (
    <li data-aos="fade-right" data-aos-duration="1200">
      <Tilt>
        <div
          ref={ref}
          className="list_inner"
          onClick={() => {
            if (!character.placeholder) {
              onCharacterClick(character, index);
            }
          }}
          onKeyDown={(e) => {
            handleTabKey(e);
            if (e.key === 'Enter') {
              onCharacterClick(character, index);
            }
          }}
          style={{
            opacity: character.placeholder ? 0.5 : 1,
            backgroundColor: '#111319',
            borderRadius: '10px',
            padding: '20px',
            transition: 'all 0.3s ease',
            cursor: character.placeholder ? 'default' : 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px #8B0000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            if (e.currentTarget !== document.activeElement) {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${character.name}${
            character.placeholder
              ? ''
              : `. ${character.gender}, born in ${character.birth_year}, from ${character.homeworld}`
          }`}
          aria-pressed={isOpen && selectedCharacter?.name === character.name ? 'true' : 'false'}
          aria-haspopup="dialog"
        >
          <div className="hover">
            <div
              className="character-image"
              style={{
                width: '200px',
                height: '200px',
                margin: '0 auto 20px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
              aria-label={`Portrait of ${character.name}`}
            >
              {character.placeholder ? (
                <Image
                  src="/img/svg/human.svg"
                  alt={`Placeholder for ${character.name}`}
                  width={200}
                  height={200}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '10px',
                    position: 'relative',
                  }}
                />
              ) : (
                <Image
                  src={character.imageUrl}
                  alt={`Portrait of ${character.name}`}
                  width={200}
                  height={200}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '10px',
                    position: 'relative',
                  }}
                  onError={handleImageError}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(315deg, rgba(139, 0, 0, 0.3) 0%, rgba(139, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.15) 60%), rgba(0, 0, 0, 0.15)',
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              />
            </div>
            <div className="characters_title" role="heading" aria-level={3}>
              <h3 className={poppins.className}>{character.name}</h3>
            </div>
            {!character.placeholder && (
              <div className="details" aria-hidden="true">
                Details<span></span>
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </li>
  );
};

CharacterCard.displayName = 'CharacterCard';

export default React.forwardRef(CharacterCard);
