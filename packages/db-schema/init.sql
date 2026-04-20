-- Habilitar extensión para UUIDs si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Leads de Sonora
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_place_id VARCHAR(255) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL, -- Hermosillo, Puerto Peñasco, etc.
    category VARCHAR(100),
    website_url TEXT,
    phone_number VARCHAR(50),
    rating DECIMAL(3, 2),
    user_ratings_total INTEGER,
    relevance_score FLOAT DEFAULT 0.0, -- Calculado por el nodo de Python
    is_high_quality BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, interested, converted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar la búsqueda en el dashboard de Next.js
CREATE INDEX idx_leads_city ON leads(city);
CREATE INDEX idx_leads_relevance ON leads(is_high_quality) WHERE is_high_quality IS TRUE;

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
