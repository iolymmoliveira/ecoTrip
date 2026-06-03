import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{theme}</span>
      <span data-testid="theme-mounted">
        {mounted ? 'mounted' : 'not-mounted'}
      </span>
      <button data-testid="theme-toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>,
  );

describe('ThemeContext', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should initialize with light theme by default', async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByTestId('theme-mounted')).toHaveTextContent('mounted');
    });
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should initialize with saved dark theme from localStorage', async () => {
    localStorage.setItem('ecotrip-theme', 'dark');
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle theme and update document classes and localStorage', async () => {
    renderWithProvider();
    const toggleButton = screen.getByTestId('theme-toggle-btn');
    const status = screen.getByTestId('theme-status');
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(status).toHaveTextContent('dark');
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('ecotrip-theme')).toBe('dark');
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(status).toHaveTextContent('light');
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('ecotrip-theme')).toBe('light');
  });
});
