import React from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarDays, Mail, Search, Upload, ExternalLink, Microscope, Filter, CheckCircle2, HeartHandshake, ClipboardList, Star, MapPin } from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = import.meta.env.VITE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSc22SEwuG9LJnLsQ0tgRrJA9zx2Fsr7cZ6iA9g06qRnemOxVw/viewform?usp=publish-editor'

const events = [
  {
    title: '13.ª Conferência Europeia sobre Doenças Raras e Medicamentos Órfãos',
    date: '3–4 Junho 2026',
    startDate: '2026-06-03',
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
    title: 'Biolog Webinar — Consistent Anaerobic Culture Results',
    date: '16 Junho 2026',
    startDate: '2026-06-16',
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
    title: 'Diagnóstico da Rubéola',
    date: '22 Junho 2026',
    startDate: '2026-06-22',
    category: 'Virologia / Diagnóstico',
    type: 'Formação online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    region: 'Online',
    description: 'Formação com Paula Palminha, de Portugal, dedicada ao diagnóstico laboratorial da rubéola.',
  },
  {
    title: 'Webinar | Hemocromatose',
    date: '24 Junho 2026, 18h30',
    startDate: '2026-06-24',
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
    startDate: '2026-06-24',
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
    startDate: '2026-06-25',
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
    title: 'Sistema de Gestão da Qualidade',
    date: '13 Julho 2026',
    startDate: '2026-07-13',
    category: 'Qualidade',
    type: 'Formação online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    region: 'Online',
    description: 'Formação com Carmen Aguiar, de Portugal, sobre sistema de gestão da qualidade em laboratórios.',
  },
  {
    title: 'Boas práticas na execução do exame de urina de rotina',
    date: '13 Agosto 2026',
    startDate: '2026-08-13',
    category: 'Qualidade',
    type: 'Formação online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    region: 'Online',
    description: 'Formação com Michelle Lima Garcez, farmacêutica do Brasil, sobre boas práticas no exame de urina de rotina em laboratório.',
  },
  {
    title: '20th International Conference on Pathology and Laboratory Medicine',
    date: '7–8 Setembro 2026',
    startDate: '2026-09-07',
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
    title: 'Desempenho dos participantes do PNAEQ – Morfologia sanguínea periférica (2020–2024)',
    date: '24 Setembro 2026',
    startDate: '2026-09-24',
    category: 'Hematologia',
    type: 'Formação online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    region: 'Online',
    description: 'Formação com Cláudia Florea, de Portugal, sobre desempenho dos participantes do PNAEQ em morfologia sanguínea periférica.',
  },
  {
    title: "PAM 2026 — Porto's Autoimmune Meeting",
    date: '1–3 Outubro 2026',
    startDate: '2026-10-01',
    category: 'Autoimunidade',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: "Porto's Autoimmune Meeting",
    link: 'https://portoautoimmunemeeting.pt/',
    region: 'Portugal',
    description: 'Encontro científico dedicado à autoimunidade, com foco na atualização multidisciplinar.',
  },
  {
    title: 'Análise Computacional e Bioinformática de Variantes em Doença Genética',
    date: '12–16 Outubro 2026',
    startDate: '2026-10-12',
    category: 'Genética Molecular',
    type: 'Curso presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Instituto Nacional de Saúde Doutor Ricardo Jorge (INSA)',
    link: 'https://www.insa.min-saude.pt/',
    region: 'INSA, Lisboa',
    description: 'Curso de 35 horas sobre NGS, variant calling, priorização de variantes e bioinformática clínica.',
  },
  {
    title: '18.ª Reunião Científica da SPML',
    date: '29–31 Outubro 2026',
    startDate: '2026-10-29',
    category: 'Medicina Laboratorial',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Medicina Laboratorial',
    link: 'https://spml.pt/',
    region: 'Portugal',
    description: 'Reunião científica nacional dedicada à atualização e partilha em medicina laboratorial.',
  },
  {
    title: 'Reunião Anual da Sociedade Portuguesa de Hematologia 2026',
    date: '5–7 Novembro 2026',
    startDate: '2026-11-05',
    category: 'Hematologia',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Hematologia (SPH)',
    link: 'https://sph.org.pt/',
    region: 'Centro de Congressos de Lisboa',
    description: 'Reunião anual dedicada à atualização científica e partilha de conhecimento em hematologia.',
  },
  {
    title: 'Programa de Formação Avançada em Hematologia',
    date: 'Setembro 2025 – Julho 2027',
    startDate: '2026-01-01',
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
    startDate: '2026-11-16',
    category: 'Microbiologia / Infeção',
    type: 'Curso',
    price: 'Pago',
    certificate: 'Consultar organização',
    organizer: 'Hospital da Luz Learning Health',
    link: 'https://www.hospitaldaluz.pt/learninghealth/pt/formacao/calendario-de-cursos-e-eventos/682/curso-antibioterapia-18-edicao',
    region: 'Portugal',
    description: 'Curso dedicado à utilização de antibioterapia e atualização em infeção.',
  },
  {
    title: '30.ª Reunião Anual da Sociedade Portuguesa de Genética Humana',
    date: '19–21 Novembro 2026',
    startDate: '2026-11-19',
    category: 'Genética Molecular',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Genética Humana (SPGH)',
    link: 'https://spgh.net/',
    region: 'Lisboa, Portugal',
    description: 'Reunião científica dedicada à genética humana e genómica clínica.',
  },
]

