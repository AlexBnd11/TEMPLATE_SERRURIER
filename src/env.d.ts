/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  /** URL du backoffice WordPress, ex: https://backoffice.dslr.fr */
  readonly CMS_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

