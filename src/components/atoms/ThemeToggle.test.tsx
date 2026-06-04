import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle Atom', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  const renderToggle = () => {
    return render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
  };

  it('should render theme button correctly', async () => {
    renderToggle();
    const toggleButton = await screen.findByTestId('theme-toggle');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should toggle theme aria-label when clicked', async () => {
    renderToggle();
    const toggleButton = await screen.findByTestId('theme-toggle');
    expect(toggleButton.getAttribute('aria-label')).toBe('Ativar Modo Escuro');
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton.getAttribute('aria-label')).toBe('Ativar Modo Claro');
    });
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton.getAttribute('aria-label')).toBe(
        'Ativar Modo Escuro',
      );
    });
  });
});
