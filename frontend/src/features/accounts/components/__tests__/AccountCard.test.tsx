import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AccountCard from '../AccountCard';

describe('AccountCard', () => {
  it('renders the account greeting and formatted balance', () => {
    render(<AccountCard accountBalance={1250.75} accountName='Carolina Silva' />);

    expect(
      screen.getByRole('region', { name: /carolina/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/conta corrente/i)).toBeInTheDocument();
    expect(screen.getByText(/1\.250,75/)).toBeInTheDocument();
  });

  it('toggles balance visibility', () => {
    render(<AccountCard accountBalance={1250.75} accountName='Carolina Silva' />);

    fireEvent.click(screen.getByRole('button', { name: /ocultar saldo/i }));

    expect(screen.queryByText(/1\.250,75/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /mostrar saldo/i }),
    ).toBeInTheDocument();
  });
});
