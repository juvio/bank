# PR 12 Summary

## Status

APROVADO.

## Objetivo

Implementar auth segura com `httpOnly cookies`, mantendo o frontend sem acesso direto ao token.

## Mudancas principais

- Criadas rotas BFF:
  - `src/app/api/auth/login/route.ts`
  - `src/app/api/auth/logout/route.ts`
- `loginService` agora chama `/api/auth/login`.
- `logoutService` chama `/api/auth/logout`.
- `useAuthStore` removeu `token`, parou de escrever `document.cookie` e passou a persistir somente `user`.
- `apiClient` usa URL same-origin para `/api/*` e envia cookies com `credentials: 'include'`.
- `next.config.ts` removeu `Authorization` do CORS allow-list do frontend.
- `src/app/api/transactions/route.ts` e `src/app/api/transactions/[id]/route.ts` encaminham requests autenticados usando o cookie server-side.
- `Modal` passou a usar imports diretos de ícones MUI para evitar `EMFILE` na suíte completa.

## Fora de escopo

- Alterar backend.
- Implementar refresh-token rotation real.
- Implementar masking/sanitização do PR 13.
- Configurar deploy/staging do PR 14.

## Riscos residuais

- As rotas server-side existentes ainda dependem do contrato atual do backend para validar o JWT.
- O estado persistido do usuário é uma conveniência de UI; a autorização real continua dependendo do cookie no servidor.
- Lint segue com 4 warnings já presentes em áreas fora do escopo direto.

## Validacoes

- `npm run lint`: passou com 4 warnings.
- `npm run build`: passou.
- `npm run test -- --run`: passou, 31 arquivos e 86 testes.
