export interface MetadataConfig {
  title: string;
  shortTitle: string;
  /** Appended to the site title (homepage + link previews). */
  tagline: string;
  description: string;
  keywords: string[];
  /** Author shown in the metadata and the JSON-LD block. */
  author: {
    name: string;
    url: string;
  };
  repositoryUrl: string;
  colors: {
    background: string;
    theme: string;
  };
}

export interface AppConfig {
  urls: {
    /** Public origin of this app (canonical / OpenGraph / robots / sitemap). */
    appUrl: string;
  };
}
