'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import LoginCard from './LoginCard';
import {
  LoginLayoutLeftSx,
  LoginLayoutMainSx,
  LoginLayoutRightSx,
  LoginLayoutSubtitleSx,
  LoginLayoutTitleSx,
} from './styles';

const LoginPageLayout = () => {
  return (
    <Box component='main' sx={LoginLayoutMainSx}>
      <Box component='section' sx={LoginLayoutLeftSx}>
        <Typography component='h1' sx={LoginLayoutTitleSx}>
          Seu dinheiro em ordem.
          <br />
          Seu futuro em movimento.
        </Typography>
        <Typography sx={LoginLayoutSubtitleSx}>
          Faça login para acompanhar suas finanças com clareza e confiança.
        </Typography>
        <LoginCard />
      </Box>

      <Box component='section' sx={LoginLayoutRightSx}>
        <Image
          src='/welcome.png'
          alt='Ilustração ByteBank organizando finanças'
          width={700}
          height={900}
          priority
          style={{
            width: '100%',
            maxWidth: '900px',
            height: 'auto',
            borderRadius: '2.5rem',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPageLayout;
