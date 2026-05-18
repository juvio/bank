import { render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';
import AuthPageLayout from '../AuthPageLayout';

type MockImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

vi.mock('next/image', () => ({
  default: ({ priority, ...props }: MockImageProps) => {
    void priority;

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('AuthPageLayout', () => {
  it('renders the provided auth page content', () => {
    render(
      <AuthPageLayout>
        <div data-testid='auth-page-content'>Auth page content</div>
      </AuthPageLayout>,
    );

    expect(screen.getByTestId('auth-page-content')).toBeInTheDocument();
  });

  it('renders welcome image on the right side section', () => {
    render(
      <AuthPageLayout>
        <div>Auth page content</div>
      </AuthPageLayout>,
    );

    const image = screen.getByAltText(/bytebank organizando/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/welcome.png');
    expect(image).toHaveAttribute('width', '700');
    expect(image).toHaveAttribute('height', '900');
  });
});
