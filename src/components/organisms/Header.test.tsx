import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

describe('Header Component', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  const renderHeader = () => {
    return render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );
  };

  it('should render theme toggle button correctly after component is mounted', async () => {
    renderHeader();
    const toggleButton = screen.getByTestId('theme-toggle');
    expect(toggleButton).toBeVisible();
  });

  it('should toggle theme aria-label when theme button is clicked', async () => {
    renderHeader();
    const toggleButton = screen.getByTestId('theme-toggle');
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
