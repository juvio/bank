# PR 10 Summary

## Status

EM ANDAMENTO.

## Objetivo

Adicionar testes co-localizados (minimo 80% de cobertura desejada) para componentes e utilitarios sem cobertura.

## Mudancas principais

- Testes para HomePage, NotFoundContent, Modal e ClientThemeProvider.
- Testes para MFE client e componente do microfrontend.
- Testes para `getGraphicAppBaseUrl`.

## Fora de escopo

- Nenhuma alteracao em `backend`.
- Nenhuma mudanca de arquitetura ou migracao de modulo.

## Riscos residuais

- Cobertura total pode exigir mais testes em camadas nao tocadas.

## Validacoes

- `npm run lint`: passou com 10 warnings.
- `npm run build`: passou com warnings.
- `npm run test -- --run`: passou.

## Warnings conhecidos

- Reaching to "@/app/layout" is not allowed (ClientThemeProvider).
- Reaching to "@/app/actions" is not allowed (Modal).
- img elements must have an alt prop (AuthPageLayout test).
- Dependency cycle warnings envolvendo auth store/services/utils api.
- React is defined but never used (src/types/remote-app.d.ts).
