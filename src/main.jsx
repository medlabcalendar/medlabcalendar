import React from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarDays, Mail, Search, Upload, ExternalLink, Microscope, Filter, CheckCircle2 } from 'lucide-react'
import './styles.css'

const events = [
  {
    title: 'Updates in Molecular Diagnostics',
    date: '12 Jun 2026',
    area: 'Genética Molecular',
    type: 'Webinar online',
    price: 'Gratuito',
    certificate: 'Certificado disponível',
    organizer: 'International Laboratory Education',
  },
  {
    title: 'Quality Management in Clinical Laboratories',
    date: '18 Jun 2026',
    area: 'Qualidade Laboratorial',
    type: 'Curso online',
    price: 'Pago',
    certificate: 'Com certificado',
    organizer: 'Clinical Lab Academy',
  },
  {
    title: 'Antimicrobial Resistance: Laboratory Perspectives',
    date: '24 Jun 2026',
    area: 'Microbiologia',
    type: 'Webinar live',
    price: 'Gratuito',
    certificate: 'Sem informação',
    organizer: 'MedLab Network',
  },
]

const categories = [
  'Hematologia',
  'Microbiologia',
  'Bioquímica Clínica',
  'Genética Molecular',
  'Anatomia Patológica',
  'Imunologia',
  'Qualidade',
  'POCT',
]

function Button({ children, variant = 'primary', className = '' }) {
  return <button className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}>{children}</button>
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
              <p className="brand-subtitle">Laboratory education hub</p>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#events">Eventos</a>
            <a href="#categories">Categorias</a>
            <a href="#newsletter">Newsletter</a>
            <a href="#submit">Submeter evento</a>
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
              O MedLab Calendar centraliza oportunidades de formação em medicina laboratorial para que profissionais de laboratório não percam webinars, cursos, congressos e eventos científicos relevantes.
            </p>
            <div className="hero-actions">
              <a href="#events"><Button>Explorar próximos eventos</Button></a>
              <a href="#newsletter"><Button variant="outline">Subscrever newsletter</Button></a>
            </div>
            <p className="small">Curadoria independente. Sempre com link para a página oficial do organizador.</p>
          </div>

          <div className="card feature-card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Esta semana</p>
                <h2>Eventos em destaque</h2>
              </div>
              <div className="soft-icon"><Filter size={20} /></div>
            </div>
            <div className="event-list">
              {events.map((event) => (
                <div className="event-row" key={event.title}>
                  <div className="event-top">
                    <div>
                      <p className="event-title">{event.title}</p>
                      <p className="muted">{event.organizer}</p>
                    </div>
                    <span className="tag">{event.price}</span>
                  </div>
                  <div className="event-meta">
                    <span>{event.date}</span>
                    <span>{event.area}</span>
                    <span>{event.type}</span>
                    <span>{event.certificate}</span>
                  </div>
                </div>
              ))}
            </div>
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
              {events.map((event) => (
                <div className="card event-card" key={event.title}>
                  <div className="event-card-top">
                    <span className="tag">{event.area}</span>
                    <ExternalLink size={17} />
                  </div>
                  <h3>{event.title}</h3>
                  <p className="muted">{event.organizer}</p>
                  <div className="details">
                    <p><strong>Data:</strong> {event.date}</p>
                    <p><strong>Formato:</strong> {event.type}</p>
                    <p><strong>Custo:</strong> {event.price}</p>
                    <p><strong>Certificado:</strong> {event.certificate}</p>
                  </div>
                  <Button variant="outline" className="full">Ver página oficial</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Categorias</p>
            <h2>Organizado por áreas da medicina laboratorial.</h2>
            <p>Filtra oportunidades por especialidade, formato, idioma, custo ou certificado.</p>
          </div>
          <div className="grid-4">
            {categories.map((category) => (
              <div className="category-card" key={category}>
                <CheckCircle2 size={22} />
                <p>{category}</p>
              </div>
            ))}
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
              <h2>Organizas uma formação?</h2>
              <p>Submete cursos, webinars, congressos ou eventos relevantes para profissionais de laboratório. Todas as entradas devem incluir link oficial do organizador.</p>
            </div>
            <div className="submit-copy">
              <p><strong>Informação necessária:</strong> título, data, organizador, área, formato, custo, certificado e link oficial.</p>
              <p><strong>Nota legal:</strong> o MedLab Calendar atua como plataforma de curadoria e divulgação. Todos os cursos e eventos pertencem às respetivas entidades organizadoras.</p>
              <Button>Submeter evento</Button>
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
