import pytest
import requests

def test_n8n_webhook_payload():
    # Simulamos el payload que enviaría el nodo de Python en n8n
    payload = {
        "google_place_id": "sonora_test_123",
        "business_name": "Tacos El Gran Sabor",
        "city": "Puerto Peñasco",
        "relevance_score": 0.95,
        "is_high_quality": True
    }
    # Verificamos si nuestra API o DB acepta el formato
    # Nota: Este test fallará ya que el endpoint aún no existe
    response = requests.post("http://localhost:8000/webhook/ingest", json=payload)
    assert response.status_code == 201
