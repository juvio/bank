# README PR 13

## Objetivo

Implementar mascaramento de dados sensiveis e sanitizacao de texto no frontend.

## Como revisar

1. Verifique `src/utils/privacy.ts` e os testes em `src/utils/privacy.test.ts`.
2. Confirme que descricoes de transacao sao sanitizadas antes de entrar no estado/servicos.
3. Confirme que descricoes exibidas no historico e nos modais mascaram CPF, e-mail e sequencias numericas longas.
4. Rode as validacoes:

```bash
npm run lint
npm run build
npm run test -- --run
```

## Resultado esperado

- Entradas textuais removem tags HTML, URLs `javascript:` e caracteres de controle.
- Dados sensiveis exibidos na UI ficam mascarados.
- Nome de usuario exibido no card da conta e sanitizado.
- Caminhos de anexos sao reduzidos a um nome de arquivo seguro antes de ir para o BFF.
