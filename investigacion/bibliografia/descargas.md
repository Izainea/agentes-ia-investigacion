# Registro de descargas de bibliografía

**Regla del arnés (CLAUDE.md):** para cada fuente se registra la **URL explícita** de acceso.
El PDF se descarga **solo** cuando la licencia lo permite (acceso abierto). Si el editor
bloquea descargas automatizadas o el artículo es de pago, el agente **no evade el bloqueo**:
registra la URL y el investigador descarga manualmente con su clic y su acceso institucional.

Ejecución: 2026-07-29, vía API de OpenAlex (`best_oa_location` / `open_access.oa_url`).

| Fuente | URL de acceso (explícita) | Acceso | PDF en `pdf/` |
|---|---|---|---|
| Sparrow et al. (2011) | https://doi.org/10.1126/science.1207745 | Cerrado (Science) | — solo metadatos; descarga vía acceso institucional |
| Risko & Gilbert (2016) | https://doi.org/10.1016/j.tics.2016.07.002 | Cerrado (Elsevier) | — solo metadatos; descarga vía acceso institucional |
| Ward et al. (2017) | https://doi.org/10.1086/691462 · copia OA: https://doi.org/10.15781/t2j679d4s | Verde (repositorio) | — URL registrada (repositorio Texas ScholarWorks) |
| Gerlich (2025) | https://doi.org/10.3390/soc15010006 · PDF: https://www.mdpi.com/2075-4698/15/1/6/pdf | Dorado (MDPI) | ✗ el sitio bloqueó la descarga automatizada (403) → **descargar manualmente en 1 clic** |
| Lee et al. (2025) | https://doi.org/10.1145/3706598.3713778 · PDF: https://dl.acm.org/doi/pdf/10.1145/3706598.3713778 | Dorado (ACM) | ✗ bloqueo anti-bot (403) → **descargar manualmente en 1 clic** |
| Kosmyna et al. (2025) | https://arxiv.org/abs/2506.08872 · PDF: https://arxiv.org/pdf/2506.08872 | Verde (arXiv) | ✅ `kosmyna_2025_cognitive_debt.pdf` (37 MB — el preprint incluye apéndices extensos) |
| Dell'Acqua et al. (2023) | https://doi.org/10.2139/ssrn.4573321 · versión publicada (2026): https://doi.org/10.1287/orsc.2025.21838 | SSRN (registro) / Org. Science (cerrado) | — URL registrada; SSRN requiere descarga manual |

**Metadatos completos:** carpeta `metadatos/` — un JSON de OpenAlex por fuente (título, autores,
año, DOI, estado de acceso abierto, conteo de citas, ubicaciones).

## Incidente de verificación (documentado a propósito)

Durante la preparación, la matriz registraba para Risko & Gilbert (2016) el DOI
`10.1016/j.tics.2016.06.007`. Al resolverlo contra OpenAlex, ese DOI corresponde a **otro
artículo** ("Ensemble Perception, Summary Statistics, and Perceptual Awareness: A Response").
El DOI correcto es `10.1016/j.tics.2016.07.002` (verificado: título, autores y revista coinciden).

**Moraleja del arnés:** el error lo cometió el propio agente que ayudó a construir este
proyecto — y la regla "todo DOI se resuelve antes de usarse" lo atrapó. La verificación no es
desconfianza: es método.
