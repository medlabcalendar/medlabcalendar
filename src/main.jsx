import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  CalendarDays,
  Search,
  ExternalLink,
  Microscope,
  Filter,
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
  HeartHandshake,
  ShieldPlus
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

/* ---------------------------
   NORMALIZAÇÃO
----------------------------*/

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function isSameCalendarDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/* ---------------------------
   CATEGORIAS
----------------------------*/

function normalizeCategory(category) {
  const n = normalizeText(category)

  if (n.includes('imunologia') || n.includes('immunology'))
    return 'Imunologia'

  if (
    n.includes('coagulacao') ||
    n.includes('hemostase') ||
    n.includes('coagulation') ||
    n.includes('hemostasis')
  )
    return 'Coagulação e Hemostase'

  if (n.includes('hematologia')) return 'Hematologia'
  if (n.includes('microbiologia')) return 'Microbiologia'
  if (n.includes('bioquimica')) return 'Bioquímica Clínica'
  if (n.includes('qualidade')) return 'Qualidade'
  if (n.includes('genetica')) return 'Genética'
  if (n.includes('inovacao')) return 'Inovação'
  if (n.includes('urgencia')) return 'Urgência'

  return 'Medicina Laboratorial'
}

/* ---------------------------
   CSV PARSER
----------------------------*/

function parseCSV(text) {
  const rows = []
  let row = []
  let value = ''
  let insideQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && insideQuotes && next === '"') {
      value += '"'
      i++
    } else if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === ',' && !insideQuotes) {
      row.push(value.trim())
      value = ''
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (row.length) {
        row.push(value.trim())
        rows.push(row)
      }
      row = []
      value = ''
      if (char === '\r' && next === '\n') i++
    } else {
      value += char
    }
  }

  if (value || row.length) {
    row.push(value.trim())
    rows.push(row)
  }

  if (rows.length < 2) return []

  const headers = rows[0].map((h) =>
    normalizeText(h).replace(/[^a-z0-9]+/g, '')
  )

  return rows.slice(1).map((cells) => {
    const raw = {}

    headers.forEach((h, i) => {
      raw[h] = cells[i] || ''
    })

    return {
      title: raw.titulo || raw.title || '',
      date: raw.data || raw.date || '',
      category: normalizeCategory(raw.categoria || raw.category || ''),
      type: raw.tipo || raw.type || '',
      organizer: raw.organizador || raw.organizer || '',
      link: raw.link || raw.url || '',
      price: raw.preco || raw.price || '',
      certificate: raw.certificado || '',
      region: raw.regiao || raw.region || '',
      description: raw.descricao || raw.description || ''
    }
  }).filter(e => e.title)
}

/* ---------------------------
   DATE PARSER (SIMPLES)
----------------------------*/

function parseEventDate(dateText = '') {
  const clean = normalizeText(dateText)

  const iso = clean.match(/(20\d{2})-(\d{1,2})-(\d{1,2})/)

  if (iso) {
    const y = Number(iso[1])
    const m = Number(iso[2]) - 1
    const d = Number(iso[3])

    return {
      start: new Date(y, m, d, 9),
      end: new Date(y, m, d, 18),
      isApproximate: false
    }
  }

  return {
    start: new Date(),
    end: new Date(),
    isApproximate: true
  }
}

/* ---------------------------
   EVENTOS PREPARADOS
----------------------------*/

function getPreparedEvents(events) {
  const now = new Date()

  return events.map((e) => {
    const parsed = parseEventDate(e.date)

    return {
      ...e,
      category: normalizeCategory(e.category),
      startDate: parsed.start,
      endDate: parsed.end,
      isArchived: parsed.end < now,
      isFree: normalizeText(e.price).includes('gratuito')
    }
  }).sort((a, b) => a.startDate - b.startDate)
}

/* ---------------------------
   CALENDÁRIO: só 1º dia
----------------------------*/

function isCalendarEventOnDay(event, day) {
  return isSameCalendarDay(event.startDate, day)
}

/* ---------------------------
   UI
----------------------------*/

function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={variant === 'outline' ? 'btn-outline' : 'btn'}
    >
      {children}
    </button>
  )
}

/* ---------------------------
   EVENT CARD
----------------------------*/

function EventCard({ event }) {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.organizer}</p>
      <p>{event.description}</p>

      <div>
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Tipo:</strong> {event.type}</p>
        <p><strong>Preço:</strong> {event.price}</p>
      </div>

      <a href={event.link} target="_blank" rel="noreferrer">
        <Button variant="outline">Abrir</Button>
      </a>
    </div>
  )
}

/* ---------------------------
   CALENDAR
----------------------------*/

function MonthlyCalendar({ events }) {
  const [month, setMonth] = useState(new Date())

  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7

    const start = new Date(first)
    start.setDate(first.getDate() - offset)

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(start)
      date.setDate(start.getDate() + i)

      return {
        date,
        events: events.filter(e => isCalendarEventOnDay(e, date))
      }
    })
  }, [month, events])

  return (
    <div>
      <h2>
        {month.toLocaleString('pt-PT', { month: 'long' })}{' '}
        {month.getFullYear()}
      </h2>

      <div className="calendar">
        {days.map((d) => (
          <div key={d.date.toISOString()} className="day">
            <strong>{d.date.getDate()}</strong>

            {d.events.slice(0, 2).map((e) => (
              <a key={e.title} href={e.link} className="event-pill">
                {e.title}
              </a>
            ))}

            {d.events.length > 2 && (
              <small>+{d.events.length - 2}</small>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------
   APP
----------------------------*/

function App() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('A carregar Google Sheets...')

  useEffect(() => {
    const controller = new AbortController()

    fetch(SHEET_CSV_URL, { signal: controller.signal })
      .then((r) => r.text())
      .then((text) => {
        const parsed = parseCSV(text)
        setEvents(parsed)
        setStatus(`Google Sheets: ${parsed.length} eventos`)
      })
      .catch(() => {
        setEvents([])
        setStatus('Erro ao carregar Google Sheets')
      })

    return () => controller.abort()
  }, [])

  const prepared = useMemo(() => getPreparedEvents(events), [events])

  return (
    <div className="page">
      <header className="header">
        <Microscope />
        <h1>MedLab Calendar</h1>
      </header>

      <p>{status}</p>

      <MonthlyCalendar events={prepared} />

      <div className="grid">
        {prepared.map((e) => (
          <EventCard key={`${e.title}-${e.date}`} event={e} />
        ))}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
