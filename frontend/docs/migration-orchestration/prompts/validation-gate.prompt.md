# Prompt: Validation Gate

Valide se o PR [N] esta apto para revisao.

Checklist obrigatorio:

1. `npm run lint` aprovado.
2. `npm run build` aprovado.
3. `npm run test` aprovado.
4. Sem alteracoes em `/backend`.
5. Padrao arquitetural do plano respeitado.
6. Testes por feature criados/atualizados quando aplicavel.
7. Testes co-localizados em `__tests__`.
8. Documentacao obrigatoria completa em `frontend/docs/PR[N]`.

Entregue status final:

- `APROVADO` ou `PENDENTE`
- Pendencias objetivas quando houver
