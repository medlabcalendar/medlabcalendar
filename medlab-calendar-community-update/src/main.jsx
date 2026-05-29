import React from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarDays, Mail, Search, Upload, ExternalLink, Microscope, Filter, CheckCircle2, UsersRound, HeartHandshake } from 'lucide-react'
import './styles.css'

const suggestionEmail = 'medlabcalendar@gmail.com'

const events = [
  {
    title: '18.ª Reunião Científica da SPML',
    date: '29–31 Outubro 2026',
    area: 'Medicina Laboratorial',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: 'Sociedade Portuguesa de Medicina Laboratorial',
    link: 'https://spml.pt/',
    region: 'Portugal',
    description: 'Reunião científica nacional dedicada à atualização, partilha de conhecimento e discussão de trabalhos científicos em medicina laboratorial.',
  },
  {
    title: "PAM 2026 — Porto's Autoimmune Meeting",
    date: '1–3 Outubro 2026',
    area: 'Autoimunidade',
    type: 'Reunião científica presencial',
    price: 'Consultar inscrição',
    certificate: 'Consultar organização',
    organizer: "Porto's Autoimmune Meeting",
    link: 'https://portoautoimmunemeeting.pt/',
    region: 'Portugal',
    description: 'Encontro científico dedicado à autoimunidade, com foco na atualização e discussão multidisciplinar.',
  },
  {
    title: 'Curso de Antibioterapia | 18.ª Edição',
    date: '16–20 Novembro 2026',
    area: 'Microbiologia / Infeção',
    type: 'Curso',
    price: 'Pago',
    certificate: 'Consultar organização',
    organizer: 'Hospital da Luz Learning Health',
    link: 'https://www.hospitaldaluz.pt/learninghealth/pt/formacao/calendario-de-cursos-e-eventos/682/curso-antibioterapia-18-edicao',
    region: 'Portugal',
    description: 'Curso dedicado à utilização de antibioterapia e atualização em infeção, com organização da Hospital da Luz Learning Health.',
  },
]

const promequalabWebinars = [
  {
    title: 'Boas práticas no exame de urina de rotina em laboratório',
    date: '13 Agosto 2026',
    area: 'Urina / Qualidade',
    type: 'Formação online',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/',
    description: 'Formação ProMeQuaLab com Michelle Lima Garcez, Brasil, sobre boas práticas no exame de urina de rotina em laboratório.',
  },
  {
    title: 'Diagnóstico Laboratorial da Toxoplasmose',
    date: '6 Março 2025',
    area: 'Imunologia / Serologia',
    type: 'Formação gravada',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/formacoes/',
    description: 'Slides e gravação da formação disponibilizados pelo ProMeQuaLab.',
  },
  {
    title: 'Exames Hormonais em Indivíduos Transgêneros',
    date: '20 Março 2025',
    area: 'Bioquímica Clínica',
    type: 'Formação gravada',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/formacoes/',
    description: 'Slides e gravação da formação disponibilizados pelo ProMeQuaLab.',
  },
  {
    title: 'Gestão de Pessoal com Matriz de Competências',
    date: '15 Maio 2025',
    area: 'Qualidade / Gestão',
    type: 'Formação gravada',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/formacoes/',
    description: 'Formação orientada para gestão de pessoal e matriz de competências em contexto laboratorial.',
  },
  {
    title: 'Controlo Interno da Qualidade',
    date: '15 Agosto 2024',
    area: 'Qualidade',
    type: 'Formação gravada',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/formacoes/',
    description: 'Slides e gravação da formação sobre controlo interno da qualidade.',
  },
  {
    title: 'Avaliação Externa da Qualidade',
    date: '29 Agosto 2024',
    area: 'Qualidade',
    type: 'Formação gravada',
    organizer: 'ProMeQuaLab',
    link: 'https://promequalab.org.cv/formacoes/',
    description: 'Slides e gravação da formação sobre avaliação externa da qualidade.',
  },
]

const societyMeetings = [
  {
    title: '18.ª Reunião Científica da Sociedade Portuguesa de Medicina Laboratorial',
    date: '29–31 Outubro 2026',
    location: 'Fórum Braga',
    organizer: 'SPML',
    description: 'Reunião científica nacional dedicada à atualização, partilha de conhecimento e discussão de trabalhos científicos em medicina laboratorial.',
    link: 'https://spml.pt/',
  },
]

