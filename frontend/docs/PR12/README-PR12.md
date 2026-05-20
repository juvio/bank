# README PR 12

## Objetivo

Implementar autenticação segura no frontend usando cookie `httpOnly`, removendo o token da store Zustand e do acesso direto via JavaScript.

## Como revisar

1. Verifique as rotas `src/app/api/auth/login/route.ts` e `src/app/api/auth/logout/route.ts`.
2. Confirme que `src/stores/useAuthStore.tsx` persiste apenas `user`.
3. Confirme que `src/utils/api.ts` usa requests same-origin para `/api/*` com `credentials: 'include'`.
4. Rode as validações:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Resultado esperado

- Login cria cookie `token` com `httpOnly`, `SameSite=Strict`, `path=/` e `Secure` em produção.
- Logout expira o cookie.
- Nenhum token é salvo em `localStorage`, `sessionStorage`, `document.cookie` ou Zustand.
