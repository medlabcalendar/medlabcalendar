import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  CalendarDays,
  Search,
  ExternalLink,
  Microscope,
  Filter,
  CheckCircle2,
  HeartHandshake,
  ClipboardList,
  Download,
  Archive,
  ChevronLeft,
  ChevronRight,
  Dna,
  Droplets,
  ShieldCheck,
  FlaskConical,
  Ambulance,
  BarChart3,
  Lightbulb,
  TestTube2
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc22SEwuG9LJnLsQ0tgRrJA9zx2Fsr7cZ6iA9g06qRnemOxVw/viewform'

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

const fallbackEvents = [
  {
    "title": "9º Encontro Nacional de Diagnóstico Pré-Natal",
    "date": "2026/06/12 - 2026/06/13",
    "category": "Genética",
    "type": "Encontro Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Comissão Nacional de Diagnóstico Pré-Natal",
    "link": "https://www.medlabcalendar.vercel.app",
    "region": "Portugal",
    "description": "Encontro nacional focado nas atualizações científicas e diretrizes em diagnóstico pré-natal."
  },
  {
    "title": "Webinar: Inteligência Artificial no Laboratório Clínico",
    "date": "2026/02/26",
    "category": "Inovação",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "Sociedade Portuguesa de Medicina Laboratorial",
    "link": "https://www.medlabcalendar.vercel.app",
    "region": "Online",
    "description": "Discussão sobre o impacto, desafios e futuro da inteligência artificial na rotina do laboratório clínico."
  },
  {
    "title": "Curso Prático de Citometria de Fluxo Hematológica",
    "date": "05-06 Março 2026",
    "category": "Hematologia",
    "type": "Curso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Consultar Organização",
    "link": "https://sph.org.pt/",
    "region": "Portugal",
    "description": "Formação prática voltada para a análise e interpretação de painéis em citometria de fluxo aplicada à hematologia."
  },
  {
    "title": "12º Congresso Nacional de Medicina Laboratorial",
    "date": "19-21 Março 2026",
    "category": "Medicina Laboratorial",
    "type": "Congresso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SPML",
    "link": "https://spml.pt/",
    "region": "Portugal",
    "description": "O principal congresso nacional dedicado às análises clínicas, patologia clínica e medicina laboratorial."
  },
  {
    "title": "Webinar: Atualização em Marcadores Cardíacos",
    "date": "2026/04/09",
    "category": "Bioquímica Clínica",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Revisão das novas diretrizes globais sobre o uso de troponinas ultrassensíveis e outros biomarcadores cardíacos."
  },
  {
    "title": "Jornadas de Primavera de Doenças Infeciosas",
    "date": "23-24 Abril 2026",
    "category": "Microbiologia",
    "type": "Jornadas Presenciais",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Sociedade Portuguesa de Doenças Infeciosas",
    "link": "https://www.medlabcalendar.vercel.app",
    "region": "Portugal",
    "description": "Reunião focada nos desafios emergentes no tratamento e diagnóstico laboratorial de infeções sazonais e bacterianas."
  },
  {
    "title": "Workshop: Validação de Métodos segundo a ISO 15189:2022",
    "date": "2026/05/07",
    "category": "Qualidade",
    "type": "Workshop online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Abordagem prática sobre os requisitos de validação e verificação de métodos de acordo com a nova norma ISO 15189."
  },
  {
    "title": "Simpósio Ibero-Americano de Erros Inatos do Metabolismo",
    "date": "14-15 Maio 2026",
    "category": "Bioquímica Clínica",
    "type": "Simpósio Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "INSA",
    "link": "https://www.insa.min-saude.pt/",
    "region": "Lisboa, Portugal",
    "description": "Partilha de estudos clínicos e avanços no rastreio neonatal e diagnóstico de patologias metabólicas raras."
  },
  {
    "title": "Webinar: Automação e Futuro da Microbiologia",
    "date": "2026/05/28",
    "category": "Microbiologia",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "RapidMicrobiology",
    "link": "https://www.rapidmicrobiology.com/",
    "region": "Online",
    "description": "Discussão aberta sobre sistemas automatizados de identificação microbiana rápida e processamento de amostras."
  },
  {
    "title": "Curso de Lípidos e Risco Cardiovascular Avançado",
    "date": "04-05 Junho 2026",
    "category": "Bioquímica Clínica",
    "type": "Curso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Sociedade Portuguesa de Cardiologia / SPC",
    "link": "https://spc.pt",
    "region": "Portugal",
    "description": "Curso avançado focado na interpretação do perfil lipídico e novos alvos terapêuticos laboratoriais."
  },
  {
    "title": "Webinar: Accelerated diagnostic chest pain protocols; evidence and pitfalls in implementation",
    "date": "2026/06/09",
    "category": "Urgência",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Webinar focado nos protocolos de diagnóstico acelerado de dor torácica no serviço de urgência com base em evidências laboratoriais."
  },
  {
    "title": "Webinar | Da lâmina ao diagnóstico: o poder da Imunohistoquímica na anatomia patológica",
    "date": "15 Junho 2026, 19h00",
    "category": "Anatomia Patológica",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "MedLab Calendar (LinkedIn)",
    "link": "https://lnkd.in/dm6vFXc4",
    "region": "Online",
    "description": "Webinar dedicado à aplicação prática e interpretação da imunohistoquímica no diagnóstico oncológico moderno."
  },
  {
    "title": "Biolog Webinar — Consistent Anaerobic Culture Results",
    "date": "16 Junho 2026",
    "category": "Microbiologia",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "Biolog / RapidMicrobiology",
    "link": "https://www.rapidmicrobiology.com/",
    "region": "Online",
    "description": "Webinar técnico dedicado à otimização de culturas anaeróbias, microbiologia clínica e novos métodos de isolamento."
  },
  {
    "title": "2.ªs Jornadas Prof. Margarida Lima — Mieloma Múltiplo: teoria e prática",
    "date": "2026/06/19",
    "category": "Hematologia",
    "type": "Presencial (Chaves)",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "APsa & Grupo Português de Mieloma Múltiplo",
    "link": "https://sph.org.pt/",
    "region": "Chaves, Portugal",
    "description": "Jornadas focadas na abordagem diagnóstica laboratorial, monitorização e discussão de casos reais de Mieloma Múltiplo."
  },
  {
    "title": "Formação ProMedQual: Diagnóstico da Rubéola",
    "date": "2026/06/22",
    "category": "Microbiologia",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Sessão focada nos métodos serológicos e moleculares de diagnóstico e rastreio laboratorial da rubéola."
  },
  {
    "title": "Casos clínicos de hemostasia vinculados a pruebas de laboratorio: cómo os tests facilitan el diagnóstico",
    "date": "22 Junho 2026, 16h00 - 18h00",
    "category": "Coagulação e Hemostase",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Sociedad Española de Trombosis y Hemostasia (SETH)",
    "link": "https://seth.es/formacion/casos-clinicos-hemostasia-vinculados-pruebas-laboratorio/",
    "region": "Online",
    "description": "Discussão prática de casos clínicos complexos de distúrbios hemorrágicos e o papel dos testes de coagulação avançados."
  },
  {
    "title": "Webinar: The role of angiogenetic factors in placental disorders",
    "date": "2026/06/23",
    "category": "Bioquímica Clínica",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Webinar sobre o uso clínico dos rácios sFlt-1/PlGF no rastreio, diagnóstico e prognóstico da pré-eclâmpsia e disfunções placentárias."
  },
  {
    "title": "Webinar: Laboratory Insights into Neurological Disorders: Spinal Cord and Alzheimer's Disease",
    "date": "2026/07/07",
    "category": "Bioquímica Clínica",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Webinar dedicado à utilidade dos biomarcadores nos líquido cefalorraquidiano e plasma para o diagnóstico precoce da Doença de Alzheimer."
  },
  {
    "title": "Formação ProMedQual: Sistema de Gestão da Qualidade",
    "date": "2026/07/13",
    "category": "Qualidade",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Formação dedicada à estruturação, implementação e melhoria contínua de SGQ em laboratórios de análises clínicas."
  },
  {
    "title": "Formação ProMedQual: Boas práticas na execução do exame de urina de rotina",
    "date": "2026/08/13",
    "category": "Qualidade",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Recomendações técnicas sobre a fase pré-analítica, análise físico-química e sedimentoscopia urinária padronizada."
  },
  {
    "title": "Congresso Nacional de Hematologia Clínica",
    "date": "15-17 Outubro 2026",
    "category": "Hematologia",
    "type": "Congresso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Sociedade Portuguesa de Hematologia (SPH)",
    "link": "https://sph.org.pt/",
    "region": "Portugal",
    "description": "Grande reunião nacional focada no progresso clínico e laboratorial em hematologia benigna e hemato-oncologia."
  },
  {
    "title": "HEMO 2026 — Congresso Brasileiro de Hematologia, Hemoterapia e Terapia Celular",
    "date": "28 a 31 Outubro 2026",
    "category": "Hematologia",
    "type": "Congresso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Associação Brasileira de Hematologia (ABHH)",
    "link": "https://abhh.org.br/",
    "region": "Brasil",
    "description": "Um dos maiores congressos da América Latina voltado para diagnóstico hematológico, transfusional e novas terapias celulares."
  },
  {
    "title": "IUMS 2026 — Congresso Internacional de Microbiologia em Lisboa",
    "date": "04 a 06 Novembro 2026",
    "category": "Microbiologia",
    "type": "Congresso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "International Union of Microbiological Societies (IUMS)",
    "link": "https://www.iums2026.com/",
    "region": "Lisboa, Portugal",
    "description": "Congresso de prestígio global reunindo especialistas mundiais em bacteriologia, virologia e micologia médica."
  },
  {
    "title": "Jornadas do Grupo de Estudos de Leucemias e Linfomas",
    "date": "06-07 Novembro 2026",
    "category": "Hematologia",
    "type": "Jornadas Presenciais",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "GELL",
    "link": "https://www.gell.pt",
    "region": "Portugal",
    "description": "Foco na atualização diagnóstica e terapêutica de neoplasias hematológicas malignas."
  },
  {
    "title": "IMPACT-ICU: Infection management and prevention - advances and current trends for intensive care unit patients",
    "date": "novembro 2026",
    "category": "Microbiologia",
    "type": "Curso / Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "ESCMID",
    "link": "https://www.escmid.org/",
    "region": "Online",
    "description": "Curso avançado sobre a prevenção e gestão célere de infeções críticas no ambiente de cuidados intensivos."
  },
  {
    "title": "EFISG: Difficult and Curious Fungal Diseases Clinical Cases",
    "date": "17 Novembro 2026, 13h00",
    "category": "Microbiologia",
    "type": "Webinar via Zoom",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "ESCMID Fungal Infection Study Group (EFISG)",
    "link": "https://www.escmid.org/",
    "region": "Online",
    "description": "Discussão e apresentação interativa de casos fúngicos invulgares com foco nos desafios do diagnóstico micológico."
  },
  {
    "title": "Workshop de Gasometria Arterial e Distúrbios Ácido-Base",
    "date": "2026/11/19",
    "category": "Urgência",
    "type": "Workshop Prático",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "CHULN",
    "link": "https://www.chuln.min-saude.pt",
    "region": "Lisboa, Portugal",
    "description": "Sessão teórico-prática de interpretação laboratorial de equilíbrios ácido-base e eletrólitos na urgência."
  },
  {
    "title": "Webinar: Novas Diretrizes no Rastreio do Cancro do Colo do Útero",
    "date": "2026/12/03",
    "category": "Anatomia Patológica",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Liga Portuguesa Contra o Cancro",
    "link": "https://www.ligacontracancro.pt",
    "region": "Online",
    "description": "Abordagem da transição para a genotipagem primária de HPV e o impacto nos laboratórios de patologia."
  },
  {
    "title": "Encontro Anual de Biologia Molecular Aplicada ao Diagnóstico",
    "date": "10-11 Dezembro 2026",
    "category": "Biologia Molecular",
    "type": "Encontro Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Biocant",
    "link": "https://www.biocant.pt",
    "region": "Portugal",
    "description": "Apresentação de novas tecnologias baseadas em PCR digital, sequenciação e o seu papel no diagnóstico clínico de precisão."
  },
  {
    "title": "Curso Intensivo de Monitorização de Fármacos e Toxicologia",
    "date": "14-15 Janeiro 2027",
    "category": "Toxicologia",
    "type": "Curso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Consultar Organização",
    "link": "https://www.medlabcalendar.vercel.app",
    "region": "Portugal",
    "description": "Foco na farmacocinética clínica e deteção laboratorial de agentes tóxicos e drogas de abuso."
  },
  {
    "title": "Jornadas de Controlo de Qualidade em Laboratórios de Saúde",
    "date": "28-29 Janeiro 2027",
    "category": "Qualidade",
    "type": "Jornadas Presenciais",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Consultar Organização",
    "link": "https://www.medlabcalendar.vercel.app",
    "region": "Portugal",
    "description": "Estratégias para aplicação de controlo interno de qualidade inteligente e análise de desvios em ensaios laboratoriais."
  },
  {
    "title": "Webinar: O Laboratório Clínico na Medicina de Precisão",
    "date": "2027/02/11",
    "category": "Medicina Laboratorial",
    "type": "Webinar online",
    "price": "Gratuito",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Sessão dedicada ao papel central das análises clínicas na personalização e eficácia das terapêuticas médicas modernas."
  },
  {
    "title": "Curso Fase Preanalítica en el Laboratorio Clínico",
    "date": "Período letivo 2026 - 2027",
    "category": "Qualidade",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/curso-fase-preanalitica-laboratorio-clinico/",
    "region": "Online",
    "description": "Módulos detalhados sobre colheita, transporte e conservação de amostras para minimização de erros pré-analíticos."
  },
  {
    "title": "Curso de Casos Clínicos de Biología Hematológica",
    "date": "Período letivo 2026 - 2027",
    "category": "Hematologia",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/casos-clinicos-de-biologia-hematologica/",
    "region": "Online",
    "description": "Curso assíncrono baseado na resolução de hemogramas complexos e patologias eritrocitárias/leucocitárias."
  },
  {
    "title": "Curso de Bioestadística Básica Aplicada a las Ciencias de la Salud",
    "date": "Período letivo 2026 - 2027",
    "category": "Bioestatística",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/curso-de-bioestadistica-basic-aplicada-a-las-ciencias-de-la-salud/",
    "region": "Online",
    "description": "Formação essencial em testes estatísticos aplicados à validação clínica de métodos laboratoriais."
  },
  {
    "title": "Gestión de Riesgos y Calidad en Pruebas en el Lugar de Atención al Paciente (POCT)",
    "date": "Período letivo 2026 - 2027",
    "category": "Qualidade",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/gestion-riesgos-calidad-pruebas-lugar-atencion-paciente-poct/",
    "region": "Online",
    "description": "Garantia da qualidade e mitigação de erros operacionais em testes rápidos fora do laboratório central (POCT)."
  },
  {
    "title": "Taller de Procesos Asistenciales en Enfermedad Renal Crónica (ERC)",
    "date": "Período letivo 2026 - 2027",
    "category": "Bioquímica Clínica",
    "type": "Workshop / Taller online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/taller-procesos-asistenciales-erc/",
    "region": "Online",
    "description": "A importância da estimativa da TFG através das equações laboratoriais e medição da albuminúria."
  },
  {
    "title": "Reuniões de Casos Clínicos de Mieloma Múltiplo",
    "date": "Última segunda-feira de cada mês",
    "category": "Hematologia",
    "type": "Reunião virtual / Online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Grupo Português de Mieloma Múltiplo (GPMM)",
    "link": "https://www.sph.org.pt/index.php/grupos/grupo-mieloma-multiplo",
    "region": "Online",
    "description": "Sessões periódicas síncronas entre patologistas e clínicos para discussão diagnóstica de gamapatias monoclonais."
  },
  {
    "title": "Workshop: Os Impactos da Inteligência Artificial para a Genética e Genómica",
    "date": "A confirmar (2026)",
    "category": "Inovação",
    "type": "Workshop online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Consultar Organização (LinkedIn)",
    "link": "https://bit.ly/ia-mapa-genoma",
    "region": "Online",
    "description": "Workshop focado nos algoritmos de aprendizagem profunda e IA na anotação de variantes e alinhamento de NGS."
  }
]

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const monthMap = {
  janeiro: 0, fevereiro: 1, março: 2, marco: 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
}

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const areaCategories = [
  'Genética',
  'Inovação',
  'Hematologia',
  'Coagulação e Hemostase',
  'Medicina Laboratorial',
  'Bioquímica Clínica',
  'Microbiologia',
  'Qualidade',
  'Anatomia Patológica',
  'Biologia Molecular',
  'Toxicologia',
  'Bioestatística',
  'Imunologia',
  'Urgência',
]

