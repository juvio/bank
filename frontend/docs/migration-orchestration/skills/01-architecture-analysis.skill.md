# Skill: Architecture Analysis

## Objetivo

Mapear estado atual vs estado alvo da arquitetura para o PR corrente.

## Checklist de execucao

1. Identificar componentes, hooks, stores, services e tipos impactados.
2. Classificar mudanca por camada: app, features, core, lib, common, types.
3. Verificar acoplamentos indevidos (UI com regra de negocio, imports internos, etc).
4. Registrar gaps para o PR atual sem antecipar mudancas fora do escopo.

## Saida esperada

- Mapa de impactos por arquivo
- Riscos tecnicos
- Dependencias entre PRs
