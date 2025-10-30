import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function IntroPage() {
  return (
    <Stack>
      <Image src={'/logo.png'} width={145} height={32} alt='logo' />
      <Typography>Bem vindo ao ByteBank</Typography>
      <Link href={'/home'}>Clique para entrar</Link>
    </Stack>
  );
}
