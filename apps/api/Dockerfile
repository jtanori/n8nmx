FROM python:3.9-slim AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM base AS builder
# Aquí se podrían realizar pasos de construcción adicionales si fueran necesarios

FROM base AS runner
WORKDIR /app
COPY . .
CMD ["python", "main.py"]
