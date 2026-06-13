import React from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarDays, Mail, Search, Upload, ExternalLink, Microscope, Filter, CheckCircle2, HeartHandshake, ClipboardList } from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfXijgOfXJmS4vI1MgGRUtOdeWGnjxqqBExShPjlnPlAK6S4Q/viewform'

const events = [
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
    "category": "Anatomia Patológica / Oncologia",
    "type": "Webinar online",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "MedLab Calendar (LinkedIn)",
    "link": "https://lnkd.in/dm6vFXc4",
    "region": "Online",
    "description": "Webinar dedicado à imunohistoquímica e ao seu papel no diagnóstico em anatomia patológica e oncologia."
  },
  {
    "title": "2.ªs Jornadas Prof. Margarida Lima — Mieloma Múltiplo: teoria e prática",
    "date": "19 Junho 2026",
    "category": "Hematologia",
    "type": "Presencial (Chaves)",
    "price": "A consultar",
    "certificate": "Sim",
    "organizer": "APsa & Grupo Português de Mieloma Múltiplo",
    "link": "https://www.sph.org.pt/index.php/noticias/309-2as-jornadas-prof-margarida-lima-mieloma-multiplo-pratica-e-teoria",
    "region": "Chaves, Portugal",
    "description": "Jornadas dedicadas ao mieloma múltiplo, com abordagem teórica e prática."
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
    "link": "https://www.sph.pt",
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

const categories = [
  'Medicina Laboratorial',
  'Autoimunidade',
  'Bioquímica Clínica',
  'Hematologia',
  'Coagulação e Hemostase',
  'Imunologia',
  'Microbiologia / Infeção',
  'Genética Molecular',
  'Qualidade',
  'Doenças Raras',
]

function Button({ children, variant = 'primary', className = '' }) {
  return <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}>{children}</button>
}

function submissionHref() {
  if (googleFormUrl) return googleFormUrl
  return `mailto:${contactEmail}?subject=Sugest%C3%A3o%20de%20evento%20para%20o%20MedLab%20Calendar&body=Ol%C3%A1%2C%0A%0AGostaria%20de%20sugerir%20o%20seguinte%20evento%3A%0A%0AT%C3%ADtulo%3A%0AData%3A%0AOrganizador%3A%0A%C3%81rea%3A%0AFormato%3A%0ALink%20oficial%3A%0A%0AObrigada.`
}

function SuggestEventLink({ children }) {
  return <a href={submissionHref()} target={googleFormUrl ? '_blank' : undefined} rel={googleFormUrl ? 'noreferrer' : undefined}>{children}</a>
}

function EventCard({ event }) {
  return (
    <div className="card event-card">
      <div className="event-card-top"><span className="tag">{event.category}</span><ExternalLink size={17} /></div>
      <h3>{event.title}</h3>
      <p className="muted">{event.organizer}</p>
      <p className="description">{event.description}</p>
      <div className="details">
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Formato:</strong> {event.type}</p>
        <p><strong>Custo:</strong> {event.price}</p>
        <p><strong>Certificado:</strong> {event.certificate}</p>
      </div>
      <a href={event.link} target="_blank" rel="noreferrer"><Button variant="outline" className="full">Ver página oficial</Button></a>
    </div>
  )
}

function App() {
  const featuredEvents = events.slice(0, 4)

  return (
    <div className="page">
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
            <a href="#events">Eventos</a>
            <a href="#categories">Categorias</a>
            <a href="#organizers">Para Organizadores</a>
          </nav>
          <a href="#events"><Button>Ver eventos</Button></a>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div>
            <div className="pill"><CalendarDays size={16} /> Calendário de formação para profissionais de laboratório</div>
            <h1>Cursos, webinars e eventos laboratoriais num só lugar.</h1>
            <p className="lead">O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local, facilitando o acesso a oportunidades de aprendizagem contínua.</p>
            <div className="hero-actions">
              <a href="#events"><Button>Explorar próximos eventos</Button></a>
              <SuggestEventLink><Button variant="outline">Submeter evento</Button></SuggestEventLink>
              <a href="https://1534ef9d.sibforms.com/serve/MUIFAHFh5N7BeM-dVw2LycaCbsspKR2qDeIx-bR6hWDL3C_3flMkcOYIvSZhwbQFOZkkX6WIeH4AUHaz8iRgywSR6IXV0cCHoHHbe2f0toIHQKYqkVCRKJpywPb2QCAA3D_x5pV1Pl4oJ8qdLPwya_iaMkJU5RHsgFo-D4Iizfs61iTuEvA-NhRSvcmw3BalvcZxEFA1z1AqQ4949w==" target="_blank" rel="noreferrer"><Button variant="outline">Subscrever Newsletter</Button></a>
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
                    <span className="tag">{event.category}</span>
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

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div><p className="eyebrow">Eventos e formações</p><h2>Descobre formação relevante sem perder tempo à procura.</h2></div>
              <div className="search-box">Pesquisar por tema, área ou organizador</div>
            </div>
            <div className="notice">São apresentados prioritariamente eventos futuros ou formações atualmente disponíveis.</div>
            <div className="grid-3">{events.map((event) => <EventCard event={event} key={event.title} />)}</div>
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Categorias</p>
            <h2>Eventos organizados por área.</h2>
            <p>As formações, cursos e reuniões científicas são distribuídos pelas respetivas áreas para facilitar a navegação.</p>
          </div>
          <div className="category-event-grid">
            {categories.map((category) => {
              const matchingEvents = events.filter((event) => event.category === category)
              return (
                <div className="category-panel" key={category}>
                  <div className="category-title-row"><CheckCircle2 size={22} /><h3>{category}</h3></div>
                  {matchingEvents.length > 0 ? (
                    <div className="mini-event-list">
                      {matchingEvents.map((event) => (
                        <a href={event.link} target="_blank" rel="noreferrer" className="mini-event" key={`${category}-${event.title}`}>
                          <strong>{event.title}</strong>
                          <span>{event.date} · {event.organizer}</span>
                        </a>
                      ))}
                    </div>
                  ) : <p className="muted">Sem eventos adicionados nesta categoria por enquanto.</p>}
                </div>
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