const sortedEvents = [...events].sort((a, b) => new Date(`${a.startDate}T00:00:00`) - new Date(`${b.startDate}T00:00:00`))
const categoryLabels = [...new Set(sortedEvents.map((event) => event.category))]

function submissionHref() {
  if (googleFormUrl) return googleFormUrl
  return `mailto:${contactEmail}?subject=Sugest%C3%A3o%20de%20evento%20para%20o%20MedLab%20Calendar&body=Ol%C3%A1%2C%0A%0AGostaria%20de%20sugerir%20o%20seguinte%20evento%3A%0A%0AT%C3%ADtulo%3A%0AData%3A%0AOrganizador%3A%0A%C3%81rea%3A%0AFormato%3A%0ALink%20oficial%3A%0A%0AObrigada.`
}

function ButtonLink({ children, href, variant = 'primary', className = '', external = false }) {
  return (
    <a
      className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function SuggestEventLink({ children, className = '', variant = 'primary' }) {
  return <ButtonLink href={submissionHref()} external={Boolean(googleFormUrl)} className={className} variant={variant}>{children}</ButtonLink>
}

function nextUpcomingEvent() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return sortedEvents
    .map((event) => ({ ...event, parsedDate: new Date(`${event.startDate}T00:00:00`) }))
    .filter((event) => event.parsedDate >= today)
    .sort((a, b) => a.parsedDate - b.parsedDate)[0] || sortedEvents[0]
}

function groupEventsByMonth() {
  return sortedEvents.reduce((groups, event) => {
    const date = new Date(`${event.startDate}T00:00:00`)
    const month = date.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })
    if (!groups[month]) groups[month] = []
    groups[month].push(event)
    return groups
  }, {})
}

function EventCard({ event, compact = false }) {
  return (
    <article className="card event-card">
      <div className="event-card-top"><span className="tag">{event.category}</span><ExternalLink size={17} /></div>
      <h3>{event.title}</h3>
      <p className="muted">{event.organizer}</p>
      {!compact && <p className="description">{event.description}</p>}
      <div className="details">
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Formato:</strong> {event.type}</p>
        <p><strong>Local:</strong> {event.region}</p>
        <p><strong>Custo:</strong> {event.price}</p>
      </div>
      <ButtonLink href={event.link} external variant="outline" className="full">Ver página oficial</ButtonLink>
    </article>
  )
}

function FeaturedEvent({ event }) {
  return (
    <section className="container highlight-section" id="destaque">
      <div className="highlight-card">
        <div>
          <p className="eyebrow"><Star size={15} /> Evento de destaque</p>
          <h2>{event.title}</h2>
          <p className="description large">O próximo evento no calendário, destacado para acesso rápido.</p>
        </div>
        <div className="highlight-details">
          <span><CalendarDays size={17} /> {event.date}</span>
          <span><MapPin size={17} /> {event.region}</span>
          <span>{event.type}</span>
          <span>{event.category}</span>
          <ButtonLink href={event.link} external>Ver evento</ButtonLink>
        </div>
      </div>
    </section>
  )
}

