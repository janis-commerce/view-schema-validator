# Plan de ejecución — Component LineBreak

> Deriva de `specs/jmv-4103-line-break-component.md` (aprobado 2026-08-13). No redefine el alcance.
> Repos: `services/janis-views` (`JMV-4104-line-break-component`) · `packages/view-schema-validator` (`JMV-4105-line-break-component`)

## Orden entre repos

Los dos repos son independientes y se desarrollan **en paralelo**. La única secuencia real es de publicación, fuera de este plan: el release del validador tiene que estar publicado antes de que un equipo backend pueda publicar un schema con el component.

---

## `janis-views` — JMV-4104

### V1 — Component + intercepción + efectos secundarios

Depende de: nada.

- `src/shared/ui/LineBreak/LineBreak.js`, `styles.js`, `index.js` (nuevos) — component sin lógica de dominio. Estilos: `flex-basis: 100%; width: 100%; height: 0; margin: 0` bajo `onlyDesktop`, `display: none` en mobile. `data-attribute` propio para que `groupIsEmpty` lo pueda identificar.
- `src/components/FormSection/Field/Field.js` (edit) — early return del component. Va **después** de los hooks del componente (`useDevices`, `useContext`) y después de evaluar los conditionals, y **antes** del `ReduxField`, para que el field no se registre en redux-form. No mover ni condicionar ninguna llamada a hook.
- `src/components/sections/components/Field.js` (edit) — early return después del bloque `conditions.showWhen` existente (los hooks `useState`/`useEffect` ya quedan arriba).
- `src/components/FormSection/Group.js` (edit) — excluir el `LineBreak` del conteo de `groupIsEmpty` (líneas 28-42) para no romper el auto-ocultado de grupos.
- `src/components/FieldsArray/FieldsGroup.js` (edit) — no renderizar el `LineBreak` cuando es el último elemento visible de la columna, por la regla `& > div:last-child { margin-bottom: 0 }` de `FieldsArray/styles.js:37-43`.

Verificación: `src/shared/ui/LineBreak/LineBreak.test.js` + tests que cubran salto efectivo, `conditions.showWhen` no cumplida, `position: right`, `name` fuera de los valores de redux-form, grupo que se auto-oculta, y `LineBreak` último sin margen extra. `npm run lint` y `npm run lint:css` en verde.

### V2 — Documentación del component

Depende de: V1.

- `src/docs-janis/Back/edit-create/sections/form-components/lineBreak.stories.mdx` (nuevo) — siguiendo el formato de los `.stories.mdx` hermanos: para qué sirve, ejemplo de schema en YAML, y la aclaración de que el `name` es dummy y no viaja al target.

Verificación: `npm run storybook` levanta y la página renderiza.

---

## `view-schema-validator` — JMV-4105

### S1 — Habilitar el component en el schema de Edit/Create

Depende de: nada.

- `lib/schemas/edit-new/modules/componentNames.js` (edit) — agregar `lineBreak: 'LineBreak'`. Es el único cambio necesario: `lib/schemas/common-sections/sections/components/fieldGroup.js:24` referencia `schemaDefinitions#/definitions/editNewField`, así que el component queda habilitado también en ReadOnlySection, Summary y Monitor. Browse tiene su propio `componentNames` y queda fuera por decisión del spec.
- `tests/` (edit) — un schema de Edit/Create con `component: LineBreak` valida OK; un component inexistente sigue siendo rechazado.

Verificación: `npm test` en verde.

---

## Fuera de los batches (los maneja dev-flow, no el developer)

- CHANGELOG de cada repo: se escribe en §9, antes de la PR, con opciones de redacción.
- Borrado de `specs/jmv-4103-line-break-component.md` y de este plan: pre-PR.
- Release del validador: a pedido, con el gate de bump.
