#!/bin/bash
# Uso: ./migrate.sh <DATABASE_URL>

DB_URL=$1

if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL no proporcionada."
  exit 1
fi

echo "Verificando tabla de migraciones..."
psql "$DB_URL" -c "CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"

# Iterar explícitamente solo sobre archivos que empiezan con dígitos
for file in /db-schema/migrations/[0-9]*.sql; do
    # Extraer el nombre del archivo
    filename=$(basename "$file")
    
    # Extraer el número de versión (ej: 001_initial_schema.sql -> 1)
    version=$(echo $filename | cut -d'_' -f1 | sed 's/^0*//')
    
    # Validar que la versión sea un número
    if ! [[ "$version" =~ ^[0-9]+$ ]]; then
        echo "Saltando archivo inválido: $filename"
        continue
    fi

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