function CalendarView() {
  const grouped = groupEventsByMonth()
  return (
    <section id="calendar" className="container calendar-section">
      <div className="section-intro compact-intro">
        <p className="eyebrow">Calendário</p>
        <h2>Agenda por mês.</h2>
        <p>Uma vista rápida para perceber quando acontecem os próximos cursos, webinars e reuniões.</p>
      </div>
      <div className="calendar-grid">
        {Object.entries(grouped).map(([month, monthEvents]) => (
          <div className="calendar-month" key={month}>
            <h3>{month}</h3>
            <div className="calendar-events">
              {monthEvents.map((event) => (
                <a href={event.link} target="_blank" rel="noreferrer" className="calendar-event" key={`${month}-${event.title}`}>
                  <strong>{event.date}</strong>
                  <span>{event.title}</span>
                  <small>{event.category}</small>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  const featuredEvents = sortedEvents.slice(0, 4)
  const highlightedEvent = nextUpcomingEvent()

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
            <a href="#calendar">Calendário</a>
            <a href="#organizers">Submeter</a>
          </nav>
          <ButtonLink href="#events">Ver eventos</ButtonLink>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div>
            <div className="pill"><CalendarDays size={16} /> Calendário de formação para profissionais de laboratório</div>
            <h1>Cursos, webinars e eventos laboratoriais num só lugar.</h1>
            <p className="lead">Uma agenda simples para descobrir formações relevantes em medicina laboratorial, sempre com ligação para a fonte oficial.</p>
            <div className="hero-actions">
              <ButtonLink href="#events">Explorar eventos</ButtonLink>
              <SuggestEventLink variant="outline">Submeter evento</SuggestEventLink>
            </div>
            <p className="small">Contacto: <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </div>

          <div className="card feature-card">
            <div className="card-header">
              <div><p className="eyebrow">Próximos eventos</p><h2>Em destaque</h2></div>
              <div className="soft-icon"><Filter size={20} /></div>
            </div>
            <div className="event-list">
              {featuredEvents.map((event) => (
                <a href={event.link} target="_blank" rel="noreferrer" className="event-row" key={event.title}>
                  <div className="event-top">
                    <div><p className="event-title">{event.title}</p><p className="muted">{event.date} · {event.type}</p></div>
                    <span className="tag">{event.category}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FeaturedEvent event={highlightedEvent} />

        <section id="about" className="intro-section">
          <div className="container intro-card">
            <div className="soft-icon"><HeartHandshake size={22} /></div>
            <p className="eyebrow">Sobre</p>
            <h2>Uma ferramenta de curadoria para a comunidade laboratorial.</h2>
            <p>O MedLab Calendar reúne eventos dispersos por sociedades científicas, universidades, hospitais e empresas. Cada entrada resume o essencial e encaminha para a página oficial da entidade organizadora.</p>
          </div>
        </section>

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div><p className="eyebrow">Eventos e formações</p><h2>Próximas oportunidades.</h2></div>
              <div className="search-box"><Search size={18} /> Pesquisa visual por tema, área ou organizador</div>
            </div>
            <div className="category-chips">{categoryLabels.map((category) => <span key={category}>{category}</span>)}</div>
            <div className="grid-3">{sortedEvents.map((event) => <EventCard event={event} compact key={event.title} />)}</div>
          </div>
        </section>

        <CalendarView />

        <section id="organizers" className="container organizers-section">
          <div className="organizers-card">
            <div>
              <div className="soft-icon"><ClipboardList size={22} /></div>
              <p className="eyebrow">Para Organizadores</p>
              <h2>Divulgue cursos, webinars e reuniões científicas relevantes.</h2>
              <p>Envie título, data, organizador, área, formato, local, custo, certificado e link oficial.</p>
            </div>
            <div className="organizers-copy">
              <p>A plataforma atua como serviço de curadoria e divulgação; os eventos pertencem às respetivas entidades organizadoras.</p>
              <p><strong>Email:</strong> <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
              <SuggestEventLink>Submeter evento</SuggestEventLink>
            </div>
          </div>
        </section>

        <section id="newsletter" className="dark-section">
          <div className="container newsletter-grid">
            <div><p className="eyebrow light">Newsletter</p><h2>Recebe os principais cursos e webinars laboratoriais.</h2><p>Uma seleção regular de oportunidades de formação, com foco em relevância, clareza e links oficiais.</p></div>
            <form className="card newsletter-card" action={`mailto:${contactEmail}`} method="post" encType="text/plain">
              <div className="newsletter-title"><Mail size={22} /><h3>Subscrever atualizações</h3></div>
              <div className="input-row"><input name="email" type="email" placeholder="O teu email" required /><button className="btn btn-primary" type="submit">Subscrever</button></div>
              <p className="small">Sem spam. Apenas formação relevante.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-content"><p>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p><p>Contacto: <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
