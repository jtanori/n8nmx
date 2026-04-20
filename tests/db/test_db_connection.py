import pytest
import os
from sqlalchemy import create_engine, text

def test_db_connection():
    # Arrange
    db_url = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@localhost:5432/{os.getenv('DB_NAME')}"
    
    # Act
    engine = create_engine(db_url)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        
    # Assert
    assert result.scalar() == 1
