import { wpFetch } from './client';

// ─────────────────────────────────────────────────────────────
// Types WordPress REST API internes
// ─────────────────────────────────────────────────────────────

/**
 * ACF Image field peut retourner :
 * - un objet { url, alt, ... } si "Type de retour : Tableau"
 * - une string URL si "Type de retour : URL"
 * - un number (ID) si "Type de retour : ID" (non supporté, ignoré)
 * - false / null si vide
 */
type WpAcfImage = { url: string; alt?: string } | string | number | false | null | undefined;

type WpPage<ACF extends object = Record<string, unknown>> = {
  id: number;
  slug: string;
  acf: ACF;
};

type WpPost<ACF extends object = Record<string, unknown>> = {
  id: number;
  title: { rendered: string };
  menu_order: number;
  acf: ACF;
};

// ─────────────────────────────────────────────────────────────
// Shapes des champs ACF (correspondent aux field groups WordPress)
// ─────────────────────────────────────────────────────────────

/** Page slug: parametres-site */
type AcfSiteSettings = {
  texte_presentation_footer?: string;
};

/** Page slug: accueil-hero */
type AcfHero = {
  titre?: string;
  sous_titre?: string;
  label_bouton?: string;
  url_bouton?: string;
  image_fond?: WpAcfImage;
  logo?: WpAcfImage;
};

/** Page slug: pourquoi-nous */
type AcfWhyHeader = {
  titre?: string;
  description?: string;
};

/** CPT: why_item */
type AcfWhyItem = {
  description?: string;
  /** Image PNG de l'icône (champ ACF Image, retour: Tableau) */
  icone_png?: WpAcfImage;
  image?: WpAcfImage;
};

/** CPT: service_item */
type AcfServiceItem = {
  description_courte?: string;
  prix?: string;
  image?: WpAcfImage;
  /** Image PNG de l'icône (champ ACF Image, retour: Tableau) */
  icone_png?: WpAcfImage;
};

/** Page slug: stats-accueil */
type AcfStats = {
  valeur_1?: string;
  label_1?: string;
  valeur_2?: string;
  label_2?: string;
  valeur_3?: string;
  label_3?: string;
  valeur_4?: string;
  label_4?: string;
};

/** CPT: faq_item */
type AcfFaqItem = {
  reponse?: string;
};

/** CPT: tarif_item */
type AcfTarifItem = {
  description_courte?: string;
  description_complete?: string;
  prix?: string;
  unite?: string;
  mise_en_avant?: boolean;
  /** Une caractéristique par ligne */
  caracteristiques?: string;
};

// ─────────────────────────────────────────────────────────────
// Types publics (inchangés — compatibles avec tous les composants)
// ─────────────────────────────────────────────────────────────

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  phone?: string;
  phoneFormatted?: string;
  email?: string;
  address?: {
    full?: string;
    zone?: string;
  };
  footerText?: string;
  legalText?: string;
};

export type HeroContent = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  logo?: {
    url: string;
    alternativeText?: string;
  } | null;
};

export type WhyChooseUsItem = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  image?: {
    url: string;
    alternativeText?: string;
  } | null;
};

export type WhyChooseUsContent = {
  title?: string;
  description?: string;
  items: WhyChooseUsItem[];
};

export type Tarif = {
  id: number;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  price?: string | null;
  unit?: string | null;
  isFeatured?: boolean;
  features?: string[] | null;
};

export type ServiceItem = {
  id: number;
  title: string;
  shortDescription?: string;
  price?: string | null;
  image?: { url: string; alternativeText?: string } | null;
  /** URL du PNG de l'icône (fond transparent) */
  iconUrl?: string | null;
};

export type StatItem = { valeur: string; label: string };

