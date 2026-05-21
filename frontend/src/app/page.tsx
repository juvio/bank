import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function IntroPage() {
  return (
    <Box
      component='main'
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'minmax(320px, 520px) minmax(320px, 700px)' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, lg: 6 },
        overflow: 'hidden',
        px: { xs: 2, md: 3 },
        py: { xs: 4, md: 5 },
        background: '#111e18',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '10% auto auto -8rem',
          width: '18rem',
          height: '18rem',
          border: '1px solid rgba(244, 241, 232, 0.16)',
          borderRadius: '999px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: { xs: '-8rem', md: '3rem' },
          bottom: { xs: '-10rem', md: '2rem' },
          width: { xs: '16rem', md: '22rem' },
          height: { xs: '16rem', md: '22rem' },
          border: '1px solid rgba(203, 213, 202, 0.12)',
          borderRadius: '999px',
        },
      }}
    >
      <Stack
        sx={{
          width: '100%',
          maxWidth: { xs: '560px', lg: 'none' },
          mx: 'auto',
          gap: 3,
          alignItems: { xs: 'center', lg: 'flex-start' },
          textAlign: { xs: 'center', lg: 'left' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid rgba(244, 241, 232, 0.16)',
            borderRadius: 1,
            px: 2,
            py: 1.25,
            background: 'rgba(244, 241, 232, 0.06)',
            boxShadow: '0 20px 56px rgba(0, 0, 0, 0.24)',
          }}
        >
          <Image src='/logo.png' width={145} height={32} alt='ByteBank' priority />
        </Box>

        <Stack sx={{ gap: 2 }}>
          <Typography
            variant='h1'
            sx={{
              color: '#f4f1e8',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              lineHeight: 1.02,
              fontWeight: 500,
              fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, serif',
              letterSpacing: 0,
              maxWidth: '11ch',
            }}
          >
            Bem-vindo ao ByteBank
          </Typography>

          <Typography
            sx={{
              color: '#cbd5ca',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.7,
              maxWidth: '36rem',
            }}
          >
            Uma experiência digital para acompanhar sua conta, organizar transações e
            cuidar do seu dinheiro com clareza.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ gap: 1.5, width: { xs: '100%', sm: 'auto' } }}
        >
          <Button
            component={Link}
            href='/login'
            variant='contained'
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              backgroundColor: '#f4f1e8',
              color: '#111e18',
              borderRadius: 1,
              px: 3,
              py: 1.3,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e5dfd2' },
            }}
          >
            Entrar na conta
          </Button>

          <Button
            component={Link}
            href='/register'
            variant='text'
            sx={{
              color: '#cbd5ca',
              borderRadius: 1,
              px: 3,
              py: 1.3,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                color: '#f4f1e8',
                background: 'rgba(255, 255, 255, 0.06)',
              },
            }}
          >
            Criar cadastro
          </Button>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 1.5,
            width: '100%',
            pt: 1,
          }}
        >
          {[
            ['24h', 'acesso digital'],
            ['Pix', 'transações rápidas'],
            ['100%', 'controle da conta'],
          ].map(([value, label]) => (
            <Box
              key={label}
              sx={{
                flex: 1,
                minWidth: { sm: 140 },
                border: '1px solid rgba(244, 241, 232, 0.12)',
                borderRadius: 1,
                background: 'rgba(17, 30, 24, 0.42)',
                px: 2,
                py: 1.5,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{
                  color: '#f4f1e8',
                  fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, serif',
                  fontSize: '1.6rem',
                  lineHeight: 1,
                }}
              >
                {value}
              </Typography>
              <Typography sx={{ color: 'rgba(203, 213, 202, 0.74)', fontSize: '0.85rem' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Box
        component='section'
        sx={{
          width: '100%',
          maxWidth: { xs: '700px', lg: 'none' },
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderRadius: 1,
            border: '1px solid rgba(244, 241, 232, 0.14)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            background: 'rgba(244, 241, 232, 0.05)',
          }}
        >
          <Image
            src='/welcome.png'
            alt='Ilustração ByteBank organizando finanças'
            width={700}
            height={900}
            priority
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
