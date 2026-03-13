/**
 * Témoignages clients pour DSLR Serrurier La Rochelle
 * (contenu exemple optimisé SEO, à remplacer par de vrais avis Google)
 */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Camille R.',
    location: 'La Rochelle - Centre',
    rating: 5,
    text: "Porte claquée en pleine soirée, Adrien est arrivé en 20 minutes et a ouvert sans rien casser. Tarif annoncé au téléphone et respecté, avec facture pour l'assurance. Serrurier honnête et très rassurant.",
  },
  {
    id: '2',
    name: 'Thomas L.',
    location: 'Aytré',
    rating: 5,
    text: "Serrure bloquée sur notre porte d'entrée. Diagnostic clair, aucune vente forcée, il a réparé sans tout changer alors que d'autres proposaient un remplacement complet. Un vrai serrurier de confiance à La Rochelle.",
  },
  {
    id: '3',
    name: 'Nadia B.',
    location: 'Lagord',
    rating: 5,
    text: "Après une tentative d'effraction, Adrien est intervenu très vite pour sécuriser la porte et nous expliquer les démarches avec l'assurance. Travail propre, explications claires, on se sent vraiment accompagnés.",
  },
  {
    id: '4',
    name: 'Julien M.',
    location: 'Périgny',
    rating: 5,
    text: "Ouverture de porte le dimanche matin, devis détaillé avant intervention, aucune mauvaise surprise. On sent qu'il privilégie vraiment la transparence. Je recommande DSLR à tous ceux qui cherchent un serrurier sérieux.",
  },
];

