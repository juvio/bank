'use client';

import { useEffect, useRef } from 'react';

export default function GraphicMFEComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'http://localhost:3001/src/main.tsx';
    script.async = true;

    script.onload = () => {
      cleanup = window.mfeGraphics?.mount(ref.current!, {
        testeMfe: 'TESTE',
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
