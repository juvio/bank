export function getGraphicAppBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_GRAPHIC_APP_URL;
  if (explicit && explicit.trim().length > 0)
    return explicit.replace(/\/+$/, '');

  const vercelEnv = (
    process.env.VERCEL_ENV ||
    process.env.NODE_ENV ||
    ''
  ).toLowerCase();
  if (
    vercelEnv === 'development' ||
    vercelEnv === 'local' ||
    vercelEnv === 'dev'
  ) {
    return 'http://localhost:3001';
  }
  if (vercelEnv === 'preview' || vercelEnv === 'staging') {
    return 'https://mfe-graphics.vercel.app';
  }

  return 'https://mfe-graphics.vercel.app';
}
