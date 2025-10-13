import { MetadataConfig } from '@/common/types/metadata.types';

/**
 * Web metadata configuration
 */
export const metadataConfig: MetadataConfig = {
  title: 'Vaultify ~ Next-gen toolkit for secure identifiers',
  shortTitle: 'Vaultify',
  description:
    'Generate secure UUIDs, passwords, and more with Vaultify. Your go-to tool for safe and unique identifiers. Free and easy to use!',
  keywords: ['vaultify', 'password generator', 'uuid generator', 'secure identifiers', 'free tool'],
  colors: {
    background: '#09090b',
    theme: '#09090b',
  },
};

/**
 * Function to get the environment url based on the environment
 */
export const getEnvUrl = (type: 'app'): string => {
  switch (type) {
    case 'app': {
      const url = process.env.NEXT_PUBLIC_APP_URL;

      if (!url) throw new Error('NEXT_PUBLIC_APP_URL is not defined in environment variables');

      return url;
    }
  }
};
