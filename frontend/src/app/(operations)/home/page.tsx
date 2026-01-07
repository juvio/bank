import { headers } from 'next/headers';
import HomePageComponent from '@/components/HomePageComponent';
import { parse } from 'cookie';
import { Transactions } from '@/types';
import { convertMockToTransactions } from '@/services/mockService';

export default async function HomePage() {
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  let fullname = '';
  let transactions: Transactions = [];

  if (!USE_MOCK) {
    const h = await headers();
    const cookie = h.get('cookie');
    const cookies = parse(cookie || '');
    const token = cookies.token;
    const [data1, data2] = await Promise.all([
      await fetch('http://localhost:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      await fetch('http://localhost:5000/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const response1 = await data1.json();
    const response2 = await data2.json();
    fullname = response1.result[0].username;
    transactions = response2.result.transactions;
  }

  return (
    <HomePageComponent
      transactions={USE_MOCK ? convertMockToTransactions() : transactions}
      fullname={USE_MOCK ? 'Mock User' : fullname}
    />
  );
}
