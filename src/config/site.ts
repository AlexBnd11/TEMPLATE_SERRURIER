/**
 * Configuration centralisée du site DSLR Serrurier La Rochelle
 * Modifiez ces valeurs pour personnaliser facilement toutes les pages.
 */

export const siteConfig = {
  // Informations de base
  name: 'DSLR Serrurier La Rochelle',
  legalName: 'DSLR Dépanneur Serrurier La Rochelle',
  tagline: 'Serrurier honnête, transparent et local à La Rochelle',
  description:
    'DSLR Dépanneur Serrurier La Rochelle : ouverture de porte sans casse, dépannage serrurerie d’urgence 7j/7 de 7h à minuit sur La Rochelle et CDA. Artisan certifié RNCP, devis gratuit et tarifs annoncés à l’avance.',

  // Localisation
  city: 'La Rochelle',
  cityPreposition: 'à',
  address: {
    street: '36 Rue Braille',
    postalCode: '17000',
    city: 'La Rochelle',
    full: '36 Rue Braille, 17000 La Rochelle',
    zone: 'La Rochelle & Communauté d’Agglomération (Aytré, Puilboreau, Lagord, Périgny, Dompierre-sur-Mer, etc.)',
    route: 'Interventions sur La Rochelle et toute la CDA',
  },
  coordinates: {
    // Coordonnées approximatives du centre de La Rochelle
    lat: 46.159,
    lng: -1.152,
  },

  // Contact
  phone: '0699551164',
  phoneFormatted: '06 99 55 11 64',
  whatsapp: '33699551164',
  email: 'contact@dslr.fr',

  // Horaires (urgence réelle 7j/7 de 7h à minuit)
  hours: {
    monday: '07:00 - 00:00',
    tuesday: '07:00 - 00:00',
    wednesday: '07:00 - 00:00',
    thursday: '07:00 - 00:00',
    friday: '07:00 - 00:00',
    saturday: '07:00 - 00:00',
    sunday: '07:00 - 00:00',
  },

  // Réseaux sociaux (à compléter)
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  // Google My Business
  gmb: {
    placeId: '',
    url: '',
  },

  // Statistiques (pour la section de confiance)
  stats: {
    yearsExperience: 3,
    doorsOpened: 600,
    averageRating: 4.9,
    averageInterventionTime: 25,
  },

  // Couleurs (peut être surchargé via CSS)
  colors: {
    primary: '#F4C542',
    primaryDark: '#D6A52F',
    primaryLight: '#FFE08A',
    dark: '#052548',
    darkLight: '#0a3562',
    darkLighter: '#0f4278',
  },

  // SEO
  seo: {
    defaultTitle: 'DSLR Serrurier La Rochelle - Dépanneur serrurier d’urgence honnête',
    defaultDescription:
      'Serrurier d’urgence honnête à La Rochelle. Ouverture de porte sans casse, dépannage serrurerie 7j/7 de 7h à minuit, tarifs annoncés à l’avance et devis gratuit. Artisan local certifié RNCP.',
    keywords: [
      'serrurier La Rochelle',
      'serrurier d’urgence La Rochelle',
      'ouverture de porte La Rochelle',
      'dépannage serrurier La Rochelle',
      'serrurier honnête La Rochelle',
      'serrurier pas cher La Rochelle',
      'serrurier 7j/7 La Rochelle',
      'serrurier local La Rochelle',
      'serrurier urgence La Rochelle',
      'ouverture porte claquée La Rochelle',
      'changement serrure La Rochelle',
      'renforcement anti-effraction La Rochelle',
      'dépannage après effraction La Rochelle',
      'Adrien Bonniard serrurier',
      'DSLR serrurier',
      'DSLR Dépanneur Serrurier La Rochelle',
    ],
  },

  // Artisan mis en avant
  owner: {
    name: 'Adrien BONNIARD',
    title: 'Artisan serrurier certifié RNCP',
  },
};

