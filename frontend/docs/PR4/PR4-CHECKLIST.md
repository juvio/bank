# PR4 Checklist

## Escopo

- [x] Migrar `LoginCard` para `src/features/auth/components`.
- [x] Migrar `RegisterCard` para `src/features/auth/components`.
- [x] Extrair logica de login para `src/features/auth/hooks/useLogin.ts`.
- [x] Extrair logica de registro para `src/features/auth/hooks/useRegister.ts`.
- [x] Centralizar API calls em `src/features/auth/services/authService.ts`.
- [x] Atualizar barrels `components/hooks/services` e `features/auth/index.ts`.
- [x] Atualizar imports das rotas para `@features/auth`.
- [x] Remover componentes legados de auth em `src/components`.
- [x] Confirmar que nenhum arquivo de `../backend` foi alterado.

## Validacao obrigatoria

- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run test -- --run`

## Observacao

Validacoes executadas com `C:\Program Files\nodejs\npm.cmd`.
`lint` retornou 4 warnings pre-existentes fora do escopo da PR4.
