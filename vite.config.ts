import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export const localAssetFallbacks: Record<string, string> = {
  'tutourbackground2.png': 'https://picsum.photos/seed/tutour-oaxaca-hero/1600/1000',
  'TuTourMapbackground.jpg': 'https://picsum.photos/seed/tutour-oaxaca-map/1600/900',
  'TuTourEventsimage.png': 'https://picsum.photos/seed/tutour-oaxaca-events/1600/900',
};

export const genmbAssetFallbackPlugin = (): Plugin => {
  const handler = (req: { url?: string }, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: () => void }, next: () => void) => {
    const pathname = (req.url || '').split('?')[0] || '';
    if (!pathname.startsWith('/api/apps/romcWH54d4SR/assets/')) {
      next();
      return;
    }

    const filename = decodeURIComponent(pathname.split('/').pop() || '');
    const fallbackUrl = localAssetFallbacks[filename] || `https://picsum.photos/seed/tutour-${encodeURIComponent(filename.replace(/\.[^.]+$/, '') || 'asset')}/1200/800`;

    res.statusCode = 302;
    res.setHeader('Location', fallbackUrl);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.end();
  };

  return {
    name: 'genmb-asset-fallbacks',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
};

export default defineConfig({
  plugins: [genmbAssetFallbackPlugin(), react(), tailwindcss()],
  build: {
    outDir: 'dist',
    minify: true,
  },
});
