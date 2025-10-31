'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

export default function NotFoundContent() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.primary.light})`,
        p: 3,
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 640 }}>
        <Typography
          variant='h2'
          component='h1'
          sx={{ color: theme.palette.primary.contrastText, mb: 2 }}
        >
          404
        </Typography>
        <Typography
          variant='h5'
          sx={{ color: theme.palette.primary.contrastText, mb: 3 }}
        >
          Ops — página não encontrada
        </Typography>
        <Typography sx={{ color: theme.palette.primary.contrastText, mb: 4 }}>
          A página que você procura não existe ou foi removida. Verifique o
          endereço ou volte para a página inicial.
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => router.push('/')}
        >
          Voltar para a página inicial
        </Button>
      </Box>
    </Box>
  );
}
