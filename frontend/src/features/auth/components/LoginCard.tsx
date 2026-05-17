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
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
          />
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={goToRegister}
            disabled={isLoading}
          >
            Criar nova conta
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
