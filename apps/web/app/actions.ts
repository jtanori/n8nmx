'use server';

import sql from '@/lib/db';
import { TransactionSql } from 'postgres';

interface SearchQuery {
  id: string;
  priority_order: number;
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

export async function updateQueuePriority(queries: SearchQuery[]) {
  try {
    // Usamos una transacción para asegurar que todas las actualizaciones se completen
    await sql.begin(async (sql: TransactionSql) => {
      for (const query of queries) {
        await sql`
          UPDATE search_queries 
          SET priority_order = ${query.priority_order} 
          WHERE id = ${query.id}
        `;
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating queue priority:', error);
    return { success: false, error: 'Error al actualizar el orden de prioridad' };
  }
}
