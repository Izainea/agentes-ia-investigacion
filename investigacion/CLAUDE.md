# CLAUDE.md — El arnés de este proyecto de investigación

**Proyecto:** ¿Cómo afecta la IA la carga cognitiva de sus usuarios más intensivos?
**Investigador responsable:** Carlos Isaac Zainea Maya. El agente asiste; el investigador decide y firma.

Este archivo lo lee el agente al inicio de cada sesión. Es el **arnés**: las reglas que
acotan lo que el agente puede hacer y cómo debe hacerlo. Sin arnés, la velocidad de la IA
multiplica también sus errores.

## Reglas innegociables

1. **Nunca inventes referencias.** Toda cita debe tener DOI o URL verificada en la fuente
   original antes de entrar a `bibliografia/`. Si no puedes verificarla, márcala como
   `PENDIENTE-VERIFICAR` y dímelo.
2. **Si no sabes, dilo.** "No encontré evidencia suficiente" es una respuesta válida y
   valiosa. Nunca rellenes vacíos con texto plausible.
3. **Toda búsqueda queda registrada.** Cada búsqueda bibliográfica se guarda en `datos/`
   con fecha, ecuación exacta, base consultada y conteos por etapa
   (identificados → cribados → incluidos), para poder reconstruir el diagrama PRISMA.
3b. **URL explícita y descarga con licencia.** Cada fuente registra su URL de acceso
   (DOI resuelto y, si existe, URL del PDF de acceso abierto). Se descargan a
   `bibliografia/pdf/` solo los PDF cuya licencia lo permite; los metadatos de TODAS las
   fuentes van a `bibliografia/metadatos/`. Si un editor bloquea la descarga automatizada
   o la fuente es de pago, NO se evade el bloqueo: la URL queda en
   `bibliografia/descargas.md` para descarga manual del investigador.
4. **La Matriz Q es trazable.** Cada fila incluye cita textual y sección localizable del
   artículo. Yo valido cada fila antes de que se use en la síntesis.
5. **Imágenes con integridad.** Diagramas conceptuales e ilustraciones: sí, declarados como
   generados. Imágenes o gráficos que representen datos o resultados: solo a partir de los
   datos reales de `datos/`, con el código que los produce guardado en `artefactos/`.
   Nunca fabricar ni alterar imágenes de apariencia científica.
6. **Datos sensibles: no.** No proceses ni subas datos personales, entregas de estudiantes
   ni material inédito de terceros sin mi autorización explícita en el prompt.
7. **Todo texto generado es borrador.** Se marca `[BORRADOR-IA]` hasta que yo lo reescriba
   o lo apruebe. El texto que se publica lo firmo yo y respondo por él.
8. **Registra los prompts.** Cada prompt sustantivo del proyecto queda en
   `prompts/registro_prompts.md` con fecha y propósito. Es la memoria metodológica.

## Estructura del proyecto

- `plan.md` — plan de investigación; cada etapa tiene entregable y criterio de verificación.
- `prompts/` — registro de prompts usados (memoria metodológica del proyecto).
- `datos/` — resultados de búsquedas (JSON/CSV), nombrados `busqueda_AAAA-MM-DD_<base>.json`.
- `bibliografia/` — `matriz_q.csv` + `referencias.md` con estado de verificación.
- `artefactos/` — SVG, HTML, JS generados; cada uno con el prompt que lo produjo.
- `articulo/` — borradores y versión final del producto de divulgación.

## Contexto del caso

Punto de partida: el video "La IA ROMPE a los TRABAJADORES que MEJOR la usan"
(Xavier Mitjana, abril de 2026) afirma que el uso intensivo de IA deteriora a sus mejores
usuarios. Nuestra tarea es tratar esa afirmación como **pregunta de investigación**, no como
conclusión: buscar la evidencia, sintetizarla con Matriz Q y producir un artículo de
divulgación que diga lo que la evidencia permite decir — ni más, ni menos.
