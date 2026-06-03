/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import { expect as jestExpect } from '@jest/globals';
declare const expect: typeof jestExpect;
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{theme}</span>
      <button data-testid="theme-toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('should initialize with light theme by default if no preference is found', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const status = screen.getByTestId('theme-status');
    expect(status.textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle theme and update document classes and localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByTestId('theme-toggle-btn');
    const status = screen.getByTestId('theme-status');

    await userEvent.click(toggleButton);
    expect(status.textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('ecotrip-theme')).toBe('dark');

    await userEvent.click(toggleButton);
    expect(status.textContent).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('ecotrip-theme')).toBe('light');
  });
});
