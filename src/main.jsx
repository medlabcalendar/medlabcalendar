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
    "title": "Actualización en Medicina Personalizada",
    "date": "1 Outubro 2026 – 15 Junho 2027",
    "category": "Genética Molecular",
    "type": "Curso online",
    "price": "70 € sócios / 95 € não sócios",
    "certificate": "Consultar organização",
    "organizer": "Sociedad Española de Medicina de Laboratorio (SEMEDLAB)",
    "link": "https://formacion.semedlab.es/",
    "region": "Online",
    "description": "Formação avançada para profissionais de saúde, com 8 módulos especializados e fórum de discussão com especialistas. Inscrição até 1 de novembro de 2026."
  },
  {
    "title": "Biolog Webinar — Consistent Anaerobic Culture Results",
    "date": "16 Junho 2026",
    "category": "Microbiologia / Infeção",
    "type": "Webinar online",
    "price": "Consultar",
    "certificate": "Consultar organização",
    "organizer": "Biolog / RapidMicrobiology",
    "link": "https://www.rapidmicrobiology.com/",
    "region": "Online",
    "description": "Webinar dedicado a cultura anaeróbia, microbiologia clínica e métodos de cultura."
  },
  {
    "title": "Webinar | Hemocromatose",
    "date": "24 Junho 2026, 18h30",
    "category": "Hematologia",
    "type": "Webinar gratuito / online",
    "price": "Gratuito",
    "certificate": "Consultar organização",
    "organizer": "Ordem dos Farmacêuticos — Colégio de Análises Clínicas e Genética Humana",
    "link": "https://www.ordemfarmaceuticos.pt/",
    "region": "Online",
    "description": "Webinar sobre hemocromatose, diagnóstico laboratorial e genética humana."
  },
  {
    "title": "ADLM — Urines get no respect: From afterthought to asset in diagnostic stewardship",
    "date": "24 Junho 2026",
    "category": "Qualidade",
    "type": "Webinar",
    "price": "Consultar",
    "certificate": "Consultar organização",
    "organizer": "ADLM",
    "link": "https://myadlm.org/",
    "region": "Online",
    "description": "Webinar sobre urinálise, diagnostic stewardship e qualidade laboratorial."
  },
  {
    "title": "New Rapid Microbial Testing System with Results in Hours",
    "date": "25 Junho 2026",
    "category": "Microbiologia / Infeção",
    "type": "Webinar online",
    "price": "Consultar",
    "certificate": "Consultar organização",
    "organizer": "RapidMicrobiology",
    "link": "https://www.rapidmicrobiology.com/",
    "region": "Online",
    "description": "Webinar sobre rapid microbiology, automação e diagnóstico microbiológico."
  },
  {
    "title": "Boas práticas no exame de urina de rotina em laboratório",
    "date": "13 Agosto 2026",
    "category": "Qualidade",
    "type": "Formação online",
    "price": "Consultar",
    "certificate": "Consultar organização",
    "organizer": "ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Formação sobre boas práticas no exame de urina de rotina em laboratório."
  },
  {
    "title": "20th International Conference on Pathology and Laboratory Medicine",
    "date": "7–8 Setembro 2026",
    "category": "Medicina Laboratorial",
    "type": "Congresso internacional",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Europe Annual Conferences",
    "link": "https://annualconferences.org/",
    "region": "Amesterdão, Países Baixos",
    "description": "Congresso internacional dedicado à patologia, medicina laboratorial e diagnóstico."
  },
  {
    "title": "PAM 2026 — Porto's Autoimmune Meeting",
    "date": "1–3 Outubro 2026",
    "category": "Autoimunidade",
    "type": "Reunião científica presencial",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Porto's Autoimmune Meeting",
    "link": "https://portoautoimmunemeeting.pt/",
    "region": "Portugal",
    "description": "Encontro científico dedicado à autoimunidade, com foco na atualização e discussão multidisciplinar."
  },
  {
    "title": "Análise Computacional e Bioinformática de Variantes em Doença Genética",
    "date": "12–16 Outubro 2026",
    "category": "Genética Molecular",
    "type": "Curso presencial",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Instituto Nacional de Saúde Doutor Ricardo Jorge (INSA)",
    "link": "https://www.insa.min-saude.pt/",
    "region": "INSA, Lisboa",
    "description": "Curso de 35 horas sobre NGS, variant calling, priorização de variantes, bioinformática clínica e casos práticos laboratoriais."
  },
  {
    "title": "18.ª Reunião Científica da SPML",
    "date": "29–31 Outubro 2026",
    "category": "Medicina Laboratorial",
    "type": "Reunião científica presencial",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Sociedade Portuguesa de Medicina Laboratorial",
    "link": "https://spml.pt/",
    "region": "Portugal",
    "description": "Reunião científica nacional dedicada à atualização, partilha de conhecimento e discussão de trabalhos científicos em medicina laboratorial."
  },
  {
    "title": "Reunião Anual da Sociedade Portuguesa de Hematologia 2026",
    "date": "5–7 Novembro 2026",
    "category": "Hematologia",
    "type": "Reunião científica presencial",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Sociedade Portuguesa de Hematologia (SPH)",
    "link": "https://sph.org.pt/",
    "region": "Centro de Congressos de Lisboa",
    "description": "Reunião anual da Sociedade Portuguesa de Hematologia, dedicada à atualização científica e partilha de conhecimento em hematologia."
  },
  {
    "title": "Programa de Formação Avançada em Hematologia",
    "date": "Setembro 2025 – Julho 2027",
    "category": "Hematologia",
    "type": "Programa de formação online",
    "price": "Gratuito",
    "certificate": "Consultar organização",
    "organizer": "Sociedade Portuguesa de Hematologia (SPH)",
    "link": "https://sph.org.pt/",
    "region": "Online",
    "description": "Programa gratuito de formação avançada em hematologia, com sessões semanais online."
  },
  {
    "title": "Curso de Antibioterapia | 18.ª Edição",
    "date": "16–20 Novembro 2026",
    "category": "Microbiologia / Infeção",
    "type": "Curso",
    "price": "Pago",
    "certificate": "Consultar organização",
    "organizer": "Hospital da Luz Learning Health",
    "link": "https://www.hospitaldaluz.pt/learninghealth/pt/formacao/calendario-de-cursos-e-eventos/682/curso-antibioterapia-18-edicao",
    "region": "Portugal",
    "description": "Curso dedicado à utilização de antibioterapia e atualização em infeção, organizado pela Hospital da Luz Learning Health."
  },
  {
    "title": "30.ª Reunião Anual da Sociedade Portuguesa de Genética Humana",
    "date": "19–21 Novembro 2026",
    "category": "Genética Molecular",
    "type": "Reunião científica presencial",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Sociedade Portuguesa de Genética Humana (SPGH)",
    "link": "https://spgh.net/",
    "region": "Lisboa, Portugal",
    "description": "Reunião científica dedicada à genética humana e genómica clínica."
  },
  {
    "title": "EHA Scientific Meetings & Webinar Activities 2026",
    "date": "Ao longo de 2026",
    "category": "Hematologia",
    "type": "Série contínua de webinars e sessões online",
    "price": "Consultar",
    "certificate": "Consultar organização",
    "organizer": "European Hematology Association (EHA)",
    "link": "https://ehaweb.org/",
    "region": "Online",
    "description": "Série de webinars e sessões online sobre leucemias, linfomas, hemostase, hemoglobinopatias e hematologia clínica."
  },
  {
    "title": "EHA Scientific Meetings & Webinar Activities 2026 — Hemostase",
    "date": "Ao longo de 2026",
    "category": "Coagulação e Hemostase",
    "type": "Série contínua de webinars e sessões online",
    "price": "Consultar",
    "certificate": "Consultar organização",
    "organizer": "European Hematology Association (EHA)",
    "link": "https://ehaweb.org/",
    "region": "Online",
    "description": "Sessões da EHA relevantes para hemostase, coagulação, trombose e hematologia clínica."
  },
  {
    "title": "Curso em Aspetos Éticos e Sociais em Genética Clínica Laboratorial — 5.ª edição",
    "date": "2026",
    "category": "Genética Molecular",
    "type": "Curso online",
    "price": "Consultar inscrição",
    "certificate": "Consultar organização",
    "organizer": "Faculdade de Medicina da Universidade de Coimbra",
    "link": "https://www.uc.pt/fmuc/",
    "region": "Online",
    "description": "Curso sobre interpretação de variantes, genética laboratorial, ética, aconselhamento genético e IA em genética."
  },
  {
    "title": "Webinar | Da lâmina ao diagnóstico: o poder da Imunohistoquímica na anatomia patológica",
    "date": "15 Junho 2026, 19h00",
    "category": "Anatomia Patológica",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "MedLab Calendar (LinkedIn)",
    "link": "https://lnkd.in/dm6vFXc4",
    "region": "Online",
    "description": "Webinar dedicado à imunohistoquímica e ao seu papel no diagnóstico em anatomia patológica e oncologia."
  },
  {
    "title": "Casos clínicos de hemostasia vinculados a pruebas de laboratorio: cómo os tests facilitan el diagnóstico",
    "date": "22 Junho 2026, 16h00 - 18h00",
    "category": "Hematologia",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Sociedad Española de Trombosis y Hemostasia (SETH)",
    "link": "https://seth.es/formacion/casos-clinicos-hemostasia-vinculados-pruebas-laboratorio/",
    "region": "Online",
    "description": "Sessão de casos clínicos de hemostasia focada na utilidade das provas laboratoriais no diagnóstico."
  },
  {
    "title": "Formação ProMeQuaLab: Diagnóstico da Rubéola",
    "date": "22 Junho 2026",
    "category": "Microbiologia / Infeção",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Formação ProMeQuaLab dedicada ao diagnóstico laboratorial da rubéola."
  },
  {
    "title": "Webinar: The role of angiogenetic factors in placental disorders",
    "date": "23 Junho 2026",
    "category": "Bioquímica Clínica",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Webinar sobre fatores angiogénicos e o seu papel nas patologias placentárias."
  },
  {
    "title": "Webinar: Laboratory Insights into Neurological Disorders: Spinal Cord and Alzheimer's Disease",
    "date": "7 Julho 2026",
    "category": "Neurologia / Bioquímica",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "EFLM",
    "link": "https://www.eflm.eu/",
    "region": "Online",
    "description": "Webinar dedicado ao contributo laboratorial no estudo de doenças neurológicas."
  },
  {
    "title": "Formação ProMeQuaLab: Sistema de Gestão da Qualidade",
    "date": "13 Julho 2026",
    "category": "Qualidade",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Formação ProMeQuaLab sobre sistemas de gestão da qualidade em contexto laboratorial."
  },
  {
    "title": "Formação ProMeQuaLab: Boas práticas na execução do exame de urina de rotina",
    "date": "13 Agosto 2026",
    "category": "Qualidade / Urinálise",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Formação sobre boas práticas na execução do exame de urina de rotina."
  },
  {
    "title": "Formação ProMeQuaLab: Desempenho dos participantes do PNAEQ — Morfologia sangue periférico (2020-2024)",
    "date": "24 Setembro 2026",
    "category": "Hematologia / Qualidade",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "PNAEQ / ProMeQuaLab",
    "link": "https://promequalab.org.cv/",
    "region": "Online",
    "description": "Formação ProMeQuaLab sobre desempenho dos participantes do PNAEQ em morfologia de sangue periférico."
  },
  {
    "title": "Congresso Nacional de Hematologia Clínica",
    "date": "15-17 Outubro 2026",
    "category": "Hematologia",
    "type": "Congresso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SPH",
    "link": "https://sph.org.pt/",
    "region": "Portugal",
    "description": "Congresso nacional dedicado à hematologia clínica."
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
    "description": "Congresso brasileiro dedicado à hematologia, hemoterapia e terapia celular."
  },
  {
    "title": "IUMS 2026 — Congresso Internacional de Microbiologia em Lisboa",
    "date": "04 a 06 Novembro 2026",
    "category": "Microbiologia / Infeção",
    "type": "Congresso Presencial",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "International Union of Microbiological Societies (IUMS)",
    "link": "https://www.iums2026.com/",
    "region": "Lisboa, Portugal",
    "description": "Congresso internacional de microbiologia realizado em Lisboa."
  },
  {
    "title": "Jornadas do Grupo de Estudos de Leucemias e Linfomas",
    "date": "06-07 Novembro 2026",
    "category": "Hematologia / Oncologia",
    "type": "Jornadas Presenciais",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "GELL",
    "link": "https://www.gell.pt",
    "region": "Portugal",
    "description": "Jornadas dedicadas ao estudo das leucemias e linfomas."
  },
  {
    "title": "EFISG: Difficult and Curious Fungal Diseases Clinical Cases",
    "date": "17 Novembro 2026, 13h00",
    "category": "Microbiologia / Infeção",
    "type": "Webinar via Zoom",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "ESCMID Fungal Infection Study Group (EFISG)",
    "link": "https://www.escmid.org/",
    "region": "Online",
    "description": "Webinar com discussão de casos clínicos difíceis e curiosos em doenças fúngicas."
  },
  {
    "title": "Workshop de Gasometria Arterial e Distúrbios Ácido-Base",
    "date": "19 Novembro 2026",
    "category": "Bioquímica / Urgência",
    "type": "Workshop Prático",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "CHULN",
    "link": "https://www.chuln.min-saude.pt",
    "region": "Portugal",
    "description": "Workshop prático sobre gasometria arterial e distúrbios ácido-base."
  },
  {
    "title": "IMPACT-ICU: Infection management and prevention - advances and current trends for intensive care unit patients",
    "date": "Novembro 2026",
    "category": "Microbiologia / Infeção",
    "type": "Curso / Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "ESCMID",
    "link": "https://www.escmid.org/",
    "region": "Online",
    "description": "Curso/webinar sobre gestão e prevenção da infeção em doentes de cuidados intensivos."
  },
  {
    "title": "Webinar: Novas Diretrizes no Rastreio do Cancro do Colo do Útero",
    "date": "03 Dezembro 2026",
    "category": "Anatomia Patológica",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Liga Pt. Contra o Cancro",
    "link": "https://www.ligacontracancro.pt",
    "region": "Online",
    "description": "Webinar sobre novas diretrizes no rastreio do cancro do colo do útero."
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
    "description": "Encontro dedicado à aplicação da biologia molecular ao diagnóstico."
  },
  {
    "title": "Curso Fase Preanalítica en el Laboratorio Clínico",
    "date": "Período letivo 2026 - 2027",
    "category": "Qualidade / Pré-analítica",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/curso-fase-preanalitica-laboratorio-clinico/",
    "region": "Online",
    "description": "Curso online dedicado à fase pré-analítica no laboratório clínico."
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
    "description": "Curso online de casos clínicos em biologia hematológica."
  },
  {
    "title": "Curso de Bioestadística Básica Aplicada a las Ciencias de la Salud",
    "date": "Período letivo 2026 - 2027",
    "category": "Investigação / Bioestatística",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/curso-de-bioestadistica-basic-aplicada-a-las-ciencias-de-la-salud/",
    "region": "Online",
    "description": "Curso online de bioestatística básica aplicada às ciências da saúde."
  },
  {
    "title": "Gestión de Riesgos y Calidad en Pruebas en el Lugar de Atención al Paciente (POCT)",
    "date": "Período letivo 2026 - 2027",
    "category": "Qualidade / POCT",
    "type": "Curso online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/gestion-riesgos-calidad-pruebas-lugar-atencion-paciente-poct/",
    "region": "Online",
    "description": "Curso online sobre gestão de riscos e qualidade em testes junto ao doente (POCT)."
  },
  {
    "title": "Taller de Procesos Asistenciales en Enfermedad Renal Crónica (ERC)",
    "date": "Período letivo 2026 - 2027",
    "category": "Bioquímica Clínica / Nefrologia",
    "type": "Workshop / Taller online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "SEMEDLAB",
    "link": "https://semedlab.es/curso/taller-procesos-asistenciales-erc/",
    "region": "Online",
    "description": "Workshop online sobre processos assistenciais na doença renal crónica."
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
    "description": "Reuniões virtuais periódicas dedicadas à discussão de casos clínicos de mieloma múltiplo."
  },
  {
    "title": "Workshop: Os Impactos da Inteligência Artificial para a Genética e Genómica",
    "date": "A confirmar (2026)",
    "category": "Genética / Inovação",
    "type": "Workshop online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "Consultar Organização (LinkedIn Feed)",
    "link": "https://bit.ly/ia-mapa-genoma",
    "region": "Online",
    "description": "Workshop sobre os impactos da inteligência artificial na genética e genómica."
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
  'Medicina Laboratorial',
  'Bioquímica Clínica',
  'Microbiologia',
  'Qualidade',
  'Anatomia Patológica',
  'Biologia Molecular',
  'Toxicologia',
  'Bioestatística',
  'Urgência',
  'Bioquímica',
]

