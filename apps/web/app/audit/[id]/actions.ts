'use server';

import sql from '@/lib/db';

export async function getAuditDetails(searchId: string) {
  try {
    const leads = await sql`
      SELECT id, business_name, relevance_score, is_high_quality 
      FROM leads 
      WHERE search_id = ${searchId}
    `;
    return leads;
  } catch (error) {
    console.error('Error fetching audit details:', error);
    return [];
  }
}
