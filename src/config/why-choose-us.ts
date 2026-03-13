/**
 * Section "Pourquoi nous choisir" pour DSLR Serrurier La Rochelle
 */

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
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
    id: 'local',
    title: 'Artisan local, pas de call-center',
    description:
      'Vous échangez directement avec Adrien, serrurier indépendant basé à La Rochelle, pas avec une plateforme distante qui sous-traite les interventions.',
    icon: 'mapPin',
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
      'Une vraie formation reconnue, des techniques propres et conformes aux attentes des assurances. Un gage de sérieux et de qualité.',
    icon: 'shieldCheck',
  },
];

