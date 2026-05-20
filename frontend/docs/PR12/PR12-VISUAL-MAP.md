# PR 12 Visual Map

## Login

```txt
LoginCard
  -> useLogin
    -> useAuthStore.login(email, password)
      -> loginService('/api/auth/login')
        -> app/api/auth/login
          -> backend /user/auth ou mockService
          -> Set-Cookie: token=...; HttpOnly; SameSite=Strict
          -> retorna somente user para o cliente
```

## Estado no cliente

```txt
AuthStorage
  user: { id, username, email }
  token: nao persistido
```

## Requests autenticadas

```txt
feature service
  -> api('/api/*', credentials include)
    -> Next API route
      -> request.cookies.get('token')
      -> Authorization: Bearer token para backend
```

## Logout

```txt
AccountMenu
  -> useAuthStore.logout()
    -> logoutService('/api/auth/logout')
      -> expira cookie token
    -> limpa user na store
```
