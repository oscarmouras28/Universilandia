import { Storage } from '@google-cloud/storage';
import fs from 'fs';

// Ruta donde se monta el secreto
const keyFilePath = '/secrets/google/vodcast-access-service';

// Verificación en logs
console.log('[storage.ts] Verificando si el archivo de credenciales existe en:', keyFilePath);
console.log('[storage.ts] Existe el archivo?:', fs.existsSync(keyFilePath));

const storage = new Storage({
  keyFilename: keyFilePath,
});

const bucketName = 'universilandia-vodcast';

export async function getSignedUrl(filePath: string): Promise<string> {
  console.log('[getSignedUrl] Generando URL firmada para el archivo:', filePath);

  const options = {
    version: 'v4' as const,
    action: 'read' as const,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutos
  };

  try {
    const [url] = await storage
      .bucket(bucketName)
      .file(filePath)
      .getSignedUrl(options);

    console.log('[getSignedUrl] URL firmada generada:', url);
    return url;
  } catch (error) {
    console.error('[getSignedUrl] Error al generar URL firmada:', error);
    throw error;
  }
}
