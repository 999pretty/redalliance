import React, { Component, ErrorInfo, ReactNode } from 'react';
import { poppins } from '@/app/fonts';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className={poppins.className}
            style={{
              padding: '20px',
              textAlign: 'center',
              color: '#FFFFFF',
              backgroundColor: 'rgba(139, 0, 0, 0.9)',
              borderRadius: '8px',
              margin: '20px',
            }}
          >
            <h2 style={{ marginBottom: '15px' }}>Something went wrong</h2>
            <p style={{ marginBottom: '15px' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FFFFFF',
                color: '#8B0000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Reload page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
