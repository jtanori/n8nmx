-- 1. Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear TODAS las tablas sin dependencias de FK primero
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_place_id VARCHAR(255) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    website_url TEXT,
    phone_number VARCHAR(50),
    rating DECIMAL(3, 2),
    user_ratings_total INTEGER,
    relevance_score FLOAT DEFAULT 0.0,
    is_high_quality BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sonora_settings (
    id SERIAL PRIMARY KEY,
    report_email VARCHAR(255),
    notification_phone VARCHAR(50),
    report_frequency VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term VARCHAR(255) NOT NULL,
    is_executed BOOLEAN DEFAULT FALSE,
    priority_order INTEGER DEFAULT 0,
    config_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_id UUID,
    city_name VARCHAR(100) NOT NULL,
    lat DECIMAL(9, 6),
    lng DECIMAL(9, 6),
    radius INTEGER
);

-- 3. Añadir relaciones de FK mediante ALTER TABLE (Idempotente)
DO $$ 
BEGIN
    -- FK de leads a search_queries
    IF NOT EXISTS (SELECT 1 FROM pg_attribute WHERE attrelid = 'leads'::regclass AND attname = 'search_id') THEN
        ALTER TABLE leads ADD COLUMN search_id UUID;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_leads_search') THEN
        ALTER TABLE leads ADD CONSTRAINT fk_leads_search FOREIGN KEY (search_id) REFERENCES search_queries(id) ON DELETE SET NULL;
    END IF;

    -- FK de search_queries a sonora_settings
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_search_settings') THEN
        ALTER TABLE search_queries ADD CONSTRAINT fk_search_settings FOREIGN KEY (config_id) REFERENCES sonora_settings(id) ON DELETE SET NULL;
    END IF;

    -- FK de search_locations a search_queries
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_loc_search') THEN
        ALTER TABLE search_locations ADD CONSTRAINT fk_loc_search FOREIGN KEY (search_id) REFERENCES search_queries(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 4. Índices y Triggers (Idempotentes)
CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city);
CREATE INDEX IF NOT EXISTS idx_leads_relevance ON leads(is_high_quality) WHERE is_high_quality IS TRUE;
CREATE INDEX IF NOT EXISTS idx_search_locations_search_id ON search_locations(search_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_leads_modtime ON leads;
CREATE TRIGGER update_leads_modtime
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
