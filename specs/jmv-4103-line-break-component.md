# Component LineBreak para forzar salto de línea en fields

> Repos: `services/janis-views` (branch `JMV-4104-line-break-component`) · `packages/view-schema-validator` (branch `JMV-4105-line-break-component`)
> Tickets: [JMV-4103](https://janiscommerce.atlassian.net/browse/JMV-4103) (historia) · [JMV-4104](https://janiscommerce.atlassian.net/browse/JMV-4104) (views) · [JMV-4105](https://janiscommerce.atlassian.net/browse/JMV-4105) (validator)
> Estado: borrador · Creado: 2026-08-13

## Objetivo

Nuevo component de schema `LineBreak` que un field puede declarar para forzar que los campos siguientes arranquen en una fila nueva del formulario, sin depender de que los `width` acumulados lleguen a 100.

## Contexto

Los fields de un `fieldsGroup` (Edit/Create) y los de un `FieldsArray` se acomodan en filas por acumulación de anchos, no por filas explícitas: el contenedor es un flex con `flex-wrap: wrap` (`src/components/FormSection/styles.js:72`, `src/components/FieldsArray/styles.js:32`) y cada field es un item con `width: ${width || 100}%` (`src/components/FormSection/schema-components/styles.js:15`).

Con campos condicionales (`conditions.showWhen`), al ocultarse un campo la fila deja de sumar 100 y todos los campos siguientes suben de línea. Se suma un segundo efecto: `getSiblingFields` (`src/components/sections/utils.js:108`) recalcula ancho y margen de los labels sobre los campos **visibles** (`isFirstElement`, `hasSpace`), así que también cambia cómo se ve el label de cada campo que se movió.

Resultado: quien define el schema tiene que encontrar a mano una combinación de `width` que cierre en 100 para cada combinación posible de condicionales — con 3-4 campos condicionales son 8-16 combinaciones a validar a ojo, sin forma de expresarlo en el schema.

No existe hoy ninguna herramienta equivalente: no hay component divider/separator/spacer. Los workarounds disponibles son malos — `HTML` monta un iframe con skeleton y `setTimeout(500)` (`src/components/sections/components/HTML.js:22`), y un `Text` vacío con `width: 100` deja 25px de margen y registra un field fantasma en redux-form.

## Alcance

✅ Incluye:

- **`janis-views`**: component `LineBreak` interceptado en las dos familias de `Field`, que entre las dos cubren los 6 renderers que usan este layout (Edit/Create, FieldsArray, ReadOnlySection, Summary, Monitor, control-tower)
- **`janis-views`**: fix de los dos efectos secundarios que introduce un child extra en el contenedor flex (`groupIsEmpty` y la regla `:last-child` de FieldsArray)
- **`janis-views`**: soporte de `conditions.showWhen` y de `position: left | right` en el `LineBreak` (sale gratis del pipeline de `Field`, pero se cubre con tests)
- **`janis-views`**: documentación del component en Storybook
- **`view-schema-validator`**: `LineBreak` como valor válido de `component` en el field de Edit/Create
- CHANGELOG en ambos repos

❌ NO incluye:

- **Browse**: `lib/schemas/browse/modules/field.js` tiene su propio `componentNames` y las celdas de la tabla no usan este layout de anchos acumulados. Queda fuera.
- **Propiedad `breakAfter`** en el field: se descartó a favor del component (ver Decisiones).
- **Restringir qué propiedades acepta un `LineBreak`** en el validador (`validations`, `mapper`, `triggers`, `dependency`): quedan permitidas por herencia del field genérico. Son inocuas — el frontend intercepta el component antes de usarlas — y acotarlas exige una regla propia en `lib/schemas/edit-new/modules/components/` que no paga el costo en esta entrega.
- **Migrar schemas existentes** a usar el component nuevo. Los backends adoptan cuando quieren; el layout actual no cambia.
- **Refactor del layout a CSS Grid**: resolvería el problema de raíz con `grid-column-start`, pero es un refactor de los 6 renderers y de todos los `width` publicados. Fuera de scope.

## Criterios de aceptación

- [ ] Un field con `component: LineBreak` hace que el field siguiente arranque en una fila nueva aunque los anchos previos no sumen 100
- [ ] El `LineBreak` no ocupa altura ni deja espacio visible entre las dos filas
- [ ] El comportamiento es el mismo en un `fieldsGroup` de Edit/Create y dentro de un `FieldsArray`
- [ ] Un `LineBreak` con `conditions.showWhen` que no se cumple no genera el salto: el layout queda idéntico a no haberlo declarado
- [ ] Declarado con `position: right`, el salto afecta solo a la columna derecha y no altera la izquierda
- [ ] En mobile el layout renderiza igual con y sin `LineBreak` declarado
- [ ] El campo que arranca la fila nueva recibe el mismo tratamiento de label (`isFirstElement`) que si la fila anterior hubiera cerrado en 100
- [ ] El `name` del `LineBreak` no queda registrado en redux-form ni aparece en los valores del formulario al guardar
- [ ] Un `fieldsGroup` con todos sus fields ocultos por condicionales se sigue auto-ocultando cuando además tiene un `LineBreak` declarado
- [ ] Un `LineBreak` que queda último en un `FieldsArray` no agrega margen extra al final del grupo
- [ ] El validador acepta un schema de Edit/Create con `component: LineBreak` y sigue rechazando un component inexistente

## Plan de archivos

**`services/janis-views`**

- `src/shared/ui/LineBreak/LineBreak.js` (nuevo) — el component, sin lógica de dominio
- `src/shared/ui/LineBreak/styles.js` (nuevo) — `flex-basis: 100%; width: 100%; height: 0; margin: 0` bajo `onlyDesktop`; `display: none` en mobile; `data-attribute` para que `groupIsEmpty` lo pueda excluir
- `src/shared/ui/LineBreak/index.js` (nuevo)
- `src/shared/ui/LineBreak/LineBreak.test.js` (nuevo)
- `src/components/FormSection/Field/Field.js` (edit) — early return después de evaluar los conditionals (~línea 85) y **antes** del `ReduxField`, para que no se registre en redux-form
- `src/components/sections/components/Field.js` (edit) — early return después del bloque `conditions.showWhen` (~línea 72)
- `src/components/FormSection/Group.js` (edit) — excluir el `LineBreak` del conteo de `groupIsEmpty` (líneas 28-42)
- `src/components/FieldsArray/FieldsGroup.js` (edit) — no renderizar el `LineBreak` cuando es el último elemento visible de la columna
- `src/docs-janis/Back/edit-create/sections/form-components/lineBreak.stories.mdx` (nuevo)
- `CHANGELOG.md` (edit)

**`packages/view-schema-validator`**

- `lib/schemas/edit-new/modules/componentNames.js` (edit) — agregar `lineBreak: 'LineBreak'`
- `tests/` (edit) — schema con `LineBreak` valida OK; component inexistente sigue rechazado
- `CHANGELOG.md` (edit)

## Decisiones

- **`component: LineBreak` como field, y no una propiedad `breakAfter` colgada del field anterior.** Como field independiente puede tener sus propias `conditions` (el caso real: el salto depende de qué campos aparecen, no del campo previo), hereda `position` sin lógica extra, y no obliga a tocar `getSiblingFields` — el default `get(field, 'width', 100)` de `src/components/sections/utils.js:113` ya resetea el acumulador de la fila, que es exactamente el comportamiento buscado para el cálculo de labels. Contra: exige un `name` dummy, porque el validador tiene `required: ['name', 'component']`.
- **Interceptar en las 2 familias de `Field` y no en los 6 renderers.** `src/components/FormSection/Field/Field.js` (editable, redux-form) y `src/components/sections/components/Field.js` (read-only) son los dos puntos por donde pasan todos los renderers que usan este layout. Se toca la mitad de archivos y no queda ningún renderer sin soporte.
- **Un solo cambio en el validador alcanza para Edit/Create, FieldsArray, ReadOnlySection, Summary y Monitor.** Todos esos contextos referencian `schemaDefinitions#/definitions/editNewField` a través de `lib/schemas/common-sections/sections/components/fieldGroup.js:24`, así que habilitar el component en `edit-new/modules/componentNames.js` los cubre a todos.
- **El `name` del `LineBreak` no colisiona con campos del target.** El component se intercepta antes de llegar al `ReduxField`, así que nunca se registra en el formulario. Se documenta la convención de usar nombres tipo `brk1`.
- **Los dos repos se desarrollan en paralelo.** Son independientes entre sí; lo único secuencial es que el release del validador tiene que estar publicado antes de que un equipo backend pueda publicar un schema que use el component.

## Abiertas

—
