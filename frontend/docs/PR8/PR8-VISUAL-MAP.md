# PR8 Visual Map

## Antes

```txt
features/accounts/components/AccountCard/index.tsx
  UI
  estado showBalance
  formatacao de moeda
  derivacao de primeiro nome
```

## Depois

```txt
features/accounts/components/AccountCard/
  index.tsx
    exporta API publica local

  AccountCardContainer.tsx
    chama useAccountCard(props)
    injeta dados calculados na view

  AccountCard.tsx
    renderiza UI
    recebe dados e callbacks por props

  types.ts
    AccountCardProps
    AccountCardViewProps

  styles.ts
    constantes SxProps do componente

features/accounts/hooks/
  useAccountCard.ts
    showBalance
    handleToggleBalance
    firstName
    formattedBalance
```

## Fluxo

```txt
HomePageComponent
  -> @features/accounts AccountCard
    -> AccountCardContainer
      -> useAccountCard
      -> AccountCard
```

## Testes

```txt
components/__tests__/AccountCard.test.tsx
components/__tests__/AccountCardContainer.test.tsx
hooks/__tests__/useAccountCard.test.tsx
```