function normalizeCategory(category) {
  if (!category) return 'Outros'
  const normalized = normalizeText(category)

  if (normalized.includes('anatomia')) return 'Anatomia Patológica'
  if (normalized.includes('biologia molecular')) return 'Biologia Molecular'
  if (normalized.includes('bioestatistica') || normalized.includes('investigacao')) return 'Bioestatística'
  if (normalized.includes('bioquimica clinica')) return 'Bioquímica Clínica'
  if (normalized.includes('bioquimica') && normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('bioquimica')) return 'Bioquímica'
  if (normalized.includes('genetica') && normalized.includes('inovacao')) return 'Inovação'
  if (normalized.includes('genetica')) return 'Genética'
  if (normalized.includes('hematologia') || normalized.includes('hemostase') || normalized.includes('coagulacao')) return 'Hematologia'
  if (normalized.includes('microbiologia') || normalized.includes('infec')) return 'Microbiologia'
  if (normalized.includes('qualidade') || normalized.includes('pre-analitica') || normalized.includes('poct') || normalized.includes('urinalise')) return 'Qualidade'
  if (normalized.includes('toxicologia')) return 'Toxicologia'
  if (normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('medicina laboratorial')) return 'Medicina Laboratorial'
  if (normalized.includes('inovacao')) return 'Inovação'

  return category
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
      category: normalizeCategory(raw.categoria || raw.category || ''),
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
  const clean = normalizeText(original).replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim()

  const isoRange = clean.match(/(20\d{2})-(\d{2})-(\d{2})(?:\s*-\s*(20\d{2})-(\d{2})-(\d{2}))?/)
  if (isoRange) {
    const start = new Date(Number(isoRange[1]), Number(isoRange[2]) - 1, Number(isoRange[3]))
    const end = isoRange[4]
      ? new Date(Number(isoRange[4]), Number(isoRange[5]) - 1, Number(isoRange[6]))
      : new Date(start)
    end.setHours(23, 59, 59, 999)
    return { start, end, isApproximate: false }
  }

  const yearMatches = [...clean.matchAll(/20\d{2}/g)].map((match) => Number(match[0]))
  const monthMatches = [...clean.matchAll(/janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro/g)].map((match) => match[0])
  const dayMatches = [...clean.matchAll(/\b(\d{1,2})\b/g)]
    .map((match) => Number(match[1]))
    .filter((day) => day >= 1 && day <= 31)

  const startYear = yearMatches[0] || 2026
  const endYear = yearMatches[1] || startYear

  // Datas vagas: aparecem no arquivo/lista, mas não devem estragar o calendário.
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

  // Se só existir mês + ano, considera o mês inteiro para efeitos de arquivo.
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
  // Eventos com datas longas/vagas aparecem no primeiro dia do período para não encherem o mês todo.
  if (event.isApproximate || event.isLongRange) return isSameCalendarDay(event.startDate, day)
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0)
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59)
  return event.startDate <= dayEnd && event.endDate >= dayStart
}

