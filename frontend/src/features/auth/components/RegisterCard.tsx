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
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Criar Conta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Nome de usuário"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
          />

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

          <TextField
            label="Confirmar Senha"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            fullWidth
            disabled={isLoading}
          />

          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
