/**
 * Ecosistema de Automatización & Digitalización TYM / TAT
 * Base de Datos Integral de Proyectos y Métricas de Impacto
 */

const APPS_DATA = [
  {
    id: "fletesapp",
    name: "FletesApp",
    appUrl: null, // Ej: "https://fletesapp.vercel.app"
    reportData: {
      problema: "Los valores de los fletes podían modificarse manualmente, no existía control estandarizado por población y era difícil justificar adicionales. Las cajeras dependían del área logística para solicitar planillas, generando retrasos y pérdida de información.",
      solucion: "Aplicación parametrizada por población donde los valores quedan restringidos automáticamente y los adicionales requieren justificación. Permite la visualización en tiempo real de planillas despachadas.",
      impacto: "Reducción de errores manuales, mayor control financiero, trazabilidad, disminución de sobrecostos y flujo de información inmediato entre áreas.",
      ahorro: "Reducción del gasto en fletes de $20.669.130 (Nov-Dic 2025) a $14.070.840 (Mar-Abr 2026), generando un ahorro total de $6.598.290 (−31,92%). TAT: ahorro acumulado estimado en fletes de $6.549.800, equivalente a una reducción promedio de $1.637.450 mensuales."
    },
    title: "Ecosistema Digital de Liquidación Logística y Control de Fletes",
    folder: "Fletesapp",
    category: "logistica",
    categoryLabel: "Logística & Transporte",
    badge: "Crítico / Alto Impacto",
    icon: "truck",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #2563eb, #38bdf8)",
    status: "100% Producción",
    summary: "Plataforma serverless que centraliza y automatiza la programación, tarificación por población/tonelaje y liquidación quincenal de fletes para Alpina, Fleischmann, Zenú, TAT y TYM.",
    
    // Métricas Cuantitativas
    hoursSavedMonthly: 210,
    annualSavingsEstimated: 78000000, // $78M COP
    errorReductionPercent: 98,
    activeUsers: "45+ (Conductores, Auxiliares, Coordinadores, Tesorería)",
    transactionsMonthly: "1,200+ Planillas de flete liquidadas",

    // Problema vs Solución
    before: [
      "Liquidación manual en hojas de Excel propensas a errores de tarifas por población.",
      "Descuadres constantes en las fechas de corte quincenal de pagos a contratistas.",
      "Fugas de capital por duplicidad de cobro de fletes y falta de validación de vehículos inactivos.",
      "Proceso de auditoría y cuadre tardaba entre 4 y 6 días por quincena."
    ],
    after: [
      "Motor de precios inteligente con tarifas dinámicas multi-proveedor autogestionadas.",
      "Aislamiento de datos con Row Level Security (RLS) para múltiples razones sociales (TYM / TAT).",
      "Auditoría automática de vehículos, conductores, cargadores y descuentos en tiempo real.",
      "Liquidación y generación de planillas en segundos con 0% riesgo de duplicidad."
    ],

    techStack: ["Vanilla JS", "Supabase PostgreSQL", "Row Level Security (RLS)", "Chart.js", "Glassmorphism UI", "Serverless Architecture"],
    kpis: [
      { label: "Tiempo de Liquidación", value: "3 seg", prev: "5 días", change: "-99%" },
      { label: "Margen de Error", value: "< 0.5%", prev: "18%", change: "-97%" },
      { label: "Ahorro Estimado / Año", value: "$78.0M", prev: "$0", change: "+100%" }
    ],
    architecture: "Frontend PWA/Web -> Supabase Data Engine (PostgreSQL + RLS Multi-Tenant) -> Motor de Precios Dinámico -> Dashboard Financiero Real-Time"
  },

  {
    id: "canastillas",
    name: "Control de Canastas v2.0",
    appUrl: null, // Ej: "https://canastillas.vercel.app"
    reportData: {
      problema: "Pérdidas masivas de canastillas plásticas y estibas sin trazabilidad por ruta. El registro en planillas físicas se extraviaba en el muelle y se desconocía el inventario real en bodega.",
      solucion: "Sistema de viajes con despacho vs retorno por conductor y auxiliar. Discrimina 4 tipos de envase (Grandes, Medianas, Pequeñas, Estibas), asigna responsabilidad con firma digital y mantiene kardex en tiempo real.",
      impacto: "Eliminación de pérdidas de activos, asignación legal de responsabilidad por viaje y trazabilidad completa de envases retornables entre bodega, clientes y rutas.",
      ahorro: "Reducción de pérdida de canastillas de más de 250 unidades mensuales a cero, eliminando el costo de reposición estimado en $4.500.000 mensuales. Ahorro anual proyectado: $54.000.000."
    },
    title: "Sistema de Control de Activos, Despachos y Retornos por Viaje",
    folder: "canastillas",
    category: "logistica",
    categoryLabel: "Logística & Bodega",
    badge: "Protección de Activos",
    icon: "boxes",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #059669, #10b981)",
    status: "100% Producción",
    summary: "Control estricto de envases retornables (Canastas Grandes, Medianas, Pequeñas y Estibas) mediante trazabilidad por viaje, placa, conductor, auxiliar responsable y firma digital.",
    
    hoursSavedMonthly: 140,
    annualSavingsEstimated: 54000000, // $54M COP en envases no perdidos
    errorReductionPercent: 95,
    activeUsers: "30+ (Despachadores de Bodega, Auxiliares, Conductores, Auditores)",
    transactionsMonthly: "850+ Viajes y Kardex auditados",

    before: [
      "Pérdidas masivas de canastillas plásticas y estibas sin saber en qué ruta o cliente se quedaban.",
      "Registro en planillas físicas de papel sucias o extraviadas en el muelle de carga.",
      "Desconocimiento del inventario real en bodega vs en poder de auxiliares/clientes.",
      "Costo continuo de reposición de canastillas plásticas a proveedores."
    ],
    after: [
      "Modelo de viajes completos: Despacho inicial vs Retorno registrado = Cálculo automático de faltantes.",
      "Discriminación exacta en 4 tipos de envase (Grandes, Medianas, Pequeñas, Estibas).",
      "Asignación legal de responsabilidad por viaje a conductor y auxiliar con firma.",
      "Kardex en tiempo real de bodega, préstamos activos a clientes y trazabilidad por factura."
    ],

    techStack: ["JavaScript", "Supabase PostgreSQL", "Firma Digital Canvas", "Kardex Engine", "PWA Web App"],
    kpis: [
      { label: "Pérdida de Canastas", value: "~0 u/mes", prev: ">250 u/mes", change: "-98%" },
      { label: "Tiempo Registro Muelle", value: "45 seg", prev: "15 min", change: "-95%" },
      { label: "Ahorro Reposición / Año", value: "$54.0M", prev: "$0", change: "+100%" }
    ],
    architecture: "Registro de Muelle -> Validación de Placa/Auxiliar -> Modelo de Viajes SQL -> Diferencial Despacho/Retorno -> Kardex de Activos"
  },

  {
    id: "devoluciones",
    name: "DevolucionesApp",
    appUrl: null, // Ej: "https://devoluciones.vercel.app"
    reportData: {
      problema: "Existía poco control sobre devoluciones realizadas por auxiliares y dificultad para analizar motivos faltantes.",
      solucion: "Aplicación con historial, estadísticas automáticas y reportes para toma de decisiones.",
      impacto: "Identificación de patrones de devolución y mejor control operativo.",
      ahorro: "Las devoluciones pasaron de $221.753.790 (5,00%) en diciembre de 2025 a $125.896.095 (2,40%) en febrero de 2026, evidenciando una reducción de $95.857.695 (−43,23%) tras la implementación de la app y el fortalecimiento del control del proceso."
    },
    title: "Gestión en Ruta de Devoluciones, Averías y Recuperación de Notas Crédito",
    folder: "Devoluciones",
    category: "logistica",
    categoryLabel: "Logística & Comercial",
    badge: "Recuperación de Cartera",
    icon: "rotate-ccw",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #d97706, #fbbf24)",
    status: "100% Producción",
    summary: "PWA Offline-First para el registro fotográfico y verificación técnica de averías y devoluciones en puntos de venta, optimizando la liquidación de rutas y notas crédito con Alpina y Zenú.",
    
    hoursSavedMonthly: 180,
    annualSavingsEstimated: 46000000, // $46M COP
    errorReductionPercent: 96,
    activeUsers: "60+ (Auxiliares de reparto TAT/TYM, Inspectores de Calidad, Cartera)",
    transactionsMonthly: "2,400+ Devoluciones auditadas",

    before: [
      "Devoluciones registradas a mano sin soporte fotográfico ni validación de motivos.",
      "Pérdida de notas crédito con casas matrices (Alpina/Zenú) por falta de evidencias legibles.",
      "Retraso de hasta 10 días para conciliar las devoluciones físicas que llegaban a bodega.",
      "Alto consumo de datos de los auxiliares al enviar fotos pesadas por WhatsApp."
    ],
    after: [
      "PWA Offline: funciona en zonas rurales sin internet y sincroniza por lotes automáticamente.",
      "Compresión de fotos client-side (<200KB) ahorrando datos móviles y almacenamiento.",
      "Multi-organización nativa (TAT / TYM) con clasificación por tipo (Avería, Vencimiento, Troque).",
      "Exportación directa a Excel/PDF para radicación inmediata de notas crédito ante el proveedor."
    ],

    techStack: ["PWA (Service Workers)", "Supabase", "Client Image Compression", "Offline Sync Engine", "Excel/PDF Exporter"],
    kpis: [
      { label: "Radicación Notas Crédito", value: "24 horas", prev: "15 días", change: "-93%" },
      { label: "Peso Imagen Promedio", value: "180 KB", prev: "5.5 MB", change: "-97%" },
      { label: "Ahorro Reclamaciones / Año", value: "$46.0M", prev: "$0", change: "+100%" }
    ],
    architecture: "Cámara Móvil -> Compresión en Cliente -> Almacenamiento Offline IndexedDB -> Sincronización Supabase -> Dashboard de Calidad & Cobro"
  },

  {
    id: "consignaciones",
    name: "ConsigControl",
    appUrl: null, // Ej: "https://consigcontrol.vercel.app"
    reportData: {
      problema: "Proceso manual con uso de papel y una persona dedicada exclusivamente a escanear consignaciones.",
      solucion: "Automatización digital del registro y control de consignaciones con panel de auditoría, detección de duplicados y descarga masiva en ZIP.",
      impacto: "Eliminación de procesos manuales, reducción de papel y mayor velocidad de validación.",
      ahorro: "Ahorro equivalente a 1 SMMLV mensual por automatización del proceso, más la reducción de aproximadamente 3.000 hojas impresas al mes, con un costo evitado de entre $150.000 y $300.000 mensuales en papel e insumos de impresión."
    },
    title: "Legalización Digital de Consignaciones, Comprobantes Bancarios y Gastos",
    folder: "Consignaciones",
    category: "financiero",
    categoryLabel: "Financiero & Cartera",
    badge: "Auditoría Antifraude",
    icon: "receipt",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    status: "100% Producción",
    summary: "Plataforma integral para vendedores TAT y auxiliares con panel de auditoría en pantalla dividida para cajeras, prevención de comprobantes duplicados y descargas masivas en ZIP.",
    
    hoursSavedMonthly: 195,
    annualSavingsEstimated: 39000000, // $39M COP
    errorReductionPercent: 99,
    activeUsers: "75+ (Vendedoras TAT, Auxiliares, Cajeras, Tesorero, Revisor Fiscal)",
    transactionsMonthly: "3,800+ Comprobantes legalizados",

    before: [
      "Comprobantes físicos extraviados, fotos ilegibles en chats de WhatsApp y doble radicación.",
      "Cuadres de caja manuales tardíos que frenaban el despacho de pedidos a clientes bloqueados.",
      "Riesgo de falsificación o reutilización de un mismo comprobante bancario.",
      "Horas extras del personal de caja descargando fotos una a una para auditoría contable."
    ],
    after: [
      "Subida inmediata desde celular con validación obligatoria de banco, valor y referencia única.",
      "Índice SQL único de número de comprobante que bloquea intentos de doble registro.",
      "Panel de validación de cajera en pantalla dividida (revisión y aprobación en 5 segundos).",
      "Descarga masiva de respaldos contables en ZIP con consolidado Excel estructurado."
    ],

    techStack: ["React", "Vite", "Supabase", "browser-image-compression", "JSZip", "Date-fns", "Lucide React"],
    kpis: [
      { label: "Tiempo Cuadre de Caja", value: "15 min/día", prev: "3.5 hrs/día", change: "-92%" },
      { label: "Comprobantes Duplicados", value: "0 incidentes", prev: "~35 / mes", change: "-100%" },
      { label: "Liberación de Cartera", value: "Instantánea", prev: "24-48 hrs", change: "-98%" }
    ],
    architecture: "Portal Móvil Vendedora -> Compresión de Recibo -> Detección SQL Duplicados -> Panel Split-Screen Cajera -> Exportación ZIP Contable"
  },

  {
    id: "inventapp",
    name: "InventApp",
    appUrl: null, // Ej: "https://inventapp.vercel.app"
    reportData: {
      problema: "Conteos físicos en hojas impresas con posterior digitación manual. Paradas innecesarias de la operación y discrepancias crónicas entre el sistema y el stock físico real.",
      solucion: "Aplicación offline-first para conteos cíclicos con asignación de tareas por operario, cálculo automático de diferencias y generación de actas en PDF.",
      impacto: "Reducción del tiempo de toma física de 7 a 2 horas, eliminación de digitación manual y precisión de inventario que pasa de 88,2% a 99,4%.",
      ahorro: "Eliminación de 4 horas de digitación por conteo y reducción de paradas operativas. Ahorro estimado en tiempo de nómina y mermas no detectadas: $32.000.000 anuales."
    },
    title: "Conteo y Auditoría de Inventarios Cíclicos en Tiempo Real",
    folder: "InventApp",
    category: "logistica",
    categoryLabel: "Logística & Bodega",
    badge: "Control de Existencias",
    icon: "clipboard-check",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #0891b2, #22d3ee)",
    status: "100% Producción",
    summary: "Aplicación progresiva offline-first para conteos cíclicos de inventario, asignación de tareas a operarios de bodega, cálculo instantáneo de diferencias y generación de reportes PDF.",
    
    hoursSavedMonthly: 125,
    annualSavingsEstimated: 32000000, // $32M COP
    errorReductionPercent: 97,
    activeUsers: "20+ (Jefes de Bodega, Auditores de Inventario, Auxiliares de Conteo)",
    transactionsMonthly: "60+ Conteos masivos y auditorías",

    before: [
      "Conteos físicos en hojas impresas con posterior digitación manual en bodega central.",
      "Paradas innecesarias de la operación logística para cuadrar diferencias de existencias.",
      "Imposibilidad de auditar por ubicaciones o lotes específicos en zonas con poca señal.",
      "Discrepancias crónicas entre el inventario del sistema y el stock físico real."
    ],
    after: [
      "Flujo de trabajo 100% digital y offline: el operario audita y sincroniza al retomar señal.",
      "Asignación de tareas diarias por rol con directrices de conteo ciego para mayor transparencia.",
      "Cálculo automático de variaciones de stock, mermas y alertas por producto crítico.",
      "Generación inmediata de actas de inventario en PDF con formato corporativo estandarizado."
    ],

    techStack: ["Vanilla JS PWA", "Service Workers", "Supabase", "jsPDF", "AutoTable", "IndexedDB"],
    kpis: [
      { label: "Tiempo de Toma Física", value: "2 horas", prev: "7 horas", change: "-71%" },
      { label: "Tiempo de Digitación", value: "0 seg", prev: "4 horas", change: "-100%" },
      { label: "Precisión de Inventario", value: "99.4%", prev: "88.2%", change: "+12.7%" }
    ],
    architecture: "Asignación de Tareas -> PWA Conteo Offline -> Sincronización Automática -> Comparación de Stock -> Generación de Actas PDF"
  },

  {
    id: "portal_tributario",
    name: "Portal Tributario",
    appUrl: null, // Ej: "https://portal-tributario.vercel.app"
    reportData: {
      problema: "El equipo contable recibía más de 600 solicitudes mensuales de certificados de retención por correo y teléfono, con colapso total en meses de vencimientos tributarios.",
      solucion: "Portal de autoservicio 24/7 donde el usuario ingresa su NIT y descarga su certificado en 2 segundos. Genera PDFs oficiales con sello y firma al instante.",
      impacto: "Cero correos y cero llamadas atendidas por contabilidad para entrega de certificados. Disponibilidad permanente sin intervención humana.",
      ahorro: "Liberación de más de 110 horas mensuales del área contable en temporada tributaria. Ahorro estimado en tiempo de personal y costos de gestión: $26.000.000 anuales."
    },
    title: "Autoservicio Digital de Certificados de Retención (ReteFuente, ReteIVA, ReteICA)",
    folder: "portal tributario",
    category: "financiero",
    categoryLabel: "Financiero & Contable",
    badge: "Autoservicio 24/7",
    icon: "file-text",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #db2777, #f472b6)",
    status: "100% Producción",
    summary: "Portal web de autoservicio 24/7 donde miles de clientes y proveedores consultan y descargan al instante sus certificados tributarios oficiales en PDF con validación de NIT.",
    
    hoursSavedMonthly: 110,
    annualSavingsEstimated: 26000000, // $26M COP
    errorReductionPercent: 100,
    activeUsers: "Miles de Proveedores y Clientes externos + Dpto. Contabilidad",
    transactionsMonthly: "4,500+ Certificados generados en temporada",

    before: [
      "El equipo contable recibía cientos de llamadas y correos solicitando certificados de retención.",
      "Búsqueda manual en sistemas contables y elaboración individual de cada PDF.",
      "Colapso del departamento contable durante los meses de vencimientos tributarios (DIAN).",
      "Quejas de proveedores y clientes estratégicos por demoras en la entrega de documentos."
    ],
    after: [
      "Plataforma pública de autoservicio donde el usuario ingresa su NIT y obtiene su certificado en 2 segundos.",
      "Generación al vuelo de PDFs oficiales con formato certificado, sellos y firmas.",
      "Cero correos y cero llamadas atendidas por contabilidad para solicitud de certificados.",
      "Disponibilidad 24/7/365 con alta concurrencia soportada en Supabase y Vite."
    ],

    techStack: ["React", "Vite", "Supabase", "jsPDF", "jsPDF-AutoTable", "Framer Motion", "Lucide Icons"],
    kpis: [
      { label: "Llamadas / Correos Recibidos", value: "0", prev: ">600 / mes", change: "-100%" },
      { label: "Tiempo de Entrega", value: "Instantáneo", prev: "3-5 días", change: "-99%" },
      { label: "Satisfacción Proveedores", value: "100%", prev: "62%", change: "+38%" }
    ],
    architecture: "Consulta por NIT -> Validación Supabase -> Motor jsPDF-AutoTable en Navegador -> Descarga Directa de Certificado Oficial"
  },

  {
    id: "app_gh",
    name: "GH PRO (App Gh)",
    appUrl: null, // Ej: "https://gh-pro.vercel.app"
    reportData: {
      problema: "Libros físicos de asistencia con riesgo de suplantación, proceso engorroso en papel para solicitud de vacaciones y falta de control en la entrega de dotación y EPP.",
      solucion: "Control de asistencia por código QR y biometría, portal del trabajador para consultar vacaciones y certificados, y módulo digital de dotación con historial por colaborador.",
      impacto: "Eliminación del fraude de asistencia (~12% detectado), reducción de trámites físicos y trazabilidad completa de incapacidades, exámenes y dotaciones para 150+ colaboradores.",
      ahorro: "Eliminación del 100% del gasto en formatos físicos y reducción de horas extras del área de RRHH en gestión manual. Ahorro estimado en nómina variable y papel: $31.000.000 anuales."
    },
    title: "Gestión Humana 360°, Asistencia QR/Biométrica y Portal del Colaborador",
    folder: "App Gh",
    category: "rrhh",
    categoryLabel: "Gestión Humana & RRHH",
    badge: "Transformación Cultural",
    icon: "users",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #4f46e5, #818cf8)",
    status: "100% Producción",
    summary: "Ecosistema integral de Talento Humano con marcación QR de turnos y almuerzos, portal de autoservicio para el trabajador, radicación de incapacidades, dotaciones y control de vacaciones.",
    
    hoursSavedMonthly: 135,
    annualSavingsEstimated: 31000000, // $31M COP
    errorReductionPercent: 98,
    activeUsers: "150+ Empleados (TAT / TYM / Bodega / Ventas / Administración)",
    transactionsMonthly: "5,000+ Marcaciones y solicitudes procesadas",

    before: [
      "Libros y planillas físicas de asistencia con firmas ilegibles y riesgo de suplantación.",
      "Proceso engorroso en papel para solicitud, aprobación y cruce de días de vacaciones.",
      "Falta de control riguroso de entregas de dotación, calzado y EPP por trabajador.",
      "Pérdida de trazabilidad en prórrogas de incapacidades médicas y exámenes periódicos."
    ],
    after: [
      "Control de asistencia por código QR y biometría con validación de hora y zona horaria Colombia.",
      "Portal del trabajador para consultar certificados, días de vacaciones disponibles y estado de solicitudes.",
      "Módulo de dotación con tallas, historial de prendas entregadas y fechas de reposición legal.",
      "Gestión digital de incapacidades y control de exámenes ocupacionales en tiempo real."
    ],

    techStack: ["Vanilla JS PWA", "Supabase", "jsQR", "QRCode.js", "Service Workers", "SQL Migrations"],
    kpis: [
      { label: "Tiempo Solicitud Vacaciones", value: "1 min", prev: "3 días", change: "-98%" },
      { label: "Fraude de Asistencia", value: "0%", prev: "~12%", change: "-100%" },
      { label: "Ahorro Papel / Formatos", value: "100%", prev: "0%", change: "+100%" }
    ],
    architecture: "Lector QR Móvil / Tablet -> Validación Horario Supabase -> Portal Trabajador -> Motor de Vacaciones & Dotación -> Reporte RRHH"
  },

  {
    id: "app_indicadores",
    name: "AppIndicadores",
    appUrl: null, // Ej: "https://appindicadores.vercel.app"
    reportData: {
      problema: "Cálculos manuales de comisiones en hojas de cálculo complejas, reclamos frecuentes por falta de visibilidad y demoras de hasta 8 días para tener cifras definitivas de pago.",
      solucion: "Motor centralizado que cruza ventas, recaudo y logística con fórmulas estandarizadas. Genera actas de liquidación e informes consolidados en Excel al instante.",
      impacto: "Reducción de reclamos de nómina variable de 22% a menos del 1%. Cierre del proceso en menos de 2 horas contra 6 días anteriores. Transparencia total para directores y colaboradores.",
      ahorro: "Eliminación de reprocesos, correcciones y horas extras del área de compensación. Ahorro estimado en tiempo y ajustes de nómina: $29.000.000 anuales."
    },
    title: "Motor Central de Liquidación de Bonificaciones, KPIs y Nómina Variable",
    folder: "AppIndicadores",
    category: "direccion",
    categoryLabel: "Dirección & Compensación",
    badge: "Transparencia & Estrategia",
    icon: "trending-up",
    color: "#14b8a6",
    gradient: "linear-gradient(135deg, #0d9488, #2dd4bf)",
    status: "100% Producción",
    summary: "Plataforma centralizada de cálculo y liquidación automatizada de bonificaciones por desempeño comercial, cartera, logística, SST y dirección con generación de informes Excel.",
    
    hoursSavedMonthly: 115,
    annualSavingsEstimated: 29000000, // $29M COP
    errorReductionPercent: 99,
    activeUsers: "40+ (Directores, Jefes de Área, Coordinadores, Analistas)",
    transactionsMonthly: "Consolidación mensual de toda la nómina variable",

    before: [
      "Cálculos manuales de comisiones y bonificaciones en hojas de cálculo complejas.",
      "Reclamos frecuentes de la fuerza de ventas por falta de visibilidad en el cálculo de sus variables.",
      "Demora de hasta 8 días después del cierre de mes para tener las cifras definitivas de pago.",
      "Riesgo de pagar bonificaciones indebidas por inconsistencias en los datos de recaudo o entrega."
    ],
    after: [
      "Fórmulas estandarizadas y automatizadas que cruzan ventas, recaudo de cartera y logística.",
      "Generación instantánea de actas de liquidación e informes consolidados en Excel con ExcelJS.",
      "Total transparencia para líderes y colaboradores con auditoría de cumplimiento en tiempo real.",
      "Cierre de nómina variable en menos de 2 horas tras el fin de mes."
    ],

    techStack: ["React", "Vite", "Supabase", "ExcelJS", "FileSaver", "Date-fns", "Lucide React"],
    kpis: [
      { label: "Tiempo Cierre Bonificaciones", value: "2 horas", prev: "6 días", change: "-96%" },
      { label: "Reclamaciones de Nómina", value: "< 1%", prev: "22%", change: "-95%" },
      { label: "Seguridad en Cifras", value: "100%", prev: "80%", change: "+25%" }
    ],
    architecture: "Cruce de Datos Supabase (Ventas, Recaudo, Logística) -> Motor de Fórmulas KPI -> Generador ExcelJS -> Acta de Aprobación"
  },

  {
    id: "zentra_alpina",
    name: "Zeentra Alpina",
    appUrl: null, // Ej: "https://zeentra.vercel.app"
    reportData: {
      problema: "Archivos masivos de Excel del cubo de ventas colapsaban los equipos. Toma días identificar caídas de volumen o vendedores con altas devoluciones. Análisis superficial sin cruce de métricas.",
      solucion: "Pipeline ETL en Python convierte millones de filas a Parquet de consulta ultrarrápida. Dashboard interactivo con TanStack Table y asistente IA con Google GenAI para consultas en lenguaje natural.",
      impacto: "Tiempo de carga de datos reducido de 18 minutos a 0,8 segundos. Capacidad de análisis ampliada de 50.000 a más de 2,5 millones de filas. Detección de desvíos en el mismo día.",
      ahorro: "Eliminación de días perdidos en análisis manual y decisiones tardías por información desactualizada. Ahorro estimado en eficiencia comercial y recuperación de cartera: $42.000.000 anuales."
    },
    title: "Big Data, Cubo de Ventas BI & Asistente IA para Toma de Decisiones",
    folder: "zentra alpina",
    category: "direccion",
    categoryLabel: "Dirección & BI",
    badge: "Inteligencia Artificial",
    icon: "brain-circuit",
    color: "#84cc16",
    gradient: "linear-gradient(135deg, #65a30d, #a3e635)",
    status: "100% Producción",
    summary: "Plataforma de Business Intelligence con procesamiento masivo de cubos de ventas (ETL Parquet), análisis de vendedores por ruta, alertas de devolución y Asistente IA con Google GenAI.",
    
    hoursSavedMonthly: 160,
    annualSavingsEstimated: 42000000, // $42M COP
    errorReductionPercent: 95,
    activeUsers: "15+ (Gerencia Comercial, Supervisores Alpina, Dirección General)",
    transactionsMonthly: "Millones de registros procesados (Cubo de Ventas)",

    before: [
      "Archivos masivos de Excel (Cubo de Ventas) que colapsaban las computadoras del equipo comercial.",
      "Demora de días para identificar vendedores con altas tasas de devolución o caídas de volumen.",
      "Dificultad para cruzar datos históricos y proyectar cumplimiento de cuotas de venta.",
      "Análisis superficial de la competencia en el Eje Cafetero sin cruce de métricas."
    ],
    after: [
      "Pipeline ETL en Python que convierte millones de filas a Parquet de ultra-rápida consulta.",
      "Visualización interactiva con TanStack Table, ApexCharts y vista de perfil detallado por ejecutivo.",
      "Asistente IA empresarial con Google GenAI que responde consultas complejas en lenguaje natural.",
      "Alertas automáticas por zonas críticas, focos numéricos y detección de fugas de rentabilidad."
    ],

    techStack: ["React", "TypeScript", "TailwindCSS", "ApexCharts", "Python (ETL Parquet)", "Supabase", "Google GenAI"],
    kpis: [
      { label: "Tiempo de Carga de Datos", value: "0.8 seg", prev: "18 min", change: "-99%" },
      { label: "Detección de Desvíos", value: "Mismo día", prev: "Fin de mes", change: "-97%" },
      { label: "Capacidad de Procesamiento", value: "+2.5M filas", prev: "50k filas", change: "+4900%" }
    ],
    architecture: "ETL Python (Excel -> Parquet) -> Supabase Cache -> Frontend React TanStack Table -> ApexCharts -> Google GenAI Assistant"
  },

  {
    id: "cambios_zenu",
    name: "ZenUp (Cambios Zenú)",
    appUrl: null, // Ej: "https://zenup.vercel.app"
    reportData: {
      problema: "Toma de pedidos y cambios en talonarios físicos con precios desactualizados. Errores en equivalencias de productos cárnicos y falta de visibilidad del avance de ruta para supervisores.",
      solucion: "Catálogo digital offline-first con precios actualizados automáticamente. Calcula al instante el valor exacto de cambios y muestra en tiempo real el estado de visitas completadas.",
      impacto: "Reducción del tiempo por visita de 12 a 3 minutos. Efectividad de cobro Zenú pasa de 81,5% a 99,8%. Cobertura completa en tiendas de barrio sin conexión a internet.",
      ahorro: "Reducción de pérdidas por errores de precio y cambios mal calculados. Más visitas efectivas por jornada al reducir tiempo por cliente. Ahorro estimado: $28.000.000 anuales."
    },
    title: "Gestión Comercial y Control de Cambios de Producto en Campo",
    folder: "cambios zenu",
    category: "comercial",
    categoryLabel: "Comercial & TAT",
    badge: "Fuerza de Ventas",
    icon: "shopping-bag",
    color: "#f97316",
    gradient: "linear-gradient(135deg, #ea580c, #fb923c)",
    status: "100% Producción",
    summary: "Herramienta offline-first para asesores comerciales TAT de Zenú que automatiza la toma de visitas, pedidos, liquidación de cambios por avería y control de cumplimiento semanal.",
    
    hoursSavedMonthly: 120,
    annualSavingsEstimated: 28000000, // $28M COP
    errorReductionPercent: 96,
    activeUsers: "25+ (Asesores Comerciales TAT Zenú, Supervisores, Liquidadores)",
    transactionsMonthly: "3,200+ Visitas y cambios de producto",

    before: [
      "Toma de pedidos y cambios en talonarios físicos con precios desactualizados.",
      "Errores en el cálculo de equivalencias de precios en productos cárnicos cambiados.",
      "Falta de visibilidad para supervisores sobre el avance de la ruta en tiempo real.",
      "Demora en la recepción y validación de averías en la planta de producción de Zenú."
    ],
    after: [
      "Catálogo digital de productos Zenú e Ideal Rica con precios actualizados automáticamente.",
      "Cálculo instantáneo y exacto de valores de cambio evitando pérdidas para la distribuidora.",
      "Dashboard de administrador en tiempo real con estado de visitas completadas vs pendientes.",
      "Funcionamiento 100% offline para cobertura completa en tiendas de barrios y periferia."
    ],

    techStack: ["Vanilla JS PWA", "LocalStorage Engine", "Supabase", "Service Workers", "Mobile Touch UI"],
    kpis: [
      { label: "Tiempo por Visita", value: "3 min", prev: "12 min", change: "-75%" },
      { label: "Efectividad de Cobro Zenú", value: "99.8%", prev: "81.5%", change: "+18.3%" },
      { label: "Precisión de Precios", value: "100%", prev: "89%", change: "+11%" }
    ],
    architecture: "PWA Asesor Móvil -> Catálogo Offline en LocalStorage -> Sync Automático Supabase -> Dashboard Supervisor en Tiempo Real"
  },

  {
    id: "web_tm_tat",
    name: "WEB-T-M-TAT",
    appUrl: null, // Ej: "https://tiendasymarcas.com"
    reportData: {
      problema: "Ausencia de portal digital unificado para TYM y TAT. Atención manual por teléfono para preguntas de catálogo e imagen institucional desactualizada frente a competidores regionales.",
      solucion: "Portal corporativo con diseño moderno, catálogo multimarca, asistente IA con Google Gemini para atención automática y canal B2B para captación de nuevos clientes.",
      impacto: "Captación de leads aumentó un 140%. El 85% de las consultas son resueltas automáticamente por el asistente IA sin intervención humana. Velocidad de carga de 98/100.",
      ahorro: "Reducción de tiempo del equipo comercial en atención de consultas repetitivas y mayor alcance sin costo adicional de personal. Ahorro estimado en gestión comercial: $18.000.000 anuales."
    },
    title: "Plataforma Web Corporativa, Catálogo Digital e Inteligencia Artificial",
    folder: "WEB-T-M-TAT",
    category: "comercial",
    categoryLabel: "Comercial & Institucional",
    badge: "Presencia & IA",
    icon: "globe",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
    status: "100% Producción",
    summary: "Portal web institucional y comercial de Tiendas y Marcas del Eje Cafetero (TYM) y TAT Distribuciones con integración de Google Gemini IA, catálogo multimarca y canal B2B.",
    
    hoursSavedMonthly: 60,
    annualSavingsEstimated: 18000000, // $18M COP
    errorReductionPercent: 90,
    activeUsers: "Clientes B2B, Compradores TAT, Prospectos, Público General",
    transactionsMonthly: "12,000+ Visitas y consultas al catálogo",

    before: [
      "Ausencia de un portal digital moderno unificado para Tiendas y Marcas (TYM) y TAT.",
      "Atención manual por teléfono para preguntas repetitivas de catálogo y cobertura.",
      "Dificultad de los clientes para conocer el portafolio completo de marcas aliadas.",
      "Imagen institucional desactualizada frente a competidores mayoristas de la región."
    ],
    after: [
      "Portal corporativo de alto impacto visual con diseño moderno y optimización SEO.",
      "Integración de IA con Google Generative AI para asistencia comercial automática.",
      "Exposición clara de marcas líderes aliadas (Alpina, Zenú, Fleischmann, etc.).",
      "Canal directo de contacto y captación de nuevos tenderos y clientes institucionales."
    ],

    techStack: ["HTML5 / CSS3 Moderno", "Vanilla JS", "Node.js API", "Google Generative AI (Gemini)", "Vercel Deployment"],
    kpis: [
      { label: "Captación de Leads", value: "+140%", prev: "Base", change: "+140%" },
      { label: "Consultas Automatizadas", value: "85%", prev: "0%", change: "+85%" },
      { label: "Velocidad de Carga", value: "98/100", prev: "N/A", change: "Top Score" }
    ],
    architecture: "Frontend Web Optimizado -> Vercel Edge Network -> API Backend -> Google Gemini GenAI -> Leads CRM"
  }
];

