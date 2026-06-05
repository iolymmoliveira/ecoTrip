import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { LocationAutocomplete } from './LocationAutocomplete';
import { usePlaceAutocomplete } from '@/hooks/usePlaceAutocomplete';

jest.mock('@/hooks/usePlaceAutocomplete');

const mockUsePlaceAutocomplete = usePlaceAutocomplete as jest.MockedFunction<
  typeof usePlaceAutocomplete
>;

describe('LocationAutocomplete', () => {
  const mockOnAddressSelect = jest.fn();
  const defaultProps = {
    label: 'Origem',
    placeholder: 'Digite o endereço de partida',
    onAddressSelect: mockOnAddressSelect,
    countryCodes: ['BR'],
    debounceTime: 700,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o label e o input corretamente associados por acessibilidade', () => {
    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: '',
      isSearching: false,
      suggestions: [],
      showSuggestions: false,
      setShowSuggestions: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
    });

    render(<LocationAutocomplete {...defaultProps} />);

    const labelElement = screen.getByText(defaultProps.label);
    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id');
    expect(labelElement).toHaveAttribute(
      'for',
      inputElement.getAttribute('id'),
    );
  });

  it('deve chamar handleInputChange quando o usuário digitar no campo', () => {
    const mockHandleInputChange = jest.fn();

    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: '',
      isSearching: false,
      suggestions: [],
      showSuggestions: false,
      setShowSuggestions: jest.fn(),
      handleInputChange: mockHandleInputChange,
      handleSuggestionSelect: jest.fn(),
    });

    render(<LocationAutocomplete {...defaultProps} />);
    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(input, { target: { value: 'Curitiba' } });
    expect(mockHandleInputChange).toHaveBeenCalledWith('Curitiba');
  });

  it('deve exibir a lista de sugestões com os atributos ARIA corretos', () => {
    const mockSuggestions = [
      {
        id: 'google-0-abc',
        text: 'Avenida Batel, Curitiba - PR',
        lat: -25.4431,
        lng: -49.2829,
      },
    ];

    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: 'Avenida',
      isSearching: false,
      suggestions: mockSuggestions,
      showSuggestions: true,
      setShowSuggestions: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
    });

    render(<LocationAutocomplete {...defaultProps} />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const option = screen.getByRole('option', { name: /Avenida Batel/i });
    expect(option).toBeInTheDocument();
    expect(option).toHaveAttribute('aria-selected', 'false');
  });

  it('deve disparar handleSuggestionSelect ao clicar em um item da lista', () => {
    const mockHandleSuggestionSelect = jest.fn();
    const mockSuggestions = [
      {
        id: 'osm-123-xyz',
        text: 'Rua XV de Novembro, Curitiba - PR',
        lat: -25.4284,
        lng: -49.2733,
      },
    ];

    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: 'Rua XV',
      isSearching: false,
      suggestions: mockSuggestions,
      showSuggestions: true,
      setShowSuggestions: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: mockHandleSuggestionSelect,
    });

    render(<LocationAutocomplete {...defaultProps} />);
    const option = screen.getByRole('option', { name: /Rua XV de Novembro/i });
    fireEvent.click(option);
    expect(mockHandleSuggestionSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });
});
