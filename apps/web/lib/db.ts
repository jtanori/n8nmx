import postgres from 'postgres';

// Solo validamos si estamos en tiempo de ejecución, NO durante el build
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

const requiredEnvVars = ['PGUSER', 'PGPASSWORD', 'PGDATABASE', 'DB_HOST', 'DB_PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

// Si estamos en ejecución y faltan variables, lanzamos error
if (missingVars.length > 0 && !isBuild) {
  throw new Error(`❌ Error de Configuración: Variables críticas faltantes: ${missingVars.join(', ')}`);
}

// Si estamos en build, devolvemos un mock o null para evitar errores de conexión
const sql = isBuild 
  ? ({} as any) 
  : postgres(process.env.DATABASE_URL!, {
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT!),
      database: process.env.PGDATABASE!,
      username: process.env.PGUSER!,
      password: process.env.PGPASSWORD!,
    });

export default sql;
