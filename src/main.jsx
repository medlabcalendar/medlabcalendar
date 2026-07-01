O erro que ocorreu deveu-se à falta de uma chaveta de fecho } logo no final do componente App, o que quebrou a estrutura do código JavaScript/React.Aqui tem o código totalmente corrigido, já com a frase integrada no rodapé (footer) e com o erro de sintaxe solucionado.  Aproveitei também para adicionar um pequeno espaçamento vertical e flexibilidade ao rodapé para que o novo parágrafo fique visualmente bem enquadrado no design da página.  JavaScriptimport React, { useEffect, useMemo, useState } from 'react'
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
  Dna,
  Droplets,
  ShieldCheck,
  FlaskConical,
  Ambulance,
  BarChart3,
  Lightbulb,
  TestTube2,
  AlertTriangle
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc22SEwuG9LJnLsQ0tgRrJA9zx2Fsr7cZ6iA9g06qRnemOxVw/viewform'

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

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
    .trim()
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
  if (normalized.includes('toxicologia') || normalized.includes('toxicolog')) return 'Toxicologia'
  if (normalized.includes('bioquimica') && normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('bioquim')) return 'Bioquímica Clínica'
  if (normalized.includes('nefrologia')) return 'Bioquímica Clínica'
  if (normalized.includes('neurologia')) return 'Bioquímica Clínica'
  if (normalized.includes('genetica') && normalized.includes('inovacao')) return 'Inovação'
  if (normalized.includes('genet')) return 'Genética'
  if (normalized.includes('hemostase') || normalized.includes('coagul')) return 'Coagulação e Hemostase'
  if (normalized.includes('hematolog') || normalized.includes('mieloma') || normalized.includes('oncologia')) return 'Hematologia'
  if (normalized.includes('microbiolog') || normalized.includes('infec') || normalized.includes('fungal') || normalized.includes('rubeola')) return 'Microbiologia'
  if (normalized.includes('qualidade') || normalized.includes('pre-analitica') || normalized.includes('poct') || normalized.includes('urinalise')) return 'Qualidade'
  if (normalized.includes('imunolog') || normalized.includes('imuno')) return 'Imunologia'
  if (normalized.includes('medicina laboratorial')) return 'Medicina Laboratorial'
  if (normalized.includes('inovacao') || normalized.includes('inteligencia artificial')) return 'Inovação'

  for (const official of areaCategories) {
    if (normalizeText(official) === normalized) {
      return official
    }
  }

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

  const headers = rows[0].map((header) => normalizeText(header))

  return rows.slice(1).map((cells) => {
    const raw = {}
    headers.forEach((header, index) => {
      raw[header] = cells[index] || ''
    })

    const activeValue = normalizeText(raw['ativo?'] || raw['status'] || '')
    const isActive = !activeValue || ['sim', 'yes', 'published', 'publicado', 'ativo'].some((word) => activeValue.includes(word))

    const deadlineText = raw['data limite de inscricao'] || raw['datalimite'] || raw['deadline'] || ''
    const hasDeadline = deadlineText.trim().length > 0

    return {
      title: raw['titulo'] || raw['title'] || '',
      date: raw['data'] || raw['date'] || raw['datainicio'] || '',
      startDateRaw: raw['datainicio'] || '',
      endDateRaw: raw['datafim'] || '',
      category: normalizeCategory(raw['areacategoria'] || raw['categoria'] || raw['area'] || ''),
      type: raw['tipoformato'] || raw['formato'] || raw['tipo'] || '',
      organizer: raw['organizador'] || raw['organizer'] || '',
      link: raw['link oficial'] || raw['linkoficial'] || raw['link'] || '',
      price: raw['custo'] || raw['preco'] || '',
      certificate: raw['certificado'] || '',
      region: raw['regiao'] || raw['local'] || '',
      description: raw['descricao'] || raw['description'] || '',
      status: isActive ? 'published' : 'draft',
      deadline: deadlineText, 
      isUrgente: hasDeadline,
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
      end: new Date(startYear + 1, 11, 31, 18, 0, 0),
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

function isCalendarEventOnDay(event, day) {
  const d = new Date(day)
  const start = event.startDate
  return (
    d.getFullYear() === start.getFullYear() &&
    d.getMonth() === start.getMonth() &&
    d.getDate() === start.getDate()
  )
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
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title || 'Evento MedLab Calendar',
    dates: `${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate)}`,
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
      return {
        ...normalizedEvent,
        startDate: parsedDate.start,
        endDate: parsedDate.end,
        isApproximate: parsedDate.isApproximate,
        isArchived: parsedDate.end < now,
        isFree: isFreeEvent(normalizedEvent),
      }
    })
    .sort((a, b) => a.startDate - b.startDate)
}

function EventCard({ event }) {
  return (
    <div className={`card event-card ${event.isArchived ? 'archived-event' : ''} ${event.isFree ? 'free-event' : ''} ${event.isUrgente ? 'urgent-event' : ''}`}>
      <div className="event-card-top">
        <span className="tag">{event.category}</span>
        {event.isFree && <span className="tag free-badge">Gratuito</span>}
        {event.isUrgente && <span className="tag urgent-badge"><AlertTriangle size={12} /> Limite Inscrição</span>}
        {event.isArchived && <span className="tag archived-badge"><Archive size={14} /> Arquivo</span>}
        <ExternalLink size={17} />
      </div>
      <h3>{event.title}</h3>
      <p className="muted">{event.organizer}</p>
      <p className="description">{event.description}</p>
      <div className="details">
        <p><strong>Data do Evento:</strong> {event.date}</p>
        {event.deadline && (
          <p style={{ color: '#b45309', fontWeight: '600' }}>
            <strong>Inscrições até:</strong> {event.deadline}
          </p>
        )}
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

function MonthlyCalendar({ events, onMonthChange }) {
  const today = new Date()
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDayEvents, setSelectedDayEvents] = useState(null)
  const [selectedDayLabel, setSelectedDayLabel] = useState('')

  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(visibleMonth)
    }
  }, [visibleMonth, onMonthChange])

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

  const handleDayClick = (dayDate, dayEvents) => {
    if (dayEvents.length > 0) {
      setSelectedDayEvents(dayEvents)
      setSelectedDayLabel(`${dayDate.getDate()} de ${monthNames[dayDate.getMonth()]}`)
    } else {
      setSelectedDayEvents(null)
    }
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
            <Button variant="outline" onClick={() => setVisibleMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}><ChevronLeft size={16} /> Mês anterior</Button>
            <Button variant="outline" onClick={() => setVisibleMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>Mês seguinte <ChevronRight size={16} /></Button>
          </div>
        </div>
        
        <div className="calendar-layout-container">
          <div className="monthly-calendar">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}
            {calendarDays.map(({ date, inMonth, events: dayEvents }) => (
              <div 
                className={`calendar-day ${inMonth ? '' : 'calendar-day-muted'} ${dayEvents.length > 0 ? 'has-events' : ''}`} 
                key={date.toISOString()}
                onClick={() => handleDayClick(date, dayEvents)}
              >
                <strong>{date.getDate()}</strong>
                <div className="calendar-pills-container">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span 
                      className={`calendar-event-pill ${event.isFree ? 'free-calendar-event' : ''} ${event.isUrgente ? 'urgent-calendar-event' : ''}`} 
                      key={event.title}
                    >
                      {event.title}
                    </span>
                  ))}
                </div>
                {dayEvents.length > 3 && <span className="small plus-counter">+{dayEvents.length - 3} eventos</span>}
              </div>
            ))}
          </div>

          {selectedDayEvents && (
            <div className="calendar-drawer animate-fade-in">
              <div className="drawer-header">
                <h3>Eventos para {selectedDayLabel}</h3>
                <button className="close-drawer" onClick={() => setSelectedDayEvents(null)}>✕</button>
              </div>
              <div className="drawer-content">
                {selectedDayEvents.map((event) => (
                  <div key={event.title} className={`drawer-item ${event.isFree ? 'free' : ''} ${event.isUrgente ? 'urgent' : ''}`}>
                    <div className="drawer-item-tags">
                      <span className="mini-tag">{event.category}</span>
                      {event.isFree && <span className="mini-tag free">Gratuito</span>}
                      {event.isUrgente && <span className="mini-tag urgent">Urgente</span>}
                    </div>
                    <h4>{event.title}</h4>
                    <p className="mini-organizer">{event.organizer}</p>
                    <a href={event.link} target="_blank" rel="noreferrer" className="drawer-link">
                      Ver página oficial <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
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
      .calendar-layout-container { display: flex; gap: 1.5rem; position: relative; align-items: flex-start; }
      .monthly-calendar { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 0.5rem; flex: 3; }
      .calendar-weekday { font-weight: 700; color: #475569; font-size: 0.85rem; padding: 0.5rem; text-align: center; }
      .calendar-day { min-height: 118px; border: 1px solid #e2e8f0; border-radius: 14px; padding: 0.55rem; background: #ffffff; display: flex; flex-direction: column; gap: 0.35rem; transition: all 0.2s; }
      .calendar-day.has-events { cursor: pointer; }
      .calendar-day.has-events:hover { border-color: #94a3b8; background: #f8fafc; }
      .calendar-day-muted { opacity: 0.45; background: #f8fafc; }
      .calendar-pills-container { display: flex; flex-direction: column; gap: 0.25rem; flex-grow: 1; overflow: hidden; }
      .calendar-event-pill { display: block; padding: 0.25rem 0.4rem; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 0.72rem; line-height: 1.2; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      
      .free-calendar-event, .free-badge, .mini-tag.free { background: #e6f4ea !important; color: #137333 !important; border-color: #ceead6 !important; }
      .urgent-calendar-event, .urgent-badge, .mini-tag.urgent { background: #fef9c3 !important; color: #713f12 !important; border-color: #fde047 !important; }
      
      .free-event { border: 1px solid #e2e8f0 !important; background: #ffffff !important; border-left: 5px solid #137333 !important; }
      .urgent-event { border: 1px solid #e2e8f0 !important; background: #ffffff !important; border-left: 5px solid #eab308 !important; }
      
      .archived-event { opacity: 0.7; }
      .archived-badge { background: #f1f5f9; color: #475569; display: inline-flex; align-items: center; gap: 0.25rem; }
      .plus-counter { font-weight: bold; color: #2563eb; }
      
      .calendar-drawer { flex: 1; min-width: 280px; max-width: 340px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 18px; padding: 1.25rem; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: sticky; top: 20px; }
      .drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }
      .drawer-header h3 { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0; }
      .close-drawer { background: none; border: 0; font-size: 1.1rem; cursor: pointer; color: #64748b; }
      .drawer-content { display: flex; flex-direction: column; gap: 0.75rem; max-height: 450px; overflow-y: auto; }
      .drawer-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.75rem; border-left: 4px solid #cbd5e1; }
      .drawer-item.free { border-left-color: #137333; }
      .drawer-item.urgent { border-left-color: #eab308; }
      .drawer-item h4 { font-size: 0.88rem; margin: 0.25rem 0; color: #0f172a; line-clamp: 2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .mini-organizer { font-size: 0.75rem; color: #64748b; margin: 0; }
      .drawer-item-tags { display: flex; gap: 0.35rem; }
      .mini-tag { font-size: 0.65rem; padding: 0.1rem 0.35rem; border-radius: 4px; background: #f1f5f9; color: #475569; font-weight: 600; }
      .drawer-link { font-size: 0.75rem; color: #2563eb; text-decoration: none; display: inline-flex; align-items: center; gap: 0.25rem; margin-top: 0.4rem; font-weight: 500; }
      
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
        .calendar-layout-container { flex-direction: column; }
        .calendar-drawer { max-width: 100%; width: 100%; position: static; }
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

function App() {
  const [rawEvents, setRawEvents] = useState([])
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
          setSheetStatus('A Google Sheet carregou, mas não foram encontrados eventos publicados.')
        }
      })
      .catch(() => {
        setSheetStatus('Não foi possível carregar a Google Sheet. Verifica a ligação ou o link.')
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

  const featuredEvents = useMemo(() => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    return [...preparedEvents]
      .filter((event) => !event.isArchived && event.endDate >= hoje)
      .sort((a, b) => {
        if (a.startDate >= hoje && b.startDate >= hoje) {
          return a.startDate - b.startDate
        }
        if (a.startDate < hoje && b.startDate >= hoje) return 1
        if (b.startDate < hoje && a.startDate >= hoje) return -1
        return a.startDate - b.startDate
      })
      .slice(0, 4)
  }, [preparedEvents])

  const sourceEvents = showArchive ? archivedEvents : activeEvents
  const filteredEvents = sourceEvents.filter((event) => {
    const haystack = normalizeText(`${event.title} ${event.organizer} ${event.category} ${event.description} ${event.type} ${event.region}`)
    const matchesSearch = haystack.includes(normalizeText(query))
    const matchesCategory = selectedCategory === 'Todas' || normalizeText(event.category) === normalizeText(selectedCategory)
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
              <div><p className="eyebrow">Próximos eventos</p><h2>Eventos mais próximos</h2></div>
              <div className="soft-icon"><Filter size={20} /></div>
            </div>
            <div className="event-list">
              {featuredEvents.map((event) => (
                <div className="event-row" style={event.isUrgente ? { borderLeft: '4px solid #eab308', paddingLeft: '0.6rem' } : {}} key={event.title}>
                  <div className="event-top">
                    <div>
                      <p className="event-title">
                        {event.deadline && <span style={{ color: '#b45309', fontWeight: 'bold', fontSize: '0.75rem', marginRight: '0.4rem' }}>⚠️ LIMITE INSCRIÇÃO: {event.deadline.toUpperCase()} |</span>}
                        {event.title}
                      </p>
                      <p className="muted">{event.organizer}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <span className="tag">{event.category}</span>
                      {event.isFree && <span className="tag free-badge">Gratuito</span>}
                    </div>
                  </div>
                  <div className="event-meta"><span>{event.date}</span><span>{event.type}</span><span>{event.region}</span><span>{event.price}</span></div>
                </div>
              ))}
              {featuredEvents.length === 0 && <p className="muted" style={{ padding: '1rem' }}>Nenhum evento em destaque disponível.</p>}
            </div>
          </div>
        </section>

        <section id="about" className="intro-section">
          <div className="container intro-card">
            <div className="soft-icon"><HeartHandshake size={22} /></div>
            <p className="eyebrow">Sobre</p>
            <h2>Uma ferramenta criada para ajudar colegas e fortalecer a comunidade laboratorial.</h2>
            <p>A formação em medicina laboratorial encontra-se frequentemente dispersa entre sociedades científicas, universidades, hospitais, empresas e reuniões científicas. O MedLab Calendar reúne cursos, webinars, congressos e reuniões científicas num único local, facilitando o acesso a oportunidades de aprendizagem contínua.</p>
          </div>
        </section>

        <MonthlyCalendar events={activeEvents} />

        <section id="events" className="white-section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Eventos e formações</p>
                <h2>{showArchive ? 'Arquivo Histórico de Formações' : 'Todas as Formações Disponíveis'}</h2>
              </div>
              <Button variant="outline" onClick={() => setShowArchive(!showArchive)}>{showArchive ? 'Ver eventos ativos' : 'Ver arquivo'}</Button>
            </div>

            <div className="filters-panel">
              <label className="search-input"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por theme, área, organizador..." /></label>
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

            <div className="notice">
              {showArchive ? 'Arquivo de eventos passados.' : 'A apresentar o catálogo global de eventos ativos.'} 
              <strong> Resultado: {filteredEvents.length} evento(s).</strong>
            </div>
            
            <div className="grid-3">{filteredEvents.map((event) => <EventCard event={event} key={event.title} />)}</div>
          </div>
        </section>

        <section id="categories" className="container categories-section">
          <div className="section-intro">
            <p className="eyebrow">Categorias</p>
            <h2>Eventos organizados por área.</h2>
          </div>

          <label className="category-search-box">
            <Search size={18} />
            <input
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Pesquisar área..."
            />
          </label>

          <div className="category-icon-grid">
            {visibleCategories.map((category) => {
              const matchingEvents = preparedEvents.filter((event) => normalizeText(event.category) === normalizeText(category))
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
              <h2>Divulgue cursos, webinars e reuniões científicas relevante.</h2>
            </div>
            <div className="organizers-copy">
              <p><strong>Email:</strong> <a className="inline-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
              <SuggestEventLink><Button>Submeter evento</Button></SuggestEventLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <p style={{ margin: 0 }}>© 2026 MedLab Calendar. Curadoria independente de formação laboratorial.</p>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
            <p style={{ margin: 0, lineHeight: '1.4' }}>
              A MedLab Calendar funciona como curadoria independente de eventos de formação laboratorial, limitando‑se à sua divulgação. A plataforma não participa em processos de inscrição, pagamento ou validação de conteúdos, sendo estes integralmente assegurados pelos organizadores.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
