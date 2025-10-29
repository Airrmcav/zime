import compress from 'koa-compress';
import * as zlib from 'zlib';

// Middleware de compresión para Koa (usado por Strapi)
const compressionMiddleware = (config, { strapi }) => {
  return compress({
    threshold: 2048, // Tamaño mínimo para comprimir (2kb)
    gzip: {
      flush: zlib.Z_SYNC_FLUSH
    },
    deflate: {
      flush: zlib.Z_SYNC_FLUSH
    },
    br: false // Desactivar brotli (opcional)
  });
};

export default compressionMiddleware;
