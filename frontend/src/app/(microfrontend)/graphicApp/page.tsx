export default async function MicrofrontendPage() {
  const html = await fetch('http://localhost:3001', {
    next: { revalidate: 0 },
  }).then((res) => res.text());

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
