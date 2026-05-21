# PR 2 Visual Map

## Added structure

```txt
src/
|-- core/
|   |-- auth/
|   |-- config/
|   |-- providers/
|   `-- index.ts
|
|-- features/
|   |-- accounts/
|   |-- auth/
|   |-- dashboard/
|   |-- transactions/
|   `-- index.ts
|
|-- lib/
|   `-- index.ts
|
|-- common/
|   `-- index.ts
|
`-- front-types-domain/
    |-- api.types.ts
    |-- common.types.ts
    |-- domain.types.ts
    `-- index.ts
```

## Current flow

```txt
Existing app imports -> unchanged legacy folders
New architecture folders -> available for future PRs
PR 3 -> move src/types into front-types-domain and update @types aliases
```

## Future flow

```txt
src/app
  -> feature barrels
  -> shared layers: core, lib, common, front-types-domain
```