function normalizeCategory(category) {
  if (!category) return 'Medicina Laboratorial'
  const normalized = normalizeText(category)

  if (normalized.includes('anatomia')) return 'Anatomia Patológica'
  if (normalized.includes('biologia molecular')) return 'Biologia Molecular'
  if (normalized.includes('bioestatistica') || normalized.includes('investigacao')) return 'Bioestatística'
  if (normalized.includes('toxicologia')) return 'Toxicologia'
  if (normalized.includes('bioquimica') && normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('bioquimica')) return 'Bioquímica Clínica'
  if (normalized.includes('nefrologia')) return 'Bioquímica Clínica'
  if (normalized.includes('neurologia')) return 'Bioquímica Clínica'
  if (normalized.includes('genetica') && normalized.includes('inovacao')) return 'Inovação'
  if (normalized.includes('genetica')) return 'Genética'
  if (normalized.includes('hemostase') || normalized.includes('coagulacao')) return 'Coagulação e Hemostase'
  if (normalized.includes('hematologia') || normalized.includes('mieloma') || normalized.includes('oncologia')) return 'Hematologia'
  if (normalized.includes('microbiologia') || normalized.includes('infec') || normalized.includes('fungal') || normalized.includes('rubeola')) return 'Microbiologia'
  if (normalized.includes('qualidade') || normalized.includes('pre-analitica') || normalized.includes('poct') || normalized.includes('urinalise')) return 'Qualidade'
  if (normalized.includes('imunologia') || normalized.includes('imuno')) return 'Imunologia'
  if (normalized.includes('medicina laboratorial')) return 'Medicina Laboratorial'
  if (normalized.includes('inovacao') || normalized.includes('inteligencia artificial')) return 'Inovação'

  return 'Medicina Laboratorial'
}

