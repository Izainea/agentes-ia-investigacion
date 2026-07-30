/* ============================================================
   Interactividad del tutorial — sin librerías externas.
   Todos los datos de respaldo provienen de ejecuciones REALES
   contra la API de OpenAlex (29 de julio de 2026): nada inventado.
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilidades ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function fmt(n) { return Number(n).toLocaleString('es-CO'); }

  function copyText(text, btn) {
    function done() {
      if (!btn) return;
      var prev = btn.textContent;
      btn.textContent = '✓ Copiado';
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = prev; btn.classList.remove('copied'); }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
    } else { legacyCopy(text); done(); }
  }
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'absolute'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* sin soporte */ }
    document.body.removeChild(ta);
  }

  /* ============================================================
     1 · Ciclo del agente
     ============================================================ */
  var CICLO = [
    '<p><strong>Planificar.</strong> El agente descompone la instrucción en pasos: "para buscar literatura se necesita la pregunta, luego la ecuación, luego ejecutarla, luego registrar los conteos". En Claude Code — la herramienta de este tutorial — puede exigirse ver el plan antes de que toque un archivo; Codex y Antigravity tienen modos equivalentes.</p>' +
    '<p class="ciclo-rol">👤 <strong>Papel del investigador:</strong> corregir el plan — quitar pasos, añadir criterios, acotar el alcance. Corregir un plan cuesta menos que corregir un resultado.</p>',
    '<p><strong>Ejecutar.</strong> El agente usa herramientas: lee y escribe archivos de la carpeta, consulta APIs académicas (OpenAlex, arXiv), corre scripts, descarga lo que la licencia permite. Cada acción queda a la vista: es una bitácora, no una caja negra.</p>' +
    '<p class="ciclo-rol">👤 <strong>Papel del investigador:</strong> observar e interrumpir a tiempo — a mitad de camino, no al final.</p>',
    '<p><strong>Verificar.</strong> El agente contrasta el resultado con las reglas del proyecto (CLAUDE.md) y los criterios del plan: ¿el DOI resuelve?, ¿los conteos cuadran?, ¿la cita es localizable? Lo que no pasa se marca (PENDIENTE-VERIFICAR), no se oculta. Así se detectó el DOI erróneo de esta misma página.</p>' +
    '<p class="ciclo-rol">👤 <strong>Papel del investigador:</strong> definir los criterios. La máquina comprueba; qué cuenta como "correcto" lo decide el investigador.</p>',
    '<p><strong>Iterar.</strong> Con la retroalimentación recibida, el agente corrige y repite el ciclo: nueva ecuación si hubo ruido, nueva fila si falta una fuente, nuevo borrador si el argumento falla.</p>' +
    '<p class="ciclo-rol">👤 <strong>Papel del investigador:</strong> juzgar el cierre. El ciclo termina cuando el resultado cumple el criterio — no antes.</p>'
  ];
  var cicloBtns = $all('.ciclo-btn');
  var cicloPanel = $('#ciclo-panel');
  cicloBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      cicloBtns.forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      cicloPanel.innerHTML = CICLO[Number(b.dataset.etapa)];
    });
  });

  /* ============================================================
     2 · Terminal simulada (recreación con números reales)
     ============================================================ */
  var TERM = [
    { c: 'u', t: '❯ Estamos investigando cómo la IA afecta la carga cognitiva de sus\n  usuarios más intensivos. Lee plan.md y crea CLAUDE.md con las\n  reglas del proyecto.' },
    { c: 'a', t: '● Leí plan.md (pregunta central, Q1–Q3, H0/H1). Creé CLAUDE.md con\n  8 reglas. Las tres críticas:\n    · No inventar referencias: todo con DOI verificado\n    · Registrar cada búsqueda en datos/ con fecha y conteos\n    · Todo texto generado se marca [BORRADOR-IA]\n  ¿Las revisamos antes de continuar?' },
    { c: 'u', t: '❯ Sí, apruebo las reglas. Ahora construye la ecuación de búsqueda\n  a partir de Q1–Q3 y ejecútala en OpenAlex.' },
    { c: 'a', t: '● Ecuación: ("cognitive offloading" OR "cognitive debt") AND\n  ("artificial intelligence" OR "generative AI" OR chatbot)\n  Ejecutada ✓  47.844 identificados → 1.011 tras filtro\n  título/abstract. Guardado: datos/busqueda_2026-07-30_openalex.json\n  Detecté un duplicado (el mismo estudio en revista y en SSRN):\n  lo marqué para el cribado.' },
    { c: 'u', t: '❯ Lista los 10 más citados y llena la Matriz Q solo con los\n  que yo apruebe.' },
    { c: 'a', t: '● Candidatos en bibliografia/candidatos.md. Quedo a la espera de\n  tu selección. Nota: un DOI no resolvió (Lee et al., 2025):\n  queda PENDIENTE-VERIFICAR según CLAUDE.md — no lo usaré\n  hasta que lo confirmemos.' }
  ];
  var termBody = $('#term-body');
  var termPlay = $('#term-play');
  var termTimer = null;

  function termRender(instant) {
    if (termTimer) { clearTimeout(termTimer); termTimer = null; }
    termBody.innerHTML = '';
    var i = 0;
    function nextLine() {
      if (i >= TERM.length) { termPlay.textContent = '↺ Repetir'; termPlay.disabled = false; return; }
      var item = TERM[i++];
      var div = document.createElement('div');
      div.className = item.c;
      termBody.appendChild(div);
      if (instant) { div.textContent = item.t; nextLine(); return; }
      var j = 0;
      (function type() {
        div.textContent = item.t.slice(0, j);
        j += 3;
        if (j <= item.t.length + 2) { termTimer = setTimeout(type, 12); }
        else { termTimer = setTimeout(nextLine, 420); }
        termBody.scrollTop = termBody.scrollHeight;
      })();
    }
    nextLine();
  }
  if (termPlay) {
    termPlay.addEventListener('click', function () {
      termPlay.disabled = true; termPlay.textContent = '…';
      termRender(REDUCED);
    });
    // vista previa estática al cargar
    termBody.textContent = '(▶ Reproducir muestra una sesión típica)';
  }

  /* ============================================================
     3 · Constructor de prompts
     ============================================================ */
  var PIEZAS = {
    rol: 'Actúa como asistente de revisión sistemática de literatura. [ROL]',
    contexto: 'Lee plan.md: ahí están mi pregunta central y las auxiliares Q1–Q3. [CONTEXTO]',
    tarea: 'Construye la ecuación de búsqueda y ejecútala en OpenAlex; lista los 15 más citados. [TAREA]',
    arnes: 'No inventes referencias: solo resultados con DOI verificable. Si algo no aparece o no estás seguro, dilo explícitamente. [ARNÉS]',
    formato: 'Entrégame una tabla: título, año, DOI, citas. Guarda el JSON completo en datos/ con la fecha. [FORMATO]',
    verificacion: 'Registra la ecuación exacta y los conteos por etapa para poder reconstruir el diagrama PRISMA. [VERIFICACIÓN]'
  };
  var ORDEN = ['rol', 'contexto', 'tarea', 'arnes', 'formato', 'verificacion'];
  var builderOut = $('#builder-out');
  function buildPrompt() {
    var parts = [];
    ORDEN.forEach(function (k) {
      var cb = $('#builder input[data-piece="' + k + '"]');
      if (cb && cb.checked) parts.push(PIEZAS[k]);
    });
    builderOut.textContent = parts.length ? parts.join('\n') : '(seleccionar al menos una pieza)';
  }
  if (builderOut) {
    $all('#builder input[type=checkbox]').forEach(function (cb) {
      cb.addEventListener('change', buildPrompt);
    });
    buildPrompt();
    $('#builder-copy').addEventListener('click', function () {
      copyText(builderOut.textContent, this);
    });
  }

  /* ============================================================
     4 · Ruta del proyecto: modal por etapa
     ============================================================ */
  var closeModals = function () {
    $all('.modal-back').forEach(function (m) { m.classList.add('hidden'); });
    document.body.classList.remove('modal-open');
  };
  $all('.ruta-card').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var m = $('#' + btn.dataset.modal);
      if (!m) return;
      closeModals();
      m.classList.remove('hidden');
      document.body.classList.add('modal-open');
      var c = m.querySelector('.modal-close');
      if (c) c.focus();
    });
  });
  $all('.modal-back').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m) closeModals(); });
    var c = m.querySelector('.modal-close');
    if (c) c.addEventListener('click', closeModals);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModals(); });
  /* apertura directa por hash (#m1 … #m8), al cargar o al navegar */
  var openByHash = function () {
    if (!/^#m[1-8]$/.test(location.hash)) return;
    var mh = $(location.hash);
    if (mh) { closeModals(); mh.classList.remove('hidden'); document.body.classList.add('modal-open'); }
  };
  openByHash();
  window.addEventListener('hashchange', openByHash);

  /* Botones de copiado de prompts */
  $all('.copy-btn[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.parentElement.querySelector('pre');
      if (pre) copyText(pre.textContent, btn);
    });
  });

  /* ============================================================
     5 · Búsqueda real en OpenAlex (con respaldo offline REAL)
     Datos de respaldo: ejecuciones del 29 de julio de 2026.
     ============================================================ */
  var EQS = {
    caso: '("cognitive offloading" OR "cognitive debt") AND ("artificial intelligence" OR "generative AI" OR "large language model" OR chatbot)',
    filosofia: '("artificial intelligence" OR "large language models") AND ("authorship" OR "moral agency" OR "moral responsibility")',
    educacion: '("generative AI" OR ChatGPT) AND ("academic integrity" OR "student learning" OR "higher education")',
    derecho: '"artificial intelligence" AND ("legal liability" OR "legal responsibility" OR "AI regulation")',
    psicologia: '(chatbot OR "conversational agent" OR "companion AI") AND ("mental health" OR loneliness)'
  };
  var FALLBACK_DATE = 'ejecución de ensayo: 29 de julio de 2026';
  var FALLBACK = {
    caso: {
      full: 47844, filt: 1011,
      works: [
        { y: 2025, t: 'AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking (Gerlich)', c: 739, d: 'https://doi.org/10.3390/soc15010006' },
        { y: 2025, t: 'The effects of generative AI on collaborative problem-solving and team creativity performance', c: 85, d: 'https://doi.org/10.1186/s41239-025-00526-0' },
        { y: 2022, t: 'Supporting Cognition With Modern Technology: Distributed Cognition Today and in an AI-Enhanced Future', c: 65, d: 'https://doi.org/10.3389/frai.2022.908261' },
        { y: 2025, t: 'AI Tools in Society… (versión preprint en SSRN — ¡duplicado del #1!)', c: 65, d: 'https://doi.org/10.2139/ssrn.5082524' },
        { y: 2025, t: "Learners' AI dependence and critical thinking: fatigue and the buffering role of AI literacy", c: 58, d: 'https://doi.org/10.1016/j.actpsy.2025.105725' }
      ],
      note: 'El resultado #1 es Gerlich (2025) — fila 4 de la Matriz Q — y el #4 es su duplicado en SSRN: deduplicar es parte del cribado PRISMA.'
    },
    filosofia: {
      full: 107450, filt: 8833,
      works: [
        { y: 2023, t: 'A Bibliometric Analysis of Heart Disease Detection using AI… (¡ruido!)', c: 777, d: 'https://doi.org/10.38124/ijisrt/ijisrt23nov2413' },
        { y: 2019, t: 'Artificial Intelligence and Black-Box Medical Decisions: Accuracy versus Explainability', c: 762, d: 'https://doi.org/10.1002/hast.973' },
        { y: 2022, t: 'Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence', c: 584, d: 'https://doi.org/10.56315/pscf3-22crawford' }
      ],
      note: 'Lección del ruido: "authorship" también captura "co-authorship" bibliométrico. La ecuación se refina (p. ej. "AI authorship" OR "machine authorship") y se vuelve a ejecutar: iterar es parte del método.'
    },
    educacion: {
      full: 94878, filt: 12441,
      works: [
        { y: 2023, t: 'Chatting and cheating: Ensuring academic integrity in the era of ChatGPT', c: 2182, d: 'https://doi.org/10.1080/14703297.2023.2190148' },
        { y: 2023, t: "Students' voices on generative AI: perceptions, benefits, and challenges in higher education", c: 1937, d: 'https://doi.org/10.1186/s41239-023-00411-8' },
        { y: 2023, t: 'ChatGPT: Bullshit spewer or the end of traditional assessments in higher education?', c: 1713, d: 'https://doi.org/10.37074/jalt.2023.6.1.9' }
      ]
    },
    derecho: {
      full: 23879, filt: 2923,
      works: [
        { y: 2019, t: 'Artificial intelligence in education: challenges and opportunities for sustainable development', c: 904, d: '' },
        { y: 2023, t: 'Connecting the dots in trustworthy AI: from principles and ethics to responsible AI systems and regulation', c: 681, d: 'https://doi.org/10.1016/j.inffus.2023.101896' },
        { y: 2018, t: 'Governing artificial intelligence: ethical, legal and technical opportunities and challenges', c: 673, d: 'https://doi.org/10.1098/rsta.2018.0080' }
      ]
    },
    psicologia: {
      full: 32777, filt: 4744,
      works: [
        { y: 2017, t: 'Delivering CBT to Young Adults With Depression and Anxiety Using a Conversational Agent (Woebot): RCT', c: 2629, d: 'https://doi.org/10.2196/mental.7785' },
        { y: 2021, t: 'The growing field of digital psychiatry: apps, social media, chatbots, and virtual reality', c: 1142, d: 'https://doi.org/10.1002/wps.20883' },
        { y: 2019, t: 'Chatbots and Conversational Agents in Mental Health: A Review of the Psychiatric Landscape', c: 1016, d: 'https://doi.org/10.1177/0706743719828977' }
      ]
    }
  };

  var oaSel = $('#oa-question');
  var oaEq = $('#oa-equation');
  var oaRun = $('#oa-run');
  var oaStatus = $('#oa-status');
  var oaOut = $('#oa-out');

  function setEq() { if (oaEq) oaEq.value = EQS[oaSel.value]; }
  if (oaSel) { setEq(); oaSel.addEventListener('change', setEq); }

  function fetchJSON(url, ms) {
    return new Promise(function (resolve, reject) {
      var ctrl = ('AbortController' in window) ? new AbortController() : null;
      var to = setTimeout(function () { if (ctrl) ctrl.abort(); reject(new Error('timeout')); }, ms || 9000);
      fetch(url, ctrl ? { signal: ctrl.signal } : {})
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (j) { clearTimeout(to); resolve(j); })
        .catch(function (e) { clearTimeout(to); reject(e); });
    });
  }

  function renderOA(full, filt, works, live, note) {
    oaOut.classList.remove('hidden');
    $('#oa-count').textContent = fmt(full);
    var funnel = $('#oa-funnel');
    var pct = full > 0 ? Math.max(2, Math.round(filt / full * 100)) : 0;
    funnel.innerHTML =
      '<div style="font-size:.8rem;color:#5d6d80;min-width:15rem">' +
      '<div style="background:#003366;color:#fff;border-radius:7px;padding:.24rem .65rem;margin:.18rem 0;font-weight:600">identificados: ' + fmt(full) + '</div>' +
      '<div style="background:#a98a2f;color:#fff;border-radius:7px;padding:.24rem .65rem;margin:.18rem 0;font-weight:600;width:' + Math.max(pct, 28) + '%;min-width:13rem">tras filtro título/abstract: ' + fmt(filt) + '</div>' +
      '<div style="border:1.5px dashed #a98a2f;color:#7a6222;border-radius:7px;padding:.24rem .65rem;margin:.18rem 0;font-weight:600;width:28%;min-width:13rem">selección humana: la hace el investigador</div>' +
      '</div>';
    var ol = $('#oa-results');
    ol.innerHTML = '';
    works.forEach(function (w) {
      var li = document.createElement('li');
      li.innerHTML = '<span class="anio">' + w.y + '</span> · ' + w.t +
        ' <span class="citas">(' + fmt(w.c) + ' citas' + (w.d ? ' · <a href="' + w.d + '" target="_blank" rel="noopener">DOI</a>' : '') + ')</span>';
      ol.appendChild(li);
    });
    $('#oa-note').textContent = (note ? note + ' ' : '') +
      (live ? 'Consulta directa a api.openalex.org — los números cambian a medida que se indexan nuevos trabajos.'
            : 'Sin conexión: mostrando la ' + FALLBACK_DATE + ' (datos reales, verificables en openalex.org).');
  }

  if (oaRun) {
    oaRun.addEventListener('click', function () {
      var key = oaSel.value;
      var eq = oaEq.value.trim();
      oaRun.disabled = true;
      oaStatus.className = 'oa-status';
      oaStatus.textContent = 'consultando api.openalex.org…';
      var base = 'https://api.openalex.org/works';
      var uFull = base + '?search=' + encodeURIComponent(eq) + '&per-page=1&select=id';
      var uFilt = base + '?filter=' + encodeURIComponent('title_and_abstract.search:' + eq) +
                  '&sort=cited_by_count:desc&per-page=5&select=display_name,publication_year,cited_by_count,doi';
      Promise.all([fetchJSON(uFull), fetchJSON(uFilt)]).then(function (rs) {
        var works = rs[1].results.map(function (w) {
          return { y: w.publication_year, t: w.display_name, c: w.cited_by_count, d: w.doi || '' };
        });
        oaStatus.className = 'oa-status live';
        oaStatus.textContent = '● consulta directa';
        var note = (FALLBACK[key] && eq === EQS[key]) ? (FALLBACK[key].note || '') : '';
        renderOA(rs[0].meta.count, rs[1].meta.count, works, true, note);
      }).catch(function () {
        var f = FALLBACK[key] || FALLBACK.caso;
        oaStatus.className = 'oa-status off';
        oaStatus.textContent = '◌ sin conexión — respaldo real';
        renderOA(f.full, f.filt, f.works, false, f.note || '');
      }).then(function () { oaRun.disabled = false; });
    });
  }

  /* ============================================================
     5a · Pestañas de herramienta (subagentes: Claude Code / Codex / Antigravity)
     ============================================================ */
  var AG_IDS = ['ag-cc', 'ag-cx', 'ag-gg'];
  $all('.ag-tab').forEach(function (b) {
    b.addEventListener('click', function () {
      $all('.ag-tab').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      AG_IDS.forEach(function (id) {
        var el = $('#' + id);
        if (el) el.classList.toggle('hidden', id !== b.dataset.ag);
      });
    });
  });

  /* ============================================================
     5b · Video del caso: carga diferida del reproductor.
     Nota: YouTube rechaza el reproductor embebido en páginas
     abiertas como archivo local (error 153); en ese caso se abre
     el video en una pestaña.
     ============================================================ */
  var vc = $('#video-caso');
  if (vc) {
    var playVideo = function () {
      if (location.protocol === 'file:') {
        window.open('https://www.youtube.com/watch?v=fTj4RkCVBXw', '_blank', 'noopener');
        return;
      }
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/fTj4RkCVBXw?autoplay=1';
      f.title = 'La IA ROMPE a los TRABAJADORES que MEJOR la usan — Xavier Mitjana';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      vc.innerHTML = '';
      vc.appendChild(f);
      vc.style.cursor = 'default';
    };
    vc.addEventListener('click', playVideo);
    vc.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playVideo(); }
    });
  }

  /* ============================================================
     6 · Matriz Q: expandir filas
     ============================================================ */
  $all('.mq-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var det = $('#' + row.dataset.mq);
      if (!det) return;
      var open = !det.classList.contains('hidden');
      det.classList.toggle('hidden');
      row.classList.toggle('open', !open);
    });
  });

  /* ============================================================
     7 · Tacómetro de rúbrica
     ============================================================ */
  var gRange = $('#gauge-range');
  var gNeedle = $('#gauge-needle');
  var gLabel = $('#gauge-label');
  function nivel(v) {
    if (v < 50) return ['Inicial', '#d64545'];
    if (v < 75) return ['Básico', '#e8862e'];
    if (v < 90) return ['Autónomo', '#c99a08'];
    return ['Estratégico', '#2e8b57'];
  }
  function gaugeUpdate() {
    var v = Number(gRange.value);
    gNeedle.setAttribute('transform', 'rotate(' + (v * 1.8) + ' 110 115)');
    var nv = nivel(v);
    gLabel.innerHTML = v + ' / 100 — Nivel <strong style="color:' + nv[1] + '">' + nv[0] + '</strong>';
  }
  if (gRange) { gRange.addEventListener('input', gaugeUpdate); gaugeUpdate(); }

  /* ============================================================
     8 · Generador de diagrama PRISMA
     ============================================================ */
  var prIds = ['pr-id', 'pr-scr', 'pr-eleg', 'pr-inc'];
  var prOut = $('#prisma-out');
  function prisma() {
    if (!prOut) return;
    var vals = prIds.map(function (id) { return Math.max(0, Number($('#' + id).value || 0)); });
    var labels = ['Identificados', 'Cribados', 'Elegibles', 'Incluidos'];
    var max = Math.max.apply(null, vals.concat([1]));
    var svg = '<svg viewBox="0 0 320 214" role="img" aria-label="Diagrama PRISMA">';
    for (var i = 0; i < 4; i++) {
      var w = Math.max(70, Math.round(vals[i] / max * 230));
      var x = Math.round((250 - w) / 2);
      var y = 6 + i * 52;
      svg += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="34" rx="8" fill="' +
             (i === 3 ? '#1f7a4d' : '#003366') + '"/>' +
             '<text x="125" y="' + (y + 21) + '" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="700">' +
             labels[i] + ': ' + fmt(vals[i]) + '</text>';
      if (i < 3) {
        var exc = Math.max(0, vals[i] - vals[i + 1]);
        svg += '<line x1="125" y1="' + (y + 34) + '" x2="125" y2="' + (y + 52) + '" stroke="#C6A44E" stroke-width="2.5"/>' +
               '<text x="255" y="' + (y + 47) + '" font-size="10.5" fill="#7a6222">excluidos: ' + fmt(exc) + '</text>';
      }
    }
    svg += '</svg>';
    prOut.innerHTML = svg;
  }
  prIds.forEach(function (id) {
    var el = $('#' + id);
    if (el) el.addEventListener('input', prisma);
  });
  prisma();

  /* ============================================================
     9 · Scrollspy de navegación
     ============================================================ */
  if ('IntersectionObserver' in window) {
    var links = $all('.nav-links a');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove('is-here'); });
          map[en.target.id].classList.add('is-here');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    $all('main section, header.hero').forEach(function (s) { if (s.id) io.observe(s); });
  }

  /* ============================================================
     10 · Aparición al hacer scroll
     ============================================================ */
  if ('IntersectionObserver' in window && !REDUCED) {
    var revEls = $all('main section > *:not(.sec-inner):not(.modal-back), .sec-inner > *, .hero-inner > *');
    revEls.forEach(function (el) { el.classList.add('rv'); });
    var ioRv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('rv-in'); ioRv.unobserve(en.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    revEls.forEach(function (el) { ioRv.observe(el); });
  }
})();
