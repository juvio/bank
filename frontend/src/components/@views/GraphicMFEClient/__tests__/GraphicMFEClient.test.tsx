import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import GraphicMFEPage from '../index';

const { DynamicMock } = vi.hoisted(() => ({
  DynamicMock: vi.fn((props: any) => (
    <div data-testid='dynamic-mfe' data-count={props.data?.length ?? 0} />
  )),
}));

vi.mock('next/dynamic', () => ({
  default: () => DynamicMock,
}));

describe('GraphicMFEClient', () => {
  it('renders the dynamic MFE with data', () => {
    render(<GraphicMFEPage data={[{ id: 1 }, { id: 2 }]} />);

    expect(screen.getByTestId('dynamic-mfe')).toHaveAttribute(
      'data-count',
      '2',
    );
    expect(DynamicMock).toHaveBeenCalled();
  });
});
