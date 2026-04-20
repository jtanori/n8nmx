# Guía de Despliegue en Railway (Servicios Separados)

Para una mayor estabilidad y escalabilidad en Railway, hemos migrado a una arquitectura de servicios separados en lugar de un único despliegue vía `docker-compose.yml`.

## 1. Configuración de Recursos Gestionados
1.  **PostgreSQL:**
    - En el Dashboard de Railway, haz clic en `+ New Project` -> `Provision PostgreSQL`.
    - Railway creará automáticamente las variables de entorno necesarias (`DATABASE_URL`, `PGHOST`, `PGUSER`, etc.).

2.  **API (FastAPI):**
    - Crea un nuevo servicio: `Deploy from GitHub repo`.
    - Selecciona el repositorio `sonora-engine`.
    - **Root Directory:** `/apps/api`.
    - **Variables de Entorno:**
        - `DATABASE_URL`: Usa la variable proporcionada por el servicio de Postgres.
        - `DB_USER`, `DB_PASS`, `DB_NAME`: Configura los mismos valores que en tu `.env`.

3.  **Dashboard (Next.js):**
    - Crea un nuevo servicio: `Deploy from GitHub repo`.
    - **Root Directory:** `/apps/web`.
    - **Build Command:** `npm install && npm run build`
    - **Start Command:** `npm start`
    - **Variables de Entorno:**
        - `DATABASE_URL`: Usa la misma que en la API.
        - `NODE_ENV`: `production`.

## 2. Ventajas de esta arquitectura
- **Escalabilidad:** Puedes escalar el servicio de la API o el Dashboard de forma independiente.
- **Depuración:** Los logs de cada servicio están aislados, facilitando la resolución de problemas.
- **Estabilidad:** Evitas conflictos de "Railpack" al definir explícitamente el contexto de construcción de cada servicio.

---
*Para más detalles sobre la arquitectura, consulta la documentación interna en `/docs`.*
