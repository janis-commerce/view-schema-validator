# View schema validator

Este repositorio, `@janiscommerce/view-schema-validator`, es una herramienta de CLI (interfaz de línea de comandos) diseñada para validar y compilar esquemas de vista (View Schemas) utilizados en el ecosistema de JANIS Commerce. Es la herramienta que garantiza que las definiciones de la interfaz de usuario de Janis sean técnicamente correctas antes de ser desplegadas o utilizadas.

## ¿Para qué sirve?

1.  Validación: Comprueba que los archivos de configuración (en formato JSON o YAML) cumplan con las reglas y estructuras definidas para las vistas de la plataforma Janis (como paneles de búsqueda, formularios de edición, dashboards, etc.).
2.  Compilación (Build): Resuelve referencias entre archivos ($ref), integra valores por defecto y genera archivos JSON finales listos para ser consumidos por el frontend de Janis.
3.  Soporte de Parciales: Permite dividir configuraciones complejas en archivos más pequeños llamados "partials" (`.partial.yml` o `.partial.json`), que pueden ser reutilizados en múltiples esquemas.

## Características principales

- Comandos clave:
  - `validate`: Solo verifica si los esquemas son correctos.
  - `build`: Valida, resuelve dependencias y escribe los archivos procesados en una carpeta de salida.
- Resolución de referencias: Soporta el uso de $ref para importar campos, secciones o componentes desde otros archivos.
- Modo Observador (Watch): Puede monitorear cambios en los archivos y ejecutar la validación/construcción automáticamente.
- Tecnologías: Utiliza `AJV` para la validación de esquemas JSON y yargs para la interfaz de comandos.

## Worktrees

Worktree directory: `~/var/www/` — crear worktrees como hermanos del proyecto con el nombre de la branch (ej: `~/var/www/view-schema-validator-JMV-3343`).

## Comandos Esenciales

```bash
# Desarrollo
npm install                          # Instalar dependencias

# Testing
npm test                             # Ejecuta pruebas unitarias usando mocha
npm run watch-test					 # Ejecuta `test` con watch mode
npm run test-ci                	     # Versión optimizada para entornos de Integración Continua
npm run test-file                    # Ejecuta validación de un archivo específico usando la lógica local del proyecto (node index.js validate -i)

# Cobertura de códigog
npm run coverage			 		 # Ejecuta el script de test pero envuelto en nyc
npm run coverage:report-html   		 # Ejecuta las pruebas y genera un reporte detallado en HTML

# Calidad
npm run lint                         # Verificar ESLint

## Otros
npm run postpublish					 # Se ejecuta automáticamente después de que el paquete es publicado en NPM
```

## Arquitectura

### Sistema Schema-Driven (CRÍTICO)

**>90% de las vistas en [`Janis Views`](https://bitbucket.org/fizzmodsrl/janis-views/src/master/) son generadas dinámicamente desde schemas JSON/YAML definidos por el backend.**

Los equipos backend crean interfaces completas sin tocar código frontend. Definen un schema → el frontend lo valida → lo renderiza automáticamente.

También:

- Los backends lo corren en CI para validar schemas antes de publicar
- También disponible como librería para validación programática desde frontend

#### Flujo completo

```
Backend (define schema .yml)
  → view-schema-validator (este repositorio) valida en CI
  → API de schemas (sirve JSON en SCHEMA_ENDPOINT)
  → Frontend PageLoader (carga y renderiza según campo `root`)
```

Paso a paso:

1. Equipo backend crea `{service}/{namespace}/{method}.yml` (ej: `picking/round/browse.yml`)
2. Valida localmente con CLI del `view-schema-validator`
3. Publica el schema en el servicio de schemas (`SCHEMA_ENDPOINT`)
4. Usuario navega a `/{service}/{namespace}/{method}` (ej: `/picking/round/browse`)
5. `PageLoader` llama a `getPageSchema()` → `{SCHEMA_ENDPOINT}/schemas/picking/round/browse.json`
6. Lee el campo `root` del schema y renderiza el componente correspondiente

**Ejemplo concreto**: El equipo de picking necesita un listado de rondas → crea schema con `root: Browse` → el frontend renderiza automáticamente una tabla completa con filtros, paginación y acciones masivas, sin una línea de código frontend.

#### Repositorios de referencia

**Janis Views** — [`Janis Views`](https://bitbucket.org/fizzmodsrl/janis-views/src/master/):

- los backends y PO's lo usan para mostrar las vistas generadas por schema luego de pasar por este repositorio

**Mocking service** (schemas de ejemplo, privado) — [janis-mocking-service](https://bitbucket.org/fizzmodsrl/janis-mocking-service/src/master/):

- Contiene ejemplos reales de schemas para desarrollo y testing
- Consultar cuando no se tiene el schema real o se quieren ver ejemplos de configuración avanzada

#### Archivos clave del proyecto

Los archivos clave de este proyecto se dividen en tres categorías:

- la interfaz de comandos (CLI)
- el motor de lógica
- definiciones de reglas (esquemas).

**1. Punto de Entrada y CLI**

- `index.js`: archivo principal que se ejecuta al usar la herramienta en la terminal. Configura todos los comandos (build. validate) y las opciones (--input, --output, etc.) usando la librería **yargs**.
- `lib/index.js`: punto de entrada si decides usar esta herramienta como una librería dentro de otro proyecto Node.js. Exporta la clase principal ViewSchemaValidator.

**2. Motor de Lógica (lib/)**

- `lib/view-schema-validator.js`: "cerebro" del proyecto. Coordina tanto la validación como la construcción de los esquemas.
- `lib/validator.js`: contiene la lógica base para validar archivos contra los esquemas JSON.
- `lib/builder.js`: encargado de la compilación: resuelve los $ref, procesa los partials y genera los archivos finales.
- `lib/endpoint-resolver.js`: maneja resolución de endpoints (URLs de APIs) dentro de los esquemas, algo crucial para que las vistas de Janis sepan a dónde conectarse.

**3. Definiciones de Reglas (lib/schemas/)**

Esta carpeta es vital porque contiene los esquemas maestros que dictan qué es válido y qué no:

- `lib/schemas/browse/schema.js`: reglas para las vistas de listado (browse).
- `lib/schemas/edit/schema.js` y `lib/schemas/new/schema.js`: reglas para los formularios de edición y creación.
- `lib/schemas/common/`: contiene definiciones compartidas (como botones, acciones, campos) para evitar duplicar reglas.

**4. Validadores de Deprecación**

- `lib/deprecation-validator.js` y carpeta `lib/deprecation-validators/`: se encargan de avisar al desarrollador si está usando propiedades antiguas que pronto dejarán de funcionar, ayudando a mantener el código actualizado.

**5. Configuración y Documentación**

- `package.json`: define dependencias clave como **ajv** (el validador de JSON) y **@apidevtools/json-schema-ref-parser** (para los $ref).
- `README.md`: manual de uso esencial para cualquier desarrollador que llegue al proyecto.

## Notas Técnicas

### Versión de Node

- Usa **Node.js 18.x** (ver `.nvmrc`)

### Branches y Ambientes

| Branch   | Ambiente   | URL |
| -------- | ---------- | --- |
| `master` | Producción | --- |

- Los deploys a producción se realizan bajo un tag `v*.*.*` con versión actualizada en `package.json` y `CHANGELOG.md`
