import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransportSelector } from './TransportSelector';
import { useTripStore } from '@/stores/useTripStore';

jest.mock('@/stores/useTripStore');
const mockUseTripStore = useTripStore as unknown as jest.Mock;

describe('TransportSelector Molecule', () => {
  const mockSetTransport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render 5 transport options when trip mode is simple', () => {
    mockUseTripStore.mockReturnValue({
      mode: 'simple',
      currentTransport: 'car',
      setTransport: mockSetTransport,
    });

    render(<TransportSelector />);
    expect(screen.getByTestId('transport-btn-car')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-motorcycle')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-bus')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-walking')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-bicycle')).toBeInTheDocument();
    expect(screen.queryByTestId('transport-btn-plane')).not.toBeInTheDocument();
    expect(screen.queryByTestId('transport-btn-truck')).not.toBeInTheDocument();
    expect(screen.queryByTestId('transport-btn-train')).not.toBeInTheDocument();
    expect(screen.queryByTestId('transport-btn-ship')).not.toBeInTheDocument();
  });

  it('should render all 9 transport options including motorcycle when mode is custom', () => {
    mockUseTripStore.mockReturnValue({
      mode: 'custom',
      currentTransport: 'car',
      setTransport: mockSetTransport,
    });
    render(<TransportSelector />);
    expect(screen.getByTestId('transport-btn-plane')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-truck')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-train')).toBeInTheDocument();
    expect(screen.getByTestId('transport-btn-ship')).toBeInTheDocument();
  });

  it('should call setTransport with correct id when a transport button is clicked', () => {
    mockUseTripStore.mockReturnValue({
      mode: 'simple',
      currentTransport: 'car',
      setTransport: mockSetTransport,
    });
    render(<TransportSelector />);
    const busButton = screen.getByTestId('transport-btn-bus');
    fireEvent.click(busButton);
    expect(mockSetTransport).toHaveBeenCalledTimes(1);
    expect(mockSetTransport).toHaveBeenCalledWith('bus');
  });
});
