#!/bin/bash
# Uso: ./migrate.sh <DATABASE_URL>

DB_URL=$1

if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL no proporcionada."
  exit 1
fi

echo "Verificando tabla de migraciones..."
psql "$DB_URL" -c "CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"

for file in packages/db-schema/migrations/*.sql; do
    # Extraer el número de versión (ej: 001_initial_schema.sql -> 1)
    filename=$(basename "$file")
    version=$(echo $filename | cut -d'_' -f1 | sed 's/^0*//')
    
    echo "Verificando migración: $filename (v$version)..."
    
    applied=$(psql "$DB_URL" -tAc "SELECT 1 FROM schema_migrations WHERE version = $version")
    
    if [ "$applied" != "1" ]; then
        echo "Aplicando migración: $file..."
        psql "$DB_URL" -f "$file"
        psql "$DB_URL" -c "INSERT INTO schema_migrations (version) VALUES ($version);"
    else
        echo "Migración v$version ya aplicada."
    fi
done
