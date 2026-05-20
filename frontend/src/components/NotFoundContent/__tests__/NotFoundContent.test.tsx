import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NotFoundContent from '../index';

const { pushMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('NotFoundContent', () => {
  it('renders the empty state and navigates back home', () => {
    render(<NotFoundContent />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Ops/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', {
      name: /voltar para a/i,
    });
    fireEvent.click(backButton);

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
