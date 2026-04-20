# Configuración de n8n para Sonora Prospector Engine

Esta guía detalla cómo configurar la instancia de n8n para que interactúe correctamente con el motor de base de datos de Sonora Prospector Engine.

## 1. Instalación de n8n
La forma recomendada es mediante Docker para mantener la portabilidad del stack.

```bash
docker run -d --name n8n \
  -p 5678:5678 \
  -e N8N_HOST=localhost \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=http \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

## 2. Conexión con PostgreSQL
Para que n8n pueda insertar los leads en tu base de datos:

1. **Credenciales:**
   - Abre n8n -> `Credentials` -> `Add Credential` -> `Postgres`.
   - **Host:** La IP del host donde corre Postgres o el nombre del servicio en Docker (si n8n está en la misma red).
   - **Port:** `5432`
   - **Database:** `prospector_db` (o el valor en tu `.env`)
   - **User/Password:** Configurados en tu archivo `.env`.

## 3. Configuración del Flujo (Importación)
1. Ve a `Workflows` -> `Import from file`.
2. Selecciona `packages/automation/sonora_prospector_flow.json`.
3. Una vez importado:
   - Revisa cada nodo: el nodo de **PostgreSQL** debe estar vinculado a las credenciales creadas en el paso 2.
   - Asegúrate de que el nodo de **Code** (Python) tenga instalada la librería `requests` si fuera necesario para llamadas externas.

## 4. Técnica de Persistencia (Upsert)
Para evitar leads duplicados, el nodo de Postgres debe configurarse así:

- **Operation:** `Upsert`
- **Table:** `leads`
- **Conflict Target:** `google_place_id`
- **Columns:** Asegúrate de mapear todos los campos del JSON de entrada con las columnas de la tabla.

## 5. Testing del Flujo
Para validar que n8n está funcionando:
1. Usa el nodo "HTTP Request" (Google Maps) con un dato de prueba.
2. Ejecuta el nodo de Python para ver el `relevance_score` calculado.
3. Verifica en el nodo de PostgreSQL que el lead aparece en la tabla ejecutando:
   ```bash
   docker exec -it sonora_engine_db psql -U admin -d prospector_db -c "SELECT * FROM leads;"
   ```
