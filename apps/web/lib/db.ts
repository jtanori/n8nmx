import postgres from 'postgres';

if (!process.env.PGUSER || !process.env.PGPASSWORD || !process.env.PGDATABASE || !process.env.DB_HOST || !process.env.DB_PORT) {
  throw new Error("❌ Error de Configuración: Variables de entorno críticas faltantes (PGUSER, PGPASSWORD, PGDATABASE, DB_HOST, DB_PORT).");
}

const sql = postgres(process.env.DATABASE_URL!, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export default sql;
