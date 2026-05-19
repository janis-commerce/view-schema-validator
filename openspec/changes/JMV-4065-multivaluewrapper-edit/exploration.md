# Exploration: Habilitar MultiValueWrapper en Edit/New schemas

## Contexto del Ticket (JMV-4063 / JMV-4065)

El componente `MultiValueWrapper` existe en Browse para renderizar campos array mostrando cada
ítem individualmente con soporte de colapso/expansión. El objetivo es disponibilizarlo en
Edit/Create (FormSection) para que los equipos de backend puedan usarlo en sus schemas de edición.

El trabajo en **este repositorio** (view-schema-validator) es únicamente validador: hacer que el
validador de schemas reconozca y permita `MultiValueWrapper` en schemas de tipo Edit/New.

---

## Current State

- `MultiValueWrapper` existe SOLO en `lib/schemas/browse/modules/components/multiValueWrapper.js`
- Referenciado solo en `lib/schemas/browse/modules/componentNames.js`
- El directorio `lib/schemas/edit-new/modules/components/` tiene ~25 componentes — NO incluye multiValueWrapper
- `lib/schemas/edit-new/modules/componentNames.js` lista los componentes válidos — NO incluye MultiValueWrapper

### Definición Browse actual

```js
makeComponent({
    name: multiValueWrapper,             // 'MultiValueWrapper'
    properties: {
        useDataField: { type: 'boolean' },
        direction: { enum: ['horizontal', 'vertical'], default: 'vertical' },
        field: { $ref: 'schemaDefinitions#/definitions/browseField' },  // ← BROWSE
        isCollapsable: { oneOf: [{ type: 'boolean' }, { enum: ['onlyMobile', 'onlyDesktop'] }] },
        defaultStatus: { enum: ['open', 'closed'] },
        itemsToShowWhenClosed: { type: 'number' }
    },
    requiredProperties: ['direction', 'field']
})
```

### Patrón confirmado en edit-new

`asyncWrapper`, `fieldsArray`, `fieldList`, `selectForm` ya usan:
```js
field: { $ref: 'schemaDefinitions#/definitions/editNewField' }
```

---

## Affected Areas

- `lib/schemas/edit-new/modules/components/multiValueWrapper.js` — **CREAR** (nuevo archivo)
- `lib/schemas/edit-new/modules/componentNames.js` — agregar `multiValueWrapper: 'MultiValueWrapper'`
- `lib/schemas/edit-new/modules/components/index.js` — importar y exportar el nuevo componente
- `tests/mocks/schemas/edit-with-multiValueWrapper.yml` — **CREAR** mock de test
- `tests/mocks/schemas/expected/edit-with-multiValueWrapper.json` — **CREAR** expected output
- `tests/validator-test.js` — agregar caso de test

---

## Approaches

### 1. Copy-adapt desde Browse (RECOMENDADO)
Copiar `lib/schemas/browse/modules/components/multiValueWrapper.js` al path edit-new,
cambiando `browseField` → `editNewField`. Agregar al componentNames y al index.

- Pros: mínimo riesgo, patrón ya establecido (asyncWrapper hace lo mismo), interfaz idéntica = máxima compatibilidad con el ticket
- Cons: ninguno relevante
- Effort: **Low**

### 2. Componente compartido en common-components
Crear una versión genérica en `lib/schemas/common-components/` con `$ref` parametrizable.

- Pros: evita duplicación entre browse y edit-new
- Cons: refactor innecesario, cambia la definición de Browse existente, mayor riesgo
- Effort: **Medium** — out of scope

---

## Recommendation

**Approach 1 — Copy-adapt.** Es el patrón exacto que sigue `asyncWrapper` en edit-new.
La única diferencia es reemplazar `browseField` por `editNewField`. La interfaz de
`componentAttributes` queda idéntica al Browse (como pide el ticket), lo que permite que el
mismo schema funcione en ambos contextos sin cambios del lado de los backends.

---

## Risks

- Ninguno significativo. El componente es display-only (no editable), no afecta lógica de guardado.
- El `editNewField` ya incluye todos los componentes válidos de edit-new en su `enum`, entonces
  el sub-campo `field.component` dentro del MultiValueWrapper sólo podrá ser un componente Edit/New
  (Text, Chip, etc.) — coherente con el contexto.

---

## Ready for Proposal

**Sí.** Cambio simple, bien acotado, patrón ya establecido en el proyecto.

Archivos a crear/modificar:
1. `lib/schemas/edit-new/modules/components/multiValueWrapper.js` (nuevo)
2. `lib/schemas/edit-new/modules/componentNames.js` (agregar 1 línea)
3. `lib/schemas/edit-new/modules/components/index.js` (agregar import + export)
4. `tests/mocks/schemas/edit-with-multiValueWrapper.yml` (nuevo mock)
5. `tests/mocks/schemas/expected/edit-with-multiValueWrapper.json` (nuevo expected)
6. `tests/validator-test.js` (agregar caso de test)
