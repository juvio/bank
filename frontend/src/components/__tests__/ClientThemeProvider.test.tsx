import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ClientThemeProvider from '../ClientThemeProvider';

describe('ClientThemeProvider', () => {
  it('renders children inside the theme provider', () => {
    render(
      <ClientThemeProvider>
        <span data-testid='theme-child'>Child content</span>
      </ClientThemeProvider>,
    );

    expect(screen.getByTestId('theme-child')).toBeInTheDocument();
  });
});
