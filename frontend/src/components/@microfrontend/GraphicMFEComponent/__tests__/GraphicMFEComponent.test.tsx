import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import GraphicMFEComponent from '../index';

const { getGraphicAppBaseUrlMock } = vi.hoisted(() => ({
  getGraphicAppBaseUrlMock: vi.fn(),
}));

vi.mock('@lib', async () => {
  const actual = await vi.importActual<typeof import('@lib')>('@lib');
  return {
    ...actual,
    getGraphicAppBaseUrl: getGraphicAppBaseUrlMock,
  };
});

describe('GraphicMFEComponent', () => {
  beforeEach(() => {
    getGraphicAppBaseUrlMock.mockReturnValue('http://localhost:3001');
  });

  it('mounts the MFE and cleans up on unmount', () => {
    const cleanupMock = vi.fn();
    const mountMock = vi.fn(() => cleanupMock);

    (window as any).mfeGraphics = {
      mount: mountMock,
    };

    const data = [{ id: 1 }];
    const { unmount } = render(
      <GraphicMFEComponent data={data as any} />,
    );

    const script = document.querySelector(
      'script[src="http://localhost:3001/src/main.tsx"]',
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();

    script?.onload?.(new Event('load'));

    expect(mountMock).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      { transactions: data },
    );

    unmount();

    expect(cleanupMock).toHaveBeenCalledTimes(1);
    expect(document.body.contains(script as HTMLScriptElement)).toBe(false);
  });
});
