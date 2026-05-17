# PR4 Visual Map

## Antes

```txt
src/components/
|-- LoginCard/index.tsx
`-- RegisterCard/index.tsx

src/stores/useAuthStore.tsx
  -> chama api.post('/user/auth') e api.post('/user')

src/app/login/page.tsx
  -> import LoginCard de @/components/LoginCard
src/app/register/page.tsx
  -> import RegisterCard de @/components/RegisterCard
```

## Depois

```txt
src/features/auth/
|-- components/
|   |-- LoginCard.tsx
|   |-- RegisterCard.tsx
|   `-- index.ts
|-- hooks/
|   |-- useLogin.ts
|   |-- useRegister.ts
|   `-- index.ts
|-- services/
|   |-- authService.ts
|   `-- index.ts
`-- index.ts
```

## Fluxo atualizado

```txt
app/login + app/register
        |
        v
   @features/auth (barrel)
        |
        v
components -> hooks -> useAuthStore -> auth/services -> api client
```

## Remocoes

```txt
src/components/LoginCard/index.tsx
src/components/RegisterCard/index.tsx
```
