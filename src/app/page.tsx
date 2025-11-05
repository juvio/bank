import { Stack, Typography, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function IntroPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 1, md: 6 },
          m: { xs: 1, md: 2 },
          gap: 2,
        }}
      >
        <Image src={'/logo.png'} width={145} height={32} alt='logo' />
        <Typography variant='h1' sx={{ color: 'text.disabled' }}>
          Bem vindo ao ByteBank
        </Typography>
        <Link
          href={'/home'}
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography variant='h2'>Clique para entrar</Typography>
        </Link>
      </Stack>
    </Box>
  );
}
