# Sonora Prospector Engine

Motor de prospección escalable diseñado para extraer, procesar y visualizar datos de leads.

## 🚀 Inicio Rápido (Local)

### Requisitos previos
- Docker y Docker Compose instalados.
- Node.js v20+.
- Python 3.9+.

### Configuración
1. Clonar el repositorio.
2. Copiar `.env.example` a `.env` y configurar las variables:
   ```bash
   cp .env.example .env
   ```
3. Levantar la infraestructura:
   ```bash
   docker compose up -d
   ```

### Desarrollo
1. **Frontend (Next.js):**
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```
2. **API (FastAPI):**
   ```bash
   cd apps/api
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn src.main:app --reload
   ```

## 🧪 Pruebas

Para asegurar la integridad del sistema bajo nuestra metodología **TDD**:

- **Frontend:** `cd apps/web && npm test`
- **Backend/Integración:** `source venv/bin/activate && pytest apps/api/tests/`

## 📦 Despliegue (Staging/Producción)

El sistema es agnóstico al entorno. Para desplegar:

1. Configurar las variables de entorno (`DB_USER`, `DB_PASS`, `DB_NAME`, `DATABASE_URL`) en el host de destino.
2. Asegurar que Docker y Docker Compose estén instalados.
3. Ejecutar:
   ```bash
   docker compose up -d --build
   ```

## 🛠️ Automatización (n8n)

El flujo de n8n se encuentra en `packages/automation/sonora_prospector_flow.json`. Impórtalo en tu instancia de n8n para conectar Google Maps con la base de datos de PostgreSQL.

---
*Para más detalles sobre el protocolo de ingeniería, consulta `Skill.md`.*
