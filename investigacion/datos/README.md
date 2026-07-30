# datos/

Aquí se guardan los resultados **crudos** de cada búsqueda bibliográfica, con fecha.

**Convención de nombres:** `busqueda_AAAA-MM-DD_<base>.json` (p. ej. `busqueda_2026-07-30_openalex.json`).

Cada búsqueda debe registrar, además del JSON crudo, una entrada en `registro_busquedas.md`:

| Fecha | Base | Ecuación exacta | Identificados | Tras filtros | Notas |
|---|---|---|---|---|---|
| 2026-07-30 | OpenAlex | ("cognitive offloading" OR "cognitive load" OR "cognitive debt") AND ("artificial intelligence" OR "generative AI" OR "large language models") | *(pendiente de ejecución)* | | filtro: 2011– |

Estos conteos son el insumo directo del **diagrama PRISMA**: identificación → cribado →
elegibilidad → incluidos. Si los conteos no están registrados, la revisión no es auditable.
