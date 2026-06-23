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

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

/* =========================
   CATEGORIES (UPDATED)
========================= */
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
  'Urgência'
]

/* =========================
   NORMALIZE
========================= */
function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/* =========================
   CATEGORY MAPPING FIXED
========================= */
function normalizeCategory(category) {
  const n = normalizeText(category)

  if (n.includes('imunolog')) return 'Imunologia'
  if (n.includes('coagul') || n.includes('hemostase')) return 'Coagulação e Hemostase'
  if (n.includes('hematolog')) return 'Hematologia'
  if (n.includes('microbiolog') || n.includes('infec')) return 'Microbiologia'
  if (n.includes('biologia molecular')) return 'Biologia Molecular'
  if (n.includes('anatomia')) return 'Anatomia Patológica'
  if (n.includes('qualidade')) return 'Qualidade'
  if (n.includes('bioquim')) return 'Bioquímica Clínica'
  if (n.includes('genet')) return 'Genética'
  if (n.includes('urgencia')) return 'Urgência'
  if (n.includes('inovacao')) return 'Inovação'
  if (n.includes('bioestat')) return 'Bioestatística'
  if (n.includes('toxicolog')) return 'Toxicologia'

  return 'Medicina Laboratorial'
}

/* =========================
   CSV PARSER (UNCHANGED BUT SAFE)
========================= */
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
      if (value || row.length) {
        row.push(value.trim())
        rows.push(row)
        row = []
        value = ''
      }
    } else {
      value += char
    }
  }

  if (value || row.length) {
    row.push(value.trim())
    rows.push(row)
  }

  if (rows.length < 2) return []

  const headers = rows[0].map(h => normalizeText(h))

  return rows.slice(1).map(cells => {
    const obj = {}
    headers.forEach((h, i) => (obj[h] = cells[i] || ''))

    return {
      title: obj.titulo || obj.title || '',
      date: obj.data || obj.date || '',
      category: normalizeCategory(obj.categoria || obj.category || ''),
      type: obj.tipo || obj.type || '',
      organizer: obj.organizador || '',
      link: obj.link || '',
      price: obj.price || '',
      certificate: obj.certificate || '',
      region: obj.region || '',
      description: obj.description || ''
    }
  }).filter(e => e.title)
}

/* =========================
   DATE PARSER
========================= */
function parseEventDate(dateText = '') {
  const clean = normalizeText(dateText).replace(/\//g, '-')

  const match = clean.match(/(20\d{2})-(\d{1,2})-(\d{1,2})/)
  if (!match) {
    const fallback = new Date()
    return { start: fallback, end: fallback, isRange: false }
  }

  const start = new Date(match[1], match[2] - 1, match[3], 9)
  const end = new Date(match[1], match[2] - 1, match[3], 18)

  return { start, end, isRange: clean.includes('-') }
}

/* =========================
   IMPORTANT FIX:
   LONG EVENTS ONLY FIRST DAY
========================= */
function isCalendarEventOnDay(event, day) {
  const d = new Date(day)
  const start = event.startDate

  return (
    d.getFullYear() === start.getFullYear() &&
    d.getMonth() === start.getMonth() &&
    d.getDate() === start.getDate()
  )
}

/* =========================
   PREPARE EVENTS
========================= */
function getPreparedEvents(events) {
  const now = new Date()

  return events.map(e => {
    const parsed = parseEventDate(e.date)

    return {
      ...e,
      startDate: parsed.start,
      endDate: parsed.end,
      isArchived: parsed.end < now,
      isLong: false // FIX: never spread across calendar
    }
  }).sort((a, b) => a.startDate - b.startDate)
}

/* =========================
   BUTTON
========================= */
function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={variant === 'outline' ? 'btn-outline' : 'btn-primary'}
    >
      {children}
    </button>
  )
}

/* =========================
   EVENT CARD
========================= */
function EventCard({ event }) {
  return (
    <div className="card">
      <span className="tag">{event.category}</span>
      <h3>{event.title}</h3>
      <p>{event.organizer}</p>
      <p>{event.description}</p>
      <p><strong>{event.date}</strong></p>
      <a href={event.link} target="_blank" rel="noreferrer">
        <Button variant="outline">Abrir</Button>
      </a>
    </div>
  )
}

/* =========================
   CALENDAR (FIXED)
========================= */
function MonthlyCalendar({ events }) {
  const [month, setMonth] = useState(new Date())

  const days = useMemo(() => {
    const start = new Date(month.getFullYear(), month.getMonth(), 1)

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
      <h2>{month.toLocaleDateString('pt', { month: 'long', year: 'numeric' })}</h2>

      <div className="calendar">
        {days.map(d => (
          <div key={d.date}>
            <strong>{d.date.getDate()}</strong>
            {d.events.map(e => (
              <div key={e.title} className="pill">
                {e.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => setMonth(new Date(month.setMonth(month.getMonth() - 1)))}>
        Prev
      </button>
      <button onClick={() => setMonth(new Date(month.setMonth(month.getMonth() + 1)))}>
        Next
      </button>
    </div>
  )
}

/* =========================
   APP (ONLY SHEETS)
========================= */
function App() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('A carregar Google Sheets...')

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then(r => r.text())
      .then(text => {
        const parsed = parseCSV(text)
        setEvents(getPreparedEvents(parsed))
        setStatus(`Eventos carregados: ${parsed.length}`)
      })
      .catch(() => setStatus('Erro a carregar Google Sheets'))
  }, [])

  const active = events.filter(e => !e.isArchived)

  return (
    <div>
      <h1>MedLab Calendar</h1>
      <p>{status}</p>

      <MonthlyCalendar events={active} />

      <div className="grid">
        {active.map(e => (
          <EventCard key={e.title} event={e} />
        ))}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
