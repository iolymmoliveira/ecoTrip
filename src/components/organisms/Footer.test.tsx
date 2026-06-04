import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { copy } from '@/lib/copy';

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
    expect(screen.getByText(/EcoTrip/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(currentYear.toString())),
    ).toBeInTheDocument();
  });

  it('should render developer text correctly', () => {
    renderFooter();
    expect(screen.getByText(/Developed with/i)).toBeInTheDocument();
  });

  it('should render linkedin link with correct attributes', () => {
    renderFooter();
    const linkedinLink = screen.getByTestId('linkedin-link');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink.getAttribute('href')).toBe(copy.links.linkedIn);
    expect(linkedinLink.getAttribute('target')).toBe('_blank');
    expect(linkedinLink.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
