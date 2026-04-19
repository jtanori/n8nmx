Skill: Workflow de Ingeniería (Git & TDD)
Este documento define el protocolo obligatorio para el desarrollo, pruebas y despliegue del proyecto Sonora Prospector Engine. El objetivo es garantizar un código libre de errores, una arquitectura portátil y un historial de cambios profesional.

1. Ciclo de Desarrollo TDD (Test-Driven Development)
No se permite escribir código de producción sin una prueba que justifique su existencia. Seguimos el ciclo Red-Green-Refactor.

Pasos del Proceso:
🔴 RED (Fallo):

Escribe un test unitario en la carpeta correspondiente (/tests).

Define el comportamiento esperado (ej. "La función debe descartar negocios fuera de Sonora").

Ejecuta el test. Debe fallar obligatoriamente.

🟢 GREEN (Paso):

Escribe la mínima cantidad de código necesaria para que el test pase.

No optimices todavía; solo haz que el test sea exitoso.

🔵 REFACTOR (Optimización):

Limpia el código, mejora nombres de variables y elimina redundancias.

Asegúrate de que todos los tests sigan pasando después de los cambios.

Herramientas por Capa:
Frontend (React/Next.js): Jest + React Testing Library.

Backend (Python): Pytest.

Backend (Go): go test.

2. Protocolo de Git Estricto (Git Flow Adaptado)
Estructura de Ramas:
main: Producción. Solo código 100% estable.

develop: Integración. Rama base para el desarrollo diario.

feature/[nombre]: Nuevas funcionalidades o nodos de automatización.

fix/[nombre]: Corrección de errores en develop o main.

Convención de Commits (Conventional Commits):
Los mensajes de commit deben seguir el formato: tipo(ámbito): descripción corta

feat: Nueva funcionalidad (ej. feat(n8n): add telegram notification node).

fix: Corrección de un bug.

test: Adición o modificación de pruebas (obligatorio en TDD).

docs: Cambios en documentación.

refactor: Mejora de código que no añade funciones ni arregla bugs.

3. Entorno Agnóstico y Portabilidad
El sistema debe ser capaz de ejecutarse en cualquier entorno (Local, Staging, Producción) simplemente modificando las variables de entorno.

Docker First: El comando docker-compose up -d debe levantar toda la infraestructura necesaria.

Variables de Entorno: Queda estrictamente prohibido el "hardcoding" de credenciales, IPs o URLs. Todo debe residir en el archivo .env.

Base de Datos Mínima: Usamos PostgreSQL sobre Alpine Linux para mantener un consumo de recursos inferior a 100MB de RAM en el contenedor de base de datos.

4. Checklist de Pull Request (PR)
Antes de fusionar cualquier feature a develop, se debe cumplir:

[ ] Todos los tests unitarios e integración pasan (Green).

[ ] El código cumple con el estándar de linting del proyecto.

[ ] No existen secretos o credenciales expuestas en los archivos.

[ ] La documentación de la API o del nodo de n8n ha sido actualizada.

[ ] El entorno sigue siendo portátil (se probó con un .env limpio).

Filosofía del Proyecto: "Hazlo funcionar, hazlo bien, hazlo rápido. En ese orden."
