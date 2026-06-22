import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  CalendarDays,
  Search,
  ExternalLink,
  Microscope,
  Filter,
  HeartHandshake,
  ClipboardList,
  Download,
  Archive,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Star
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc22SEwuG9LJnLsQ0tgRrJA9zx2Fsr7cZ6iA9g06qRnemOxVw/viewform'
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

// Fallback estático adaptado para a nova estrutura dinâmica
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
    "description": "Encontro nacional focado nas atualizações científicas e diretrizes em diagnóstico pré-natal.",
    "featured": "Sim"
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
    "description": "Discussão sobre o impacto, desafios e futuro da inteligência artificial na rotina do laboratório clínico.",
    "featured": "Sim"
  }
]

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const monthMap = {
  janeiro: 0, fevereiro: 1, marco: 2, março: 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
}

// --- UTILITÁRIOS AUXILIARES ---
function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
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

    const activeValue = normalizeText(raw.ativo || raw.status || '')
    const isActive = !activeValue || ['sim', 'yes', 'published', 'publicado', 'ativo'].some((word) => activeValue.includes(word))

    return {
      title: raw.titulo || raw.title || '',
      date: raw.data || raw.date || raw.startdate || '',
      category: raw.categoria || raw.category || 'Geral', 
      type: raw.tipoformato || raw.formato || raw.type || 'Outro',
      organizer: raw.organizador || raw.organizer || '',
      link: raw.linkoficial || raw.link || raw.url || '',
      price: raw.custo || raw.price || raw.preco || '',
      certificate: raw.certificado || raw.certificate || '',
      region: raw.regiao || raw.region || raw.local || '',
      description: raw.descricao || raw.description || '',
      featured: raw.destaque || raw.featured || 'Não',
      status: isActive ? 'published' : 'draft',
    }
  }).filter((event) => event.title && event.status === 'published')
}

