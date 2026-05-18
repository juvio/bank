'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useRegister } from '@features/auth/hooks';
import {
  LoginCardAlertSx,
  LoginCardContentSx,
  LoginCardSx,
  LoginCardTitleSx,
  LoginFieldLabelSx,
  LoginFieldSx,
  LoginFormSx,
  LoginSubmitButtonSx,
} from './styles';

const RegisterCard = () => {
  const {
    username,
    email,
    password,
    confirmPassword,
    error,
    isLoading,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
  } = useRegister();

  return (
    <Card sx={LoginCardSx}>
      <CardContent sx={LoginCardContentSx}>
        <Typography
          variant='h5'
          component='h1'
          gutterBottom
          align='center'
          sx={LoginCardTitleSx}
        >
          Criar Conta
        </Typography>

        {error && (
          <Alert severity='error' sx={LoginCardAlertSx}>
            {error}
          </Alert>
        )}

        <Box component='form' onSubmit={handleRegister} sx={LoginFormSx}>
          <TextField
            label='Nome de usuário'
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
            variant='filled'
            InputLabelProps={{ sx: LoginFieldLabelSx }}
            sx={LoginFieldSx}
          />

          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
            variant='filled'
            InputLabelProps={{ sx: LoginFieldLabelSx }}
            sx={LoginFieldSx}
          />

          <TextField
            label='Senha'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
            variant='filled'
            InputLabelProps={{ sx: LoginFieldLabelSx }}
            sx={LoginFieldSx}
          />

          <TextField
            label='Confirmar Senha'
            type='password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
            variant='filled'
            InputLabelProps={{ sx: LoginFieldLabelSx }}
            sx={LoginFieldSx}
          />

          <Button
            type='submit'
            variant='contained'
            fullWidth
            disabled={isLoading}
            sx={LoginSubmitButtonSx}
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
