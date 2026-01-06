'use client';

import { Transactions } from '@/types';
import { getGraphicAppBaseUrl } from '@/utils/getGraphicAppBaseUrl';
import { useEffect, useRef } from 'react';

export default function GraphicMFEComponent({ data }: { data: Transactions }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = `${getGraphicAppBaseUrl()}/src/main.tsx`;
    script.async = true;

    script.onload = () => {
      cleanup = window.mfeGraphics?.mount(ref.current!, {
        transactions: data,
      });
    };

    script.onerror = () => {
      console.error('Failed to load Graphic MFE');
    };

    document.body.appendChild(script);

    return () => {
      cleanup?.();
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={ref} />;
}
