# PR 14 Visual Map

## Fluxo

```txt
npm run staging:validate
        |
        +-- npm run build:staging
        |       |
        |       `-- .next/app-build-manifest.json
        |       `-- .next/build-manifest.json
        |
        `-- npm run perf:budget
                |
                +-- performance-budget.json
                `-- scripts/validate-performance-budget.mjs
                        |
                        `-- PASS/FAIL por rota
```

## Camadas impactadas

```txt
frontend/
|-- package.json
|-- performance-budget.json
|-- scripts/
|   |-- validate-performance-budget.mjs
|   `-- validate-performance-budget.test.mjs
`-- docs/PR14/
```

## Rotas monitoradas

- `/`
- `/home`
- `/transactions`
- `/graphicApp`