// Estadísticas Globales Consolidadas
const ECOSYSTEM_STATS = {
  totalApps: APPS_DATA.length,
  totalHoursSavedMonthly: APPS_DATA.reduce((acc, app) => acc + app.hoursSavedMonthly, 0),
  totalHoursSavedYearly: APPS_DATA.reduce((acc, app) => acc + app.hoursSavedMonthly * 12, 0),
  totalAnnualSavingsEstimated: APPS_DATA.reduce((acc, app) => acc + app.annualSavingsEstimated, 0),
  avgErrorReduction: Math.round(APPS_DATA.reduce((acc, app) => acc + app.errorReductionPercent, 0) / APPS_DATA.length),
  paperSavedSheetsYearly: 48500, // Hojas de papel eliminadas
  totalActiveUsersCount: "400+ Usuarios Activos",
  departmentsImpacted: 5,
  serverCostSavedYearly: 24000000 // $24M COP ahorrados en servidores tradicionales vs Serverless
};

// Categorías para filtros
const CATEGORIES = [
  { id: "todos", label: "Todas las Soluciones", icon: "layout-grid", count: APPS_DATA.length },
  { id: "logistica", label: "Logística & Transporte", icon: "truck", count: APPS_DATA.filter(a => a.category === "logistica").length },
  { id: "financiero", label: "Financiero & Cartera", icon: "receipt", count: APPS_DATA.filter(a => a.category === "financiero").length },
  { id: "rrhh", label: "Gestión Humana & RRHH", icon: "users", count: APPS_DATA.filter(a => a.category === "rrhh").length },
  { id: "direccion", label: "Dirección & BI", icon: "trending-up", count: APPS_DATA.filter(a => a.category === "direccion").length },
  { id: "comercial", label: "Comercial & TAT", icon: "shopping-bag", count: APPS_DATA.filter(a => a.category === "comercial").length }
];
