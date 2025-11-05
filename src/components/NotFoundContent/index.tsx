'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  BoxSx,
  BoxWrapperSx,
  Typography404Sx,
  TypographyDescriptionSx,
  TypographyNotFoundSx,
} from './styles';

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <Box sx={BoxWrapperSx}>
      <Box sx={BoxSx}>
        <Typography variant='h2' component='h1' sx={Typography404Sx}>
          404
        </Typography>
        <Typography variant='h5' sx={TypographyNotFoundSx}>
          Ops — página não encontrada
        </Typography>
        <Typography sx={TypographyDescriptionSx}>
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
