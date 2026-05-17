# PR3 Visual Map

## Antes

```txt
src/types/
|-- transaction.type.ts
|-- transaction-mapper.type.ts
|-- transaction-labels.type.ts
|-- new-transaction.type.ts
|-- remote-app.type.ts
`-- index.ts

@types -> src/types
```

## Depois

```txt
src/front-types-domain/
|-- api.types.ts
|-- common.types.ts
|-- domain.types.ts
`-- index.ts

@types -> src/front-types-domain
```

## Compatibilidade

```txt
src/types/
|-- index.ts                  -> export * from '@types'
|-- transaction.type.ts       -> re-export legado
|-- transaction-mapper.type.ts -> re-export legado
|-- transaction-labels.type.ts -> re-export legado
|-- new-transaction.type.ts   -> re-export legado
`-- remote-app.type.ts        -> re-export legado
```

## Fluxo de import

```txt
componentes/app/services/stores
        |
        v
      @types
        |
        v
src/front-types-domain
```
