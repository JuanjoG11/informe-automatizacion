/**
 * Ecosistema de Automatización TYM / TAT — Master Application Logic
 */

let currentFilter = "todos";
let currentSearch = "";
let selectedApp = null;
let chartsInstances = {};

// Default Calculator State
let calcState = {
  hourlyRate: 18500, // $18,500 COP valor hora promedio con prestaciones
  volumeMultiplier: 1.0,
  assetProtectionBoost: 54000000 // Ahorro base en activos y riesgos
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderKPIs();
  renderFilterTabs();
  renderAppCards();
  initCalculator();
  initCharts();
  setupEventListeners();
  animateCounterNumbers();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("dashboard_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const target = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", target);
  localStorage.setItem("dashboard_theme", target);
  updateThemeIcon(target);
  updateChartsTheme();
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    lucide.createIcons();
  }
}

// Master KPI Rendering
function renderKPIs() {
  const container = document.getElementById("kpisContainer");
  if (!container) return;

  const totalCOPFormatted = formatCurrencyM(ECOSYSTEM_STATS.totalAnnualSavingsEstimated);

  container.innerHTML = `
    <div class="kpi-card" style="--card-accent: linear-gradient(90deg, #10b981, #06b6d4);">
      <div class="kpi-header">
        <div class="kpi-icon-wrap" style="color: #10b981;"><i data-lucide="wallet"></i></div>
        <span class="kpi-badge">+340% ROI</span>
      </div>
      <div class="kpi-value-row">
        <span class="kpi-number" data-target="${ECOSYSTEM_STATS.totalAnnualSavingsEstimated}" id="kpiAnnualSavings">$380.0M</span>
        <span class="kpi-unit">COP/Año</span>
      </div>
      <div class="kpi-title">Ahorro Económico Estimado</div>
      <div class="kpi-foot">
        <span>Impacto directo recurrente</span>
        <i data-lucide="trending-up"></i>
      </div>
    </div>

    <div class="kpi-card" style="--card-accent: linear-gradient(90deg, #3b82f6, #6366f1);">
      <div class="kpi-header">
        <div class="kpi-icon-wrap" style="color: #38bdf8;"><i data-lucide="clock"></i></div>
        <span class="kpi-badge">Eficiencia</span>
      </div>
      <div class="kpi-value-row">
        <span class="kpi-number" data-target="${ECOSYSTEM_STATS.totalHoursSavedMonthly}">1,450</span>
        <span class="kpi-unit">hrs/mes</span>
      </div>
      <div class="kpi-title">Horas de Trabajo Liberadas</div>
      <div class="kpi-foot">
        <span>≈ 17,400 horas al año</span>
        <i data-lucide="activity"></i>
      </div>
    </div>

    <div class="kpi-card" style="--card-accent: linear-gradient(90deg, #8b5cf6, #ec4899);">
      <div class="kpi-header">
        <div class="kpi-icon-wrap" style="color: #a78bfa;"><i data-lucide="cpu"></i></div>
        <span class="kpi-badge">100% Activas</span>
      </div>
      <div class="kpi-value-row">
        <span class="kpi-number" data-target="${ECOSYSTEM_STATS.totalApps}">11</span>
        <span class="kpi-unit">Sistemas</span>
      </div>
      <div class="kpi-title">Aplicaciones en Producción</div>
      <div class="kpi-foot">
        <span>Ecosistema Serverless & PWA</span>
        <i data-lucide="layers"></i>
      </div>
    </div>

    <div class="kpi-card" style="--card-accent: linear-gradient(90deg, #f59e0b, #ef4444);">
      <div class="kpi-header">
        <div class="kpi-icon-wrap" style="color: #fbbf24;"><i data-lucide="shield-check"></i></div>
        <span class="kpi-badge">Calidad</span>
      </div>
      <div class="kpi-value-row">
        <span class="kpi-number" data-target="${ECOSYSTEM_STATS.avgErrorReduction}">97</span>
        <span class="kpi-unit">% Precisión</span>
      </div>
      <div class="kpi-title">Reducción de Errores / Fugas</div>
      <div class="kpi-foot">
        <span>Cero cobros duplicados</span>
        <i data-lucide="check-circle-2"></i>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// Filter Tabs
function renderFilterTabs() {
  const container = document.getElementById("filterTabs");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="filter-pill ${cat.id === currentFilter ? 'active' : ''}" data-cat="${cat.id}">
      <i data-lucide="${cat.icon}" style="width: 14px; height: 14px;"></i>
      <span>${cat.label}</span>
      <span class="filter-count">${cat.count}</span>
    </button>
  `).join('');

  container.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.getAttribute("data-cat");
      renderFilterTabs();
      renderAppCards();
    });
  });
  lucide.createIcons();
}

