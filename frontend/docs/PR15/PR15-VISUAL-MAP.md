# PR 15 Visual Map

## Escopo

```txt
PR 15
|
|-- frontend/README.md
|   |-- stack
|   |-- scripts
|   |-- arquitetura
|   |-- features
|   |-- padrao de componentes
|   |-- imports
|   |-- testes
|   |-- seguranca
|   `-- performance
|
|-- docs/plano-migracao-arquitetura.md
|   `-- PR 15 marcado como concluido
|
`-- docs/PR15
    |-- pacote documental obrigatorio
    `-- handoff para PR 16
```

## Arquitetura documentada

```txt
src/app
  rotas, layouts e boundaries do Next

src/features
  auth
  accounts
  transactions
  dashboard

src/core
  infraestrutura global

src/components
  componentes compartilhados

src/front-types-domain
  tipos compartilhados

src/hooks, src/stores, src/services
  camadas compartilhadas de suporte

src/utils, src/lib, src/common
  utilitarios, helpers e constantes
```

## Fluxo de consumo recomendado

```txt
src/app/page.tsx
  -> importa feature/container via barrel
    -> feature component
      -> hook da feature
        -> store/service/shared utils
```

## Testes

```txt
feature
|-- components/__tests__
|-- hooks/__tests__
`-- services/__tests__
```
