'use server';

import sql from '@/lib/db';

interface Location {
  city_name: string;
  lat: number;
  lng: number;
  radius: number;
}

interface SearchData {
  term: string;
  locations: Location[];
}

export async function getLeads() {
  try {
    const leads = await sql`
      SELECT id, business_name, city, relevance_score, is_high_quality, sales_suggestions 
      FROM leads 
      ORDER BY created_at DESC 
      LIMIT 50
    `;
    return leads;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function createRegionalSearch(searchData: SearchData) {
  try {
    await sql.begin(async (sql) => {
      // 1. Insertar la búsqueda
      const [searchQuery] = await sql`
        INSERT INTO search_queries (term, is_executed)
        VALUES (${searchData.term}, FALSE)
        RETURNING id
      `;

      // 2. Insertar ubicaciones
      for (const loc of searchData.locations) {
        await sql`
          INSERT INTO search_locations (search_id, city_name, lat, lng, radius)
          VALUES (${searchQuery.id}, ${loc.city_name}, ${loc.lat}, ${loc.lng}, ${loc.radius})
        `;
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating regional search:', error);
    return { success: false, error: 'Error al crear la búsqueda' };
  }
}
