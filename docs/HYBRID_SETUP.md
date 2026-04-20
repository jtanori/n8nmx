# Guía de Flujo Híbrido: Local-Cloud

Esta configuración permite ejecutar el dashboard y la API localmente conectándolos a la infraestructura (Postgres, n8n) en la nube (Railway).

## 1. Configuración de .env.remote
Para usar la infraestructura en la nube, crea o edita el archivo `.env.remote` en la raíz del proyecto.

> **Importante:** Nunca subas este archivo al repositorio. Úsalo como archivo de referencia `env.remote.example` si es necesario.

```bash
# Variables obtenidas del Dashboard de Railway
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
DB_HOST=... # El host que te proporciona Railway
DB_PORT=5432
# ... etc
```

## 2. Ejecución Híbrida
Utiliza la variable de entorno `APP_ENV` para conmutar entre tu entorno local y el remoto:

### Iniciar el Dashboard (Next.js)
```bash
APP_ENV=remote npm run dev --prefix apps/web
```

### Iniciar la API (FastAPI)
Para la API, puedes cargar el entorno manualmente o ajustar el script de inicio:
```bash
dotenv -e .env.remote -- uvicorn apps/api/src/main:app --reload
```

## 3. Ventajas
- **Iteración Rápida:** Cambios en el código local reflejados instantáneamente sin desplegar.
- **Persistencia en la Nube:** Los datos persisten en la base de datos de Railway.
- **Automatización Activa:** El n8n en la nube sigue procesando datos aunque apagues tu máquina.
