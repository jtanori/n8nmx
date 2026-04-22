-- 1. Catálogo de Micro-servicios Automatizados
CREATE TABLE IF NOT EXISTS micro_services (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Diccionario de Lógica de Ventas
CREATE TABLE IF NOT EXISTS sales_logic_mapping (
    id SERIAL PRIMARY KEY,
    niche_name VARCHAR(100) NOT NULL,
    condition_trigger VARCHAR(100) NOT NULL,
    recommended_service_id INTEGER REFERENCES micro_services(id) ON DELETE CASCADE,
    priority INTEGER DEFAULT 1,
    pitch_template TEXT
);

-- 3. Seed: Poblado Inicial de Servicios
INSERT INTO micro_services (slug, name, description) VALUES 
('ai-whatsapp-concierge', 'AI-WhatsApp Concierge', 'Calificación de prospectos y agenda 24/7 vía WhatsApp.'),
('review-responder-ai', 'Review Responder AI', 'Gestión de reputación automatizada con análisis de sentimiento.'),
('local-seo-audit', 'Local SEO Auto-Audit', 'Reporte comparativo de ranking en Google Maps.'),
('pdf-quote-gen', 'PDF Quote Generator', 'Generación instantánea de presupuestos en PDF.'),
('insta-dm-crm', 'Insta-DM to CRM', 'Sincronización de consultas de Instagram con base de datos.'),
('auto-nps-survey', 'Auto-NPS Survey', 'Encuestas de satisfacción automáticas post-servicio.'),
('competitor-price-tracker', 'Competitor Price Tracker', 'Monitoreo de precios de competencia regional.'),
('appointment-reminder', 'Appointment Reminder', 'Recordatorios automáticos para reducir inasistencias.'),
('dynamic-pricing-sync', 'Dynamic Pricing Sync', 'Actualización de precios en tiempo real según inventario.'),
('social-cross-poster', 'Social Cross-Poster', 'Publicación automática en múltiples redes sociales.'),
('ecommerce-stock-alert', 'E-com Stock Alert', 'Notificaciones de "Vuelve a estar disponible".'),
('abandoned-cart-wa', 'Abandoned Cart (WA)', 'Recuperación de carritos abandonados vía WhatsApp.'),
('emergency-sms-alert', 'Emergency SMS Alert', 'Alertas críticas para fallos en servicios técnicos.'),
('employee-onboarding-bot', 'Employee Onboarding Bot', 'Guía automatizada para nuevos ingresos de personal.'),
('digital-catalog-bot', 'Digital Catalog Bot', 'Menú/Catálogo interactivo en WhatsApp.'),
('ai-sentiment-dashboard', 'AI Sentiment Dashboard', 'Panel de percepción de marca en redes sociales.'),
('smart-lead-distributor', 'Smart Lead Distributor', 'Asignación inteligente de prospectos a vendedores.'),
('google-presence-guard', 'Google Presence Guard', 'Protección contra cambios no autorizados en Google Maps.'),
('auto-invoice-followup', 'Auto-Invoice Follow-up', 'Gestión de cobranza y recordatorios de pago.'),
('ai-curated-newsletter', 'AI Curated Newsletter', 'Boletín semanal automático con noticias del sector.')
ON CONFLICT (slug) DO NOTHING;

-- 4. Seed: Mapeo de Lógica Sonora
INSERT INTO sales_logic_mapping (niche_name, condition_trigger, recommended_service_id, pitch_template)
SELECT 
    v.niche, 
    v.trigger, 
    s.id, 
    v.pitch
FROM (VALUES 
    ('Agencia Aduanal', 'no_website', 'ai-whatsapp-concierge', 'Hola, noté que su agencia no cuenta con sitio web. Podríamos implementar un bot de WhatsApp para gestionar sus clientes 24/7.'),
    ('Agencia Aduanal', 'low_reviews', 'local-seo-audit', 'Su competencia aduanal está mejor posicionada digitalmente. Mejoremos su ranking en Google Maps para captar nuevos importadores.'),
    ('Agencia Aduanal', 'manual_processes', 'pdf-quote-gen', 'Genere cotizaciones de fletes y maniobras en segundos directamente desde WhatsApp.'),
    ('Agencia Aduanal', 'high_rating_unattended', 'review-responder-ai', 'Mantenga su estatus de alta confianza respondiendo automáticamente a cada reseña de sus clientes internacionales.'),
    ('Agencia Aduanal', 'communication_delays', 'smart-lead-distributor', 'Envíe los prospectos de importación urgentes al agente aduanal disponible más rápido vía Telegram.'),
    ('Clínica Médica', 'no_website', 'appointment-reminder', 'Reduzca el ausentismo en su clínica mediante recordatorios automáticos de citas por WhatsApp o SMS.'),
    ('Clínica Médica', 'low_reviews', 'local-seo-audit', 'El turismo médico en Sonora depende de la confianza. Posicionemos su clínica como la opción #1 para pacientes extranjeros.'),
    ('Clínica Médica', 'manual_processes', 'ai-whatsapp-concierge', 'Un asistente virtual puede pre-filtrar pacientes y agendar citas 24/7 mientras su personal atiende la clínica.'),
    ('Clínica Médica', 'high_rating_unattended', 'auto-nps-survey', 'Mida la satisfacción de sus pacientes automáticamente después de cada consulta para asegurar su retorno.'),
    ('Clínica Médica', 'no_social_presence', 'insta-dm-crm', 'Capture pacientes de medicina estética directamente desde Instagram hacia su base de datos segura.'),
    ('Real Estate', 'no_website', 'insta-dm-crm', 'Capture a inversionistas interesados en sus desarrollos desde Instagram y envíelos directo a su CRM.'),
    ('Real Estate', 'low_reviews', 'local-seo-audit', 'Haga que sus desarrollos frente al mar destaquen en búsquedas sobre la oferta informal de rentas.'),
    ('Real Estate', 'manual_processes', 'digital-catalog-bot', 'Envíe su catálogo de condominios actualizado instantáneamente a prospectos en Arizona vía WhatsApp.'),
    ('Real Estate', 'high_rating_unattended', 'review-responder-ai', 'Sus compradores valoran el profesionalismo. Automatice su gestión de reputación en plataformas digitales.'),
    ('Real Estate', 'communication_delays', 'ai-whatsapp-concierge', 'No pierda leads nocturnos de EE.UU.; el bot califica el presupuesto del cliente antes de pasarlo a un asesor.'),
    ('Logística', 'no_website', 'ai-whatsapp-concierge', 'Implemente rastreo de unidades y consultas de estatus de carga vía bot para aliviar su línea telefónica.'),
    ('Logística', 'manual_processes', 'auto-invoice-followup', 'Automatice los recordatorios de pago y facturación para sus clientes recurrentes de transporte de carga.'),
    ('Logística', 'low_reviews', 'google-presence-guard', 'Proteja la información de contacto de sus patios y bodegas en Google Maps contra ediciones no autorizadas.'),
    ('Logística', 'high_rating_unattended', 'ai-sentiment-dashboard', 'Entienda qué opinan sus clientes industriales sobre sus tiempos de entrega mediante análisis de IA.'),
    ('Logística', 'communication_delays', 'emergency-sms-alert', 'Notifique automáticamente a sus clientes si hay retrasos en aduana o bloqueos carreteros en tiempo real.'),
    ('Hotel Boutique', 'no_website', 'ai-whatsapp-concierge', 'Conserjería virtual para sus huéspedes las 24 horas, recomendando restaurantes y tours locales.'),
    ('Hotel Boutique', 'abandoned_carts', 'abandoned-cart-wa', 'Recupere reservas directas inconclusas enviando un mensaje personalizado y evite comisiones de Booking.'),
    ('Hotel Boutique', 'low_reviews', 'review-responder-ai', 'Cada estrella cuenta. Responda automáticamente a sus huéspedes y mejore su score en TripAdvisor.'),
    ('Hotel Boutique', 'high_rating_unattended', 'ai-curated-newsletter', 'Mantenga a sus huéspedes frecuentes informados sobre promociones de temporada para fomentar el regreso.'),
    ('Hotel Boutique', 'manual_processes', 'digital-catalog-bot', 'Digitalice el menú de room service y amenidades a través de un catálogo interactivo en WhatsApp.'),
    ('Industria', 'manual_processes', 'employee-onboarding-bot', 'Agilice la inducción de personal operativo en sus líneas de producción mediante flujos automatizados de WhatsApp.'),
    ('Industria', 'communication_delays', 'emergency-sms-alert', 'Alertas críticas inmediatas para gerentes de planta en caso de fallos en servicios técnicos o maquinaria.'),
    ('Industria', 'no_website', 'pdf-quote-gen', 'Estandarice las cotizaciones de sus servicios de maquinado industrial y envíelas al instante.'),
    ('Industria', 'low_reviews', 'google-presence-guard', 'Asegure que la ubicación de su parque industrial sea precisa para proveedores y nuevos talentos.'),
    ('Industria', 'high_rating_unattended', 'ai-sentiment-dashboard', 'Monitoree el clima laboral y la percepción de su empresa en redes sociales para mejorar la retención.'),
    ('Servicios B2B', 'no_website', 'ai-whatsapp-concierge', 'Un primer filtro legal o contable 24/7 que recolecta la información básica del caso antes de su intervención.'),
    ('Servicios B2B', 'manual_processes', 'auto-invoice-followup', 'Elimine la fricción del cobro de igualas mensuales mediante recordatorios educados y automatizados.'),
    ('Servicios B2B', 'low_reviews', 'local-seo-audit', 'Destaque como el despacho corporativo más confiable de la ciudad dominando los resultados locales de Google.'),
    ('Servicios B2B', 'communication_delays', 'appointment-reminder', 'Optimice su agenda de consultoría reduciendo citas canceladas de último minuto.'),
    ('Servicios B2B', 'high_rating_unattended', 'ai-curated-newsletter', 'Envíe boletines automatizados a sus clientes sobre nuevas reformas fiscales en México para mantener autoridad.'),
    ('Agroindustria', 'no_website', 'digital-catalog-bot', 'Envíe su catálogo de agroquímicos, semillas o refacciones directamente al WhatsApp del productor en campo.'),
    ('Agroindustria', 'manual_processes', 'pdf-quote-gen', 'Permita que los agricultores soliciten cotizaciones de maquinaria pesada y reciban un PDF al instante.'),
    ('Agroindustria', 'communication_delays', 'smart-lead-distributor', 'Envíe las alertas de compra de equipo al agente de ventas asignado a esa zona del valle en tiempo real.'),
    ('Agroindustria', 'low_reviews', 'google-presence-guard', 'Asegure que los horarios de temporada de cosecha estén siempre correctos en su perfil de negocio.'),
    ('Agroindustria', 'high_rating_unattended', 'ecommerce-stock-alert', 'Notifique automáticamente a los productores cuando lleguen los tractores o implementos que estaban esperando.')
) AS v(niche, trigger, slug, pitch)
JOIN micro_services s ON s.slug = v.slug
ON CONFLICT DO NOTHING;
