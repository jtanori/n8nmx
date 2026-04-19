---
name: sonora-engine
description: Protocolo de ingeniería para Sonora Prospector Engine. Úsalo para garantizar el cumplimiento de TDD, Git Flow, y estándares de despliegue en entornos agnósticos.
---

# Sonora Prospector Engine - Engineering Workflow

Este skill automatiza el protocolo de desarrollo del proyecto Sonora Prospector Engine.

## Ciclo de Desarrollo TDD
1. **RED:** Escribe test unitario, verifica fallo.
2. **GREEN:** Escribe el mínimo código para pasar el test.
3. **REFACTOR:** Limpia código.

## Git Flow Estricto
Commits convencionales obligatorios: `feat`, `fix`, `test`, `docs`, `refactor`.

## Entorno Agnóstico
Todo el desarrollo debe ser portable vía Docker Compose (`docker-compose up -d`). Uso estricto de `.env`.

## Checklist de PR
Antes de fusionar (feature -> develop), valida:
[ ] Tests (Red-Green-Refactor)
[ ] Linting
[ ] No secretos
[ ] Doc actualizada
[ ] Portabilidad (`.env` limpio)

