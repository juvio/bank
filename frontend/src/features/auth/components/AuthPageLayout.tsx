'use client';

import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import {
  LoginLayoutLeftSx,
  LoginLayoutMainSx,
  LoginLayoutRightSx,
} from './styles';

const AuthPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box component='main' sx={LoginLayoutMainSx}>
      <Box component='section' sx={LoginLayoutLeftSx}>
        {children}
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

export default AuthPageLayout;