function parseEventDate(dateText = '') {
  const clean = normalizeText(dateText).replace(/\//g, '-').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim()
  const isoRange = clean.match(/(20\d{2})-(\d{1,2})-(\d{1,2})(?:\s*-\s*(20\d{2})-(\d{1,2})-(\d{1,2}))?/)
  
  if (isoRange) {
    const start = new Date(Number(isoRange[1]), Number(isoRange[2]) - 1, Number(isoRange[3]), 9, 0, 0)
    const end = isoRange[4]
      ? new Date(Number(isoRange[4]), Number(isoRange[5]) - 1, Number(isoRange[6]), 18, 0, 0)
      : new Date(Number(isoRange[1]), Number(isoRange[2]) - 1, Number(isoRange[3]), 23, 59, 59)
    return { start, end, isApproximate: false }
  }

  const yearMatches = [...clean.matchAll(/20\d{2}/g)].map((m) => Number(m[0]))
  const monthMatches = [...clean.matchAll(/janeiro|fevereiro|marco|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro/g)].map((m) => m[0])
  const dayMatches = [...clean.matchAll(/\b(\d{1,2})\b/g)].map((m) => Number(m[1])).filter((d) => d >= 1 && d <= 31)

  const startYear = yearMatches[0] || 2026
  const endYear = yearMatches[1] || startYear

  if (clean.includes('ultima segunda-feira') || clean.includes('cada mes') || clean.includes('periodo letivo') || clean.includes('a confirmar')) {
    return { start: new Date(startYear, 0, 1, 9, 0, 0), end: new Date(Math.max(endYear, startYear + 1), 11, 31, 18, 0, 0), isApproximate: true }
  }

  const startMonth = monthMatches[0] ? monthMap[monthMatches[0]] : 0
  const endMonth = monthMatches[1] ? monthMap[monthMatches[1]] : startMonth
  const startDay = dayMatches[0] || 1
  const endDay = dayMatches[1] || startDay
  const lastDay = new Date(endYear, endMonth + 1, 0).getDate()

  return {
    start: new Date(startYear, startMonth, startDay, 9, 0, 0),
    end: new Date(endYear, endMonth, dayMatches.length > 1 ? endDay : lastDay, 18, 0, 0),
    isApproximate: dayMatches.length === 0,
  }
}

function formatGoogleDate(date) {
  const pad = (v) => String(v).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`
}

function getGoogleCalendarUrl(event) {
  const { start, end } = parseEventDate(event.date)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: `${event.description || ''}\n\nOrganizador: ${event.organizer || ''}\nCategoria: ${event.category || ''}`,
    location: event.region || 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function getPreparedEvents(eventsSource) {
  const now = new Date()
  return eventsSource
    .map((event) => {
      const parsedDate = parseEventDate(event.date)
      const text = normalizeText(`${event.price} ${event.type} ${event.title} ${event.description}`)
      const isFree = text.includes('gratuito') || text.includes('gratis') || text.includes('free')
      return {
        ...event,
        startDate: parsedDate.start,
        endDate: parsedDate.end,
        isApproximate: parsedDate.isApproximate,
        isArchived: parsedDate.end < now,
        isFree,
      }
    })
    .sort((a, b) => a.startDate - b.startDate)
}

// --- COMPONENTES ATÓMICOS REUTILIZÁVEIS ---
function Button({ children, variant = 'primary', className = '', onClick }) {
  return (
    <button onClick={onClick} className={`btn ${variant === 'outline' ? 'btn-outline' : 'btn-primary'} ${className}`}>
      {children}
    </button>
  )
}

function EventCard({ event }) {
  return (
    <div className={`card event-card ${event.isArchived ? 'archived-event' : ''} ${event.isFree ? 'free-event' : ''}`}>
      <div className="event-card-top">
        <span className="tag">{event.category}</span>
        {event.isFree && <span className="tag free-badge">Gratuito</span>}
        {normalizeText(event.featured) === 'sim' && <span className="tag featured-badge"><Star size={12} fill="currentColor"/> Destaque</span>}
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
        <a href={getGoogleCalendarUrl(event)} target="_blank" rel="noreferrer"><Button variant="outline" className="full"><Download size={15} /> Calendar</Button></a>
      </div>
    </div>
  )
}

function MonthlyCalendar({ events }) {
  const [visibleMonth, setVisibleMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

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
        events: events.filter((event) => {
          if (event.isApproximate) return event.startDate.getFullYear() === date.getFullYear() && event.startDate.getMonth() === date.getMonth() && date.getDate() === 1
          const dStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
          const dEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
          return event.startDate <= dEnd && event.endDate >= dStart && !event.isArchived
        }),
      }
    })
  }, [visibleMonth, events])

  return (
    <section className="white-section calendar-section" id="calendar">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Calendário mensal</p>
            <h2>{monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}</h2>
          </div>
          <div className="calendar-controls">
            <Button variant="outline" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}><ChevronLeft size={16} /> Anterior</Button>
            <Button variant="outline" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}>Seguinte <ChevronRight size={16} /></Button>
          </div>
        </div>
        <div className="monthly-calendar">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => <div className="calendar-weekday" key={d}>{d}</div>)}
          {calendarDays.map(({ date, inMonth, events: dayEvents }) => (
            <div className={`calendar-day ${inMonth ? '' : 'calendar-day-muted'}`} key={date.toISOString()}>
              <strong>{date.getDate()}</strong>
              {dayEvents.slice(0, 2).map((e) => (
                <a href={e.link} target="_blank" rel="noreferrer" className={`calendar-event-pill ${e.isFree ? 'free-calendar-event' : ''}`} key={e.title}>{e.title}</a>
              ))}
              {dayEvents.length > 2 && <span className="small">+{dayEvents.length - 2} mais</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- ESTILOS COMPLEMENTARES ---
function FeatureStyles() {
  return (
    <style>{`
      .calendar-section { background: #fff; }
      .calendar-controls { display: flex; gap: 0.75rem; }
      .monthly-calendar { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.5rem; }
      .calendar-weekday { font-weight: 700; color: #475569; font-size: 0.85rem; padding: 0.5rem; text-align: center; }
      .calendar-day { min-height: 110px; border: 1px solid #e2e8f0; border-radius: 14px; padding: 0.55rem; background: #fff; display: flex; flex-direction: column; gap: 0.35rem; }
      .calendar-day-muted { opacity: 0.45; background: #f8fafc; }
      .calendar-event-pill { display: block; padding: 0.25rem 0.4rem; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 0.72rem; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .free-calendar-event, .free-badge { background: #dcfce7 !important; color: #166534 !important; }
      .featured-badge { background: #fef3c7 !important; color: #92400e !important; display: inline-flex; align-items: center; gap: 2px; }
      .free-event { border: 2px solid #86efac; }
      .archived-event { opacity: 0.7; }
      .filters-panel { display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 0.75rem; align-items: center; margin: 1rem 0; }
      .filters-panel input, .filters-panel select { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0.75rem; background: #fff; font: inherit; }
      .checkbox-filter { display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; cursor: pointer; }
      .stats-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
      .stats-row span { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 0.45rem 0.75rem; font-size: 0.9rem; }
      .card-actions { display: grid; gap: 0.5rem; margin-top: 1rem; }
      .category-search-box { display: flex; align-items: center; gap: 0.6rem; max-width: 600px; margin: 1.25rem auto; border: 1px solid #cbd5e1; border-radius: 999px; padding: 0.75rem 1rem; background: #fff; }
      .category-search-box input { width: 100%; border: 0; outline: 0; font: inherit; }
      .category-icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; }
      .category-icon-card { border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.25rem 1rem; background: #fff; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; transition: all 0.2s; }
      .category-icon-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
      .category-icon-circle { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #f1f5f9; color: #334155; }
      @media (max-width: 900px) {
        .monthly-calendar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .calendar-weekday { display: none; }
        .filters-panel { grid-template-columns: 1fr; }
      }
    `}</style>
  )
}

// --- APP COMPONENT ---
function App() {
  const [rawEvents, setRawEvents] = useState(fallbackEvents)
  const [sheetStatus, setSheetStatus] = useState('A carregar eventos da Google Sheet...')

  // Filtros de estado da UI
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedType, setSelectedType] = useState('Todos')
  const [onlyFree, setOnlyFree] = useState(false)
  const [showArchive, setShowArchive] = useState(false)
  const [categorySearch, setCategorySearch] = useState('')

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.text()
      })
      .then((text) => {
        const sheetEvents = parseCSV(text)
        if (sheetEvents.length > 0) {
          setRawEvents(sheetEvents)
          setSheetStatus(`Eventos sincronizados em tempo real: ${sheetEvents.length}`)
        } else {
          setSheetStatus('Ficheiro lido, mas sem eventos publicados ativos. A usar dados locais.')
        }
      })
      .catch(() => setSheetStatus('Ligação offline com o Google Sheets. A usar dados locais de reserva.'))
  }, [])

  // Processamento unificado dos dados
  const allEvents = useMemo(() => getPreparedEvents(rawEvents), [rawEvents])
  const activeEvents = useMemo(() => allEvents.filter((e) => !e.isArchived), [allEvents])
  const archivedEvents = useMemo(() => allEvents.filter((e) => e.isArchived), [allEvents])

  // EXTRACTORES DINÂMICOS (O núcleo do CMS - Lê a folha e constrói as opções)
  const dynamicCategories = useMemo(() => {
    const unique = new Set(allEvents.map((e) => e.category?.trim()).filter(Boolean))
    return [...unique].sort()
  }, [allEvents])

  const dynamicTypes = useMemo(() => {
    const unique = new Set(allEvents.map((e) => e.type?.trim()).filter(Boolean))
    return [...unique].sort()
  }, [allEvents])

  const featuredEvents = useMemo(() => {
    // Procura eventos marcados com 'Sim' na coluna destaque; se não houver, mostra os 4 mais recentes ativos
    const marked = activeEvents.filter((e) => normalizeText(e.featured) === 'sim')
    return marked.length > 0 ? marked.slice(0, 4) : activeEvents.slice(0, 4)
  }, [activeEvents])

  // Lógica de filtragem reativa
  const currentSource = showArchive ? archivedEvents : activeEvents
  const filteredEvents = currentSource.filter((event) => {
    const searchString = normalizeText(`${event.title} ${event.organizer} ${event.category} ${event.description} ${event.type} ${event.region}`)
    const matchesSearch = searchString.includes(normalizeText(query))
    const matchesCategory = selectedCategory === 'Todas' || event.category === selectedCategory
    const matchesType = selectedType === 'Todos' || event.type === selectedType
    const matchesFree = !onlyFree || event.isFree
    return matchesSearch && matchesCategory && matchesType && matchesFree
  })

  const visibleCategories = dynamicCategories.filter((cat) => normalizeText(cat).includes(normalizeText(categorySearch)))

  return (
    <div className="page">
      <FeatureStyles />
      <header className="header">
        <div className="container nav">
          <div className="brand">
            <div className="brand-icon"><Microscope size={22} /></div>
            <div>
              <p className="brand-title">MedLab Calendar</p>
              <p className="brand-subtitle">Dynamic Laboratory Hub</p>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#calendar">Calendário</a>
            <a href="#events">Formações</a>
            <a href="#categories">Áreas Administrativas</a>
          </nav>
          <a href="#events"><Button>Ver Tudo</Button></a>
        </div>
      </header>

      <main>
        <div className="container"><p className="small" style={{ marginTop: '1rem', color: '#0284c7' }}>● {sheetStatus}</p></div>
        
        <section className="container hero">
          <div>
            <div className="pill"><CalendarDays size={16} /> Gestão Automatizada via Google Sheets</div>
            <h1>Plataforma de Formação Laboratorial Conectada</h1>
            <p className="lead">Um ecossistema modular onde o código é estático e a administração é livre. Altere qualquer dado na sua folha de cálculo e veja as atualizações instantaneamente.</p>
            
            <div className="stats-row">
              <span>{activeEvents.length} Ativos</span>
              <span>{activeEvents.filter(e => e.isFree).length} Gratuitos</span>
              <span>{dynamicCategories.length} Áreas Criadas</span>
              <span>{archivedEvents.length} No Arquivo</span>
            </div>
          </div>

          <div className="card feature-card">
            <div className="card-header">
              <div><p className="eyebrow">Destaques dinâmicos</p><h2>Painel de Evidência</h2></div>
              <div className="soft-icon"><Star size={20} fill="#eab308" color="#eab308" /></div>
            </div>
            <div className="event-list">
              {featuredEvents.map((event) => (
                <div className="event-row" key={event.title}>
                  <div className="event-top">
                    <div><p className="event-title">{event.title}</p><p className="muted">{event.organizer}</p></div>
                    <span className="tag">{event.category}</span>
                  </div>
                  <div className="event-meta"><span>{event.date}</span><span>{event.type}</span><span>{event.price}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MonthlyCalendar events={allEvents} />

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div><p className="eyebrow">Filtros Inteligentes</p><h2>Explorador de Conteúdo</h2></div>
              <Button variant="outline" onClick={() => setShowArchive(!showArchive)}>{showArchive ? 'Ver Eventos Futuros' : 'Consultar Histórico (Arquivo)'}</Button>
            </div>

            {/* PAINEL DE FILTROS TOTALMENTE AUTOMÁTICO */}
            <div className="filters-panel">
              <label className="search-input">
                <Search size={18} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquise por termo, palavra-chave ou hospital..." />
              </label>
              
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="Todas">Todas as Áreas</option>
                {dynamicCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="Todos">Todos os Formatos</option>
                {dynamicTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              <label className="checkbox-filter">
                <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} /> 
                Apenas Gratuitos
              </label>
            </div>

            <div className="notice">
              {showArchive ? 'A visualizar registos passados armazenados para fins de consulta e portefólio.' : 'A mostrar eventos ativos programados.'} Encontrámos {filteredEvents.length} resultado(s).
            </div>
            
            <div className="grid-3">
              {filteredEvents.map((event) => <EventCard event={event} key={event.title} />)}
            </div>
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Indexação por Segmento</p>
            <h2>Segmentação Automática</h2>
            <p>Se criares uma nova Área no Google Sheets, um novo cartão com contador integrado será gerado aqui sem intervenção técnica.</p>
          </div>

          <label className="category-search-box">
            <Search size={18} />
            <input value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} placeholder="Procurar categoria na folha..." />
          </label>

          <div className="category-icon-grid">
            {visibleCategories.map((category) => {
              const totalActive = activeEvents.filter((e) => e.category === category).length
              return (
                <button type="button" className="category-icon-card" key={category} onClick={() => {
                  setSelectedCategory(category)
                  setShowArchive(false)
                  document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  <div className="category-icon-circle"><FlaskConical size={22} /></div>
                  <strong>{category}</strong>
                  <span>{totalActive} ativo(s)</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="container organizers-section">
          <div className="organizers-card">
            <div>
              <div className="soft-icon"><ClipboardList size={22} /></div>
              <p className="eyebrow">Administração</p>
              <h2>Como funciona o seu Painel de Controlo?</h2>
              <p>O seu site consome a exportação direta em formato CSV da folha de cálculo pública do Google Sheets. Mude as colunas, insira linhas ou altere as restrições de visibilidade diretamente na nuvem.</p>
            </div>
            <div className="organizers-copy">
              <p><strong>Campos detetados na estrutura:</strong> Título, Data, Categoria, Formato/Tipo, Organizador, Link Oficial, Custo, Certificado, Região e Destaque.</p>
              <a href={googleFormUrl} target="_blank" rel="noreferrer"><Button>Aceder Formulário de Submissão</Button></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>© 2026 MedLab Calendar. Arquitetura CMS Dinâmica.</p>
          <p>Contacto Técnico: <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
