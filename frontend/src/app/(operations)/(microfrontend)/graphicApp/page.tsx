import GraphicMFEPage from '@/components/@views/GraphicMFEClient';
import { headers } from 'next/headers';
import { parse } from 'cookie';
import { Box } from '@mui/material';
import { convertMockToTransactions } from '@/services/mockService';

export default async function GraphicPage() {
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  let data: any;
  if (!USE_MOCK) {
    const h = await headers();
    const cookie = h.get('cookie');
    const cookies = parse(cookie || '');
    const token = cookies.token;
    const response = await fetch(`http://localhost:5000/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await response.json();
  }
  return (
    <Box component='main' sx={{ p: 3 }}>
      <GraphicMFEPage data={USE_MOCK ? convertMockToTransactions() : data.result.transactions} />
    </Box>
  );
}