// Render Application Cards
function renderAppCards() {
  const grid = document.getElementById("appsGrid");
  if (!grid) return;

  const filtered = APPS_DATA.filter(app => {
    const matchesCat = currentFilter === "todos" || app.category === currentFilter;
    const q = currentSearch.toLowerCase().trim();
    const matchesSearch = !q || 
      app.name.toLowerCase().includes(q) ||
      app.title.toLowerCase().includes(q) ||
      app.summary.toLowerCase().includes(q) ||
      app.folder.toLowerCase().includes(q) ||
      app.techStack.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
        <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;"></i>
        <h3>No se encontraron aplicaciones con ese criterio</h3>
        <p>Intenta con otra palabra clave o selecciona otra categoría.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(app => `
    <div class="app-card" onclick="openAppModal('${app.id}')">
      <div>
        <div class="app-card-top">
          <div class="app-icon-bubble" style="background: ${app.gradient};">
            <i data-lucide="${app.icon}"></i>
          </div>
          <span class="app-category-badge">${app.categoryLabel}</span>
        </div>

        <h3 class="app-name-title">${app.name}</h3>
        <div class="app-sub-title">${app.title}</div>
        <p class="app-desc-summary">${app.summary}</p>
      </div>

      <div>
        <div class="app-metrics-strip">
          <div class="mini-metric">
            <span class="mini-metric-label">Ahorro Mensual</span>
            <span class="mini-metric-value">${app.hoursSavedMonthly} hrs/mes</span>
          </div>
          <div class="mini-metric">
            <span class="mini-metric-label">Impacto Anual</span>
            <span class="mini-metric-value" style="color: #38bdf8;">$${(app.annualSavingsEstimated / 1000000).toFixed(1)}M COP</span>
          </div>
        </div>

        <div class="tech-tags-row">
          ${app.techStack.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          ${app.techStack.length > 3 ? `<span class="tech-tag">+${app.techStack.length - 3}</span>` : ''}
        </div>

        <div class="app-card-action">
          <span>Ver Ficha Técnica y Métricas</span>
          <i data-lucide="arrow-right" class="action-arrow"></i>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// App Modal / Deep Dive Drawer
function openAppModal(appId) {
  const app = APPS_DATA.find(a => a.id === appId);
  if (!app) return;
  selectedApp = app;

  const modal = document.getElementById("appModal");
  const modalContent = document.getElementById("modalDynamicContent");

  modalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-title-group">
        <div class="modal-icon-bubble" style="background: ${app.gradient};">
          <i data-lucide="${app.icon}"></i>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <h2 class="modal-name">${app.name}</h2>
            <span class="modal-folder-badge">📁 Documents/${app.folder}</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">${app.title}</p>
        </div>
      </div>
      <button class="btn-close-modal" onclick="closeAppModal()"><i data-lucide="x"></i></button>
    </div>

    <div class="modal-tabs-bar">
      <button class="modal-tab-btn active" onclick="switchModalTab('resumen')">Resumen Ejecutivo</button>
      <button class="modal-tab-btn" onclick="switchModalTab('informe')">Informe</button>
      <button class="modal-tab-btn" onclick="switchModalTab('comparativa')">Antes vs Después</button>
      <button class="modal-tab-btn" onclick="switchModalTab('arquitectura')">Arquitectura & Stack</button>
    </div>

    <div class="modal-body" id="modalTabContent">
      ${renderModalTabResumen(app)}
    </div>
  `;

  modal.classList.add("active");
  lucide.createIcons();

  // Launch celebratory micro-particles
  if (typeof confetti === "function") {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 }
    });
  }
}

