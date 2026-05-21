import { headers } from 'next/headers';
import dynamic from 'next/dynamic';
import { parse } from 'cookie';
import { Box, CircularProgress } from '@mui/material';
import { convertMockToTransactions, mockService } from '@services';

const GraphicMFEPage = dynamic(
  () => import('@components/@views/GraphicMFEClient'),
  {
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={28} />
      </Box>
    ),
  }
);

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
    const r1 = await response.json();
    data = r1.result.transactions;
  } else {
    const getTransaction = await mockService.getTransactions();
    data = convertMockToTransactions(getTransaction.data);
  }
  return (
    <Box component='main' sx={{ p: 3 }}>
      <GraphicMFEPage data={data} />
    </Box>
  );
}
