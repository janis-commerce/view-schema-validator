# Proposal: Habilitar MultiValueWrapper en schemas Edit/New

## Intent

Disponibilizar el componente `MultiValueWrapper` en schemas de tipo Edit/New para que los equipos
backend puedan configurar la presentación de campos array en vistas de edición/creación, sin
intervención del equipo frontend. Actualmente el validador lo rechaza en esos contextos.

## Scope

### In Scope
- Crear `lib/schemas/edit-new/modules/components/multiValueWrapper.js`
- Registrar `MultiValueWrapper` en `lib/schemas/edit-new/modules/componentNames.js`
- Exportar el componente desde `lib/schemas/edit-new/modules/components/index.js`
- Agregar mock de test (`edit-with-multiValueWrapper.yml`) y su expected output
- Agregar caso de test en `tests/validator-test.js`

### Out of Scope
- Implementación del componente en Janis Views (frontend)
- Refactor de MultiValueWrapper como componente compartido browse/edit-new
- Cambios en schemas de Browse

## Approach

Copiar `lib/schemas/browse/modules/components/multiValueWrapper.js` al path edit-new,
reemplazando el único `$ref` diferente: `browseField` → `editNewField`. El patrón está
confirmado — `asyncWrapper`, `fieldsArray`, `fieldList` y `selectForm` en edit-new siguen
exactamente este mismo modelo. La interfaz de `componentAttributes` queda idéntica a Browse.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `lib/schemas/edit-new/modules/components/multiValueWrapper.js` | New | Definición del componente para edit-new |
| `lib/schemas/edit-new/modules/componentNames.js` | Modified | Agregar `multiValueWrapper: 'MultiValueWrapper'` |
| `lib/schemas/edit-new/modules/components/index.js` | Modified | Import + export del nuevo componente |
| `tests/mocks/schemas/edit-with-multiValueWrapper.yml` | New | Schema mock de test |
| `tests/mocks/schemas/expected/edit-with-multiValueWrapper.json` | New | Expected output del test |
| `tests/validator-test.js` | Modified | Nuevo caso de test |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `editNewField` limita sub-componentes a los de edit-new | Low | Comportamiento correcto y esperado |
| Regresión en tests existentes | Low | Solo se agregan archivos/entradas, no se modifica lógica existente |

## Rollback Plan

`git revert` del commit o eliminar los 3 archivos nuevos y deshacer las 3 líneas modificadas.
No hay cambios de base de datos ni breaking changes.

## Dependencies

- Ninguna externa. El `editNewField` ya está definido en `lib/schemas/definitions/index.js`.

## Success Criteria

- [ ] `npm test` pasa sin errores, incluyendo el nuevo caso de test
- [ ] `npm run lint` pasa sin errores
- [ ] Un schema Edit con un campo `component: MultiValueWrapper` valida correctamente
- [ ] Un schema Edit con `MultiValueWrapper` mal configurado (sin `direction` o sin `field`) falla la validación con error descriptivo