function parseCSV(text) {
  const rows = []
  let row = []
  let value = ''
  let insideQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '"' && insideQuotes && nextChar === '"') {
      value += '"'
      i += 1
    } else if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === ',' && !insideQuotes) {
      row.push(value.trim())
      value = ''
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i += 1
      row.push(value.trim())
      if (row.some((cell) => cell !== '')) rows.push(row)
      row = []
      value = ''
    } else {
      value += char
    }
  }

  if (value || row.length) {
    row.push(value.trim())
    if (row.some((cell) => cell !== '')) rows.push(row)
  }

  if (rows.length < 2) return []

  const headers = rows[0].map((header) => normalizeText(header).replace(/[^a-z0-9]+/g, ''))

  return rows.slice(1).map((cells) => {
    const raw = {}
    headers.forEach((header, index) => {
      raw[header] = cells[index] || ''
    })

    const activeValue = normalizeText(raw.ativo || raw.ativo_ || raw.status || '')
    const isActive = !activeValue || ['sim', 'yes', 'published', 'publicado', 'ativo'].some((word) => activeValue.includes(word))

    return {
      title: raw.titulo || raw.title || '',
      date: raw.data || raw.date || raw.startdate || raw.datainicio || '',
      startDateRaw: raw.startdate || raw.datainicio || '',
      endDateRaw: raw.enddate || raw.datafim || '',
      category: normalizeCategory(raw.categoria || raw.category || raw.area || ''),
      type: raw.tipoformato || raw.formato || raw.type || '',
      organizer: raw.organizador || raw.organizer || '',
      link: raw.linkoficial || raw.link || raw.url || '',
      price: raw.custo || raw.price || raw.preco || '',
      certificate: raw.certificado || raw.certificate || '',
      region: raw.regiao || raw.region || raw.local || '',
      description: raw.descricao || raw.description || '',
      status: isActive ? 'published' : 'draft',
    }
  }).filter((event) => event.title && event.status === 'published')
}

