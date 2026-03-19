const WP_BASE_URL = import.meta.env.CMS_BASE_URL;

if (!WP_BASE_URL) {
  console.warn('[CMS] CMS_BASE_URL is not defined. Set it to https://backoffice.dslr.fr');
}

/**
 * Fetches a WordPress REST API endpoint.
 * Données récupérées au build (SSG) → aucun appel en runtime côté client.
 */
export async function wpFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (!WP_BASE_URL) {
    throw new Error(
      '[CMS] CMS_BASE_URL is not defined. Add CMS_BASE_URL=https://backoffice.dslr.fr to your .env',
    );
  }

  const base = WP_BASE_URL.replace(/\/$/, '');
  const url = `${base}/wp-json${path}`;

  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`[CMS] ${response.status} ${response.statusText} — ${url}\n${text}`);
  }

  return response.json() as Promise<T>;
}
