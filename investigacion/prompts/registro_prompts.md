# Registro de prompts del proyecto

Memoria metodológica: cada prompt sustantivo queda registrado aquí con fecha y propósito.
Así cualquier lector puede reconstruir *cómo* se hizo esta investigación.

---

## P1 — Definir el problema (2026-07-30)

**Propósito:** llegar a la causa raíz sin que la IA invente el problema por mí.

> Actúa como tutor metodológico. Vamos a aplicar la técnica de los 5 porqués al tema
> "el uso intensivo de IA y la carga cognitiva de sus usuarios". Tu papel es SOLO hacer
> las preguntas, una a la vez, y pedirme evidencia de cada respuesta. No respondas por mí.
> Al final, resume MI cadena causal y señala en qué eslabones me falta evidencia.

**Arnés aplicado:** la IA pregunta, el investigador responde. El problema debe ser genuino.

---

## P2 — Refinar la pregunta de investigación (2026-07-30)

**Propósito:** pasar de un tema a una pregunta con componentes completos.

> Aquí está mi borrador de pregunta: "¿Cómo afecta la IA la carga cognitiva de sus usuarios
> más acérrimos?". Critícala con esta rúbrica: ¿tiene variable independiente, variable
> dependiente, población y condición de uso? Propón 3 reformulaciones que las tengan TODAS,
> y dime qué pierde y qué gana cada una. No elijas por mí: yo decido.

**Arnés aplicado:** la IA critica y propone; la decisión queda registrada como mía.

---

## P3 — Plan y arnés del proyecto (2026-07-30)

**Propósito:** crear la estructura del proyecto con reglas explícitas.

> Crea en esta carpeta un proyecto de investigación con buenas prácticas:
> `plan.md` (etapas, entregables, criterio de verificación por etapa) y `CLAUDE.md` con las
> reglas innegociables del proyecto: nunca inventar referencias (todo con DOI verificado),
> decir "no sé" cuando no haya evidencia, registrar toda búsqueda en datos/ con fecha y
> conteos, marcar todo texto generado como [BORRADOR-IA], y no procesar datos sensibles.
> Muéstrame ambos archivos antes de guardarlos.

**Arnés aplicado:** el arnés mismo se construye primero y se revisa antes de guardar.

---

## P4 — Ecuación de búsqueda y ejecución (2026-07-30)

**Propósito:** búsqueda sistemática, replicable y documentada.

> A partir de mis preguntas Q1–Q3 (léelas en plan.md), construye una ecuación de búsqueda:
> extrae los conceptos clave, expande sinónimos en inglés (p. ej. "cognitive offloading",
> "cognitive load", "cognitive debt", "generative AI", "large language models"), y arma la
> ecuación booleana. Ejecútala contra la API de OpenAlex, guarda el JSON completo en
> datos/busqueda_2026-07-30_openalex.json, y registra: ecuación exacta, total identificado,
> filtros aplicados y total tras filtros. NO selecciones todavía: solo lista los 15 más
> citados con título, año, DOI, conteo de citas y — EXPLÍCITAMENTE — la URL de acceso
> de cada uno (DOI resuelto y, si existe, la URL del PDF de acceso abierto).

**Arnés aplicado:** conteos por etapa para PRISMA; URL explícita por resultado; la selección
la hace el investigador.

---

## P5 — Matriz Q (2026-07-30)

**Propósito:** extraer con trazabilidad lo que cada artículo responde a cada pregunta.

> De los artículos que seleccioné (marcados en datos/seleccion.md), llena
> bibliografia/matriz_q.csv con estas columnas: referencia APA, año, DOI, URL de acceso
> explícita, base y ecuación de origen, qué responde a Q1, a Q2 y a Q3 (con cita textual
> y sección), y qué vacío deja. Descarga a bibliografia/pdf/ los PDF que sean de acceso
> abierto y cuya licencia lo permita; guarda los metadatos de TODOS en
> bibliografia/metadatos/. Si un editor bloquea la descarga automatizada o el artículo es
> de pago, NO evadas el bloqueo: registra la URL en descargas.md para descarga manual.
> Regla dura: si un artículo no dice nada sobre una pregunta, escribe "no aborda" — no
> extrapoles. Marca cada fila como PENDIENTE-VALIDAR hasta que yo la revise.

**Arnés aplicado:** URL explícita por fuente; descargas solo con licencia; citas textuales
localizables; "no aborda" en vez de relleno plausible.

---

## P6 — Artefacto visual de alta calidad (2026-07-30)

**Propósito:** un diagrama que ayude a *entender* el problema, no a decorarlo.

> Crea un diagrama SVG de alta calidad visual (editable, paleta sobria de 3 colores,
> tipografía legible, apto para proyectar) que explique el ciclo de la descarga cognitiva:
> delegar → menor esfuerzo → menor retención → mayor dependencia → delegar más. Basa cada
> eslabón en la Matriz Q e indica junto a cada uno la referencia que lo sustenta. Es un
> diagrama CONCEPTUAL: decláralo así en el pie. Guárdalo en artefactos/ con este prompt
> como comentario dentro del archivo.

**Arnés aplicado:** diagrama conceptual declarado; cada eslabón con su referencia.

---

## P7 — Artículo de divulgación (2026-07-30)

**Propósito:** el borrador del producto final, para reescritura del investigador.

> Con la Matriz Q validada y la síntesis, redacta un BORRADOR de artículo de prensa
> (800 palabras, tono divulgativo, titular atractivo pero honesto) que responda al video
> "La IA ROMPE a los TRABAJADORES que MEJOR la usan": qué dice realmente la evidencia.
> Reglas: cada afirmación empírica cierra con (Autor, año); distingue correlación de
> causalidad; incluye qué NO sabemos todavía; nada de cifras que no estén en la matriz.
> Márcalo [BORRADOR-IA]. Yo lo reescribo, lo firmo y añado la declaración de uso de IA.

**Arnés aplicado:** borrador marcado; autoría y firma del investigador; declaración de uso.

---

## P8 — Verificación de referencias (2026-07-29) ✔ EJECUTADO

**Propósito:** resolver cada DOI de la matriz antes de que ninguna cita llegue al texto.

> Toma bibliografia/matriz_q.csv y verifica cada fila contra la API de OpenAlex:
> resuelve el DOI y comprueba que título, autores, año y revista coinciden con lo
> registrado. Reporta cualquier discrepancia SIN corregirla automáticamente: yo decido.
> Registra además, para cada fuente, la URL de acceso explícita y si existe PDF de
> acceso abierto; descarga solo lo que la licencia permita y documenta el resto en
> bibliografia/descargas.md.

**Resultado real:** la verificación **atrapó un DOI equivocado** en la fila 2
(Risko & Gilbert, 2016): el DOI registrado (`…2016.06.007`) pertenecía a otro artículo.
Se corrigió a `10.1016/j.tics.2016.07.002` tras cotejar título, autores y revista.
También se resolvió el DOI pendiente de Lee et al. (2025): `10.1145/3706598.3713778`.
Detalle completo en `bibliografia/descargas.md` y `bibliografia/referencias.md`.

**Arnés aplicado:** el agente reporta discrepancias, el investigador decide; todo queda
documentado. El error fue del propio agente — y el arnés lo detectó. Ese es el punto.
