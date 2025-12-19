import { headers } from 'next/headers';
import HomePageComponent from '@/components/HomePageComponent';
import { parse } from 'cookie';

export default async function HomePage() {
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
  const fullname = response.result[0].username;

  return <HomePageComponent fullname={fullname} />;
}
