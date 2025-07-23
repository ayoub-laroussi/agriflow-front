import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Middleware vide (l'ancien middleware i18n a été supprimé)
  return next();
}); 