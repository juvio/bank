declare module 'mfe-graphics/mount' {
  import type * as React from 'react';
  export type RemoteAppProps = {
    testeMfe: string;
  };
  export function mount(el: HTMLElement, props: RemoteAppProps): () => void;
}

declare global {
  interface Window {
    mfeGraphics?: {
      mount: (el: HTMLElement, props: { testeMfe: string }) => () => void;
    };
  }
}

export {};
