import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransportButton } from './TransportButton';
import { Car } from 'lucide-react';

describe('TransportButton Atom', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    label: 'Carro',
    icon: Car,
    isActive: false,
    onClick: mockOnClick,
    testId: 'btn-carro',
  };

  it('should render button text and icon correctly', () => {
    render(<TransportButton {...defaultProps} />);
    expect(screen.getByText('Carro')).toBeInTheDocument();
    expect(screen.getByTestId('btn-carro')).toBeInTheDocument();
  });

  it('should apply correct accessibility attributes when active', () => {
    render(<TransportButton {...defaultProps} isActive />);
    const button = screen.getByTestId('btn-carro');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.getAttribute('data-active')).toBe('true');
  });

  it('should trigger onClick function when pressed', () => {
    render(<TransportButton {...defaultProps} />);
    const button = screen.getByTestId('btn-carro');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
