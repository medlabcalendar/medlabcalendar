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
  TestTube2,
  AlertTriangle
} from 'lucide-react'
import './styles.css'

const contactEmail = 'medlabcalendar@gmail.com'
const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc22SEwuG9LJnLsQ0tgRrJA9zx2Fsr7cZ6iA9g06qRnemOxVw/viewform'

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNMDWDdFpEBXYUUKpw87IYCdmy_Y6bTGKzpKpDuundPcyfxvEZZ9SvSzQ_rTb2TZMk0z-T6b5Yzs4f/pub?output=csv'

const monthNames = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
]

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

const areaCategories = [
  'Genética','Inovação','Hematologia','Coagulação e Hemostase','Medicina Laboratorial',
  'Bioquímica Clínica','Microbiologia','Qualidade','Anatomia Patológica',
  'Biologia Molecular','Toxicologia','Bioestatística','Imunologia','Urgência'
]

function normalizeCategory(category) {
  if (!category) return 'Medicina Laboratorial'
  const n = normalizeText(category)

  if (n.includes('anatomia')) return 'Anatomia Patológica'
  if (n.includes('biologia molecular')) return 'Biologia Molecular'
  if (n.includes('bioestatistica')) return 'Bioestatística'
  if (n.includes('toxicologia')) return 'Toxicologia'
  if (n.includes('urgencia')) return 'Urgência'
  if (n.includes('bioquim')) return 'Bioquímica Clínica'
  if (n.includes('genet')) return 'Genética'
  if (n.includes('coagul') || n.includes('hemostase')) return 'Coagulação e Hemostase'
  if (n.includes('hematolog')) return 'Hematologia'
  if (n.includes('microbiolog')) return 'Microbiologia'
  if (n.includes('qualidade')) return 'Qualidade'
  if (n.includes('imunolog')) return 'Imunologia'
  if (n.includes('inovacao')) return 'Inovação'

  return 'Medicina Laboratorial'
}

function parseCSV(text) {
  const rows = []
  let row = []
  let value = ''
  let inside = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    const n = text[i + 1]

    if (c === '"' && inside && n === '"') {
      value += '"'
      i++
    } else if (c === '"') {
      inside = !inside
    } else if (c === ',' && !inside) {
      row.push(value.trim()); value = ''
    } else if ((c === '\n' || c === '\r') && !inside) {
      if (row.length) rows.push(row)
      row = []; value = ''
    } else {
      value += c
    }
  }

  const headers = rows[0].map(h => normalizeText(h).replace(/[^a-z0-9]+/g,''))

  return rows.slice(1).map(cells => {
    const raw = {}
    headers.forEach((h,i)=>raw[h]=cells[i]||'')

    const isUrgente =
      normalizeText(raw.urgente).includes('sim') ||
      normalizeText(raw.custo).includes('urgente')

    return {
      title: raw.titulo || '',
      date: raw.data || '',
      category: normalizeCategory(raw.categoria),
      type: raw.tipo || '',
      organizer: raw.organizador || '',
      link: raw.link || '',
      price: raw.custo || '',
      description: raw.descricao || '',
      region: raw.regiao || '',
      isUrgente
    }
  }).filter(e => e.title)
}

function parseEventDate(dateText='') {
  const m = normalizeText(dateText).match(/(20\d{2})-(\d{1,2})-(\d{1,2})/)

  if (m) {
    return {
      start: new Date(+m[1], +m[2]-1, +m[3]),
      end: new Date(+m[1], +m[2]-1, +m[3], 23,59),
      isApproximate:false
    }
  }

  return {
    start: new Date(),
    end: new Date(),
    isApproximate:true
  }
}

function isFreeEvent(e) {
  return normalizeText(e.price).includes('gratis') ||
         normalizeText(e.price).includes('free')
}