function isFreeEvent(event) {
  const text = normalizeText(`${event.price || ''} ${event.type || ''} ${event.title || ''} ${event.description || ''}`)
  return text.includes('gratuito') || text.includes('gratis') || text.includes('free')
}

function formatDateForICS(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`
}

function addToCalendar(event) {
  const { start, end } = parseEventDate(event.date)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MedLab Calendar//PT',
    'BEGIN:VEVENT',
    `UID:${encodeURIComponent(event.title)}@medlabcalendar`,
    `DTSTAMP:${formatDateForICS(new Date())}`,
    `DTSTART:${formatDateForICS(start)}`,
    `DTEND:${formatDateForICS(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description || ''} Organizador: ${event.organizer || ''}. Link: ${event.link || ''}`,
    `LOCATION:${event.region || event.type || 'Online'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
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
        <Button variant="outline" className="full" onClick={() => addToCalendar(event)}><Download size={15} /> Adicionar ao Calendário</Button>
      </div>
    </div>
  )
}

function MonthlyCalendar({ events }) {
  const today = new Date()
  // O calendário abre sempre no mês atual, independentemente da data do primeiro evento.
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const calendarDays = useMemo(() => {
    const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
    const startOffset = (firstDay.getDay() + 6) % 7
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - startOffset)

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + index)
      const dateKey = date.toDateString()
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
  'Medicina Laboratorial': Microscope,
  'Bioquímica Clínica': TestTube2,
  'Microbiologia': Microscope,
  'Qualidade': ShieldCheck,
  'Anatomia Patológica': Search,
  'Biologia Molecular': Dna,
  'Toxicologia': FlaskConical,
  'Bioestatística': BarChart3,
  'Urgência': Ambulance,
  'Bioquímica': TestTube2,
}

function getCategoryIcon(category) {
  return categoryIcons[category] || FlaskConical
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
          setRawEvents(sheetEvents)
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