-- Habilitar extensión para UUIDs si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Leads de Sonora
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_id UUID REFERENCES search_queries(id) ON DELETE SET NULL, -- Nueva relación para auditoría
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

-- Tabla de configuraciones
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    report_email VARCHAR(255),
    notification_phone VARCHAR(50),
    report_frequency VARCHAR(50)
);

-- Tabla de búsquedas
CREATE TABLE IF NOT EXISTS search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term VARCHAR(255) NOT NULL,
    is_executed BOOLEAN DEFAULT FALSE,
    priority_order INTEGER DEFAULT 0,
    config_id INTEGER REFERENCES settings(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ubicaciones de búsqueda
CREATE TABLE IF NOT EXISTS search_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_id UUID REFERENCES search_queries(id) ON DELETE CASCADE,
    city_name VARCHAR(100) NOT NULL,
    lat DECIMAL(9, 6),
    lng DECIMAL(9, 6),
    radius INTEGER
);

-- Índices para optimizar
CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city);
CREATE INDEX IF NOT EXISTS idx_leads_relevance ON leads(is_high_quality) WHERE is_high_quality IS TRUE;
CREATE INDEX IF NOT EXISTS idx_search_locations_search_id ON search_locations(search_id);

-- Función para actualizar el timestamp de 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_modtime
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
