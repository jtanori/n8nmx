#!/bin/bash
# Uso: ./scripts/build-local.sh [.env_file]
# Ejemplo: ./scripts/build-local.sh .env.remote

ENV_FILE=${1:-.env}

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: El archivo $ENV_FILE no existe en la raíz."
  exit 1
fi

echo "--- Sonora Prospector Engine: Preparando entorno ---"

# 1. Asegurar que apps/web tenga acceso al .env
# Copiamos explícitamente para que el build de Next.js lo encuentre donde espera
cp "$ENV_FILE" apps/web/.env

# 2. Cargar variables para el build
export $(grep -v '^#' "$ENV_FILE" | xargs)

# 3. Ejecutar build
echo "Iniciando build de producción..."
cd apps/web && npm run build
