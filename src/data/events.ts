export type EventCategory =
  | 'Medicina Laboratorial'
  | 'Autoimunidade'
  | 'Bioquímica Clínica'
  | 'Hematologia'
  | 'Coagulação e Hemostase'
  | 'Imunologia'
  | 'Microbiologia / Infeção'
  | 'Genética Molecular'
  | 'Qualidade';

export type MedLabEvent = {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  dateLabel: string;
  location: string;
  format: 'Presencial' | 'Online' | 'Híbrido';
  type: string;
  category: EventCategory;
  description: string;
  url?: string;
  featured?: boolean;
};

export const events: MedLabEvent[] = [
  {
    id: 'sph-formacao-avancada-hematologia-2025-2027',
    title: 'Programa de Formação Avançada em Hematologia',
    organization: 'Sociedade Portuguesa de Hematologia',
    startDate: '2025-09-01',
    endDate: '2027-07-31',
    dateLabel: 'Setembro 2025 – Julho 2027',
    location: 'Online',
    format: 'Online',
    type: 'Programa de formação',
    category: 'Hematologia',
    description:
      'Programa de formação avançada composto por sessões semanais online gratuitas destinadas à atualização científica em Hematologia.',
    url: 'https://sph.org.pt',
    featured: true,
  },
  {
    id: 'reuniao-anual-sph-2026',
    title: 'Reunião Anual da Sociedade Portuguesa de Hematologia 2026',
    organization: 'Sociedade Portuguesa de Hematologia',
    startDate: '2026-11-05',
    endDate: '2026-11-07',
    dateLabel: '5–7 Novembro 2026',
    location: 'Centro de Congressos de Lisboa, Portugal',
    format: 'Presencial',
    type: 'Reunião científica presencial',
    category: 'Hematologia',
    description: 'Reunião científica anual da Sociedade Portuguesa de Hematologia.',
    url: 'https://sph.org.pt',
    featured: true,
  },
];
{
  id: 'actualizacion-medicina-personalizada-semedlab-2026',
  title: 'Actualización en Medicina Personalizada',
  organization: 'SEMEDLAB - Sociedad Española de Medicina de Laboratorio',
  startDate: '2026-10-01',
  endDate: '2027-06-15',
  dateLabel: '1 Outubro 2026 – 15 Junho 2027',
  location: 'Online',
  format: 'Online',
  type: 'Curso avançado online',
  category: 'Genética Molecular',
  description: 'Curso avançado dedicado à medicina personalizada e de precisão. Inclui 8 módulos especializados sobre genética, biomarcadores, diagnóstico molecular e aplicações clínicas da medicina personalizada, com fórum de discussão entre participantes e especialistas.',
  url: 'https://formacion.semedlab.es',
  featured: true,
},
];
