import { getGraphicAppBaseUrl } from '@/utils/getGraphicAppBaseUrl';

export default async function MicrofrontendPage() {
  return (
    <iframe
      src={getGraphicAppBaseUrl()}
      style={{ width: '100%', height: '75vw' }}
    />
  );
}
