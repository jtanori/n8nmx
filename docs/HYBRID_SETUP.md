# Workflow Híbrido: Infraestructura Docker + App Local

Para evitar la sobrecarga del motor de Docker y acelerar el desarrollo, ejecutamos la infraestructura en contenedores y las aplicaciones en el host.

## 1. Infraestructura (Docker)
Levanta solo los servicios base:
```bash
docker compose up -d db n8n migrator
```

## 2. API (Host)
Ejecuta la API directamente en tu terminal:
```bash
cd apps/api
source venv/bin/activate
uvicorn src.main:app --reload --port 8000
```

## 3. Dashboard (Host)
Ejecuta el frontend directamente:
```bash
cd apps/web
APP_ENV=remote npm run dev
```

## 4. Ventajas
- **Hot Reload:** Los cambios en código se ven al instante.
- **Eficiencia:** Ahorro masivo de RAM/CPU al no compilar contenedores innecesariamente.
- **Depuración:** Puedes usar el debugger de tu editor directamente sobre el proceso.
