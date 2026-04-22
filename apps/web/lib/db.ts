import postgres from 'postgres';

const requiredEnvVars = ['PGUSER', 'PGPASSWORD', 'PGDATABASE', 'DB_HOST', 'DB_PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`❌ Error de Configuración: Variables críticas faltantes: ${missingVars.join(', ')}`);
}

const sql = postgres(process.env.DATABASE_URL!, {
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  database: process.env.PGDATABASE!,
  username: process.env.PGUSER!,
  password: process.env.PGPASSWORD!,
});

export default sql;
