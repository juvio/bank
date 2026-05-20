# PR 9 Checklist

- [x] Escopo restrito ao `frontend`.
- [x] Roadmap principal identificado: PR 9 = implementar barrels.
- [x] PR classificado como nao migracao de modulo.
- [x] Barrels criados para camadas compartilhadas sem API publica.
- [x] Aliases bare adicionados em `tsconfig.json`.
- [x] Imports seguros atualizados para barrels.
- [x] Testes impactados ajustados para novos pontos de mock.
- [x] `npm run lint` executado.
- [x] `npm run build` executado.
- [x] `npm run test -- --run` executado.
- [x] Documentacao obrigatoria criada em `docs/PR9`.
- [x] Nenhum arquivo em `backend` alterado.

## Pendencias para PR futuro

- Resolver ciclo `useAuthStore` <-> `authService` <-> `utils/api`.
- Decidir tratamento de imports internos de `src/app` em componentes.
- Corrigir warning a11y em `AuthPageLayout.test.tsx`.
- Remover tipo legado nao usado em `src/types/remote-app.d.ts`.

