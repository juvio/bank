# PR 9 Visual Map

## Barrels adicionados

```txt
src/
|-- components/index.ts
|-- hooks/index.ts
|-- services/index.ts
|-- stores/index.ts
|-- utils/index.ts
`-- mocks/index.ts
```

## Fluxo de importacao desejado

```txt
app/features/stories/tests
        |
        v
public barrels
        |
        v
internal implementation files
```

## Exemplos

```ts
import { HomePageComponent } from '@components';
import { useTransactionValidation } from '@hooks';
import { mockService } from '@services';
import { useAuthStore } from '@stores';
import { formatDate } from '@utils';
import { mockData } from '@mocks';
```

## Excecao registrada

```txt
src/utils/api.ts -> src/stores/useAuthStore.tsx
```

Essa excecao permanece direta porque importar `@stores` dentro do API client ampliaria o ciclo ja existente entre store, service e API.

