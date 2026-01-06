'use client';
import dynamic from 'next/dynamic';

const GraphicNoSSR = dynamic(
  () => import('../../../components/@microfrontend/GraphicMFEComponent'),
  {
    ssr: false,
  }
);

export default function GraphicMFEPage({ data }: { data: any }) {
  return <GraphicNoSSR data={data} />;
}
