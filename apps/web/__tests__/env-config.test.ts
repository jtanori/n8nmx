import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

describe("Environment Configuration Validation (Strict)", () => {
  it("should match process.env values exactly with .env file", () => {
    // Determinar qué .env cargar (similar a nuestra lógica de apps)
    const envFile = process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : '.env';
    const envPath = path.resolve(__dirname, '../../../', envFile);
    
    // Leer el archivo crudo y parsearlo
    const envContent = fs.readFileSync(envPath, 'utf8');
    const parsedEnv = dotenv.parse(envContent);

    // Comparar cada variable del archivo con el process.env
    Object.keys(parsedEnv).forEach((key) => {
      // Ignorar NODE_ENV ya que es controlado por el test runner
      if (key !== 'NODE_ENV') {
        expect(process.env[key]).toBe(parsedEnv[key]);
      }
    });
  });
});
