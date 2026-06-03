import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

describe('Footer Component', () => {
  const currentYear = new Date().getFullYear();

  const renderFooter = () => {
    return render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>,
    );
  };

  it('should render footer correctly', () => {
    renderFooter();
    expect(screen.getByTestId('app-footer')).toBeInTheDocument();
  });

  it('should render EcoTrip brand and current year', () => {
    renderFooter();
    expect(screen.getByText(`EcoTrip © ${currentYear}`)).toBeInTheDocument();
  });

  it('should render developer text correctly', () => {
    renderFooter();
    expect(screen.getByText(/Developed with/i)).toBeInTheDocument();
  });

  it('should render github link with correct attributes', () => {
    renderFooter();
    const githubLink = screen.getByRole('link', {
      name: /Ioly Oliveira/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/iolymmoliveira',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
