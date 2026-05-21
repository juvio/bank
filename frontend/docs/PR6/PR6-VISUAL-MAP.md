# PR6 Visual Map

## Antes

```txt
src/components/
|-- AccountCard/
|   |-- index.tsx
|   `-- styles.ts
`-- AccountMenu/
    |-- index.tsx
    `-- styles.ts
```

## Depois

```txt
src/features/accounts/
|-- components/
|   |-- AccountCard/
|   |   |-- index.tsx
|   |   `-- styles.ts
|   |-- AccountMenu/
|   |   |-- index.tsx
|   |   `-- styles.ts
|   |-- __tests__/
|   |   |-- AccountCard.test.tsx
|   |   `-- AccountMenu.test.tsx
|   `-- index.ts
|-- hooks/index.ts
|-- services/index.ts
|-- types/index.ts
`-- index.ts
```

## Fluxo de imports

```txt
app/(operations)/layout.tsx
  -> @features/accounts
     -> AccountMenu

components/HomePageComponent
  -> @features/accounts
     -> AccountCard

stories/AccountCard, stories/AccountMenu
  -> @features/accounts
```

## Proximo PR relacionado

```txt
PR8
  -> Refactor AccountCard
  -> Container/Presentational + hook
```
