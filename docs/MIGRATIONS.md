# Guía de Migraciones de Base de Datos

Este proyecto utiliza un sistema de migraciones basado en archivos SQL versionados para mantener la base de datos sincronizada entre entornos.

## 1. Estructura de Migraciones
Todas las migraciones se encuentran en:
`packages/db-schema/migrations/`

Los archivos deben seguir estrictamente el formato: `XXX_nombre_descriptivo.sql` (ej. `001_initial_schema.sql`, `002_add_search_tables.sql`).

## 2. Aplicación de Migraciones en Local

### Opción A: Automatizada (Recomendada)
Al ejecutar `docker-compose up`, el servicio `migrator` se encargará automáticamente de aplicar cualquier migración pendiente:

```bash
docker-compose up -d
```

### Opción B: Manual
Si necesitas ejecutar una migración específica o prefieres hacerlo manualmente, utiliza el script proporcionado:

```bash
# Dar permisos de ejecución si es necesario
chmod +x packages/db-schema/migrate.sh

# Ejecutar contra la base de datos local definida en .env
./packages/db-schema/migrate.sh "$(grep DATABASE_URL .env | cut -d '=' -f2)"
```

## 3. Integración Continua (GitHub Actions)
Las migraciones se ejecutan automáticamente en el entorno remoto cada vez que haces un `push` a las ramas `main` o `develop`, siempre que los cambios afecten a archivos en `packages/db-schema/migrations/*.sql`.

## 4. Crear una Nueva Migración
1. Crea un nuevo archivo: `packages/db-schema/migrations/00X_tu_nombre.sql`.
2. Escribe tu SQL (asegura idempotencia con `IF NOT EXISTS`).
3. Haz `git add .` y `git commit` de tu nuevo archivo.
4. Al hacer `push`, el sistema aplicará los cambios automáticamente.
