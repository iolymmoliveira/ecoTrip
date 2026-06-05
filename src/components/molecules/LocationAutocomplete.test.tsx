import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    debounceTime: 300,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir o estado de carregamento quando a API do Google não estiver pronta', () => {
    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: '',
      isLoaded: false,
      loadError: false,
      isSearching: false,
      suggestions: [],
      showSuggestions: false,
      setShowSuggestions: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
    });

    render(<LocationAutocomplete {...defaultProps} />);
    expect(screen.getByText('Carregando localizações...')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(defaultProps.placeholder),
    ).not.toBeInTheDocument();
  });

  it('deve renderizar o input corretamente quando a API estiver carregada', () => {
    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: '',
      isLoaded: true,
      loadError: false,
      isSearching: false,
      suggestions: [],
      showSuggestions: false,
      setShowSuggestions: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
    });

    render(<LocationAutocomplete {...defaultProps} />);
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder),
    ).toBeInTheDocument();
  });

  it('deve chamar handleInputChange quando o usuário digitar no campo', () => {
    const mockHandleInputChange = jest.fn();

    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: '',
      isLoaded: true,
      loadError: false,
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

  it('deve exibir a lista de sugestões e disparar a seleção ao clicar em um item', () => {
    const mockHandleSuggestionSelect = jest.fn();
    const mockSuggestions = [
      {
        id: '1-xyz',
        text: 'Avenida Batel, Curitiba - PR',
        prediction: {} as google.maps.places.PlacePrediction,
      },
    ];

    mockUsePlaceAutocomplete.mockReturnValue({
      inputValue: 'Avenida',
      isLoaded: true,
      loadError: false,
      isSearching: false,
      suggestions: mockSuggestions,
      showSuggestions: true,
      setShowSuggestions: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: mockHandleSuggestionSelect,
    });

    render(<LocationAutocomplete {...defaultProps} />);
    const buttonSuggestion = screen.getByText('Avenida Batel, Curitiba - PR');
    expect(buttonSuggestion).toBeInTheDocument();
    fireEvent.click(buttonSuggestion);
    expect(mockHandleSuggestionSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });
});
