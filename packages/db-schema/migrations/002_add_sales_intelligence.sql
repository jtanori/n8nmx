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

-- 3. Actualización de la Tabla de Leads para Auditoría
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS niche_category VARCHAR(100),
ADD COLUMN IF NOT EXISTS sales_suggestions JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS audit_completed_at TIMESTAMP WITH TIME ZONE;

-- 4. Seed: Poblado Inicial de Servicios
INSERT INTO micro_services (slug, name, description) VALUES 
('ai-whatsapp-concierge', 'AI-WhatsApp Concierge', 'Bot de calificación y agenda 24/7'),
('review-responder-ai', 'Review Responder AI', 'Gestión automatizada de reputación en Google'),
('pdf-quote-gen', 'PDF Quote Generator', 'Cotizador instantáneo vía WhatsApp'),
('local-seo-audit', 'Local SEO Auto-Audit', 'Reporte comparativo de visibilidad en Maps')
ON CONFLICT (slug) DO NOTHING;

-- 5. Seed: Mapeo de Lógica Sonora
INSERT INTO sales_logic_mapping (niche_name, condition_trigger, recommended_service_id) VALUES 
('Agencia Aduanal', 'no_website', (SELECT id FROM micro_services WHERE slug = 'ai-whatsapp-concierge')),
('Clínica Médica', 'low_reviews', (SELECT id FROM micro_services WHERE slug = 'local-seo-audit')),
('Real Estate', 'high_rating_unattended', (SELECT id FROM micro_services WHERE slug = 'review-responder-ai'))
ON CONFLICT DO NOTHING;
