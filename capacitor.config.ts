import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.sakuracentsbuddy',
  appName: 'sakura-cents-buddy',
  webDir: 'dist',
  server: {
    url: 'https://8d1c49b7-ce65-41ca-8e70-eee5839f7bb9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
