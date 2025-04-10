import React from 'react';
import '@testing-library/jest-dom';
import type { ImageProps } from 'next/image';

const mockRouter = {
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Partial<ImageProps>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return React.createElement('img', { ...props });
  },
}));
