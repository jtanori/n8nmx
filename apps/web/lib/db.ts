import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || process.env.PGDATABASE,
  username: process.env.PGUSER || process.env.DB_USER,
  password: process.env.PGPASSWORD || process.env.DB_PASS || process.env.DB_PASSWORD,
});

export default sql;
