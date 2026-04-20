import pytest
import os
from sqlalchemy import create_engine, text

def test_cascade_delete_search_locations():
    # Arrange
    db_url = f"postgresql://{os.getenv('PGUSER')}:{os.getenv('PGPASSWORD')}@localhost:5432/{os.getenv('PGDATABASE')}"
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        # Insertar una búsqueda y una ubicación
        search_id_query = conn.execute(text("INSERT INTO search_queries (term) VALUES ('test') RETURNING id"))
        search_id = search_id_query.scalar()
        
        conn.execute(text(f"INSERT INTO search_locations (search_id, city_name) VALUES ('{search_id}', 'Hermosillo')"))
        conn.commit()

        # Act: Eliminar la búsqueda
        conn.execute(text(f"DELETE FROM search_queries WHERE id = '{search_id}'"))
        conn.commit()

        # Assert: Verificar que la ubicación se borró
        result = conn.execute(text(f"SELECT count(*) FROM search_locations WHERE search_id = '{search_id}'"))
        assert result.scalar() == 0
