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
import { useLogin } from '@features/auth/hooks';
import {
  LoginCardAlertSx,
  LoginCardContentSx,
  LoginCardSx,
  LoginCardTitleSx,
  LoginFieldLabelSx,
  LoginFieldSx,
  LoginFormSx,
  LoginRegisterButtonSx,
  LoginSubmitButtonSx,
} from './styles';

const LoginCard = () => {
  const {
    email,
    password,
    error,
    isLoading,
    setEmail,
    setPassword,
    handleLogin,
    goToRegister,
  } = useLogin();

  return (
    <Card sx={LoginCardSx}>
      <CardContent sx={LoginCardContentSx}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          sx={LoginCardTitleSx}
        >
          Entrar na sua conta
        </Typography>

        {error && (
          <Alert severity="error" sx={LoginCardAlertSx}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={LoginFormSx}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
            variant="filled"
            InputLabelProps={{ sx: LoginFieldLabelSx }}
            sx={LoginFieldSx}
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
            variant="filled"
            InputLabelProps={{ sx: LoginFieldLabelSx }}
            sx={LoginFieldSx}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={LoginSubmitButtonSx}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={goToRegister}
            disabled={isLoading}
            sx={LoginRegisterButtonSx}
          >
            Criar nova conta
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
