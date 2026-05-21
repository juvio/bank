# PR 12 Checklist

## Escopo

- [x] Login via rota server-side.
- [x] Cookie `token` definido como `httpOnly`.
- [x] Logout expira cookie `token`.
- [x] Token removido da store Zustand.
- [x] Escrita manual de `document.cookie` removida do cliente.
- [x] Requests `/api/*` usam cookies same-origin.
- [x] Nenhum arquivo em `../backend` alterado.

## Segurança

- [x] Sem token em `localStorage`.
- [x] Sem token em `sessionStorage`.
- [x] Sem token persistido em Zustand.
- [x] Cookie com `SameSite=Strict`.
- [x] Cookie com `Secure` em produção.

## Validação

- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run test -- --run`

## Observações

- `package-lock.json` tinha alteração pendente antes do PR 12 e não foi revertido.
- Warnings de lint residuais foram registrados como fora do escopo.
