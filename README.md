# El uso de agentes de IA en la investigación

Tutorial guiado e interactivo presentado en el **Workshop "Integración de la IA en la investigación: debates éticos y pedagógicos para un uso responsable"** (Universidad Santo Tomás, 29–30 de julio de 2026 — Doctorados en Filosofía, Educación, Derecho y Psicología).

**Autor:** Carlos Isaac Zainea Maya — Doctorado en Filosofía
**Contacto:** cizaineam@gmail.com · GitHub: [izainea](https://github.com/izainea)
**Página:** https://izainea.github.io/agentes-ia-investigacion/

## Qué hay aquí

Este repositorio es dos cosas al mismo tiempo:

1. **El tutorial** (`index.html`): una página interactiva que explica qué es un agente de IA, cómo trabajamos con Claude Code en VS Code, y cómo montar tres agentes para la investigación: búsqueda de artículos, generación de resúmenes (Matriz Q) y herramientas para resumir y visualizar información.

2. **Un proyecto de investigación de ejemplo** (`investigacion/`): la investigación guiada que desarrollamos en la charla —*¿cómo afecta la IA la carga cognitiva de sus usuarios más intensivos?*— organizada con buenas prácticas: plan, arnés de reglas (`CLAUDE.md`), registro de prompts, datos de búsquedas, bibliografía verificada, artefactos y artículo final. Puedes clonarlo y usarlo como plantilla para tu propia investigación.

```
agentes-ia-investigacion/
├── index.html              ← el tutorial interactivo
├── articulo.html           ← el resultado final: artículo de prensa
├── assets/                 ← estilos e interactividad de la página
└── investigacion/          ← el proyecto de ejemplo (plantilla clonable)
    ├── CLAUDE.md           ← el arnés: reglas que el agente debe respetar
    ├── plan.md             ← plan de investigación con criterios de verificación
    ├── prompts/            ← registro de prompts (memoria metodológica)
    ├── datos/              ← resultados de búsquedas, con fecha y conteos
    ├── bibliografia/       ← Matriz Q y referencias verificadas
    ├── artefactos/         ← SVG, HTML y JS generados durante la investigación
    └── articulo/           ← borradores y versión final del artículo
```

## Cómo usarlo como plantilla

1. Clona el repositorio o descárgalo como ZIP.
2. Abre la carpeta `investigacion/` en VS Code con Claude Code instalado.
3. Edita `CLAUDE.md` con las reglas de **tu** proyecto y `plan.md` con tus etapas.
4. Usa los prompts de `prompts/registro_prompts.md` como punto de partida.

## Declaración de uso de IA

Esta página y la estructura del proyecto fueron construidas con **Claude Code (Anthropic)** bajo la dirección de Carlos Isaac Zainea Maya, quien definió el contenido, revisó cada afirmación y asume plena responsabilidad por el resultado. Las referencias bibliográficas citadas fueron verificadas contra sus fuentes originales; el estado de verificación de cada una está documentado en `investigacion/bibliografia/referencias.md`.
