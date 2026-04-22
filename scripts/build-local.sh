#!/bin/bash
# Uso: ./scripts/build-local.sh [.env_file]
# Ejemplo: ./scripts/build-local.sh .env.remote

ENV_FILE=${1:-.env}

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: El archivo $ENV_FILE no existe en la raíz."
  exit 1
fi

echo "--- Sonora Prospector Engine: Preparando entorno ---"

# 1. Asegurar que el directorio destino existe
mkdir -p apps/web

# 2. Copiar explícitamente el archivo al directorio esperado por Next.js
cp "$ENV_FILE" apps/web/.env

# 3. Cargar variables para el build y forzar producción
export $(grep -v '^#' "$ENV_FILE" | xargs)
export NODE_ENV=production

# 4. Ejecutar build
echo "Iniciando build de producción..."
cd apps/web && npm run build
