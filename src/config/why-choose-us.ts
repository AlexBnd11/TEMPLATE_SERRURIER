/**
 * Section "Pourquoi nous choisir" pour DSLR Serrurier La Rochelle
 */

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  /** Chemin vers une image (ex. logo certification) à afficher à la place de l’icône. */
  image?: string;
}

export const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    id: 'honnetete',
    title: 'Serrurier honnête et transparent',
    description:
      'Pas de sur-facturation, pas de changement de serrure inutile. Les tarifs sont annoncés à l’avance et confirmés sur place avant toute intervention.',
    icon: 'scale',
  },
  {
    id: 'urgence',
    title: 'Urgence 7j/7 de 7h à minuit',
    description:
      'Vraie plage d’urgence, adaptée à la vie réelle : interventions rapides sur La Rochelle et la CDA, souvent en moins de 30 minutes.',
    icon: 'clock',
  },
  {
    id: 'certification',
    title: 'Serrurier certifié RNCP',
    description:
      "Une formation RNCP reconnue par l'État garantit des techniques propres et conformes aux attentes des assurances. Adrien a suivi ce parcours exigeant : compétences vérifiées, travail soigné et facturation lisible pour vos dossiers sinistre. Un gage de sérieux et de qualité pour vos ouvertures de porte et dépannages à La Rochelle.",
    image: '/logo_RNCP.png',
  },
];