const categories = [
  'Medicina Laboratorial',
  'Autoimunidade',
  'Microbiologia / Infeção',
  'Hematologia',
  'Bioquímica Clínica',
  'Genética Molecular',
  'Imunologia',
  'Qualidade',
  'POCT',
]

const allTrainingItems = [...events, ...promequalabWebinars]

function Button({ children, variant = 'primary', className = '' }) {
  return <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}>{children}</button>
}

function EventCard({ event }) {
  return (
    <div className="card event-card">
      <div className="event-card-top">
        <span className="tag">{event.area}</span>
        <ExternalLink size={17} />
      </div>
      <h3>{event.title}</h3>
      <p className="muted">{event.organizer}</p>
      <p className="description">{event.description}</p>
      <div className="details">
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Formato:</strong> {event.type}</p>
        {'price' in event && <p><strong>Custo:</strong> {event.price}</p>}
        {'certificate' in event && <p><strong>Certificado:</strong> {event.certificate}</p>}
      </div>
      <a href={event.link} target="_blank" rel="noreferrer">
        <Button variant="outline" className="full">Ver página oficial</Button>
      </a>
    </div>
  )
}

function App() {
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
            <a href="#societies">Sociedades científicas</a>
            <a href="#categories">Categorias</a>
            <a href="#promequalab">ProMeQuaLab</a>
          </nav>
          <a href="#events"><Button>Ver eventos</Button></a>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div>
            <div className="pill"><CalendarDays size={16} /> Calendário de formação para profissionais de laboratório</div>
            <h1>Cursos, webinars e eventos laboratoriais num só lugar.</h1>
            <p className="lead">
              O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local, facilitando o acesso a oportunidades de aprendizagem contínua.
            </p>
            <div className="hero-actions">
              <a href="#events"><Button>Explorar próximos eventos</Button></a>
              <a href={`mailto:${suggestionEmail}?subject=Sugest%C3%A3o%20de%20evento%20para%20o%20MedLab%20Calendar&body=Ol%C3%A1%2C%0A%0AGostaria%20de%20sugerir%20o%20seguinte%20evento%3A%0A%0AT%C3%ADtulo%3A%0AData%3A%0AOrganizador%3A%0A%C3%81rea%3A%0AFormato%3A%0ALink%20oficial%3A%0A%0AObrigada.`}>
                <Button variant="outline">Sugerir evento</Button>
              </a>
            </div>
            <p className="small">Curadoria independente. Sempre com link para a página oficial do organizador.</p>
          </div>

          <div className="card feature-card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Portugal & Lusofonia</p>
                <h2>Eventos em destaque</h2>
              </div>
              <div className="soft-icon"><Filter size={20} /></div>
            </div>
            <div className="event-list">
              {allTrainingItems.slice(0, 4).map((event) => (
                <div className="event-row" key={event.title}>
                  <div className="event-top">
                    <div>
                      <p className="event-title">{event.title}</p>
                      <p className="muted">{event.organizer}</p>
                    </div>
                    <span className="tag">{event.area}</span>
                  </div>
                  <div className="event-meta">
                    <span>{event.date}</span>
                    <span>{event.type}</span>
                    <span>{event.region || 'Online'}</span>
                    <span>{event.price || 'Consultar'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="intro-section">
          <div className="container intro-card">
            <div className="soft-icon"><HeartHandshake size={22} /></div>
            <p className="eyebrow">Sobre o projeto</p>
            <h2>Uma ferramenta criada para ajudar colegas e fortalecer a comunidade laboratorial.</h2>
            <p>
              A formação em medicina laboratorial encontra-se frequentemente dispersa entre sociedades científicas, universidades, hospitais, empresas e redes profissionais. O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local, facilitando o acesso a oportunidades de aprendizagem contínua.
            </p>
          </div>
        </section>

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Próximos eventos</p>
                <h2>Descobre formação relevante sem perder tempo à procura.</h2>
              </div>
              <div className="search-box"><Search size={18} /> Pesquisar por tema, área ou organizador</div>
            </div>
            <div className="grid-3">
              {events.map((event) => <EventCard event={event} key={event.title} />)}
            </div>
          </div>
        </section>

        <section id="societies" className="container societies-section">
          <div className="section-intro">
            <p className="eyebrow">Reuniões de sociedades científicas</p>
            <h2>Eventos científicos nacionais a acompanhar.</h2>
            <p>Uma área dedicada a reuniões, congressos e encontros promovidos por sociedades científicas relevantes para a medicina laboratorial.</p>
          </div>
          <div className="society-list">
            {societyMeetings.map((meeting) => (
              <div className="society-card" key={meeting.title}>
                <div className="soft-icon"><UsersRound size={22} /></div>
                <div>
                  <h3>{meeting.title}</h3>
                  <p className="muted">{meeting.organizer} · {meeting.location}</p>
                  <p>{meeting.description}</p>
                  <div className="event-meta compact">
                    <span>{meeting.date}</span>
                    <span>Reunião científica</span>
                  </div>
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    <Button variant="outline">Ver página oficial</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Categorias</p>
            <h2>Eventos organizados por área.</h2>
            <p>Os eventos verdadeiros já adicionados ao site aparecem também dentro das respetivas categorias.</p>
          </div>
          <div className="category-event-grid">
            {categories.map((category) => {
              const matchingEvents = allTrainingItems.filter((event) => event.area.includes(category) || category.includes(event.area))
              return (
                <div className="category-panel" key={category}>
                  <div className="category-title-row">
                    <CheckCircle2 size={22} />
                    <h3>{category}</h3>
                  </div>
                  {matchingEvents.length > 0 ? (
                    <div className="mini-event-list">
                      {matchingEvents.map((event) => (
                        <a href={event.link} target="_blank" rel="noreferrer" className="mini-event" key={`${category}-${event.title}`}>
                          <strong>{event.title}</strong>
                          <span>{event.date} · {event.organizer}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="muted">Sem eventos adicionados nesta categoria por enquanto.</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section id="promequalab" className="white-section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">ProMeQuaLab</p>
                <h2>Webinars e formações disponíveis.</h2>
                <p className="section-copy">Seleção de formações disponibilizadas pelo ProMeQuaLab, incluindo conteúdos gravados e formações online na área laboratorial.</p>
              </div>
              <a href="https://promequalab.org.cv/formacoes/" target="_blank" rel="noreferrer">
                <Button variant="outline">Ver página ProMeQuaLab</Button>
              </a>
            </div>
            <div className="grid-3">
              {promequalabWebinars.map((event) => <EventCard event={event} key={event.title} />)}
            </div>
          </div>
        </section>

        <section id="newsletter" className="dark-section">
          <div className="container newsletter-grid">
            <div>
              <p className="eyebrow light">Newsletter</p>
              <h2>Recebe os principais cursos e webinars laboratoriais.</h2>
              <p>Uma seleção regular de oportunidades de formação, com foco em relevância, clareza e links oficiais.</p>
            </div>
            <div className="card newsletter-card">
              <div className="newsletter-title"><Mail size={22} /><h3>Subscrever atualizações</h3></div>
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
              <h2>Conheces uma formação relevante?</h2>
              <p>Ajuda a comunidade a descobrir cursos, webinars, congressos ou eventos científicos úteis para profissionais de laboratório.</p>
            </div>
            <div className="submit-copy">
              <p><strong>Informação ideal:</strong> título, data, organizador, área, formato, custo, certificado e link oficial.</p>
              <p><strong>Nota legal:</strong> o MedLab Calendar atua como plataforma de curadoria e divulgação. Todos os cursos e eventos pertencem às respetivas entidades organizadoras.</p>
              <a href={`mailto:${suggestionEmail}?subject=Sugest%C3%A3o%20de%20evento%20para%20o%20MedLab%20Calendar&body=Ol%C3%A1%2C%0A%0AGostaria%20de%20sugerir%20o%20seguinte%20evento%3A%0A%0AT%C3%ADtulo%3A%0AData%3A%0AOrganizador%3A%0A%C3%81rea%3A%0AFormato%3A%0ALink%20oficial%3A%0A%0AObrigada.`}>
                <Button>Sugerir evento</Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p>
          <p>Todos os eventos pertencem às respetivas entidades organizadoras.</p>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
