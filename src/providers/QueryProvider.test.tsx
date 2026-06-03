import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryProvider } from './QueryProvider';

describe('QueryProvider', () => {
  it('should render children elements inside the TanStack Query context', () => {
    render(
      <QueryProvider>
        <div data-testid="child-element">Conteúdo Seguro do App</div>
      </QueryProvider>,
    );

    const child = screen.getByTestId('child-element');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Conteúdo Seguro do App');
  });
});