function parseEventDate(dateText = '') {
  const original = String(dateText)
  const clean = normalizeText(original)
    .replace(/\//g, '-')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()

  const isoRange = clean.match(/(20\d{2})-(\d{1,2})-(\d{1,2})(?:\s*-\s*(20\d{2})-(\d{1,2})-(\d{1,2}))?/)
  if (isoRange) {
    const startYear = Number(isoRange[1])
    const startMonth = Number(isoRange[2]) - 1
    const startDay = Number(isoRange[3])
    const start = new Date(startYear, startMonth, startDay, 9, 0, 0)
    const end = isoRange[4]
      ? new Date(Number(isoRange[4]), Number(isoRange[5]) - 1, Number(isoRange[6]), 18, 0, 0)
      : new Date(startYear, startMonth, startDay, 23, 59, 59, 999)
    return { start, end, isApproximate: false }
  }

  const yearMatches = [...clean.matchAll(/20\d{2}/g)].map((match) => Number(match[0]))
  const monthMatches = [...clean.matchAll(/janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro/g)].map((match) => match[0])
  const dayMatches = [...clean.matchAll(/\b(\d{1,2})\b/g)]
    .map((match) => Number(match[1]))
    .filter((day) => day >= 1 && day <= 31)

  const startYear = yearMatches[0] || 2026
  const endYear = yearMatches[1] || startYear

  if (clean.includes('ultima segunda-feira') || clean.includes('cada mes')) {
    return {
      start: new Date(startYear, 0, 1, 9, 0, 0),
      end: new Date(Math.max(endYear, startYear + 1), 11, 31, 18, 0, 0),
      isApproximate: true,
    }
  }

  if (clean.includes('periodo letivo')) {
    return {
      start: new Date(startYear, 0, 1, 9, 0, 0),
      end: new Date(endYear, 11, 31, 18, 0, 0),
      isApproximate: true,
    }
  }

  if (clean.includes('a confirmar')) {
    return {
      start: new Date(startYear, 11, 31, 9, 0, 0),
      end: new Date(startYear, 11, 31, 18, 0, 0),
      isApproximate: true,
    }
  }

  if (clean.includes('ao longo')) {
    return {
      start: new Date(startYear, 0, 1, 9, 0, 0),
      end: new Date(startYear, 11, 31, 18, 0, 0),
      isApproximate: true,
    }
  }

  const startMonth = monthMatches[0] ? monthMap[monthMatches[0]] : 0
  const endMonth = monthMatches[1] ? monthMap[monthMatches[1]] : startMonth
  const hasExplicitDay = dayMatches.length > 0
  const startDay = hasExplicitDay ? dayMatches[0] : 1
  const endDay = dayMatches.length > 1 ? dayMatches[1] : startDay
  const lastDayOfEndMonth = new Date(endYear, endMonth + 1, 0).getDate()

  return {
    start: new Date(startYear, startMonth, startDay, 9, 0, 0),
    end: new Date(endYear, endMonth, hasExplicitDay ? endDay : lastDayOfEndMonth, 18, 0, 0),
    isApproximate: !hasExplicitDay,
  }
}

function isSameCalendarDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isCalendarEventOnDay(event, day) {
  if (event.isApproximate || event.isLongRange) return isSameCalendarDay(event.startDate, day)
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0)
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59)
  return event.startDate <= dayEnd && event.endDate >= dayStart
}

