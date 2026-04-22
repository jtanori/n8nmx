#!/bin/bash
# Uso: ./migrate.sh <DATABASE_URL>

DB_URL=$1

if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL no proporcionada."
  exit 1
fi

echo "Esperando a que la DB esté lista..."
until psql "$DB_URL" -c '\q' >/dev/null 2>&1; do
  >&2 echo "Postgres no está listo - esperando..."
  sleep 2
done

echo "Verificando tabla de migraciones..."
psql "$DB_URL" -c "CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);" >/dev/null

# Usar nullglob para que el patrón se expanda a nada si no hay archivos
shopt -s nullglob
files=(packages/db-schema/migrations/[0-9]*.sql)

if [ ${#files[@]} -eq 0 ]; then
    echo "No se encontraron archivos de migración en packages/db-schema/migrations/"
    exit 0
fi

for file in "${files[@]}"; do
    filename=$(basename "$file")
    version=$(echo $filename | cut -d'_' -f1 | sed 's/^0*//')
    
    # Validar que la versión sea un número
    if ! [[ "$version" =~ ^[0-9]+$ ]]; then
        echo "Saltando archivo inválido: $filename"
        continue
    fi

    echo "Verificando migración: $filename (v$version)..."
    
    applied=$(psql "$DB_URL" -tAc "SELECT 1 FROM schema_migrations WHERE version = $version" 2>/dev/null)
    
    if [ "$applied" != "1" ]; then
        echo "Aplicando migración: $file..."
        psql -v ON_ERROR_STOP=1 "$DB_URL" -f "$file"
        if [ $? -eq 0 ]; then
            psql "$DB_URL" -c "INSERT INTO schema_migrations (version) VALUES ($version);"
            echo "Migración v$version aplicada con éxito."
        else
            echo "Fallo en la migración $version. Abortando."
            exit 1
        fi
    else
        echo "Migración v$version ya aplicada."
    fi
done
