import { headers } from 'next/headers';
import HomePageComponent from '@/components/HomePageComponent';
import { parse } from 'cookie';

export default async function HomePage() {
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  let fullname = 'Usuário Teste';

  if (!USE_MOCK) {
    const h = await headers();
    const cookie = h.get('cookie');
    const cookies = parse(cookie || '');
    const token = cookies.token;
    const data = await fetch('http://localhost:5000/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await data.json();
    fullname = response.result[0].username;
  }

  return <HomePageComponent fullname={USE_MOCK ? 'Mock User' : fullname} />;
}
