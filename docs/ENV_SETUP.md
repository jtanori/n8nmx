# Gestión de Entornos y Configuración .env

El proyecto Sonora Prospector Engine utiliza variables de entorno para garantizar la portabilidad y seguridad entre entornos (Local, Staging, Producción).

## 1. Archivo .env
El archivo `.env` se utiliza para la configuración local. **Nunca** debe ser versionado en el repositorio (está incluido en `.gitignore`).

Para comenzar, crea tu archivo local basado en el ejemplo:

```bash
cp .env.example .env
```

## 2. Variables Requeridas

Abre tu archivo `.env` recién creado y configura los siguientes parámetros:

| Variable | Descripción | Valor Ejemplo |
| :--- | :--- | :--- |
| PGUSER | Usuario de PostgreSQL | `admin` |
| PGPASSWORD | Contraseña de PostgreSQL | `secret` |
| PGDATABASE | Nombre de la base de datos | `prospector_db` |
| DATABASE_URL | URL de conexión completa | `postgresql://admin:secret@db:5432/prospector_db` |
| DB_PORT | Puerto de la base de datos | `5432` |
| DB_HOST | Host de la base de datos | `db` |

## 3. Configuración por Entorno

### Entorno Local (Docker)
Al utilizar `docker compose`, las variables de entorno se utilizan para configurar el contenedor de la base de datos y la conexión desde la API.
- Asegúrate de que el puerto `5432` no esté ocupado en tu máquina local.
- El servicio `api` utiliza `DATABASE_URL` para conectarse internamente al servicio `db`.

### Entorno de Staging/Producción
Para despliegues, es recomendable inyectar estas variables directamente en la plataforma de hosting (e.g., AWS, DigitalOcean, Railway) en lugar de usar un archivo `.env` físico.

1. Configura las variables en el panel de control del hosting.
2. Asegúrate de que `DATABASE_URL` apunte a la instancia de base de datos externa.

## 4. Validación de la Configuración
Después de modificar tu `.env`, valida que el contenedor levante correctamente:

```bash
docker compose up -d
docker compose logs -f db
```

Si el log indica `database system is ready to accept connections`, la configuración es correcta.

---
*Nota de seguridad: Nunca compartas ni subas tu archivo `.env` a sistemas de control de versiones o servicios de terceros.*
