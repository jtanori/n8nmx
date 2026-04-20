'use server';

import sql from '@/lib/db';

export async function getLeads() {
  try {
    const leads = await sql`
      SELECT 
        id, 
        business_name, 
        city, 
        relevance_score, 
        is_high_quality, 
        status 
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
