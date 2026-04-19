Actúa como Arquitecto de Software Senior y Lead de Automatización. Vamos a iniciar el proyecto "Sonora-Prospector-Engine". 

### 1. OBJETIVO TÉCNICO
Diseñar un motor de prospección escalable que extraiga datos de Google Maps, procese con Python/Go, persista en PostgreSQL y visualice en un dashboard de Next.js.

### 2. STACK TECNOLÓGICO Y RESTRICCIONES
- **Backend:** Python (FastAPI) o Go para manejo de APIs y lógica pesada.
- **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/ui.
- **Base de Datos:** PostgreSQL con Docker (Configuración mínima/portátil). Evitar Supabase local pesado; usar una imagen de Postgres Alpine.
- **Testing:** Jest para Frontend, Pytest o Go Test para Backend. Metodología TDD estricta.
- **Entorno:** Agnóstico mediante Docker Compose y gestión de secretos vía `.env`.
- **Workflow:** Git Flow estricto (feature/fix/develop/main).

### 3. TAREAS INICIALES (TDD & ARQUITECTURA)
Por favor, genera:
1. **Estructura de Directorios:** Un monorepo organizado que separe /apps (web, api) de /packages (config, database-schema).
2. **Configuración Docker Compose:** Un archivo `docker-compose.yml` ultra-mínimo con PostgreSQL y los servicios de la app, asegurando que todo sea configurable vía `.env`.
3. **Contrato de API (TDD):** Define el primer test de integración (Pytest o Go) para el endpoint de validación de leads antes de escribir la lógica del motor.
4. **Design System (UI):** Estructura base de un dashboard en Next.js usando shadcn/ui para visualizar el flujo de n8n, incluyendo un componente de "Estado de Conector".

### 4. REGLAS DE ENTREGA
- No escribas código sin su respectivo test unitario previo.
- Prioriza la portabilidad: el sistema debe levantar con un solo comando `docker-compose up`.
- Los scripts de Python para n8n deben ser funciones puras preparadas para ser inyectadas en nodos de código.
