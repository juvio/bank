# Skill: Test Guidance

## Objetivo

Orientar estrategia de testes co-localizados e cobertura minima durante a migracao.

## Checklist de execucao

1. Para cada feature impactada, criar testes quando aplicavel e quando ainda nao
   existirem.
2. Co-localizar testes no padrao `__tests__` dentro de cada camada da feature
   (ex.: `components/__tests__`, `hooks/__tests__`, `services/__tests__`).
3. Criar/atualizar testes proximos aos modulos alterados.
4. Cobrir logica de hooks e comportamento de componentes.
5. Priorizar testes de fluxos criticos da feature afetada.
6. Manter consistencia com Vitest + RTL.
7. Medir cobertura e apontar lacunas.
8. Executar suite de testes mesmo sem `npm` no PATH, usando binario instalado
   por caminho absoluto quando necessario:
   - `& 'C:\Program Files\nodejs\npm.cmd' run test -- --run`

## Saida esperada

- Plano de testes do PR
- Casos obrigatorios por mudanca
- Registro de cobertura e riscos residuais
