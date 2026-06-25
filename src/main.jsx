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

  const headers = rows[0].map((header) => normalizeText(header).replace(/[^a-z0-9]+/g, ''))

  return rows.slice(1).map((cells) => {
    const raw = {}
    headers.forEach((header, index) => {
      raw[header] = cells[index] || ''
    })

    const activeValue = normalizeText(raw.ativo || raw.ativo_ || raw.status || '')
    const isActive = !activeValue || ['sim', 'yes', 'published', 'publicado', 'ativo'].some((word) => activeValue.includes(word))

    // Identificação de Urgência por palavras-chave ou coluna dedicada
    const custoTexto = normalizeText(raw.custo || raw.price || raw.preco || '')
    const isUrgenteManual = normalizeText(raw.urgente || raw.destaqueurgente || '').includes('sim')
    const hasUrgenciaKeyword = custoTexto.includes('urgente') || custoTexto.includes('limite') || custoTexto.includes('fechar')

    return {
      title: raw.titulo || raw.title || '',
      date: raw.data || raw.date || raw.startdate || raw.datainicio || '',
      startDateRaw: raw.startdate || raw.datainicio || '',
      endDateRaw: raw.enddate || raw.datafim || '',
      category: normalizeCategory(raw.areacategoria || raw.categoria || raw.category || raw.area || raw.areas || ''),
      type: raw.tipoformato || raw.formato || raw.type || raw.tipo || '',
      organizer: raw.organizador || raw.organizer || '',
      link: raw.linkoficial || raw.link || raw.url || '',
      price: raw.custo || raw.price || raw.preco || '',
      certificate: raw.certificado || raw.certificate || '',
      region: raw.regiao || raw.region || raw.local || '',
      description: raw.descricao || raw.description || '',
      status: isActive ? 'published' : 'draft',
      isUrgente: isUrgenteManual || hasUrgenciaKeyword,
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
      end: new Date(Math.max(endYear, startYear + 1), 11, 31, 18, 0, 0),
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

// Corrigido o envio de dados corretos do evento para a URL do calendário
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
        <p><strong>Data:</strong> {event.date}</p>
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
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(),