function getPreparedEvents(events) {
  const now = new Date()

  return events.map(e => {
    const d = parseEventDate(e.date)

    return {
      ...e,
      startDate: d.start,
      endDate: d.end,
      isArchived: d.end < now,
      isFree: isFreeEvent(e),
      isUrgente: e.isUrgente || false
    }
  }).sort((a,b)=>a.startDate-b.startDate)
}

function Button({children,...props}) {
  return <button {...props} className="btn">{children}</button>
}

function EventCard({event}) {
  return (
    <div className={`card event-card ${event.isUrgente ? 'urgent-event' : ''}`}>
      <h3>{event.title}</h3>
      <p>{event.organizer}</p>
      <p>{event.date}</p>
      <p>{event.category}</p>
      {event.isUrgente && (
        <span style={{color:'#b45309',fontWeight:700}}>
          ⚠ Limite de inscrição
        </span>
      )}
    </div>
  )
}

function App() {
  const [rawEvents,setRawEvents]=useState([])
  const [query,setQuery]=useState('')
  const [selectedCategory,setSelectedCategory]=useState('Todas')
  const [onlyFree,setOnlyFree]=useState(false)
  const [showArchive,setShowArchive]=useState(false)
  const [monthFilter,setMonthFilter]=useState('Todos')
  const [currentCalendarMonth,setCurrentCalendarMonth]=useState(new Date())

  useEffect(()=>{
    fetch(SHEET_CSV_URL)
      .then(r=>r.text())
      .then(t=>setRawEvents(parseCSV(t)))
  },[])

  const preparedEvents = useMemo(()=>getPreparedEvents(rawEvents),[rawEvents])

  const activeEvents = preparedEvents.filter(e=>!e.isArchived)
  const archivedEvents = preparedEvents.filter(e=>e.isArchived)

  const sourceEvents = showArchive ? archivedEvents : activeEvents

  const filteredEvents = sourceEvents.filter(event => {
    const matchesSearch =
      normalizeText(event.title + event.organizer + event.category)
        .includes(normalizeText(query))

    const matchesCategory =
      selectedCategory === 'Todas' ||
      event.category === selectedCategory

    const matchesFree = !onlyFree || event.isFree

    const matchesMonth =
      monthFilter === 'Todos' ||
      event.startDate.getMonth() === Number(monthFilter)

    return matchesSearch && matchesCategory && matchesFree && matchesMonth
  })

  const featuredEvents = useMemo(() => {
    const now = new Date()

    return [...activeEvents]
      .filter(e => e.startDate > now)
      .sort((a,b)=>{
        const da = Math.abs(a.startDate-now)
        const db = Math.abs(b.startDate-now)

        if (a.isUrgente && !b.isUrgente) return -1
        if (!a.isUrgente && b.isUrgente) return 1

        return da-db
      })
      .slice(0,4)
  },[activeEvents])

  return (
    <div className="page">

      <h1>MedLab Calendar</h1>

      {/* FILTERS */}
      <div className="filters-panel">
        <input value={query} onChange={e=>setQuery(e.target.value)} />

        <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
          <option>Todas</option>
          {areaCategories.map(c=><option key={c}>{c}</option>)}
        </select>

        <select value={monthFilter} onChange={e=>setMonthFilter(e.target.value)}>
          <option value="Todos">Todos os meses</option>
          {monthNames.map((m,i)=>(
            <option key={m} value={i}>{m}</option>
          ))}
        </select>

        <label>
          <input type="checkbox" checked={onlyFree} onChange={e=>setOnlyFree(e.target.checked)} />
          Grátis
        </label>
      </div>

      {/* FEATURED */}
      <h2>Destaques (próximos eventos)</h2>
      {featuredEvents.map(e=>(
        <EventCard key={e.title} event={e}/>
      ))}

      {/* ALL EVENTS */}
      <h2>Todos os eventos</h2>
      {filteredEvents.map(e=>(
        <EventCard key={e.title} event={e}/>
      ))}

    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
