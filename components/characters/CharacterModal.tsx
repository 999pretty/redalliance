import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { Character } from '../../types/character.types';
import { poppins } from '@/app/fonts';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
  closeButtonRef: React.RefObject<HTMLButtonElement>;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  isOpen,
  onClose,
  character,
  closeButtonRef,
  handleImageError,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Character Details"
      className="custom-modal"
      overlayClassName="custom-overlay"
      closeTimeoutMS={0}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={false}
      shouldReturnFocusAfterClose={false}
      preventScroll={true}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'none',
          transition: 'none',
        },
        content: {
          transition: 'none',
        },
      }}
    >
      <div className={`alliance_tm_modalbox ${poppins.className}`} style={{ transition: 'none' }}>
        <button
          ref={closeButtonRef}
          className="close-modal"
          onClick={onClose}
          aria-label="Close dialog"
          tabIndex={0}
          style={{
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px #8B0000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Image src="/img/svg/cancel.svg" alt="close icon" width={45} height={45} />
        </button>

        {character && (
          <div className="box_inner">
            <div className="description_wrap">
              <div className="popup_informations">
                <div className="description">
                  <div
                    className="character-modal-content"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '40px',
                    }}
                  >
                    <div
                      className="character-modal-image"
                      style={{
                        width: '300px',
                        height: '300px',
                        flex: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '10px',
                      }}
                    >
                      <Image
                        src={character.imageUrl}
                        alt={character.name}
                        width={300}
                        height={300}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '10px',
                          position: 'relative',
                        }}
                        onError={handleImageError}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(315deg, rgba(139, 0, 0, 0.3) 0%, rgba(139, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.15) 40%), rgba(0, 0, 0, 0.15)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                    <div className="character-modal-details" style={{ flex: 1 }}>
                      <h3
                        className={poppins.className}
                        style={{
                          marginTop: 0,
                          color: '#FFFFFF',
                        }}
                      >
                        {character.name}
                      </h3>
                      <div
                        className="character-details"
                        style={{
                          display: 'grid',
                          gap: '10px',
                          marginBottom: '25px',
                        }}
                      >
                        <CharacterDetail label="Height" value={`${character.height} cm`} />
                        <CharacterDetail label="Mass" value={`${character.mass} kg`} />
                        <CharacterDetail label="Hair Color" value={character.hair_color} />
                        <CharacterDetail label="Eye Color" value={character.eye_color} />
                        <CharacterDetail label="Birth Year" value={character.birth_year} />
                        <CharacterDetail label="Gender" value={character.gender} />
                        <CharacterDetail label="Homeworld" value={character.homeworld} />
                      </div>
                      <div className="character-description">
                        <h4
                          className={poppins.className}
                          style={{
                            color: '#FFFFFF',
                            marginTop: 0,
                            marginBottom: '15px',
                            fontSize: '18px',
                          }}
                        >
                          Description
                        </h4>
                        <p
                          className={poppins.className}
                          style={{
                            margin: 0,
                            lineHeight: '1.6',
                            color: '#666',
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

interface CharacterDetailProps {
  label: string;
  value: string;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ label, value }) => (
  <p
    style={{
      margin: 0,
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      alignItems: 'center',
    }}
  >
    <strong style={{ color: '#8B0000' }}>{label}:</strong>
    <span>{value}</span>
  </p>
);

export default CharacterModal;
