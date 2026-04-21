#!/bin/bash
# Uso: ./scripts/init-dev.sh [env_file]
# Ejemplo: ./scripts/init-dev.sh .env.remote

ENV_FILE=${1:-.env}

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: El archivo $ENV_FILE no existe."
  exit 1
fi

echo "--- Sonora Prospector Engine: Lanzador de Desarrollo ---"
echo "Enlazando $ENV_FILE como configuración de desarrollo para Next.js..."

# Crear link simbólico relativo para Next.js
ln -sf "../$ENV_FILE" apps/web/.env

echo "Iniciando servicios..."
# Función para limpiar procesos al salir
cleanup() {
    echo "Deteniendo servicios..."
    pkill -P $$
    exit
}
trap cleanup SIGINT SIGERR

# Lanzar API en background
echo "Lanzando API (FastAPI)..."
(cd apps/api && source venv/bin/activate && uvicorn src.main:app --reload --port 8000) &

# Lanzar Dashboard en foreground
echo "Lanzando Dashboard (Next.js)..."
(cd apps/web && npm run dev)