export type StatsContent = {
  stat1?: StatItem;
  stat2?: StatItem;
  stat3?: StatItem;
  stat4?: StatItem;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  order?: number | null;
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Normalise un champ Image ACF (formats "Tableau" et "URL") */
function normalizeImage(img: WpAcfImage): { url: string; alternativeText?: string } | null {
  if (!img) return null;
  if (typeof img === 'string' && img.startsWith('http')) return { url: img, alternativeText: '' };
  if (typeof img === 'object' && 'url' in img && img.url) return { url: img.url, alternativeText: img.alt ?? '' };
  return null;
}

/**
 * Résout un champ Image ACF quel que soit son format de retour.
 * Si "Type de retour : ID", fait une requête supplémentaire au endpoint /media/{id}.
 * Async — à utiliser dans les query functions, pas dans normalizeImage.
 */
async function resolveAcfImage(
  img: WpAcfImage,
): Promise<{ url: string; alternativeText?: string } | null> {
  if (!img) return null;
  // Retour "Tableau" ou "URL" → résolution synchrone
  const sync = normalizeImage(img);
  if (sync) return sync;
  // Retour "ID" → on résout via l'API media
  if (typeof img === 'number' && img > 0) {
    try {
      const media = await wpFetch<{ source_url: string; alt_text?: string }>(
        `/wp/v2/media/${img}?_fields=source_url,alt_text`,
      );
      if (media?.source_url) return { url: media.source_url, alternativeText: media.alt_text ?? '' };
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * WP REST renvoie les titres avec des entités HTML (&amp; &rsquo; etc.).
 * On les décode pour l'affichage.
 */
function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&nbsp;/g, '\u00A0')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

/** Récupère les champs ACF d'une page WordPress par son slug */
async function getPageAcf<ACF extends object>(slug: string): Promise<ACF | null> {
  const pages = await wpFetch<WpPage<ACF>[]>(
    `/wp/v2/pages?slug=${slug}&_fields=id,slug,acf`,
  );
  if (!Array.isArray(pages) || pages.length === 0) return null;
  return pages[0].acf ?? null;
}

// ─────────────────────────────────────────────────────────────
// Requêtes publiques
// ─────────────────────────────────────────────────────────────

/**
 * Texte du footer (et autres réglages globaux si ajoutés plus tard).
 * Page WP slug: parametres-site
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const acf = await getPageAcf<AcfSiteSettings>('parametres-site');
  if (!acf) return null;
  return {
    siteName: '',
    footerText: acf.texte_presentation_footer,
  };
}

/**
 * Contenu de la section Hero.
 * Page WP slug: accueil-hero
 */
export async function getHero(): Promise<HeroContent | null> {
  const acf = await getPageAcf<AcfHero>('accueil-hero');
  if (!acf) return null;
  const [backgroundImage, logo] = await Promise.all([
    resolveAcfImage(acf.image_fond ?? null),
    resolveAcfImage(acf.logo ?? null),
  ]);
  return {
    title: acf.titre,
    subtitle: acf.sous_titre,
    ctaLabel: acf.label_bouton,
    ctaUrl: acf.url_bouton,
    backgroundImage,
    logo,
  };
}

/**
 * Titre/description de la section + items "Pourquoi nous choisir".
 * Page WP slug: pourquoi-nous
 * CPT WP: why_item (un post = un item, ordonné par menu_order)
 */
export async function getWhyChooseUs(): Promise<WhyChooseUsContent | null> {
  const [headerAcf, items] = await Promise.all([
    getPageAcf<AcfWhyHeader>('pourquoi-nous'),
    wpFetch<WpPost<AcfWhyItem>[]>(
      '/wp/v2/why_item?per_page=20&orderby=menu_order&order=asc&_fields=id,title,menu_order,acf',
    ),
  ]);

  if (!headerAcf && (!Array.isArray(items) || items.length === 0)) return null;

  const rawItems = Array.isArray(items) ? items : [];

  const resolvedItems = await Promise.all(
    rawItems.map(async (post) => ({
      id: String(post.id),
      title: decodeHtml(post.title.rendered),
      description: post.acf.description ?? '',
      icon: (await resolveAcfImage(post.acf.icone_png))?.url ?? null,
      image: await resolveAcfImage(post.acf.image ?? null),
    })),
  );

  return {
    title: headerAcf?.titre,
    description: headerAcf?.description,
    items: resolvedItems,
  };
}

/**
 * Liste des tarifs.
 * CPT WP: tarif_item (un post = un tarif, ordonné par menu_order)
 * Le champ "caracteristiques" est un textarea avec une caractéristique par ligne.
 */
export async function getTarifs(): Promise<Tarif[]> {
  const posts = await wpFetch<WpPost<AcfTarifItem>[]>(
    '/wp/v2/tarif_item?per_page=100&orderby=menu_order&order=asc&_fields=id,title,menu_order,acf',
  );
  if (!Array.isArray(posts)) return [];
  return posts.map((post) => ({
    id: post.id,
    title: decodeHtml(post.title.rendered),
    shortDescription: post.acf.description_courte,
    fullDescription: post.acf.description_complete,
    price: post.acf.prix || null,
    unit: post.acf.unite || null,
    isFeatured: post.acf.mise_en_avant ?? false,
    features: post.acf.caracteristiques
      ? post.acf.caracteristiques
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
      : null,
  }));
}

/**
 * Liste des services.
 * CPT WP: service_item (un post = un service, ordonné par menu_order)
 */
export async function getServices(): Promise<ServiceItem[]> {
  const posts = await wpFetch<WpPost<AcfServiceItem>[]>(
    '/wp/v2/service_item?per_page=20&orderby=menu_order&order=asc&_fields=id,title,menu_order,acf',
  );
  if (!Array.isArray(posts)) return [];

  return Promise.all(
    posts.map(async (post) => ({
      id: post.id,
      title: decodeHtml(post.title.rendered),
      shortDescription: post.acf.description_courte,
      price: post.acf.prix || null,
      image: await resolveAcfImage(post.acf.image ?? null),
      iconUrl: (await resolveAcfImage(post.acf.icone_png))?.url ?? null,
    })),
  );
}

/**
 * Chiffres clés (stats).
 * Page WP slug: stats-accueil
 */
export async function getStats(): Promise<StatsContent | null> {
  const acf = await getPageAcf<AcfStats>('stats-accueil');
  if (!acf) return null;
  return {
    stat1: acf.valeur_1 ? { valeur: acf.valeur_1, label: acf.label_1 ?? '' } : undefined,
    stat2: acf.valeur_2 ? { valeur: acf.valeur_2, label: acf.label_2 ?? '' } : undefined,
    stat3: acf.valeur_3 ? { valeur: acf.valeur_3, label: acf.label_3 ?? '' } : undefined,
    stat4: acf.valeur_4 ? { valeur: acf.valeur_4, label: acf.label_4 ?? '' } : undefined,
  };
}

/**
 * Liste des questions/réponses FAQ.
 * CPT WP: faq_item (un post = une FAQ, ordonné par menu_order)
 * Titre du post WP = question. Champ ACF "reponse" = réponse.
 */
export async function getFaqList(): Promise<Faq[]> {
  const posts = await wpFetch<WpPost<AcfFaqItem>[]>(
    '/wp/v2/faq_item?per_page=100&orderby=menu_order&order=asc&_fields=id,title,menu_order,acf',
  );
  if (!Array.isArray(posts)) return [];
  return posts.map((post, index) => ({
    id: post.id,
    question: decodeHtml(post.title.rendered),
    answer: post.acf.reponse ?? '',
    order: post.menu_order ?? index,
  }));
}
