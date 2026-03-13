# DSLR Serrurier La Rochelle – Template Astro

Ce dossier contient un mini site vitrine **Astro + Tailwind** optimisé pour le référencement local de **DSLR Dépanneur Serrurier La Rochelle**.

## Démarrage

- Installer les dépendances :

```bash
npm install
```

- Lancer le serveur de développement :

```bash
npm run dev
```

Le site sera disponible par défaut sur `http://localhost:4321/`.

## Structure principale

- `/` : Page d’accueil (urgence, ouverture de porte, arguments commerciaux).
- `/contact/` : Contact, urgence, WhatsApp, formulaire + carte Google Maps.
- `/prix/` : Page tarifs transparente, basée sur `src/config/services.ts`.
- `/faq/` : FAQ/Conseils avec schéma `FAQPage` optimisé SEO.
- `/mentions-legales/`, `/politique-de-confidentialite/`, `/parametres-des-cookies/` : Pages légales.

Toutes les informations éditables (adresse, téléphone, zones d’intervention, texte SEO…) sont centralisées dans `src/config/site.ts`.

