'use server';

import sql from '@/lib/db';

interface SearchQuery {
  id: string;
  priority_order: number;
}

export async function updateQueuePriority(queries: SearchQuery[]) {
  try {
    // Usamos una transacción para asegurar que todas las actualizaciones se completen
    await sql.begin(async sql => {
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
