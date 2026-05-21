export function sanitizeFilename(filename: string): string {
  return (
    filename
      .replace(/^\/uploads\//, '')
      .replace(/\\/g, '/')
      .split('/')
      .filter((part) => part && part !== '..')
      .pop()
      ?.replace(/[^\w.-]/g, '') ?? ''
  );
}
