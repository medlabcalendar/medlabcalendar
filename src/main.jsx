import React from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarDays, Mail, Search, Upload, ExternalLink, Microscope, Filter, CheckCircle2, HeartHandshake, ClipboardList } from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = import.meta.env.VITE_GOOGLE_FORM_URL || ''

const events = [
  {
    title: 'Actualización en Medicina Personalizada',
    date: '1 Outubro 2026 – 15 Junho 2027',
    category: 'Genética Molecular',
    type: 'Curso online',
    price: '70 € sócios / 95 € não sócios',
    certificate: 'Consultar organização',
    organizer: 'Sociedad Española de Medicina de Laboratorio (SEMEDLAB)',
    link: 'https://formacion.semedlab.es/',
    region: 'Online',
    description: 'Formação avançada para profissionais de saúde, com 8 módulos especializados e fórum de discussão com especialistas. Inscrição até 1 de novembro de 2026.',
  },
  {
    title: 'Biolog Webinar — Consistent Anaerobic Culture Results',
    date: '16 Junho 2026',
    category: 'Microbiologia / Infeção',
    type: 'Webinar online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'Biolog / RapidMicrobiology',
    link: 'https://www.rapidmicrobiology.com/',
    region: 'Online',
    description: 'Webinar dedicado a cultura anaeróbia, microbiologia clínica e métodos de cultura.',
  },
  {
    title: 'Webinar | Hemocromatose',
    date: '24 Junho 2026, 18h30',
    category: 'Hematologia',
    type: 'Webinar gratuito / online',
    price: 'Gratuito',
    certificate: 'Consultar organização',
    organizer: 'Ordem dos Farmacêuticos — Colégio de Análises Clínicas e Genética Humana',
    link: 'https://www.ordemfarmaceuticos.pt/',
    region: 'Online',
    description: 'Webinar sobre hemocromatose, diagnóstico laboratorial e genética humana.',
  },
  {
    title: 'ADLM — Urines get no respect: From afterthought to asset in diagnostic stewardship',
    date: '24 Junho 2026',
    category: 'Qualidade',
    type: 'Webinar',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ADLM',
    link: 'https://myadlm.org/',
    region: 'Online',
    description: 'Webinar sobre urinálise, diagnostic stewardship e qualidade laboratorial.',
  },
  {
    title: 'New Rapid Microbial Testing System with Results in Hours',
    date: '25 Junho 2026',
    category: 'Microbiologia / Infeção',
    type: 'Webinar online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'RapidMicrobiology',
    link: 'https://www.rapidmicrobiology.com/',
    region: 'Online',
    description: 'Webinar sobre rapid microbiology, automação e diagnóstico microbiológico.',
  },
  {
    title: '13.ª Conferência Europeia sobre Doenças Raras e Medicamentos Órfãos',
    date: '3–4 Junho 2026',
    category: 'Doenças Raras',
    type: 'Conferência híbrida',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'EURORDIS',
    link: 'https://www.eurordis.org/',
    region: 'Praga + online',
    description: 'Conferência europeia sobre doenças raras, genética e medicina personalizada.',
  },
  {
    title: 'Boas práticas no exame de urina de rotina em laboratório',
    date: '13 Agosto 2026',
    category: 'Qualidade',
    type: 'Formação online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    region: 'Online',
    description: 'Formação sobre boas práticas no exame de urina de rotina em laboratório.',
  },
  {
    title: '20th International Conference on Pathology and Laboratory Medicine',
    date: '7–8 Setembro 2026',
    category: 'Medicina Laboratorial',
    type: 'Congresso internacional',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Europe Annual Conferences',
    link: 'https://annualconferences.org/',
    region: 'Amesterdão, Países Baixos',
    description: 'Congresso internacional dedicado à patologia, medicina laboratorial e diagnóstico.',
  },
  {
    title: "PAM 2026 — Porto's Autoimmune Meeting",
    date: '1–3 Outubro 2026',
    category: 'Autoimunidade',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: "Porto's Autoimmune Meeting",
    link: 'https://portoautoimmunemeeting.pt/',
    region: 'Portugal',
    description: 'Encontro científico dedicado à autoimunidade, com foco na atualização e discussão multidisciplinar.',
  },
  {
    title: 'Análise Computacional e Bioinformática de Variantes em Doença Genética',
    date: '12–16 Outubro 2026',
    category: 'Genética Molecular',
    type: 'Curso presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Instituto Nacional de Saúde Doutor Ricardo Jorge (INSA)',
    link: 'https://www.insa.min-saude.pt/',
    region: 'INSA, Lisboa',
    description: 'Curso de 35 horas sobre NGS, variant calling, priorização de variantes, bioinformática clínica e casos práticos laboratoriais.',
  },
  {
    title: '18.ª Reunião Científica da SPML',
    date: '29–31 Outubro 2026',
    category: 'Medicina Laboratorial',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Medicina Laboratorial',
    link: 'https://spml.pt/',
    region: 'Portugal',
    description: 'Reunião científica nacional dedicada à atualização, partilha de conhecimento e discussão de trabalhos científicos em medicina laboratorial.',
  },
  {
    title: 'Reunião Anual da Sociedade Portuguesa de Hematologia 2026',
    date: '5–7 Novembro 2026',
    category: 'Hematologia',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Hematologia (SPH)',
    link: 'https://sph.org.pt/',
    region: 'Centro de Congressos de Lisboa',
    description: 'Reunião anual da Sociedade Portuguesa de Hematologia, dedicada à atualização científica e partilha de conhecimento em hematologia.',
  },
  {
    title: 'Programa de Formação Avançada em Hematologia',
    date: 'Setembro 2025 – Julho 2027',
    category: 'Hematologia',
    type: 'Programa de formação online',
    price: 'Gratuito',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Hematologia (SPH)',
    link: 'https://sph.org.pt/',
    region: 'Online',
    description: 'Programa gratuito de formação avançada em hematologia, com sessões semanais online.',
  },
  {
    title: 'Curso de Antibioterapia | 18.ª Edição',
    date: '16–20 Novembro 2026',
    category: 'Microbiologia / Infeção',
    type: 'Curso',
    price: 'Pago',
    certificate: 'Consultar organização',
    organizer: 'Hospital da Luz Learning Health',
    link: 'https://www.hospitaldaluz.pt/learninghealth/pt/formacao/calendario-de-cursos-e-eventos/682/curso-antibioterapia-18-edicao',
    region: 'Portugal',
    description: 'Curso dedicado à utilização de antibioterapia e atualização em infeção, organizado pela Hospital da Luz Learning Health.',
  },
  {
    title: '30.ª Reunião Anual da Sociedade Portuguesa de Genética Humana',
    date: '19–21 Novembro 2026',
    category: 'Genética Molecular',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Genética Humana (SPGH)',
    link: 'https://spgh.net/',
    region: 'Lisboa, Portugal',
    description: 'Reunião científica dedicada à genética humana e genómica clínica.',
  },
  {
    title: 'EHA Scientific Meetings & Webinar Activities 2026',
    date: 'Ao longo de 2026',
    category: 'Hematologia',
    type: 'Série contínua de webinars e sessões online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'European Hematology Association (EHA)',
    link: 'https://ehaweb.org/',
    region: 'Online',
    description: 'Série de webinars e sessões online sobre leucemias, linfomas, hemostase, hemoglobinopatias e hematologia clínica.',
  },
  {
    title: 'EHA Scientific Meetings & Webinar Activities 2026 — Hemostase',
    date: 'Ao longo de 2026',
    category: 'Coagulação e Hemostase',
    type: 'Série contínua de webinars e sessões online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'European Hematology Association (EHA)',
    link: 'https://ehaweb.org/',
    region: 'Online',
    description: 'Sessões da EHA relevantes para hemostase, coagulação, trombose e hematologia clínica.',
  },
  {
    title: 'Curso em Aspetos Éticos e Sociais em Genética Clínica Laboratorial — 5.ª edição',
    date: '2026',
    category: 'Genética Molecular',
    type: 'Curso online',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Faculdade de Medicina da Universidade de Coimbra',
    link: 'https://www.uc.pt/fmuc/',
    region: 'Online',
    description: 'Curso sobre interpretação de variantes, genética laboratorial, ética, aconselhamento genético e IA em genética.',
  },
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
              <SuggestEventLink><Button variant="outline">Sugerir evento</Button></SuggestEventLink>
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
              <SuggestEventLink><Button>Sugerir evento</Button></SuggestEventLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-content"><p>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p><p>Contacto: <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
