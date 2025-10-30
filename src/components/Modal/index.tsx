'use client';

import { Box, Button, Dialog, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ModalComponent() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  function onDismiss() {
    setOpen(false);
    router.back();
  }
  return (
    <Dialog open={open} onClose={onDismiss}>
      <Box
        sx={{
          width: '75%',
          height: '300px',
          borderRadius: '8px',
        }}
      >
        <Typography sx={{ fontColor: 'primary' }}>
          Tem certeza que deseja fazer esta operação?
        </Typography>
        <Button onClick={onDismiss}>Sim</Button>
      </Box>
    </Dialog>
  );
}
