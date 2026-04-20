# Guía de Despliegue en la Nube (Railway & Render)

Esta guía explica cómo desplegar el proyecto **Sonora Prospector Engine** utilizando plataformas de PaaS mediante integración continua con GitHub.

## Requisitos Previos
- Repositorio en GitHub con el código consolidado en la rama `main` (o la rama que desees desplegar).
- Cuenta en [Railway](https://railway.app/) o [Render](https://render.com/).

---

## 1. Despliegue en Railway

Railway es ideal para este proyecto debido a su soporte nativo para Docker y su facilidad de despliegue de monorepos.

### Pasos:
1. **Conectar GitHub:** En el dashboard de Railway, haz clic en "+ New Project" -> "Deploy from GitHub repo".
2. **Configurar Servicios:**
   - Railway detectará automáticamente el archivo `docker-compose.yml`.
   - Si prefieres desplegar componentes individualmente, crea un nuevo servicio para la API y otro para la Base de Datos (PostgreSQL).
3. **Variables de Entorno:**
   - Ve a la pestaña **Variables** del servicio.
   - Agrega todas las variables definidas en `ENV_SETUP.md` (`DB_USER`, `DB_PASS`, etc.).
   - Railway proveerá automáticamente los valores de conexión de la base de datos si usas su servicio gestionado de PostgreSQL.
4. **Despliegue:** Railway desplegará automáticamente al detectar un nuevo commit.

---

## 2. Despliegue en Render

Render es una excelente alternativa para desplegar servicios web y bases de datos gestionadas.

### A. Despliegue de la API (Web Service)
1. Crea un nuevo **Web Service**.
2. Conecta tu repositorio.
3. **Configuración de Build:**
   - **Environment:** `Docker`
   - **Docker Context:** `.` (o la ruta al Dockerfile de la API)
4. **Variables de Entorno:** Agrega las variables desde el dashboard de Render.

### B. Despliegue de la Base de Datos (PostgreSQL)
1. Crea un nuevo **PostgreSQL Database**.
2. Una vez creada, copia el **Internal Connection String** (format: `postgresql://user:pass@host:5432/db`).
3. Actualiza la variable `DATABASE_URL` en tu **Web Service** con este valor para permitir la conexión entre servicios de Render.

---

## Comparativa de Configuración

| Característica | Railway | Render |
| :--- | :--- | :--- |
| **Monorepo** | Excelente soporte nativo | Requiere configuración de path |
| **Base de Datos** | Gestión integrada en el mismo proyecto | Servicio separado |
| **Despliegue** | Basado en Docker Compose | Basado en Dockerfile o Buildpacks |

## Consejos para Despliegues Exitosos
- **Healthchecks:** Asegúrate de que los puertos configurados en `docker-compose.yml` coincidan con los esperados por la plataforma.
- **Variables de Entorno:** Nunca incluyas archivos `.env` en tu repositorio. Configúralas siempre en el panel de control del proveedor cloud.
- **Rama de despliegue:** Por defecto, estas plataformas suelen desplegar la rama `main`. Asegúrate de fusionar tus cambios de `develop` a `main` antes de realizar el despliegue.

---

## 3. Despliegue de n8n en el mismo proyecto de Railway
Para mantener todo el ecosistema (Motor, DB y Automatización) unido:

1. **Añadir Servicio:** En tu proyecto de Railway, haz clic en `+ New` -> `Deploy from image`.
2. **Imagen:** Utiliza `n8nio/n8n:latest`.
3. **Vincular Base de Datos:**
   - Haz clic en el nuevo servicio de n8n -> `Variables`.
   - Crea las siguientes variables usando las referencias de Railway (haciendo clic en "Reference"):
     - `DB_TYPE`: `postgresdb`
     - `DB_POSTGRESDB_HOST`: `${{Postgres.PGHOST}}`
     - `DB_POSTGRESDB_PORT`: `${{Postgres.PGPORT}}`
     - `DB_POSTGRESDB_DATABASE`: `${{Postgres.PGDATABASE}}`
     - `DB_POSTGRESDB_USER`: `${{Postgres.PGUSER}}`
     - `DB_POSTGRESDB_PASSWORD`: `${{Postgres.PGPASSWORD}}`
     - `N8N_ENCRYPTION_KEY`: (Genera una clave única y segura).

4. **Persistencia:** En la pestaña `Volumes` del servicio n8n, añade un volumen montado en `/home/node/.n8n` para asegurar que tus flujos no se pierdan al reiniciar el contenedor.

