import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jgmacademy.crm',
  appName: 'JGM CRM',
  webDir: 'out',
  server: {
    url: 'https://jgm-crm.vercel.app',
    cleartext: true
  }
};

export default config;
