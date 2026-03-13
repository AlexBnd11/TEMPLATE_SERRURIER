/**
 * Configuration des services de serrurerie proposés par DSLR
 */

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  price?: string;
}

export const services: Service[] = [
  {
    id: 'ouverture-porte-sans-casse',
    name: 'Ouverture de porte sans casse',
    shortDescription: 'Intervention rapide pour porte claquée ou clé perdue, sans abîmer votre serrure.',
    fullDescription:
      'Priorité absolue de DSLR : ouvrir votre porte sans casse, dès que possible et au meilleur coût. Adrien intervient sur portes simples, blindées, palières ou d’immeuble, avec des techniques non destructives pour préserver votre cylindre dès que c’est techniquement possible.',
    icon: 'key',
    features: [
      'Intervention express sur La Rochelle et toute la CDA',
      'Ouverture non destructive privilégiée à chaque fois que possible',
      'Tarifs annoncés avant toute intervention, devis confirmé sur place',
      'Prise en charge facilitée pour votre assurance habitation',
    ],
    price: 'À partir de 90 € TTC en journée (hors majoration nuit & jours fériés)',
  },
  {
    id: 'serrure-bloquee-perdue-cassee',
    name: 'Serrure bloquée, perdue ou cassée',
    shortDescription:
      'Diagnostic précis et remise en service de votre serrure sans changement inutile de matériel.',
    fullDescription:
      'Clé qui tourne dans le vide, cylindre grippé, clé cassée dans la serrure… Adrien recherche d’abord l’origine exacte du blocage pour réparer uniquement ce qui est nécessaire. Aucun remplacement de serrure ne vous sera imposé s’il existe une solution fiable moins coûteuse.',
    icon: 'key',
    features: [
      'Diagnostic sur place avant toute décision de remplacement',
      'Déblocage, extraction de clé, réglage de gâche et pênes',
      'Possibilité de réparation ou de remplacement partiel uniquement',
      'Compte-rendu clair pour votre dossier assurance',
    ],
    price: 'À partir de 110 € TTC en journée (hors pièces éventuelles)',
  },
  {
    id: 'remplacement-pose-serrure',
    name: 'Remplacement et pose de serrures',
    shortDescription: 'Cylindres et serrures toutes marques, adaptés à votre budget et à votre niveau de sécurité.',
    fullDescription:
      'Remplacement complet de serrure, changement de barillet, mise en sécurité après perte de clés… DSLR travaille avec les grandes marques de serrurerie (EURODIN, Vachette, Bricard, etc.) pour vous proposer la solution la plus pertinente entre sécurité, prix et compatibilité avec votre porte.',
    icon: 'shield',
    features: [
      'Serrures et cylindres toutes marques, standard et haute sécurité',
      'Conseil honnête sur le niveau de sécurité réellement utile',
      'Installation propre, réglages fins et tests avec vous',
      'Remise d’une facture détaillée pour l’assurance',
    ],
    price: 'À partir de 150 € TTC pose comprise (hors matériel haute sécurité)',
  },
  {
    id: 'renforcement-anti-effraction',
    name: 'Renforcement anti-effraction',
    shortDescription:
      'Solution globale pour retarder une tentative d’effraction et dissuader les cambrioleurs.',
    fullDescription:
      'Barres de sécurité, cornières anti-pince, bloque-rideaux, blindage de porte… Adrien étudie votre configuration (porte, huisseries, environnement) pour mettre en place un ensemble cohérent de protections mécaniques qui complètent efficacement votre assurance habitation.',
    icon: 'lockClosed',
    features: [
      'Audit sécurité complet de votre porte et de vos accès',
      'Installation de barres de sécurité, cornières et bloque-rideaux',
      'Solutions adaptées pour locaux commerciaux et logements',
      'Conseils pour optimiser votre prise en charge assurance',
    ],
    price: 'Devis personnalisé après visite sur place',
  },
  {
    id: 'depannage-apres-effraction',
    name: 'Dépannage après tentative d’effraction',
    shortDescription: 'Mise en sécurité immédiate de votre logement après cambriolage ou tentative.',
    fullDescription:
      'Après une tentative d’effraction, l’urgence est double : sécuriser vos accès et vous accompagner dans vos démarches. DSLR intervient rapidement pour remettre votre porte en état de fermeture et vous fournit un rapport détaillé pour l’assurance et, si besoin, pour le dépôt de plainte.',
    icon: 'warning',
    features: [
      'Sécurisation immédiate de la porte et de la serrure',
      'Remplacement provisoire ou définitif des éléments endommagés',
      'Compte-rendu d’intervention pour votre assureur',
      'Conseils sur les renforcements à prévoir pour l’avenir',
    ],
    price: 'Sur devis, selon dégâts constatés et matériel à remplacer',
  },
  {
    id: 'accompagnement-assurance',
    name: 'Aide à la déclaration assurance',
    shortDescription:
      'Accompagnement complet pour vos démarches assurance après sinistre ou tentative d’effraction.',
    fullDescription:
      'Bon libellé d’intervention, photos, pièces remplacées conservées si nécessaire… Adrien connaît les attentes des assureurs et vous aide à constituer un dossier solide pour maximiser vos chances de prise en charge, sans sur-facturation ni prestations inutiles.',
    icon: 'documentText',
    features: [
      'Facture et devis détaillés, compréhensibles par les assurances',
      'Explications claires de ce qui est couvert ou non',
      'Conseils pour vos démarches (délais, pièces à fournir, etc.)',
      'Disponible pour répondre aux questions de votre assureur si besoin',
    ],
    price: 'Inclus avec les interventions concernées',
  },
];