function switchModalTab(tabKey) {
  if (!selectedApp) return;
  document.querySelectorAll(".modal-tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  const container = document.getElementById("modalTabContent");
  if (tabKey === "resumen") {
    container.innerHTML = renderModalTabResumen(selectedApp);
  } else if (tabKey === "informe") {
    container.innerHTML = renderModalTabInforme(selectedApp);
  } else if (tabKey === "comparativa") {
    container.innerHTML = renderModalTabComparativa(selectedApp);
  } else if (tabKey === "arquitectura") {
    container.innerHTML = renderModalTabArquitectura(selectedApp);
  }
  lucide.createIcons();
}

function renderModalTabResumen(app) {
  return `
    <div class="modal-kpi-summary-grid">
      <div class="modal-kpi-box">
        <div class="val">${app.hoursSavedMonthly} hrs</div>
        <div class="lbl">Ahorro Mensual en Procesos</div>
      </div>
      <div class="modal-kpi-box">
        <div class="val" style="color: #38bdf8;">$${(app.annualSavingsEstimated / 1000000).toFixed(1)}M COP</div>
        <div class="lbl">Impacto Económico / Año</div>
      </div>
      <div class="modal-kpi-box">
        <div class="val" style="color: #a78bfa;">${app.errorReductionPercent}%</div>
        <div class="lbl">Precisión & Mitigación de Fuga</div>
      </div>
    </div>

    <div>
      <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="info" style="color: #38bdf8;"></i> Propósito y Alcance de la Solución
      </h4>
      <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${app.summary}</p>
    </div>

    <div>
      <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="gauge" style="color: #10b981;"></i> Indicadores Clave de Desempeño (KPIs)
      </h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        ${app.kpis.map(k => `
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); padding: 0.85rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">${k.label}</div>
            <div style="display: flex; align-items: baseline; gap: 0.5rem; margin: 0.25rem 0;">
              <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #10b981;">${k.value}</span>
              <span style="font-size: 0.75rem; color: #f43f5e; text-decoration: line-through;">${k.prev}</span>
            </div>
            <div style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">Mejora: ${k.change}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <div style="display: flex; gap: 2rem; font-size: 0.85rem; color: var(--text-secondary);">
        <div><strong>👥 Usuarios Activos:</strong> ${app.activeUsers}</div>
        <div><strong>⚡ Volumen Mensual:</strong> ${app.transactionsMonthly}</div>
      </div>
    </div>
  `;
}

function renderModalTabInforme(app) {
  if (!app.reportData) {
    return `<p style="color: var(--text-secondary); padding: 1rem;">No hay datos de informe disponibles para esta aplicación.</p>`;
  }
  const rd = app.reportData;
  const rows = [
    { label: "Problemática Anterior", icon: "alert-triangle", color: "#f43f5e", value: rd.problema },
    { label: "Solución Implementada",  icon: "check-circle-2",  color: "#10b981", value: rd.solucion },
    { label: "Impacto Operativo",      icon: "zap",             color: "#38bdf8", value: rd.impacto },
    { label: "Ahorro",                 icon: "trending-up",     color: "#fbbf24", value: rd.ahorro  }
  ];
  return `
    <div class="informe-table-wrap">
      <table class="informe-table">
        <thead>
          <tr>
            <th style="width: 170px;">Dimensión</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              <td class="informe-td-label">
                <span class="informe-label-inner" style="color: ${r.color};">
                  <i data-lucide="${r.icon}" style="width:14px;height:14px;flex-shrink:0;"></i>
                  ${r.label}
                </span>
              </td>
              <td class="informe-td-value">${r.value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderModalTabComparativa(app) {
  return `
    <div class="before-after-grid">
      <div class="before-col">
        <div class="col-heading"><i data-lucide="alert-triangle"></i> Proceso Anterior (Manual / Riesgoso)</div>
        <ul class="bullet-list">
          ${app.before.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
      <div class="after-col">
        <div class="col-heading"><i data-lucide="check-circle-2"></i> Proceso Automatizado (Solución Actual)</div>
        <ul class="bullet-list">
          ${app.after.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function renderModalTabArquitectura(app) {
  return `
    <div>
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Flujo de Datos y Pipeline</h4>
      <div class="arch-flow-box">${app.architecture}</div>
    </div>

    <div>
      <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem;">Tecnologías & Librerías Empleadas</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${app.techStack.map(t => `<span class="tech-tag" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; background: rgba(56, 189, 248, 0.12); color: #38bdf8; border-color: rgba(56, 189, 248, 0.25);">${t}</span>`).join('')}
      </div>
    </div>

    <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.4rem; color: #10b981;">Ventaja de Seguridad & Escalabilidad</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
        Implementa arquitectura Serverless con políticas RLS (Row Level Security) directamente sobre el motor PostgreSQL, garantizando aislamiento total entre empresas del grupo (TYM / TAT) y cero costo de mantenimiento de servidores virtuales tradicionales.
      </p>
    </div>
  `;
}

function closeAppModal() {
  const modal = document.getElementById("appModal");
  if (modal) modal.classList.remove("active");
  selectedApp = null;
}

// Interactive ROI Calculator Logic
function initCalculator() {
  const rateSlider = document.getElementById("calcHourlyRate");
  const volumeSlider = document.getElementById("calcVolume");
  const assetSlider = document.getElementById("calcAssetProt");

  if (!rateSlider) return;

  const update = () => {
    calcState.hourlyRate = parseInt(rateSlider.value, 10);
    calcState.volumeMultiplier = parseFloat(volumeSlider.value);
    calcState.assetProtectionBoost = parseInt(assetSlider.value, 10);

    document.getElementById("rateValDisplay").textContent = `$${calcState.hourlyRate.toLocaleString()} COP`;
    document.getElementById("volumeValDisplay").textContent = `${calcState.volumeMultiplier.toFixed(1)}x`;
    document.getElementById("assetValDisplay").textContent = `$${(calcState.assetProtectionBoost / 1000000).toFixed(0)}M COP`;

    recalculateEcosystemROI();
  };

  rateSlider.addEventListener("input", update);
  volumeSlider.addEventListener("input", update);
  assetSlider.addEventListener("input", update);

  update();
}

function recalculateEcosystemROI() {
  const baseMonthlyHours = ECOSYSTEM_STATS.totalHoursSavedMonthly;
  const scaledMonthlyHours = Math.round(baseMonthlyHours * calcState.volumeMultiplier);
  const scaledYearlyHours = scaledMonthlyHours * 12;

  // Labor savings = hours * hourly rate
  const laborSavingsAnnual = scaledYearlyHours * calcState.hourlyRate;
  
  // Total Economic Value = Labor Savings + Asset Protection + Infrastructure savings
  const totalEconomicValue = laborSavingsAnnual + (calcState.assetProtectionBoost * calcState.volumeMultiplier) + ECOSYSTEM_STATS.serverCostSavedYearly;

  const grandTotalEl = document.getElementById("calcGrandTotal");
  const laborTotalEl = document.getElementById("calcLaborTotal");
  const hoursTotalEl = document.getElementById("calcHoursTotal");
  const serverTotalEl = document.getElementById("calcServerTotal");

  if (grandTotalEl) grandTotalEl.textContent = `$${(totalEconomicValue / 1000000).toFixed(1)}M COP`;
  if (laborTotalEl) laborTotalEl.textContent = `$${(laborSavingsAnnual / 1000000).toFixed(1)}M`;
  if (hoursTotalEl) hoursTotalEl.textContent = `${scaledYearlyHours.toLocaleString()} hrs`;
  if (serverTotalEl) serverTotalEl.textContent = `$${(ECOSYSTEM_STATS.serverCostSavedYearly / 1000000).toFixed(0)}M`;
}

// Chart.js Visualizations
function initCharts() {
  const ctxSavings = document.getElementById("chartSavingsByDept");
  const ctxHours = document.getElementById("chartHoursByApp");

  if (ctxSavings) {
    const deptTotals = {};
    APPS_DATA.forEach(app => {
      deptTotals[app.categoryLabel] = (deptTotals[app.categoryLabel] || 0) + app.annualSavingsEstimated;
    });

    chartsInstances.savings = new Chart(ctxSavings, {
      type: 'doughnut',
      data: {
        labels: Object.keys(deptTotals),
        datasets: [{
          data: Object.values(deptTotals).map(v => v / 1000000),
          backgroundColor: [
            '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899'
          ],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: getChartTextColor(), font: { size: 11, family: 'Plus Jakarta Sans' } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: $${ctx.raw.toFixed(1)}M COP`
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  if (ctxHours) {
    // Sort apps by hours saved
    const sorted = [...APPS_DATA].sort((a, b) => b.hoursSavedMonthly - a.hoursSavedMonthly);

    chartsInstances.hours = new Chart(ctxHours, {
      type: 'bar',
      data: {
        labels: sorted.map(a => a.name),
        datasets: [{
          label: 'Horas Ahorradas / Mes',
          data: sorted.map(a => a.hoursSavedMonthly),
          backgroundColor: sorted.map(a => a.color),
          borderRadius: 6,
          barThickness: 14
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.raw} horas/mes liberadas`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: getChartTextColor(), font: { size: 10, family: 'Plus Jakarta Sans' } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: getChartTextColor(), font: { size: 10, family: 'JetBrains Mono' } }
          }
        }
      }
    });
  }
}

function getChartTextColor() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "#475569" : "#94a3b8";
}