function isFreeEvent(event) {
  const text = normalizeText(`${event.price || ''} ${event.type || ''} ${event.title || ''} ${event.description || ''}`)
  return text.includes('gratuito') || text.includes('gratis') || text.includes('free')
}

function formatGoogleDate(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`
}

function getGoogleCalendarUrl(event) {
  const { start, end } = parseEventDate(event.date)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title || 'Evento MedLab Calendar',
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: `${event.description || ''}\n\nOrganizador: ${event.organizer || ''}\nCategoria: ${event.category || ''}\nFormato: ${event.type || ''}\nCusto: ${event.price || ''}\nCertificado: ${event.certificate || ''}\nLink oficial: ${event.link || ''}`,
    location: event.region || event.type || 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function Button({ children, variant = 'primary', className = '', onClick, type = 'button' }) {
  return <button type={type} onClick={onClick} className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}>{children}</button>
}

function submissionHref() {
  if (googleFormUrl) return googleFormUrl
  return `mailto:${contactEmail}?subject=Sugest%C3%A3o%20de%20evento%20para%20o%20MedLab%20Calendar&body=Ol%C3%A1%2C%0A%0AGostaria%20de%20sugerir%20o%20seguinte%20evento%3A%0A%0AT%C3%ADtulo%3A%0AData%3A%0AOrganizador%3A%0A%C3%81rea%3A%0AFormato%3A%0ALink%20oficial%3A%0A%0AObrigada.`
}

function SuggestEventLink({ children }) {
  return <a href={submissionHref()} target={googleFormUrl ? '_blank' : undefined} rel={googleFormUrl ? 'noreferrer' : undefined}>{children}</a>
}

function getPreparedEvents(eventsSource) {
  const now = new Date()
  return eventsSource
    .map((event) => {
      const normalizedEvent = { ...event, category: normalizeCategory(event.category) }
      const parsedDate = parseEventDate(normalizedEvent.date)
      const diffDays = Math.ceil((parsedDate.end - parsedDate.start) / (1000 * 60 * 60 * 24))
      return {
        ...normalizedEvent,
        startDate: parsedDate.start,
        endDate: parsedDate.end,
        isApproximate: parsedDate.isApproximate,
        isLongRange: diffDays > 14,
        isArchived: parsedDate.end < now,
        isFree: isFreeEvent(normalizedEvent),
      }
    })
    .sort((a, b) => a.startDate - b.startDate)
}

function EventCard({ event }) {
  return (
    <div className={`card event-card ${event.isArchived ? 'archived-event' : ''} ${event.isFree ? 'free-event' : ''}`}>
      <div className="event-card-top">
        <span className="tag">{event.category}</span>
        {event.isFree && <span className="tag free-badge">Gratuito</span>}
        {event.isArchived && <span className="tag archived-badge"><Archive size={14} /> Arquivo</span>}
        <ExternalLink size={17} />
      </div>
      <h3>{event.title}</h3>
      <p className="muted">{event.organizer}</p>
      <p className="description">{event.description}</p>
      <div className="details">
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Formato:</strong> {event.type}</p>
        <p><strong>Custo:</strong> {event.price}</p>
        <p><strong>Certificado:</strong> {event.certificate}</p>
      </div>
      <div className="card-actions">
        <a href={event.link} target="_blank" rel="noreferrer"><Button variant="outline" className="full">Ver página oficial</Button></a>
        <a href={getGoogleCalendarUrl(event)} target="_blank" rel="noreferrer"><Button variant="outline" className="full"><Download size={15} /> Adicionar ao Google Calendar</Button></a>
      </div>
    </div>
  )
}

function MonthlyCalendar({ events }) {
  const today = new Date()
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const calendarDays = useMemo(() => {
    const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
    const startOffset = (firstDay.getDay() + 6) % 7
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - startOffset)

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + index)
      return {
        date,
        inMonth: date.getMonth() === visibleMonth.getMonth(),
        events: events.filter((event) => isCalendarEventOnDay(event, date) && !event.isArchived),
      }
    })
  }, [visibleMonth, events])

  function moveMonth(delta) {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + delta, 1))
  }

  return (
    <section className="white-section calendar-section" id="calendar">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Calendário mensal</p>
            <h2>{monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}</h2>
          </div>
          <div className="calendar-controls">
            <Button variant="outline" onClick={() => moveMonth(-1)}><ChevronLeft size={16} /> Mês anterior</Button>
            <Button variant="outline" onClick={() => moveMonth(1)}>Mês seguinte <ChevronRight size={16} /></Button>
          </div>
        </div>
        <div className="monthly-calendar">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}
          {calendarDays.map(({ date, inMonth, events: dayEvents }) => (
            <div className={`calendar-day ${inMonth ? '' : 'calendar-day-muted'}`} key={date.toISOString()}>
              <strong>{date.getDate()}</strong>
              {dayEvents.slice(0, 3).map((event) => (
                <a href={event.link} target="_blank" rel="noreferrer" className={`calendar-event-pill ${event.isFree ? 'free-calendar-event' : ''}`} key={event.title}>{event.title}</a>
              ))}
              {dayEvents.length > 3 && <span className="small">+{dayEvents.length - 3} eventos</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureStyles() {
  return (
    <style>{`
      .calendar-section { background: #fff; }
      .calendar-controls { display: flex; gap: 0.75rem; flex-wrap: wrap; }
      .monthly-calendar { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.5rem; }
      .calendar-weekday { font-weight: 700; color: #475569; font-size: 0.85rem; padding: 0.5rem; text-align: center; }
      .calendar-day { min-height: 118px; border: 1px solid #e2e8f0; border-radius: 14px; padding: 0.55rem; background: #ffffff; display: flex; flex-direction: column; gap: 0.35rem; }
      .calendar-day-muted { opacity: 0.45; background: #f8fafc; }
      .calendar-event-pill { display: block; padding: 0.25rem 0.4rem; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 0.72rem; line-height: 1.2; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .free-calendar-event, .free-badge { background: #dcfce7 !important; color: #166534 !important; border-color: #86efac !important; }
      .free-event { border: 2px solid #86efac; box-shadow: 0 12px 30px rgba(22, 101, 52, 0.08); }
      .archived-event { opacity: 0.7; }
      .archived-badge { background: #f1f5f9; color: #475569; display: inline-flex; align-items: center; gap: 0.25rem; }
      .filters-panel { display: grid; grid-template-columns: 2fr 1fr 1fr auto auto; gap: 0.75rem; align-items: center; margin: 1rem 0; }
      .filters-panel input, .filters-panel select { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0.75rem 0.9rem; font: inherit; background: #fff; }
      .checkbox-filter { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
      .stats-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1rem; }
      .stats-row span { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 0.45rem 0.75rem; font-size: 0.9rem; }
      .card-actions { display: grid; gap: 0.5rem; margin-top: 1rem; }
      .card-actions .btn { display: inline-flex; justify-content: center; align-items: center; gap: 0.35rem; }

      .category-search-box { display: flex; align-items: center; gap: 0.6rem; max-width: 760px; margin: 1.25rem auto 1.5rem; border: 1px solid #cbd5e1; border-radius: 999px; padding: 0.75rem 1rem; background: #fff; }
      .category-search-box input { width: 100%; border: 0; outline: 0; font: inherit; background: transparent; }
      .category-icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 1rem; }
      .category-icon-card { border: 1px solid #e2e8f0; border-radius: 24px; padding: 1.35rem 1rem; background: #fff; cursor: pointer; text-align: center; display: flex; min-height: 170px; flex-direction: column; align-items: center; justify-content: center; gap: 0.55rem; transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease; }
      .category-icon-card:hover { transform: translateY(-4px); box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12); border-color: #94a3b8; }
      .category-icon { width: 68px; height: 68px; border-radius: 999px; display: flex; align-items: center; justify-content: center; background: #f8fafc; color: #0f172a; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); margin-bottom: 0.35rem; }
      .category-icon svg { width: 30px; height: 30px; stroke-width: 2; }
      .category-icon-card strong { color: #0f172a; line-height: 1.25; font-size: 1rem; }
      .category-icon-card span:last-child { color: #64748b; font-size: 0.9rem; }
      @media (max-width: 900px) {
        .monthly-calendar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .calendar-weekday { display: none; }
        .filters-panel { grid-template-columns: 1fr; }
      }
    `}</style>
  )
}

const categoryIcons = {
  'Genética': Dna,
  'Inovação': Lightbulb,
  'Hematologia': Droplets,
  'Coagulação e Hemostase': ClipboardList,
  'Medicina Laboratorial': Microscope,
  'Bioquímica Clínica': TestTube2,
  'Microbiologia': Microscope,
  'Qualidade': ShieldCheck,
  'Anatomia Patológica': Search,
  'Biologia Molecular': Dna,
  'Toxicologia': FlaskConical,
  'Bioestatística': BarChart3,
  'Imunologia': HeartHandshake,
  'Urgência': Ambulance,
}

function getCategoryIcon(category) {
  return categoryIcons[category] || FlaskConical
}

function mergeEvents(baseEvents, sheetEvents) {
  const byTitle = new Map()
  baseEvents.forEach((event) => {
    byTitle.set(normalizeText(event.title), event)
  })
  sheetEvents.forEach((event) => {
    byTitle.set(normalizeText(event.title), event)
  })
  return [...byTitle.values()]
}

function App() {
  const [rawEvents, setRawEvents] = useState(fallbackEvents)
  const [sheetStatus, setSheetStatus] = useState('A carregar eventos da Google Sheet...')

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Não foi possível carregar a Google Sheet')
        return response.text()
      })
      .then((text) => {
        const sheetEvents = parseCSV(text)
        if (sheetEvents.length > 0) {
          setRawEvents(mergeEvents(fallbackEvents, sheetEvents))
          setSheetStatus(`Eventos carregados da Google Sheet: ${sheetEvents.length}`)
        } else {
          setSheetStatus('A Google Sheet carregou, mas não foram encontrados eventos publicados. A mostrar eventos de reserva.')
        }
      })
      .catch(() => {
        setSheetStatus('Não foi possível carregar a Google Sheet. A mostrar eventos de reserva.')
      })
  }, [])

  const preparedEvents = useMemo(() => getPreparedEvents(rawEvents), [rawEvents])
  const activeEvents = preparedEvents.filter((event) => !event.isArchived)
  const archivedEvents = preparedEvents.filter((event) => event.isArchived)
  const categories = useMemo(() => areaCategories, [])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [formatFilter, setFormatFilter] = useState('Todos')
  const [onlyFree, setOnlyFree] = useState(false)
  const [showArchive, setShowArchive] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')

  const sourceEvents = showArchive ? archivedEvents : activeEvents
  const filteredEvents = sourceEvents.filter((event) => {
    const haystack = normalizeText(`${event.title} ${event.organizer} ${event.category} ${event.description} ${event.type} ${event.region}`)
    const matchesSearch = haystack.includes(normalizeText(query))
    const matchesCategory = selectedCategory === 'Todas' || event.category === selectedCategory
    const normalizedType = normalizeText(`${event.type} ${event.region}`)
    const matchesFormat = formatFilter === 'Todos' || normalizedType.includes(normalizeText(formatFilter))
    const matchesFree = !onlyFree || event.isFree
    return matchesSearch && matchesCategory && matchesFormat && matchesFree
  })

  const freeCount = activeEvents.filter((event) => event.isFree).length
  const thisMonthCount = activeEvents.filter((event) => {
    const now = new Date()
    return event.startDate.getMonth() === now.getMonth() && event.startDate.getFullYear() === now.getFullYear()
  }).length

  const featuredEvents = activeEvents.slice(0, 4)
  const visibleCategories = categories.filter((category) => normalizeText(category).includes(normalizeText(categorySearch)))

  function openCategory(category) {
    setSelectedCategory(category)
    setShowArchive(false)
    setTimeout(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  return (
    <div className="page">
      <FeatureStyles />
      <header className="header">
        <div className="container nav">
          <div className="brand">
            <div className="brand-icon"><Microscope size={22} /></div>
            <div>
              <p className="brand-title">MedLab Calendar</p>
              <p className="brand-subtitle">Laboratory Medicine Education Hub</p>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#about">Sobre</a>
            <a href="#calendar">Calendário</a>
            <a href="#events">Eventos</a>
            <a href="#categories">Categorias</a>
            <a href="#organizers">Para Organizadores</a>
          </nav>
          <a href="#events"><Button>Ver eventos</Button></a>
        </div>
      </header>

      <main>
        <div className="container"><p className="small" style={{ marginTop: '1rem' }}>{sheetStatus}</p></div>
        <section className="container hero">
          <div>
            <div className="pill"><CalendarDays size={16} /> Calendário de formação para profissionais de laboratório</div>
            <h1>Cursos, webinars e eventos laboratoriais num só lugar.</h1>
            <p className="lead">O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local, com pesquisa, calendário mensal e arquivo automático de eventos passados.</p>
            <div className="hero-actions">
              <a href="#events"><Button>Explorar próximos eventos</Button></a>
              <SuggestEventLink><Button variant="outline">Submeter evento</Button></SuggestEventLink>
              <a href="https://1534ef9d.sibforms.com/serve/MUIFAHFh5N7BeM-dVw2LycaCbsspKR2qDeIx-bR6hWDL3C_3flMkcOYIvSZhwbQFOZkkX6WIeH4AUHaz8iRgywSR6IXV0cCHoHHbe2f0toIHQKYqkVCRKJpywPb2QCAA3D_x5pV1Pl4oJ8qdLPwya_iaMkJU5RHsgFo-D4Iizfs61iTuEvA-NhRSvcmw3BalvcZxEFA1z1AqQ4949w==" target="_blank" rel="noreferrer"><Button variant="outline">Subscrever Newsletter</Button></a>
            </div>
            <div className="stats-row">
              <span>{activeEvents.length} próximos eventos</span>
              <span>{freeCount} gratuitos</span>
              <span>{thisMonthCount} este mês</span>
              <span>{archivedEvents.length} arquivados</span>
            </div>
            <p className="small">Contacto: <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </div>

          <div className="card feature-card">
            <div className="card-header">
              <div><p className="eyebrow">Próximos eventos</p><h2>Eventos em destaque</h2></div>
              <div className="soft-icon"><Filter size={20} /></div>
            </div>
            <div className="event-list">
              {featuredEvents.map((event) => (
                <div className="event-row" key={event.title}>
                  <div className="event-top">
                    <div><p className="event-title">{event.title}</p><p className="muted">{event.organizer}</p></div>
                    <span className="tag">{event.category}</span>{event.isFree && <span className="tag free-badge">Gratuito</span>}
                  </div>
                  <div className="event-meta"><span>{event.date}</span><span>{event.type}</span><span>{event.region}</span><span>{event.price}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="intro-section">
          <div className="container intro-card">
            <div className="soft-icon"><HeartHandshake size={22} /></div>
            <p className="eyebrow">Sobre</p>
            <h2>Uma ferramenta criada para ajudar colegas e fortalecer a comunidade laboratorial.</h2>
            <p>A formação em medicina laboratorial encontra-se frequentemente dispersa entre sociedades científicas, universidades, hospitais, empresas e redes profissionais. O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local, facilitando o acesso a oportunidades de aprendizagem contínua.</p>
            <p>O projeto tem uma abordagem de curadoria independente: cada evento é resumido de forma simples e encaminha para a página oficial da entidade organizadora.</p>
          </div>
        </section>

        <MonthlyCalendar events={activeEvents} />

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div><p className="eyebrow">Eventos e formações</p><h2>Descobre formação relevante sem perder tempo à procura.</h2></div>
              <Button variant="outline" onClick={() => setShowArchive(!showArchive)}>{showArchive ? 'Ver eventos ativos' : 'Ver arquivo'}</Button>
            </div>

            <div className="filters-panel">
              <label className="search-input"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por tema, área, organizador ou palavra-chave" /></label>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                <option>Todas</option>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <select value={formatFilter} onChange={(event) => setFormatFilter(event.target.value)}>
                <option>Todos</option>
                <option>Online</option>
                <option>Presencial</option>
                <option>Webinar</option>
                <option>Curso</option>
                <option>Congresso</option>
              </select>
              <label className="checkbox-filter"><input type="checkbox" checked={onlyFree} onChange={(event) => setOnlyFree(event.target.checked)} /> Mostrar apenas gratuitos</label>
            </div>

            <div className="notice">{showArchive ? 'Arquivo de eventos passados, preservado para consulta histórica.' : 'São apresentados eventos e formações ainda por realizar ou atualmente disponíveis.'} Resultado: {filteredEvents.length} evento(s).</div>
            <div className="grid-3">{filteredEvents.map((event) => <EventCard event={event} key={event.title} />)}</div>
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Categorias</p>
            <h2>Eventos organizados por área.</h2>
            <p>Pesquisa uma área ou clica num ícone para veres todos os cursos dessa categoria.</p>
          </div>

          <label className="category-search-box">
            <Search size={18} />
            <input
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Pesquisar área, por exemplo: Hematologia, Qualidade, Anatomia Patológica..."
            />
          </label>

          <div className="category-icon-grid">
            {visibleCategories.map((category) => {
              const matchingEvents = activeEvents.filter((event) => event.category === category)
              const Icon = getCategoryIcon(category)
              return (
                <button type="button" className="category-icon-card" key={category} onClick={() => openCategory(category)}>
                  <span className="category-icon" aria-hidden="true">
                    <Icon size={30} />
                  </span>
                  <strong>{category}</strong>
                  <span>{matchingEvents.length} evento(s)</span>
                </button>
              )
            })}
          </div>
        </section>

        <section id="organizers" className="container organizers-section">
          <div className="organizers-card">
            <div>
              <div className="soft-icon"><ClipboardList size={22} /></div>
              <p className="eyebrow">Para Organizadores</p>
              <h2>Divulgue cursos, webinars e reuniões científicas relevantes.</h2>
              <p>O MedLab Calendar aceita sugestões de eventos de sociedades científicas, universidades, hospitais, laboratórios, empresas e outras entidades com formação relevante para a medicina laboratorial.</p>
            </div>
            <div className="organizers-copy">
              <p><strong>Informação recomendada:</strong> título, data, organizador, área, formato, local, custo, certificado e link oficial.</p>
              <p><strong>Email:</strong> <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
              <p><strong>Importante:</strong> a plataforma atua apenas como serviço de curadoria e divulgação. Os eventos pertencem às respetivas entidades organizadoras.</p>
              <SuggestEventLink><Button>Submeter evento</Button></SuggestEventLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <p>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p>
            <p>Os eventos apresentados são da responsabilidade das entidades organizadoras. O MedLab Calendar atua apenas como plataforma de divulgação.</p>
          </div>
          <p>Contacto: <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
