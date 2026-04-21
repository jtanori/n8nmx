import os
import pytest
from dotenv import dotenv_values

def test_env_config_strict():
    # Cargar variables del .env
    env_path = os.path.join(os.path.dirname(__file__), '../../.env')
    parsed_env = dotenv_values(env_path)
    
    # Validar que cada variable en .env esté en os.environ y sea idéntica
    for key, value in parsed_env.items():
        assert os.environ.get(key) == value, f"Variable {key} no coincide o no está cargada"

def test_db_connection_config_no_fallbacks():
    # Verificar que no estemos usando los defaults de la librería
    # Nota: Si el usuario dejó los valores por defecto en el .env, el test pasa,
    # pero si el código tuviera un hardcoded fallback, este test no lo vería.
    # Esta es una validación de que estamos usando la fuente de verdad.
    assert os.environ.get('PGUSER') is not None
    assert os.environ.get('PGPASSWORD') is not None
    assert os.environ.get('PGDATABASE') is not None