function updateChartsTheme() {
  const color = getChartTextColor();
  if (chartsInstances.savings) {
    chartsInstances.savings.options.plugins.legend.labels.color = color;
    chartsInstances.savings.update();
  }
  if (chartsInstances.hours) {
    chartsInstances.hours.options.scales.x.ticks.color = color;
    chartsInstances.hours.options.scales.y.ticks.color = color;
    chartsInstances.hours.update();
  }
}

// Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById("searchApps");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderAppCards();
    });
  }

  // Close modal on escape or background click
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAppModal();
  });

  const modalOverlay = document.getElementById("appModal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeAppModal();
    });
  }
}

// Numbers Animation Easing
function animateCounterNumbers() {
  const els = document.querySelectorAll(".kpi-number[data-target]");
  els.forEach(el => {
    const target = parseFloat(el.getAttribute("data-target"));
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;

      if (target > 1000000) {
        el.textContent = `$${(current / 1000000).toFixed(1)}M`;
      } else if (target > 1000) {
        el.textContent = Math.round(current).toLocaleString();
      } else {
        el.textContent = Math.round(current);
      }

      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

// Format Helpers
function formatCurrencyM(val) {
  return `$${(val / 1000000).toFixed(1)}M`;
}

// Presentation & PDF Helpers
function triggerPresentationMode() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
  const el = document.getElementById("showcaseSection");
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function exportExecutiveReport() {
  window.print();
}
