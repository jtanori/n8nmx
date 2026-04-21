# Guía de Ejecución Local (Workflow Híbrido)

Este proyecto utiliza un script orquestador para gestionar el entorno y los servicios de forma eficiente.

## 1. Script Orquestador (`scripts/init-dev.sh`)
Este script realiza tres tareas automáticamente:
1. Crea un enlace simbólico entre el archivo de entorno deseado (ej: `.env.remote`) y `apps/web/.env`.
2. Inicia la API de FastAPI en background.
3. Inicia el Dashboard de Next.js en foreground.

## 2. Cómo ejecutar el sistema
Ejecuta el script desde la raíz del proyecto:

### Entorno Default (.env)
```bash
./scripts/init-dev.sh
```

### Entorno Híbrido/Cloud (.env.remote)
Para conectar tu dashboard local a la base de datos y n8n en Railway:
```bash
./scripts/init-dev.sh .env.remote
```

## 3. Ventajas de este flujo
- **Consistencia:** Evita configuraciones duplicadas; una sola fuente de verdad (`.env`).
- **Limpieza:** No ensucia el código con copias de archivos.
- **Portabilidad:** Puedes crear nuevos perfiles de entorno (`.env.staging`, `.env.production`) y usarlos al instante con el mismo comando.
- **Seguridad:** Los archivos `.env` generados por el enlace están en el `.gitignore`.

---
*Para más detalles sobre los entornos, consulta `docs/ENV_SETUP.md`.*
