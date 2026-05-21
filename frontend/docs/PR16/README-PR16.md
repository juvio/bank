# PR 16 - Cleanup Final

## Objetivo

Remover arquivos legados de `src/utils` e `src/types`, consolidando helpers em
`src/lib` e o cliente de API em `src/services`.

## Como validar (obrigatorio)

```bash
npm run lint
npm run build
npm run test -- --run
```

Se `npm` nao estiver no PATH:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\npm.cmd' run test -- --run
```

## O que mudou

- `src/services/api.ts` passou a concentrar o cliente de API.
- `src/lib` agora reune helpers de data, privacidade e nomes de arquivo.
- Mapper de transacoes passou para `features/transactions/services`.
- `src/types` e `src/utils` removidos.

## Fora de escopo

- Mudancas no backend.
- Novas features ou refactors funcionais alem do cleanup.
