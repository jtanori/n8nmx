'use server';

import sql from '@/lib/db';

export async function getLeadDetails(leadId: string) {
  try {
    const leads = await sql`
      SELECT id, business_name, city, relevance_score, is_high_quality, sales_suggestions 
      FROM leads 
      WHERE id = ${leadId}
    `;
    return leads[0] || null;
  } catch (error) {
    console.error('Error fetching lead details:', error);
    return null;
  }
}
