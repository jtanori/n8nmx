'use server';

import pool from '@/lib/db';

export async function getLeads() {
  const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
  return result.rows;
}
