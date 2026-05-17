import { render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';
import LoginPageLayout from '../LoginPageLayout';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

vi.mock('../LoginCard', () => ({
  default: () => <div data-testid="login-card-mock">LoginCard</div>,
}));

describe('LoginPageLayout', () => {
  it('renders headline, subtitle, and login card', () => {
    render(<LoginPageLayout />);

    expect(
      screen.getByRole('heading', {
        name: /seu dinheiro em ordem\.\s*seu futuro em movimento\./i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/login para acompanhar suas finan/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('login-card-mock')).toBeInTheDocument();
  });

  it('renders welcome image on the right side section', () => {
    render(<LoginPageLayout />);

    const image = screen.getByAltText(/bytebank organizando/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/welcome.png');
    expect(image).toHaveAttribute('width', '700');
    expect(image).toHaveAttribute('height', '900');
  });
});
