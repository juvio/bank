# PR 10 Test Guide

## Objetivo

Garantir cobertura co-localizada com foco nos componentes compartilhados e no microfrontend.

## Como rodar

```bash
npm run test -- --run
npm run test:coverage
```

## Onde estao os testes

- `src/components/HomePageComponent/__tests__/HomePageComponent.test.tsx`
- `src/components/NotFoundContent/__tests__/NotFoundContent.test.tsx`
- `src/components/Modal/__tests__/Modal.test.tsx`
- `src/components/@microfrontend/GraphicMFEComponent/__tests__/GraphicMFEComponent.test.tsx`
- `src/components/@views/GraphicMFEClient/__tests__/GraphicMFEClient.test.tsx`
- `src/components/__tests__/ClientThemeProvider.test.tsx`
- `src/utils/__tests__/getGraphicAppBaseUrl.test.ts`
