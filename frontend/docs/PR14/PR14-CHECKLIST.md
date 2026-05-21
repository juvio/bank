# PR 14 Checklist

## Escopo

- [x] PR 14 identificado no roadmap como deploy em staging e validacao de performance.
- [x] Nenhuma migracao de modulo aplicada.
- [x] Nenhuma alteracao em `../backend/`.
- [x] Scripts de staging e performance adicionados.
- [x] Budget de performance versionado.
- [x] Validador automatizado criado.
- [x] Teste do validador criado.

## Validacao tecnica

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run test -- --run`
- [ ] `npm run staging:validate`
- [ ] `git diff --name-only`

## Criterios de aceite

- [ ] Build de staging conclui com sucesso.
- [ ] Budget de performance passa para rotas principais.
- [ ] Testes passam.
- [ ] Documentacao obrigatoria completa.
