import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  CalendarDays,
  Mail,
  Search,
  Upload,
  ExternalLink,
  Microscope,
  Filter,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const submissionFormUrl =
  import.meta.env.VITE_EVENT_SUBMISSION_FORM_URL || 'https://forms.gle/COLOCA_AQUI_O_LINK_DO_GOOGLE_FORM'

const events = [
  {
    title: '13.ª Conferência Europeia sobre Doenças Raras e Medicamentos Órfãos',
    date: '3–4 Junho 2026',
    startDate: '2026-06-03',
    category: 'Genética Molecular',
    type: 'Conferência híbrida',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'EURORDIS',
    link: 'https://www.eurordis.org/',
    region: 'Praga + Online',
    description:
      'Conferência europeia dedicada às doenças raras, genética e medicina personalizada.',
  },
  {
    title: 'Biolog Webinar — Consistent Anaerobic Culture Results',
    date: '16 Junho 2026',
    startDate: '2026-06-16',
    category: 'Microbiologia / Infeção',
    type: 'Webinar online',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Biolog / RapidMicrobiology',
    link: 'https://www.rapidmicrobiology.com/events/all/webinar',
    region: 'Online',
    description:
      'Webinar sobre cultura anaeróbia e boas práticas em microbiologia clínica.',
  },
  {
    title: 'Webinar | Hemocromatose',
    date: '24 Junho 2026 · 18:30',
    startDate: '2026-06-24',
    category: 'Genética Molecular',
    type: 'Webinar online gratuito',
    price: 'Gratuito',
    certificate: 'Consultar organização',
    organizer: 'Ordem dos Farmacêuticos — Colégio de Análises Clínicas e Genética Humana',
    link: 'https://ordemfarmaceuticos.pt/pt/eventos/webinar-hemocromatose/',
    region: 'Online',
    description:
      'Sessão dedicada à hemocromatose, diagnóstico laboratorial e genética humana.',
  },
  {
    title: 'Urines get no respect: From afterthought to asset in diagnostic stewardship',
    date: '24 Junho 2026',
    startDate: '2026-06-24',
    category: 'Qualidade',
    type: 'Webinar',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'ADLM',
    link: 'https://myadlm.org/education/continuing-education',
    region: 'Online',
    description:
      'Webinar sobre urinálise, diagnostic stewardship e qualidade laboratorial.',
  },
  {
    title: 'New Rapid Microbial Testing System with Results in Hours',
    date: '25 Junho 2026',
    startDate: '2026-06-25',
    category: 'Microbiologia / Infeção',
    type: 'Webinar online',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'RapidMicrobiology',
    link: 'https://www.rapidmicrobiology.com/events/all/webinar',
    region: 'Online',
    description:
      'Webinar sobre novas tecnologias para diagnóstico microbiológico rápido.',
  },
  {
    title: 'EHA Scientific Meetings & Webinar Activities 2026',
    date: '2026',
    startDate: '2026-07-01',
    category: 'Hematologia',
    type: 'Série de webinars e sessões online',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'European Hematology Association',
    link: 'https://ehaweb.org/',
    region: 'Online',
    description:
      'Série contínua de webinars e sessões online sobre leucemias, linfomas, hemostase, hemoglobinopatias e hematologia clínica.',
  },
  {
    title: 'Boas práticas no exame de urina de rotina em laboratório',
    date: '13 Agosto 2026',
    startDate: '2026-08-13',
    category: 'Qualidade',
    type: 'Formação online',
    price: 'Consultar',
    certificate: 'Consultar organização',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    region: 'Online',
    description:
      'Formação sobre boas práticas no exame de urina de rotina em laboratório.',
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
    link: 'https://laboratorymedicine.europeannualconferences.com/',
    region: 'Amesterdão',
    description:
      'Congresso internacional dedicado à patologia, medicina laboratorial e diagnóstico.',
  },
  {
    title: 'Programa de Formação Avançada em Hematologia',
    date: 'Setembro 2025 – Julho 2027',
    startDate: '2026-09-01',
    category: 'Hematologia',
    type: 'Programa de formação online',
    price: 'Gratuito',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Hematologia',
    link: 'https://sph.org.pt/',
    region: 'Online',
    description:
      'Programa de formação avançada composto por sessões semanais online destinadas à atualização científica em Hematologia.',
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
    description:
      'Encontro científico dedicado à autoimunidade, com foco na atualização e discussão multidisciplinar.',
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
    description:
      'Curso de 35h sobre NGS, variant calling, priorização de variantes, bioinformática clínica e casos práticos laboratoriais.',
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
    description:
      'Reunião científica nacional dedicada à atualização, partilha de conhecimento e discussão de trabalhos científicos em medicina laboratorial.',
  },
  {
    title: 'Reunião Anual da Sociedade Portuguesa de Hematologia 2026',
    date: '5–7 Novembro 2026',
    startDate: '2026-11-05',
    category: 'Hematologia',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Hematologia',
    link: 'https://sph.org.pt/',
    region: 'Centro de Congressos de Lisboa',
    description:
      'Reunião científica anual da Sociedade Portuguesa de Hematologia.',
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
    description:
      'Curso dedicado à utilização de antibioterapia e atualização em infeção, organizado pela Hospital da Luz Learning Health.',
  },
  {
    title: '30.ª Reunião Anual da Sociedade Portuguesa de Genética Humana',
    date: '19–21 Novembro 2026',
    startDate: '2026-11-19',
    category: 'Genética Molecular',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Genética Humana',
    link: 'https://spgh.net/',
    region: 'Lisboa',
    description:
      'Reunião anual da Sociedade Portuguesa de Genética Humana, dedicada à genética humana e genómica clínica.',
  },
  {
    title: 'Curso em Aspetos Éticos e Sociais em Genética Clínica Laboratorial — 5.ª edição',
    date: '2026',
    startDate: '2026-12-01',
    category: 'Genética Molecular',
    type: 'Curso online',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Faculdade de Medicina da Universidade de Coimbra',
    link: 'https://www.uc.pt/fmuc/',
    region: 'Online',
    description:
      'Curso sobre interpretação de variantes, genética laboratorial, ética, aconselhamento genético e inteligência artificial em genética.',
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
]

const sortedEvents = [...events].sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

function getUpcomingEvents() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const futureEvents = sortedEvents.filter((event) => new Date(event.startDate) >= today)
  return futureEvents.length ? futureEvents : sortedEvents
}

