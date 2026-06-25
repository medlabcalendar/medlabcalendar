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
  'Genética','Inovação','Hematologia','Coagulação e Hemostase','Medicina Laboratorial',
  'Bioquímica Clínica','Microbiologia','Qualidade','Anatomia Patológica',
  'Biologia Molecular','Toxicologia','Bioestatística','Imunologia','Urgência',
]

function normalizeCategory(category) {
  if (!category) return 'Medicina Laboratorial'
  const normalized = normalizeText(category)

  if (normalized.includes('anatomia')) return 'Anatomia Patológica'
  if (normalized.includes('biologia molecular')) return 'Biologia Molecular'
  if (normalized.includes('bioestatistica')) return 'Bioestatística'
  if (normalized.includes('toxicologia')) return 'Toxicologia'
  if (normalized.includes('urgencia')) return 'Urgência'
  if (normalized.includes('bioquim')) return 'Bioquímica Clínica'
  if (normalized.includes('genet')) return 'Genética'
  if (normalized.includes('hemostase') || normalized.includes('coagul')) return 'Coagulação e Hemostase'
  if (normalized.includes('hematolog')) return 'Hematologia'
  if (normalized.includes('microbiolog') || normalized.includes('infec')) return 'Microbiologia'
  if (normalized.includes('qualidade')) return 'Qualidade'
  if (normalized.includes('imunolog')) return 'Imunologia'
  if (normalized.includes('inovacao')) return 'Inovação'

  return 'Medicina Laboratorial'
}

function parseCSV(text) {
  const rows = []
  let row = []
  let value = ''
  let insideQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && insideQuotes && next === '"') {
      value += '"'; i++
    } else if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === ',' && !insideQuotes) {
      row.push(value.trim()); value = ''
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (row.length) rows.push(row)
      row = []; value = ''
    } else {
      value += char
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
  const clean = normalizeText(dateText)

  const m = clean.match(/(20\d{2})-(\d{1,2})-(\d{1,2})/)
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

function Button({children, ...props}) {
  return <button {...props} className="btn">{children}</button>
}

function EventCard({event}) {
  return (
    <div className={`card ${event.isUrgente?'urgent-event':''}`}>
      <h3>{event.title}</h3>
      <p>{event.organizer}</p>
      <p>{event.date}</p>
      <p>{event.category}</p>
    </div>
  )
}

function App() {
  const [rawEvents,setRawEvents]=useState([])
  const [query,setQuery]=useState('')
  const [selectedCategory,setSelectedCategory]=useState('Todas')
  const [formatFilter,setFormatFilter]=useState('Todos')
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

  const sourceEvents = showArchive?archivedEvents:activeEvents

  const filteredEvents = sourceEvents.filter(event=>{
    const matchesSearch = normalizeText(event.title+event.organizer).includes(normalizeText(query))
    const matchesCategory = selectedCategory==='Todas'||event.category===selectedCategory
    const matchesFree = !onlyFree || event.isFree
    const matchesMonth =
      monthFilter==='Todos' ||
      event.startDate.getMonth()===Number(monthFilter)

    return matchesSearch && matchesCategory && matchesFree && matchesMonth
  })

  const featuredEvents = useMemo(()=>{
    const now=new Date()

    return [...activeEvents]
      .filter(e=>e.startDate>now)
      .sort((a,b)=>{
        const da=Math.abs(a.startDate-now)
        const db=Math.abs(b.startDate-now)
        if(a.isUrgente&&!b.isUrgente) return -1
        if(!a.isUrgente&&b.isUrgente) return 1
        return da-db
      })
      .slice(0,4)
  },[activeEvents])

  return (
    <div>
      <h1>MedLab Calendar</h1>

      <div className="filters-panel">
        <input value={query} onChange={e=>setQuery(e.target.value)} />

        <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
          <option>Todas</option>
          {areaCategories.map(c=><option key={c}>{c}</option>)}
        </select>

        <select value={monthFilter} onChange={e=>setMonthFilter(e.target.value)}>
          <option value="Todos">Todos os meses</option>
          {monthNames.map((m,i)=><option key={m} value={i}>{m}</option>)}
        </select>

        <label>
          <input type="checkbox" checked={onlyFree} onChange={e=>setOnlyFree(e.target.checked)} />
          Grátis
        </label>
      </div>

      <h2>Destaques</h2>
      {featuredEvents.map(e=><EventCard key={e.title} event={e}/>)}

      <h2>Todos os eventos</h2>
      {filteredEvents.map(e=><EventCard key={e.title} event={e}/>)}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
