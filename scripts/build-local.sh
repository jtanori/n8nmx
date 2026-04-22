#!/bin/bash
# Uso: ./scripts/build-local.sh [.env_file]
# Ejemplo: ./scripts/build-local.sh .env.remote

ENV_FILE=${1:-.env}

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: El archivo $ENV_FILE no existe en la raíz."
  exit 1
fi

echo "--- Sonora Prospector Engine: Preparador de Build Local ---"

# Cargar variables de entorno
export $(grep -v '^#' "$ENV_FILE" | xargs)

# Ejecutar build
echo "Iniciando build de producción..."
cd apps/web && npm run build