function Button({ children, variant = 'primary', className = '' }) {
  return (
    <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}>
      {children}
    </button>
  )
}

function SuggestEventLink({ children }) {
  return (
    <a
      href={submissionFormUrl}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

function EventCard({ event }) {
  return (
    <div className="card event-card">
      <div className="event-card-top">
        <span className="tag">{event.category}</span>
        <a href={event.link} target="_blank" rel="noreferrer" aria-label={`Abrir página oficial de ${event.title}`}>
          <ExternalLink size={17} />
        </a>
      </div>
      <h3>{event.title}</h3>
      <p className="muted">{event.organizer}</p>
      <p className="description">{event.description}</p>
      <div className="details compact-details">
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Formato:</strong> {event.type}</p>
        <p><strong>Local:</strong> {event.region}</p>
      </div>
      <a href={event.link} target="_blank" rel="noreferrer">
        <Button variant="outline" className="full">Ver página oficial</Button>
      </a>
    </div>
  )
}

function App() {
  const upcomingEvents = getUpcomingEvents()
  const nextEvent = upcomingEvents[0]
  const nextEventsPreview = upcomingEvents.slice(1, 4)

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
            <a href="#submit">Organizadores</a>
            <a href="#newsletter">Newsletter</a>
          </nav>

          <a href="#events"><Button>Ver eventos</Button></a>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div>
            <div className="pill">
              <CalendarDays size={16} />
              Calendário de formação para profissionais de laboratório
            </div>
            <h1>Cursos, webinars e eventos laboratoriais num só lugar.</h1>
            <p className="lead">
              O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local,
              facilitando o acesso a oportunidades de aprendizagem contínua.
            </p>
            <div className="hero-actions">
              <a href="#events"><Button>Explorar próximos eventos</Button></a>
              <SuggestEventLink><Button variant="outline">Sugerir evento</Button></SuggestEventLink>
            </div>
            <p className="small">
              Curadoria independente. Sempre com link para a página oficial do organizador.
            </p>
          </div>

          <div className="card feature-card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Próximo evento</p>
                <h2>{nextEvent.title}</h2>
              </div>
              <div className="soft-icon"><Filter size={20} /></div>
            </div>

            <p className="muted feature-organizer">{nextEvent.organizer}</p>

            <div className="next-event-details">
              <p><strong>Data:</strong> {nextEvent.date}</p>
              <p><strong>Formato:</strong> {nextEvent.type}</p>
              <p><strong>Local:</strong> {nextEvent.region}</p>
              <span className="tag">{nextEvent.category}</span>
            </div>

            <p className="description">{nextEvent.description}</p>

            <a href={nextEvent.link} target="_blank" rel="noreferrer">
              <Button className="full">Ver página oficial</Button>
            </a>

            {nextEventsPreview.length > 0 && (
              <div className="next-preview">
                <p className="eyebrow">A seguir</p>
                {nextEventsPreview.map((event) => (
                  <a href={event.link} target="_blank" rel="noreferrer" className="next-preview-row" key={event.title}>
                    <span>{event.date}</span>
                    <strong>{event.title}</strong>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="about" className="intro-section">
          <div className="container intro-card">
            <div className="soft-icon"><HeartHandshake size={22} /></div>
            <p className="eyebrow">Sobre o projeto</p>
            <h2>Uma ferramenta criada para ajudar colegas e fortalecer a comunidade laboratorial.</h2>
            <p>
              A formação em medicina laboratorial encontra-se frequentemente dispersa entre sociedades científicas,
              universidades, hospitais, empresas e redes profissionais. O MedLab Calendar reúne cursos, webinars,
              congressos e reuniões científicas num único local, facilitando o acesso a oportunidades de aprendizagem
              contínua.
            </p>
            <p>
              Os eventos são identificados através de fontes públicas, sociedades científicas, instituições académicas,
              organizações profissionais, entidades de saúde e submissões da comunidade.
            </p>
          </div>
        </section>

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Eventos e formações</p>
                <h2>Próximas oportunidades de formação.</h2>
              </div>
              <div className="search-box">
                <Search size={18} />
                Eventos futuros ou formações ativas
              </div>
            </div>

            <div className="notice">
              Cada cartão apresenta apenas a informação essencial. Consulta a página oficial para programa, inscrição e certificados.
            </div>

            <div className="grid-3">
              {upcomingEvents.map((event) => <EventCard event={event} key={event.title} />)}
            </div>
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Categorias</p>
            <h2>Eventos organizados por área.</h2>
            <p>
              Uma visão rápida das áreas com eventos disponíveis. A lista completa fica concentrada na secção de eventos.
            </p>
          </div>

          <div className="category-event-grid">
            {categories.map((category) => {
              const matchingEvents = upcomingEvents.filter((event) => event.category === category)
              const nextCategoryEvent = matchingEvents[0]

              return (
                <div className="category-panel" key={category}>
                  <div className="category-title-row">
                    <CheckCircle2 size={22} />
                    <h3>{category}</h3>
                  </div>

                  {matchingEvents.length > 0 ? (
                    <div className="category-summary">
                      <p>
                        <strong>{matchingEvents.length}</strong>{' '}
                        {matchingEvents.length === 1 ? 'evento disponível' : 'eventos disponíveis'}
                      </p>
                      <a href="#events" className="mini-event">
                        <strong>Próximo: {nextCategoryEvent.title}</strong>
                        <span>{nextCategoryEvent.date}</span>
                      </a>
                    </div>
                  ) : (
                    <p className="muted">Sem eventos adicionados nesta categoria por enquanto.</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section id="newsletter" className="dark-section">
          <div className="container newsletter-grid">
            <div>
              <p className="eyebrow light">Newsletter</p>
              <h2>Recebe os principais cursos e webinars laboratoriais.</h2>
              <p>
                Uma seleção regular de oportunidades de formação, com foco em relevância, clareza e links oficiais.
              </p>
            </div>

            <div className="card newsletter-card">
              <div className="newsletter-title">
                <Mail size={22} />
                <h3>Subscrever atualizações</h3>
              </div>
              <div className="input-row">
                <input placeholder="O teu email" />
                <Button>Subscrever</Button>
              </div>
              <p className="small">Sem spam. Apenas formação relevante.</p>
            </div>
          </div>
        </section>

        <section id="submit" className="container submit-section">
          <div className="submit-card">
            <div>
              <div className="soft-icon"><Upload size={22} /></div>
              <h2>Para organizadores</h2>
              <p>
                Organiza um congresso, webinar, curso, workshop ou reunião científica nas áreas da Medicina Laboratorial?
                Submete o evento gratuitamente para revisão.
              </p>
              <p>
                Contacto: <strong>{contactEmail}</strong>
              </p>
            </div>

            <div className="submit-copy">
              <p>
                São bem-vindas submissões de sociedades científicas, universidades, hospitais, organizações profissionais
                e empresas do setor da saúde e diagnóstico.
              </p>
              <p>
                Todos os eventos são revistos antes da publicação. A submissão não garante publicação automática.
              </p>
              <SuggestEventLink><Button>Sugerir evento</Button></SuggestEventLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p>
          <p>Contacto: {contactEmail}</p>
          <p>Todos os eventos pertencem às respetivas entidades organizadoras.</p>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
